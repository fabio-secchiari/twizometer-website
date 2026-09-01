document.addEventListener("DOMContentLoaded", () => {

    const contentContainer =
        document.getElementById("documentation-content");

    const navigationContainer =
        document.getElementById("sidebar-navigation");

    const languageSelect =
        document.getElementById("language-select");

    const searchInput =
        document.getElementById("search-input");

    const themeToggle =
        document.getElementById("theme-toggle");

    const themeText =
        document.getElementById("theme-text");

    const mobileNavToggle =
        document.getElementById("mobile-nav-toggle");

    const sidebar =
        document.querySelector(".sidebar");


    /* =====================================
       MOBILE NAVIGATION
    ===================================== */

    if (mobileNavToggle && sidebar) {

        mobileNavToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    sidebar.classList.toggle("open");

                mobileNavToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );

    }


    /* =====================================
       LANGUAGE SETTINGS
    ===================================== */

    const languages = {

        en: "content/en.html",

        de: "content/de.html",

        fr: "content/fr.html"

    };


    /* =====================================
       LOAD SAVED SETTINGS
    ===================================== */

    const savedLanguage =
        localStorage.getItem("tom-language") || "en";

    const savedTheme =
        localStorage.getItem("tom-theme") || "light";


    languageSelect.value = savedLanguage;

    setTheme(savedTheme);

    loadLanguage(savedLanguage);


    /* =====================================
       LANGUAGE CHANGE
    ===================================== */

    languageSelect.addEventListener("change", () => {

        const language =
            languageSelect.value;

        localStorage.setItem(
            "tom-language",
            language
        );

        loadLanguage(language);

    });


    /* =====================================
       LOAD LANGUAGE CONTENT
    ===================================== */

    async function loadLanguage(language) {

        contentContainer.innerHTML = `
            <div class="loading">
                Loading documentation...
            </div>
        `;

        try {

            const requestedLanguage =
                languages[language]
                    ? language
                    : "en";

            let activeLanguage = requestedLanguage;

            let response = await fetch(
                languages[activeLanguage]
            );

            if (!response.ok) {

                activeLanguage = "en";
                response = await fetch(
                    languages[activeLanguage]
                );

            }

            if (!response.ok) {

                throw new Error(
                    "Could not load documentation"
                );

            }

            let html = await response.text();

            const hasDocumentStructure =
                /<h[1-4]\b|<section\b/.test(html);

            if (
                activeLanguage !== "en" &&
                (!html.trim() || !hasDocumentStructure)
            ) {

                const fallbackResponse = await fetch(
                    languages.en
                );

                if (!fallbackResponse.ok) {

                    throw new Error(
                        "English fallback could not be loaded"
                    );

                }

                html = await fallbackResponse.text();
                activeLanguage = "en";

            }

            if (!html.trim() || !/<h[1-4]\b|<section\b/.test(html)) {

                throw new Error(
                    "Loaded content is empty or invalid"
                );

            }

            if (activeLanguage !== language) {

                languageSelect.value = activeLanguage;
                localStorage.setItem(
                    "tom-language",
                    activeLanguage
                );

            }

            contentContainer.innerHTML = html;

            fixHeadingIds();

            buildNavigation();

            fixIconLists();


            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

        }

        catch (error) {

            console.error(error);

            contentContainer.innerHTML = `
                <div class="loading">

                    <h2>
                        Documentation could not be loaded
                    </h2>

                    <p>
                        The selected page is empty or unavailable. The English version will be used as a fallback.
                    </p>

                </div>
            `;

            if (languageSelect.value !== "en") {

                languageSelect.value = "en";
                localStorage.setItem(
                    "tom-language",
                    "en"
                );

                loadLanguage("en");

            }

        }

    }


    /* =====================================
       FIX HEADING IDs
    ===================================== */

    function fixHeadingIds() {

        const headings =
            contentContainer.querySelectorAll(
                "h1, h2, h3, h4"
            );


        headings.forEach((heading, index) => {

            if (!heading.id) {

                const generatedId =
                    heading.textContent
                        .trim()
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, "")
                        .replace(/\s+/g, "-")
                        .replace(/-+/g, "-");

                heading.id =
                    generatedId ||
                    `section-${index}`;

            }

        });

    }


    /* =====================================
       BUILD SIDEBAR
    ===================================== */

    function buildNavigation() {

        navigationContainer.innerHTML = "";

        const headings =
            contentContainer.querySelectorAll(
                "h1, h2, h3, h4"
            );


        headings.forEach((heading) => {

            const level =
                parseInt(
                    heading.tagName.substring(1)
                );

            const text =
                heading.textContent.trim();

            if (!text) {

                return;

            }

            const item =
                document.createElement("div");

            item.className =
                `nav-item nav-level-${level}`;


            const link =
                document.createElement("a");

            link.className =
                "nav-link";


            link.href =
                `#${heading.id}`;


            link.textContent = text;


            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    heading.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }
            );


            item.appendChild(link);

            navigationContainer.appendChild(item);

        });

    }


    /* =====================================
       SEARCH
    ===================================== */

    searchInput.addEventListener(
        "input",
        () => {

            const query =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const links =
                navigationContainer.querySelectorAll(
                    ".nav-item"
                );


            links.forEach((item) => {

                const text =
                    item.textContent
                        .toLowerCase();

                const matches =
                    !query || text.includes(query);

                item.classList.toggle(
                    "hidden",
                    !matches
                );

            });

        }
    );


    /* =====================================
       THEME
    ===================================== */

    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                document.documentElement
                    .getAttribute("data-theme");


            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";


            setTheme(newTheme);

            localStorage.setItem(
                "tom-theme",
                newTheme
            );

        }
    );


    function setTheme(theme) {

        document.documentElement
            .setAttribute(
                "data-theme",
                theme
            );


        if (theme === "dark") {

            themeText.textContent =
                "Light mode";

            themeToggle.querySelector(
                ".theme-icon"
            ).textContent = "☀️";

        }

        else {

            themeText.textContent =
                "Dark mode";

            themeToggle.querySelector(
                ".theme-icon"
            ).textContent = "🌙";

        }

    }


    /* =====================================
       READING PROGRESS
    ===================================== */

    window.addEventListener(
        "scroll",
        () => {

            const scrollTop =
                window.scrollY;


            const documentHeight =
                document.documentElement.scrollHeight
                - window.innerHeight;


            const progress =
                documentHeight > 0
                    ? (scrollTop / documentHeight) * 100
                    : 0;


            document.getElementById(
                "progress"
            ).style.width =
                `${progress}%`;

        }
    );


    /* =====================================
       ACTIVE NAVIGATION ITEM
    ===================================== */

    window.addEventListener(
        "scroll",
        () => {

            const headings =
                contentContainer.querySelectorAll(
                    "h1, h2, h3, h4"
                );


            let currentHeading =
                null;


            headings.forEach((heading) => {

                const position =
                    heading.getBoundingClientRect()
                        .top;


                if (position < 150) {

                    currentHeading =
                        heading;

                }

            });


            document
                .querySelectorAll(
                    ".nav-link"
                )
                .forEach((link) => {

                    link.classList.remove(
                        "active"
                    );

                });


            if (currentHeading) {

                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${currentHeading.id}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add(
                        "active"
                    );

                }

            }

        }
    );


    /* =====================================
       ICON LIST FIXER
    ===================================== */

    function fixIconLists() {

        /*
         * Searches for old Pandoc-generated
         * icon tables.
         *
         * Example:
         *
         * <table>
         *   <tbody>
         *     <tr>
         *       <td><img src="icons/example.png"></td>
         *       <td>Description</td>
         *     </tr>
         *   </tbody>
         * </table>
         *
         * Converts them into modern cards.
         */

        const tables =
            contentContainer.querySelectorAll(
                "table"
            );


        tables.forEach((table) => {

            const rows =
                table.querySelectorAll("tr");


            if (rows.length !== 1) {

                return;

            }


            const cells =
                rows[0].querySelectorAll("td");


            if (cells.length !== 2) {

                return;

            }


            const image =
                cells[0].querySelector("img");


            if (!image) {

                return;

            }


            const description =
                cells[1].innerHTML.trim();


            /*
             * If the second TD is genuinely
             * empty, we cannot magically recover
             * the missing original text.
             */

            if (!description) {

                return;

            }


            const card =
                document.createElement("div");

            card.className =
                "icon-card";


            const imageContainer =
                document.createElement("div");

            imageContainer.className =
                "icon-card-image";


            const clonedImage =
                image.cloneNode(true);


            imageContainer.appendChild(
                clonedImage
            );


            const textContainer =
                document.createElement("div");

            textContainer.className =
                "icon-card-text";

            textContainer.innerHTML =
                description;


            card.appendChild(
                imageContainer
            );

            card.appendChild(
                textContainer
            );


            table.replaceWith(card);

        });

    }

});