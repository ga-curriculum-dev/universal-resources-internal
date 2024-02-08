# ![React Project Setup](./assets/hero.png)

## Setup


Open your Terminal application and navigate to your `~/code/ga/lectures` directory:   [tktk choose one]

Open your Terminal application and navigate to your `~/code/ga/labs` directory:

```bash
cd ~/code/ga/lectures  [tktk choose one]

cd ~/code/ga/labs
```

Create a new Vite project for your React app:

```bash
npm create vite@latest
```

You'll be prompted to choose a project name. Let's name it `[tktk-module-name]`. 

- Select a framework. Use the arrow keys to choose the `React` option and hit `Enter`.

- Select a variant. Again, use the arrow keys to choose `JavaScript` and hit `Enter`.

<br>

Navigate to your new project directory and install necessary dependencies:

```bash
cd [tktk-module-name]
npm i
```

Open the project's folder in your code editor:

```bash
code .
```

### Configuring ESLint

Before we begin, we need to adjust the ESLint configuration:

Add the following rules to the `.eslintrc.cjs` file:

```js
rules: {
  'react-refresh/only-export-components': [
    'warn',
    { allowConstantExport: true },
  ],
  'react/prop-types': 'off', // add this line
  'react/no-unescaped-entities': 'off' // add this line
},
```

The first addition prevents warnings if you’re not declaring types for your props (which we’re not), and the second prevents warnings if you’re using contractions within JSX.

### Clear App.js

Open the `App.jsx` file in the `src` directory and replace the contents of it with the following:

```jsx
// src/App.jsx

const App = () => {

  return (
    <h1>Hello world!</h1>
  );
}

export default App
```

### GitHub setup

To add this project to github, initialize a git repository:

```bash
git init
```

Make a new repository on [GitHub](https://github.com/) named [tktk-module-name]. 

Link your local project to your remote Github repo:

```bash
git remote add origin https://git.generalassemb.ly/<your-username>/[tktk-module-name].git
git branch -M main
git push -u origin main
```

> 📚 Note: In the link above, where it says `<your-username>`, you should see the username from your GitHub account.
