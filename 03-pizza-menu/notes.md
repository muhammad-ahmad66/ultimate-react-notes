# Pizza Menu

## Table of Contents

1. [Setting_A_Project_with_Create-React-App](#setting_a_project_with_create-react-app)
2. [Rendering_Root_Component_And_Strict_Mode](#rendering_root_component_and_strict_mode)
3. [Components](#components)
4. [Creating_And_Reusing_Component](#creating_and_reusing_component)

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

We can simply activate strict mode by instead of directly rendering the app component as a root component, wrapping this into a strictMode component.

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
root.render(<React.StrictMode> <App /></React.StrictMode>);

```

Now our application is wrapped inside a strict mode component. And `strict mode` only thing that does is during development it will render our component twice in order to find certain bugs and also react will check if we're using outdated parts of the React API

---

## `Components`

**Components As Building Blocks:**  

`REACT` is all about `Components.` **What React components are? And why are so important?**  
So components are most fundamental concepts in React simply because React applications are in fact entirely made out of components. When we look at any React app, there's nothing that is not a component or at least not inside of some components. So,  
***The component is Building Blocks of UI in REACT***  
All react does is to take the components and draw them onto a web-page/UI.  
In more technical way: **React renders a view for each component and all these views together make up the user interface.** So we can also think about the components as a piece of the UI.

One key property of components is that **each component has its own data, JavaScript logic and appearance**. So each component describes how it works and what it looks like, which makes them such a great way of building UI.  
For a complex UIs, We build multiple components and combine them one.  
We place components inside of other components all the time, In other words, we nested components inside each other.  
Also we reuse components every time for a similar components, but of course we can easily pass different data into different components by using something called **`props`**.  
In nested components we use `Parent` and `Child` components all the times.

---

## Creating_And_Reusing_Component

let's create a component and take a first look at it's reusability.

In REACT we write components using functions. There is two important rules when we writing components as functions.

1. Function name needs to start with an uppercase letter.
2. Function needs to return some markup. Usually in the form of JSX, but we can ever return nothing.

```js
function Pizza() {
  return <h2>Pizza</h2>
}
```

Here will not be rendered on the page, because we never include this new component any where.  
To render we use this component in App component, which is currently being rendered on the screen. simply like this:

```js
function App() {
  return <h1>Hello React!!<h1><Pizza />
}
```

This however it's now giving an error, reason for this error is that each component can only exactly one element, not two... So we wrap these elements into an element like with div.

```js
function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Pizza />
    </div>
  );
}

function Pizza() {
  return <h2>Pizza</h2>;
}
```

Now we get Pizza in our UI. That's because we now nested this `Pizza component` inside the `App component`. With nesting we mean basically used or called `Pizza` inside the `App component`.  
**`NOTICE:` With Nesting we do not mean that we write a function inside the other function. We never should nest the component declaration inside any other, this still works `BUT` it's very bad idea for reasons. Always declare functions in the top level. `So Nesting means call and include one component into another`**  
*We always put all teh assets in the public folder, because the module bundler(webpack) automatically get them from there. Like this ⤵ path for the image, the bundler will get the image from the public folder.*  

```js
function Pizza() {
  return (
    <div>
      <img src="pizzas/spinaci.jpg" alt="Pizza spinaci"></img>
      <h2>Pizza Spinaci</h2>
      <p>Tomato, mozarella, mushrooms, and onion</p>
    </div>
  );
}
```

**`Reusing This Component`**  
Now let's talk about the idea of reusing this component. For that we call this component several times from the App component. Just like this⤵

```js
function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Pizza />
      <Pizza />
      <Pizza />
    </div>
  );
}
```
