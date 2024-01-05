# Pizza Menu

## Table of Contents

1. [Rendering_Root_Component_And_Strict_Mode](#rendering_root_component_and_strict_mode)
2. [Setting_A_Project_with_Create-React-App](#setting_a_project_with_create-react-app)

## `Setting_A_Project_with_Create-React-App`

Now Create-React-App tool is a command line interface tool.
In project folder run this command from CMD  
**npx create-react-app@5 pizza-menu**

By running this we have all of the files and folder that we usually see with ***npm init***  

We also have two folders src and public.  
Most of our development work will happen inside the source folder(src). And a public is where all the assets(images/index.html file/icons... ) that will end up in the final application go.

---

## `Rendering_Root_Component_And_Strict_Mode`

First we're creating an index.js file in src folder, It should be index.js name because Webpack, which is the module bundler in this project, expects the entry point to be called index.js.  
Let's now start by importing React in index.js file.  

```js
import React from 'react';
import ReactDOM from 'react-dom/client'; 
```

`Remember:` These import syntax are coming directly from JavaScript(ES-6).  

Nex Up lets create our App component. All React components starts with **Uppercase** letters.  

```js
function App() {
  return <h1>Hello World</h1>;
}
```

Now all we need to do is to render this to the DOM.

```js
// React Version 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

```

This is how we write React from scratch.

### `Strict Mode`

We can simply activate strict mode by instead of directly rendering the app component as a root component, wrapping this into a strict mode component.

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
root.render(<React.StrictMode> <App /></React.StrictMode>);

```

Now our application is wrapped inside a strict mode component. And `strict mode` only thing that does is during development it will render our component twice in order to find certain bugs and also react will check if we're using outdated parts of the React API
