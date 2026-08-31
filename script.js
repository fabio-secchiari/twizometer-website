const filterButton = document.querySelector('.mobile-filter');
const chapterNav = document.querySelector('.chapter-nav');
const searchInput = document.querySelector('#searchInput');
const chapterCards = [...document.querySelectorAll('.chapter-card')];
const noResults = document.querySelector('#noResults');

filterButton?.addEventListener('click', () => {
  chapterNav.classList.toggle('open');
});

searchInput?.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  let visible = 0;
  chapterCards.forEach((card) => {
    const matches = !query || card.dataset.search.includes(query);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  noResults.style.display = visible ? 'none' : 'block';
});

document.querySelectorAll('.copy-button').forEach((button) => {
  button.addEventListener('click', async () => {
    await navigator.clipboard.writeText(button.dataset.copy);
    const original = button.textContent;
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = original; }, 1400);
  });
});
