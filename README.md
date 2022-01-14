# vanilla-js-scss-seed-project

***WARNING***: this is a work in progress, for now. We are planning to update dependencies to remove the security warning above.

## Why does this project repository exist?

This aims to help new juniors and non-developers, who are aspiring to learn JavaScript, HTML and CSS plus SCSS/SASS. We are attempting to provide a good start at doing that.

The project aims to provide a hassle-free environment to help you focus on your learning instead of just getting things to work. And by "things", we mean: autorefresh, resource bundling and GitHub-friendly deploy setup.

The main reason behind this is to help you make your work public and easy to link in a portfolio with the use of the free [GitHub Pages](https://pages.github.com/) feature.

## Prerequisites

1. You need to have node.js installed, you can find the download here: https://nodejs.org/en/
2. You need a github account: https://github.com/signup
3. You need to git installed on your computer: https://git-scm.com/downloads
4. [optional] Setup a SSH key to avoid prompt of username and password when using `npm run github` (this only needs to be done once per computer) https://docs.github.com/en/authentication/connecting-to-github-with-ssh – keep in mind that the computer that you do this for will always have rights to change files on all your GitHub repoistory.


## Commands

### Make your own copy

Click the big green button "Use this template" on https://github.com/CosticaPuntaru/vanilla-js-seed and set your project name

### Cloning the repository

On your github repository click the green button `code` and copy the url

in a directory run `git clone <paste the url>`

open the newly created folder with the repository name in your favorite editor 

Open a terminal in the editor and run `npm install`

### Starting local environment

`npm run start`

### Publishing all the changes to github pages

`npm run github`

## Working at your projects

### Limitations

* you are not allowed to move/rename the files `/src/js/main.js` and `/src/styles/main.scss`
* you should not mess around with the `webpack.config.js`
* you should not mess around with devDependencies of `package.json`

### Notes

* All feature js features should work out of the box ex. async 
* Please use https://github.com/CosticaPuntaru/vanilla-js-seed/issues to report issue
* If you need help you can find us on our discord server: https://discord.gg/sCM5HqAf
* Pull requests with features and bugfixes are encouraged 

## Enabling github pages for your project

![How to activate GitHub Pages deploy for your project](./src/assets/images/enable-page.jpg)

After you click save, or whenever you use `git push` or `npm run github`.
It may take some time to see the changes in the provided URL.

Use the link provided after hitting save to brag about your awesome work!

## Errors and workarounds

### Child compilation failed error

The project is built on the premise that all files you reference in your HTML, CSS and JS files are there, so it will help by displaying an error similar to this one when something goes missing:

```console
Error: Child compilation failed:
  Module not found: Error: Can't resolve '/favicon-32x32.png' in 'G:\VueJS Work\vanila-js-scss-seed-project\src'
  ModuleNotFoundError: Module not found: Error: Can't resolve '/favicon-32x32.png' in 'G:\VueJS Work\vanila-js-scss-seed-project\src'
```

When this happens, make sure the file it's looking for is there. If it isn't put it there. If you can't, replace it or remove its reference from the code.

### Compiled with problems

When seeing this issue, you probably either "misplaced" some SCSS you referenced with the `@import` command, like the example below, or you generated a compilation error in the SCSS itself.

```console
Compiled with problems:X

ERROR in ./styles/main.scss (./styles/main.scss.webpack[javascript/auto]!=!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/main.scss)

Module build failed (from ../node_modules/sass-loader/dist/cjs.js):
SassError: Can't find stylesheet to import.
  ╷
3 │ @import "reset";
  │         ^^^^^^^
  ╵
  src\styles\main.scss 3:9  root stylesheet
```

Please follow the advice in the error to fix your problem.
