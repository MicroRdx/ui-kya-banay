# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## Deployment to GitHub Pages

### Step 1: Install gh-pages

Firstly, install the 'gh-pages' module by running the following command in your project directory (make sure you have NodeJS installed):
First, install the `gh-pages`
then run

```bash
npm install --save gh-pages
```

### Step 2: Add script to your `package.json` file

Add following scripts into "scripts" section of your `package.json`:

```json

```

### Step 3: Create a new branch and push it

Create a new branch named _gh-pages_ using the command below. And then use `git push origin add-blog-post` to push this new branch to your remote repository.
Create a new branch named _gh-pages_ using the command below:

```bash
git checkout -b gh-pages
```
Then use the command below to push this new branch onto Github:

```bash
git push origin gh-pages
``` 

You can also do that in one line with the following command:

```bash
git push origin gh-pages:gh-pages
```

Now you have created a _gh-pages_ branch on Github!

### Step 4: Publish your website

To publish your website, add the following commands into the `"script"` section of your `package.json`.

```json
"script": {
    // ...
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    // ...
}
```

### Step 5: Use the `deploy` command to call NPM commands for deplooyment:

```bash
npm run deploy
```
This will first execute the `build` script (which is defined under `"scripts"`) and then it will use `gh-pages` to push the build files into gh-pages branch in github.
Then GitHub will takecare of publishing the new  version of your site at [http://yourusername.github.io/repo](http://micrordx.github.io/ui-kya-banay)

