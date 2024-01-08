# Pizza Menu

## Table of Contents

1. [Setting_A_Project_with_Create-React-App](#setting_a_project_with_create-react-app)
2. [Rendering_Root_Component_And_Strict_Mode](#rendering_root_component_and_strict_mode)
3. [Components](#components)
4. [Creating_And_Reusing_Component](#creating_and_reusing_component)
5. [What_Is_JSX](#what_is_jsx)
6. [Creating_More_Components](#creating_more_components)
7. [JavaScript_Logic_in_Components](#javascript_logic_in_components)
8. [Separation_Of_Concerns](#separation_of_concerns)
9. [Styling_REACT_Applications](#styling_react_applications)
10. [Passing_And_Receiving_Props](#passing_and_receiving_props)

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

*We always put all the assets in the public folder, because the module bundler(webpack) automatically get them from there. Like this ⤵ path for the image, the bundler will get the image from the public folder.*  

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

### `Reusing This Component`

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

---

## `What_Is_JSX`

What actually JSX is? And why is it such a big deal in REACT??
A component is a piece of UI which always contains it's own data, logic and appearance. If a component is a piece of the UI, it means that we must be able to describe exactly what that component looks like. And so that's where JSX comes into play.

**JSX is a declarative syntax that we use to describe what components look like and how they work based on their data and logic.**  
In practice Each component must **return a block of JSX**, which REACT use to render the component on the UI.

JSX looks like an HTML. In fact JSX is an extension of JavaScript which allows us to combine parts of HTML, CSS and JavaScript all into one block of code. Basically we can write HTML and embed some pieces of JavaScript where necessary, for example to reference some JavaScript variables, even we can reference other REACT components to nest and reuse multiple components.

**If REACT is a JavaScript Framework then how it understand HTML code??**  
REMEMBER that JSX is just an extension of JavaScript which means that there is a simple way of converting JSX to JavaScript. This is done by a tool called Babel, which included in our application by Create_REACT_App. This conversion is necessary because browsers do not understand JSX. BABEL will convert all the JSX code to many nested React.createElement() function, (to pure REACT), and these function calls will create the html elements on the page. So we could write REACT without JSX, using these createElement() function.  

***JSX is Declarative Syntax!! What that means???`***  

### `IMPERATIVE`

When we try to build UIs using vanilla JavaScript we will by default use an imperative approach. This means that we manually select elements, traverse the DOM and attach event handlers to elements. Then each time something happens in the app, like click, we give the browser a step-by-step instructions on how to mutate those DOM elements until we reach the desired updated UI. So in the imperative approach we basically tell the browser exactly how to do things. However doing these in a complex app is completely unfeasible. That's why Frameworks like React exists.  
**`Step-by-step DOM mutations until we reach the desired UI.`**

### `DECLARATIVE`

Declarative approach is to simply describe what the UI should look like at all times, always based on the current data that's in the component. And this data is props and state. **So we use JSX to describe the UI based on props and state.** The data that's currently in the component. All that happens without any DOM manipulation at all.  
REACT is huge abstraction away from the DOM, so we never have to touch the DOM. Instead we think of the UI as a reflection of the current data and let REACT automatically synchronize the UI with that data.

---

## `Creating_More_Components`

Let's create couple of more components to keep building our application.  
In our application we have three big parts: Header, Main-sec, and Footer. So, let's create one components for each of these three big parts.  
Just like in JavaScript we could write these components/functions as a function expression or arrow function.

```js
function Header() {
  return <h1>Fast React Pizza Co</h1>;
}

function Menu() {}

function Footer() {}
```

In Footer instead of immediately returning a JSX, return a createElement call. Just to see how bad it would be to write a components this way without JSX.  
In createElement first argument will be the element, then props and then child elements.

```js
function Footer(){
  return React.createElement('footer', null,"We're currently open" )
}
```

Now we'll do exact same thing with JSX, and we'll also add some JavaScript. Remember to go JavaScript mode we open curly brackets.

```js
function Footer() {
  return (
    <footer>{new Date().toLocaleTimeString()} We're currently open</footer>
  );

}
```

Finally in menu we'll add h2 element and then our Pizza component.

```js
function Menu() {
  return (
    <div>
      <h2>Our Menu</h2>
      <Pizza />
    </div>
  );
}
```

All of our three main parts are calling from App component. And Pizza is nested into Menu component. Like this we combine smaller components into bigger components.

`Now our APP's code looks like:`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return <h1>Fast React Pizza Co</h1>;
}

function Menu() {
  return (
    <div>
      <h2>Our Menu</h2>
      <Pizza />
    </div>
  );
}

function Footer() {
  return (
    <footer>{new Date().toLocaleTimeString()} We're currently open</footer>
  );
}

function Pizza() {
  return (
    <div>
      <img src="pizzas/spinaci.jpg" alt="Pizza spinaci"></img>
      <h2>Pizza Spinaci</h2>
      <p>Tomato, mozarella, mushrooms, and onion</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
root.render(
  <React.StrictMode>
    {' '}
    <App />
  </React.StrictMode>
);

```

---

## `JavaScript_Logic_in_Components`

Let's write some JavaScript logics in our React app, We already wrote some JavaScript in our app, but we always did it inside JSX. BUT components are just JavaScript functions we can of course do any Javascript in them, and that code will executed as soon as the function is called. So as soon as the component is initialized.

In our app we want to display an alert whether the restaurant is currently open or not. Let's say that the pizza shop opens at 12pm and open close at 10pm. So that 12 and 22.
  
```js
function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  // if (hour >= openHour && hour <= closeHour) {
  //   alert("We're currently open!");
  // } else {
  //   alert("Sorry We're closed!");
  // }

  return (
    <footer>{new Date().toLocaleTimeString()} We're currently open</footer>
  );
}
```

Here alert is showing two times, because `In Strict mode our components are usually rendered twice in REACT.`

---

## `Separation_Of_Concerns`

Until this point we have used to describe the appearance of some components and we have used some JavaScript inside of them. And so now we have a tiny bit of experience in writing components, We want to go back to the FACT that JSX combines HTML, CSS and JavaScript into one single block of code.  
**Why did REACT come up with this idea? Why not just keep HTML, CSS and JavaScript in separate places like we have always done before??**  
This approach is deeply relevant to understand why REACT was completely designed around components?  
Let's talk from the very beginning, so from the rise of interactive single page applications, Before single page apps, we always had one file for HTML, one for JavaScript and one for CSS. This is how we first learn web development. **However** as pages got more and more interactive, they become single page applications where the JavaScript started to determine the user interface and the content in general, OR in the other words, JavaScript became more and more in charge of the HTML. If the JavaScript is in charge of the HTML anywhere, so if the logic and the UI are so tightly coupled together then why should we keep them separated in these files and in different code blocks??  The answer to this question is what gave us REACT components and JSX. **So the fact that logic and UI are so tightly coupled together in modern web applications is really the reason why a `REACT` component contains the data, the logic and the appearance of one piece of the UI.** In fact it's the fundamental reason why  `REACT` is all about components. The same is also true for most other modern frameworks.  

REACT has just a different separation of concerns. In traditional way we separate files as per technology, like for HTML, CSS, and JS. But in REACT we separate files as per components with one piece of UI in our Application, like Menu, Filters, Player etc.

*SEE PDF File*  
*DATE: 07/01/2024  [11:49].*  

---

## `Styling_REACT_Applications`

At this point we know that REACT components can also contain CSS styles. So, let's now learn about some simple ways of applying CSS to REACT applications.  
In REACT we have many different ways of styling our components and REACT doesn't really care about how we do that. Because REACT is more likely a library then framework, so it doesn't really preferred way of how we should style our components. Therefor we can choose between many different options. We can use `Inline Styling`, `External CSS` or even `SASS Files`, we can use `CSS Modules`, `Styled Components` or even `Tailwind`.

For now we just want to use some Inline Styles.  
In HTML, we can actually style elements using the style attribute. However in JSX that's not how it works. **So in JSX we actually need to define inline styles using a JavaScript object.** So first we need to enter JavaScript mode. just like this: ⤵

```js
function Header() {
  return (
    <h1 style={{ color: 'red', fontSize: '36px' }}>
      Fast React Pizza Co
    </h1>
  );
}
```

This is most straightforward way to style components in JSX. Simply using the style attribute with an abject as a value. REMEMBER in HTML we use string as a value of style attribute BUT here it's an object. Also in JSX all the property names should be in camelCase notation. Also value of property in object always needs to be a string.

We can also create a variable which store all the styles in an object, and then use as inline style attribute. like this

```js
function Header() {
  const style = {
    color: 'red',
    fontSize: '48px',
    textTransform: 'uppercase',
    fontFamily: 'sans-serif',
  };

  return <h1 style={style}>Fast React Pizza Co</h1>;
}
```

This is the easiest way of styling However when the application gets just a little bit bigger, it can get out of hand and can be a lot of work to write our styles like this ⤴. *NOT RECOMMENDED IN REAL WORLD.*

Now one thing that we can do is to actually include an external CSS files just like we have been doing all the time in our applications. And so that is the easiest way, to style REACT applications, which is basically the same as style normally.  
In this case we're not really mixing the CSS concerns with the JavaScript and HTML concerns, that's of course not a problem. And also we will learn how to do that a little bit later using something called styled components.

Right now we have a CSS file with the name of index.css, which I wrote for this app. So now we need to add this class names to the JSX elements, so these styles then get applied.

First import that CSS File.

```js
import './index.css';
```

Now let's add the classes!!

**In JSX we cannot use class but instead className.** That's because class is already a reserved keyword in JavaScript.

```js
function Header() {

  return (
    <header className="header">
      <h1>Fast React Pizza Co</h1>
    </header>
  );
}
```

Now some styles implied to our application, we're getting these styles from the external CSS style sheet which remember, we simply import here in index.js file,  then Webpack will import the styles into our application.

`NOTICE:` That the styles that we included here are global styles, so they are not scoped to each particular component. Each component doesn't contain it's own styles, but simply uses the global styles, that are in index.css file. This works fine for small apps but we will also use something called styled components then we will have CSS that really only belong to one single component.

---

## Passing_And_Receiving_Props

It's time to introduce yet another fundamental REACT concept, which is **`props`**  
**Props is essentially how we pass data between components.** And in particular, from parent components to child components. So we can imagine props as being like a communication channel between a parent and a child component. So in practice, what we're going to do is to now customize each of these pizza components that we have. Right have we have all the pizza components with a same data, like same image and text-content. Now with props we'll be able to do that.

Now it's time to pass the data from the parent component which is `Menu` in this case to the child component which is `Pizza` component. We want to pass, image-path, title of pizza, and the ingredients.

**To define props we do it in two steps.**

1. We pass the props into the component.
2. We receive the props in the component where we passed the component into.

1. `FIRST STEP:`
    We Pass Just like if they are just a normal attributes.

    ```JS
    function Menu() {

    return (
    <main className="menu">
      <h2>Our Menu</h2>
      <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price="100"
      />
    </main>
     );
    }
    ```

2. `SECOND STEP:`
    Receive the props inside a child component so, inside a Pizza component.  
    The way we do that is to accept a props parameter in the Pizza component just like parameters.

    ```js
    function Pizza(props) {
    console.log(props);
    return (
      <div>
      </div>
      );
    }
    ```

    Here props is just an object with all the properties and values that we specified above, when calling Pizza component. Remember there we passed all the data with key-value pair.

    ```js
    function Menu() {
    return (
    <main className="menu">
      <h2>Our Menu</h2>
      <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price="100"
      />

      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mushrooms"
        price="12"
        photoName="pizzas/funghi.jpg"
      />
    </main>
    );
    }
    ```

    For first time we have reused c component with different data.  

    Here see price property: We pass price value also as a number. If we do some operations then it will not work finely, so we have to pass the price as a number. For that we'll enter in JavaScript mode and pass the price value just like this:

    ```jsx
    <Pizza 
    price = {10} // Not it's a Number
    />
    ```

    In fact we can pass in anything as a prop, It doesn't have to be a sting, or a number,  we can pass in arrays, objects, or ever other react components.

*`Props simply stands for property.`*

---
