# Twiz O' Meter website

Static official guide site for ToM+, the Twizy telemetry and dashboard project by Fabio Java. The site presents the official user manual as a practical starting point for installation, everyday display use, advanced configuration, firmware updates, and connected garage experiments.

The copy and terminology are based on the ToM+ User Manual, Version 2.0, updated in 2026. This is a front-end guide portal rather than a replacement for the firmware documentation or the device itself.

## Latest releases

Firmware, release notes, and the latest downloadable project files are published on Codeberg:

https://codeberg.org/fabio-java/ToM-Wizard/releases

Check the release notes before updating an LCD or black box. The manual describes both OTA and cable-based workflows, and the correct file depends on the device display and firmware version.

## What is included

- Product overview: dashboard, WiFi, MQTT, phone application, kit contents, and power consumption.
- Installation: clip-on display, optional 3D stand, cable routing, and OBD2 connection.
- Display guide: page icons, battery and motor views, trips, alarms, errors, charging, settings, and keyboard input.
- Advanced setup: WiFi profiles, MQTT broker settings, web server, expansion pins, alarms, diagnostics, charging preferences, and time/date.
- Maintenance: LCD microSD updates, Windows flashing, Unix flashing, and OTA updates.
- Appendices: Twizy-cfg tuning and Tasmota MQTT switch control.

The current landing page is intentionally a concise guide index. Full page-by-page manual text and the original figures can be added as the site grows.

## Run locally

Open `index.html` in a browser. No build step or package installation is required.

## Deploy to Cloudflare Pages

Create a Pages project from this repository with:

- Build command: none
- Build output directory: `/`

Cloudflare Pages will serve `index.html` directly from the project root.

## Customize

- Edit the guide structure and copy in `index.html`.
- Adjust the visual system in `styles.css` through the variables at the top of the file.
- Update search behavior or add interactions in `script.js`.
- Replace the CSS dashboard illustration or add product photography when assets are available.

## Adding manual images

The PDF supplied during planning is not stored in this repository, so no image files are bundled yet. To add original figures, place exported files in an `assets/` directory and reference them from `index.html` with descriptive `alt` text. Suggested names include `tom-plus-dashboard.webp`, `black-box.webp`, `clip-on-installation.webp`, and `web-server.webp`.

Use optimized WebP or JPEG files and keep the original PDF outside the public site unless you intentionally want visitors to download it.
