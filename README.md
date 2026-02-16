


# INTERACTIVE-MODEL

**Interactive Model** is a starter template for HTML, CSS, JavaScript, and jQuery projects. It includes a live server for real-time browser reloading on every save.

---

## Prerequisites
- [Git, Node.js, and NPM must be installed](https://chingu.gitbook.io/cohort/cohort-guide/preparing-for-the-cohort/actionable-items-to-do)

---

## Getting Started

### 1. Create a New GitHub Repository
- Create a new repository on GitHub (do **not** initialize with a README, .gitignore, or license).

### 2. Clone the Boilerplate
```sh
git clone https://github.com/serpient/simple-boilerplate.git <YOUR_APP_NAME>
```

### 3. Set Up Your Remote Repository
```sh
cd <YOUR_APP_NAME>
git remote rm origin
git remote add origin <YOUR_REPO_LINK>
git push -u origin master
```

### 4. Install Dependencies
```sh
npm install
```

### 5. Start the Development Server
```sh
npm start
```
This will open your project in the browser and enable live reloading.

### 6. Commit and Push Changes
Use Git to save and push your changes to your repository.

---

## Updating from an Older Version
If you have an outdated version, follow these steps:
1. Delete `node_modules`, `package.json`, and `package-lock.json`.
2. Copy the new `package.json` from this repository.
3. Run `npm install`.
4. Use `npm start` to launch the live server.

---

## Adding JavaScript Files
When adding new JavaScript files, include them as `<script>` tags at the end of the `<body>` in `index.html`. **Order matters:** scripts must be loaded in the correct sequence to avoid reference errors.

---

## Common Commands
- `git clone <repo> <dir>`: Clone repository into a new directory.
- `git remote rm origin`: Remove the original remote link.
- `git remote add origin <url>`: Add your own remote repository.
- `git push -u origin master`: Push local changes to your remote repository.
- `npm install` or `npm i`: Install project dependencies.
- `npm start`: Start the live server with hot reloading.

---

## Deployment

### GitHub Pages
1. In your repository settings, set the source branch for GitHub Pages.
2. Visit `http://<YourUsername>.github.io/<YourRepoName>` after a few minutes to see your site live.
   - [More Info](https://pages.github.com/)

### Heroku
To deploy on Heroku, you need a simple server to serve `index.html`. This boilerplate does not include server setup, but you can add it as needed.
   - [Deployment Guide](https://blog.teamtreehouse.com/deploy-static-site-heroku)

---

# INTERACTIVE-MODEL

---

## Project Documentation

For detailed information about the interactive model, please refer to the following document:

- [Interactive Model Documentation (PDF)](src/assets/Interactive%20Model_Final-1.pdf)

---
