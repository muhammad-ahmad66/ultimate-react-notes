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
11. [The_Rules_Of_JSX](#the_rules_of_jsx)
12. [Rendering_List](#rendering_list)
13. [Conditional_Rendering_With_And_Operator](#conditional_rendering_with_and_operator)
14. [Conditional_Rendering_With_Ternaries](#conditional_rendering_with_ternaries)
15. [Conditional_Rendering_With_Multiple_Returns](#conditional_rendering_with_multiple_returns)
16. [Extracting_JSX_Into_New_Component](#extracting_jsx_into_new_component)
17. [Destructuring_Props](#destructuring_props)
18. [REACT_Fragments](#react_fragments)
19. [Setting_Classes_And_Text_Conditionally](#setting_classes_and_text_conditionally)

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

## `Passing_And_Receiving_Props`

It's time to introduce yet another fundamental REACT concept, which is **`props`**  
**Props is essentially how we pass data between components.** And in particular, from parent components to child components. So we can imagine props as being like a communication channel between a parent and a child component. So in practice, what we're going to do is to now customize each of these pizza components that we have. Right have we have all the pizza components with a same data, like same image and text-content. Now with props we'll be able to do that.

Now it's time to pass the data from the parent component which is `Menu` in this case to the child component which is `Pizza` component. We want to pass, image-path, title of pizza, and the ingredients.

**To define props we do it in two steps.**

1. `FIRST STEP:`
    We pass the props into the component.  
    We Pass Just like if they are a normal attributes.

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
    We receive the props in the component where we passed the component into.  
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

    For first time we have reused a component with different data.  

    Here see price property: We pass price value also as a number. If we do some operations then it will not work finely, so we have to pass the price as a number. For that we'll enter in JavaScript mode and pass the price value just like this:

    ```jsx
    <Pizza 
    price = {10} // Not it's a Number
    />
    ```

    In fact we can pass in anything as a prop, It doesn't have to be a sting, or a number,  we can pass in arrays, objects, or ever other react components.

*`Props simply stands for property.`*

---

### `Props, Immutability, and One-way Data Flow`

As we just learned, we used props in REACT to pass data from parent components to children components. So essentially to pass information down the component tree. This means that we use props to communicate between parent and child components. Therefor props are an essential REACT tool to configure and also to customize components. So we can imagine props as settings that we can use to make a parent component control how its child should look like and how it should work. So in that regard, props are just like arguments passed to regular JavaScript functions. Also we can pass anything into a JavaScript functions. And the same is actually true for props. We can pass any type of value as a prop. -single value, arrays, objects, functions, even other components, which is a really powerful technique that we will explore a bit later.

**`Let's go dig a little bit deeper:`**  
Before we do that we need to first take a step back. At this point we've already learned about the components appearance and its logic, by writing both JSX and JavaScript logic inside components. REMEMBER that, REACT renders a components based on its' current data and that the UI will always be kept in sync with that data. But now it's time to get a bit more specific about **what that data actually is?**  
This data that REACT uses to render a component is made out of props and state. And actually there are even more types of data. But what matters for now are props and state. `STATE` is basically internal component data that can be updated by the component's logic, so by the component itself. WHILE props on the other hand, is data that is coming from the parent component, so from the outside, So it's the parent component who owns that data. And so therefor it cannot be modified by the child component. Instead props can only be updated by the parent component itself. And this bring us one of the few strict rules that REACT gives us, `which is that props are immutable.` So they cannot be changed by the child components, they are read only.  
If any point we feel we need to mutate props, actually what we need is state, because state is for data that changes over time as we will learn soon.

**Why props are immutable in REACT?**  
Props are just an object. Therefor if we change the object in our component we would also affect the parent component because that's just how objects work in JavaScript. So when we copy an object and mutate the copy, the original object will also be mutated. Now if we change an object that's located outside of the component function, that function has then created a so-called side effect. In general a side effect happens whenever we change some data that's located outside of the current function. REACT however is all about pure functions, so functions without side effects. So components have to be pure in terms of their props and state because this allows REACT to optimize application and it avoids some strange bugs that can appear when we manipulate external data. And in fact we can extend this idea of immutability to React development in general. So a component should never mutate any data that we write outside of its function scope.

**REACT uses a so-called one way data flow.** **What does that have to do with props?**  
In simple terms, one way data flow means that in REACT applications, data can only be passed from parent to child components, which happens by using props. So data can flow from parents to children, but never tha opposite way. Other frameworks such as Angular actually employ a two way data flow. There is a multiple reasons **why REACT uses a one way data flow??**

1. It makes applications way more predictable and way easier to understand for developers.
2. It makes applications way easier to debug.
3. Two way data binding is usually less efficient, so it's less performant to implement.

**What if we wanted to pass some data up to a parent component?**  
There is actually a very clever way to do that. Will talk about that in next section.

---

## `Challenge_#01`

[go-sandbox➡](https://codesandbox.io/p/sandbox/challenge-1-f6956f?file=%2Fsrc%2Findex.js%3A41%2C11)

---

## `The_Rules_Of_JSX`

Let's quickly check out the rules of how JSX works. There is some **`General rules`** and some rules about how **`JSX is different`** then HTML.

### `General Rules`

- JSX works essentially like HTML, but we can enter **JavaScript mode** by using {} from anywhere in the markup.
- **Into this JavaScript mode, we can place any JavaScript expression, so anything that produces** a value. We can reference variables, create arrays or objects, we can loop over arrays using the mep method or we can use operators like the ternary operator.
- BUT **what not allowed are statements.** So in JSX we can not use things like an if/else statement, for loops, a switch or any other statement.
- What's super important to understand is that **a piece of JSX produces a JavaScript expression.** In other words, a piece of JSX is just like any other JavaScript expression. We already learnt that JSX is simply converted to a **createElement** function call, which is in fact also an expression. Now this fact(JSX produces an expression) has two important implications.
    1. We can place other pieces of JSX inside the curly braces. So inside the JavaScript mode.
    2. We can write JSX anywhere inside a component. For example, we can assign a piece of JSX to a variable.

    ```js
    const el1 = document.createElement('h1', null, 'Hello REACT!');
    const el2 = <h1>Hello REACT!</h1>
    // Both are equal and right.
    ```

- A piece of JSX can only have one root element. So basically one parent element. If we need more than that, for example, to return two elements from a component, we can use something called a `REACT Fragment`, which we'll talk about later.

### `Differences Between JSX and regular HTML`

- **className** instead of class.
- **htmlFor** instead of HTML's for
- Every tag needs to **closed**. Example: <img /> or <br />
- All event handlers or other properties need to be **camelCased**.
- **Exception:** aria-\* and data-\* are written with dashes like in HTML.
- CSS inline styles are written like this: **{{<style>}}**
- CSS property names are also **camelCased**.
- Comments need to be in **{}** {because they are JS}

---

## `Rendering_List`

Rendering lists is one of the most common things that we do in basically all REACT applications. We'll probably do it like 100 times throughout this course. And so let's now learn how to render list in REACT.

**What do I mean by rendering lists?**  
Rendering list is when we have an array and we want to create one component for each element of the array. We usually have an array of objects. like here we have. Here each element of the array is one Pizza. So now we want to render this array elements.  
We want to take this array and for each of these Pizza objects we want to automatically create one pizza component in UI.  

The beauty of REACT is that for many things, all we need really is the JavaScript knowledge that we already have. For example, for rendering lists, there's nothing new about REACT that we need to learn, All we need is the map method.

```js
function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <div>
        {pizzaData.map((pizza) => (
          <Pizza name={pizza.name} photoName={pizza.photoName}/>
        ))}
        ;
      </div>
    </main>
  );
}
```

We could do just like this ⤴, Usually we do not like this, but we do is to pass in the entire object into the more specific component, that's Pizza in this case, and then inside of that component we would then take the information that we want out of the object. just like this ⤵

```js
// MAIN COMPONENT (PARENT)
function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <div>
        {pizzaData.map((pizza) => (
          <Pizza pizzaObj={pizza} />
        ))}
        ;
      </div>
    </main>
  );
}

// PIZZA COMPONENT (CHILD)
function Pizza(props) {
  console.log(props);
  return (
    <div className="pizza">
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name}></img>
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price + 3}</span>
      </div>
    </div>
  );
}
```

YEAH it's rendering. But NOTICE here in console we have an error. saying...**Each child in a list should have a unique "key" property.**

```error
react-jsx-dev-runtime.development.js:87 Warning: Each child in a list should have a unique "key" prop.

Check the render method of `Menu`. See https://reactjs.org/link/warning-keys for more information.
    at Pizza (http://localhost:3000/static/js/bundle.js:138:18)
    at Menu
    at div
    at App
```

Basically what this means is that each time we render a list like this with the map method, each of the items that gets rendered needs a unique key property. So, key is basically a prop that is internal to REACT, which it needs in order for some performance optimizations. So pass something here that's unique to each of the items. In this list we have a unique **name** for each item. So name of the pizza is unique in this array. so we use that.

```js
<ul>
  {pizzaData.map((pizza) => (
    <Pizza pizzaObj={pizza} key={pizza.name} />
  ))};
</ul>
```

### `Quick RECAP`

The goal was to render one pizza element for each of the object that are inside the pizza data array. And the way we do that in REACT is by simply using the map method on this array. **This map method wil create a new array, and in this new array in each position, there will be new pizza component. And into each of these pizza components we pass a a prop the current pizza object.**

---

## `Conditional_Rendering_With_And_Operator`

Another very important technique that we use all the time in REACT development is conditional rendering. So though out the couple of lectures we'll talk about three ways of rendering some JSX or even an entire component based on a conditions. STARTING WITH **AND OPERATOR.**  

We created a variable isOpen way back. Now we want to do is to basically only render something inside the footer if the restaurant is currently open. And so that's what conditional rendering is all about.  

**AND operator** works because of short circuiting. **If there is some truthy value before the AND operator && Then whatever comes after the AND operator will be returned.**

```js
function Footer() {
  const hour = new Date().getHours();
  const openHour = 0;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen && (
        <div className="order">
          <p>We're open until {closeHour}:00. Come visit us or order online</p>
          <button className="btn">Order</button>
        </div>
      )}
    </footer>
  );
}
```

`NOTICE:` Here⤴ first we are returning a JSX, and inside that we are entering in the JavaScript mode again, and from there we returning more JSX, which is perfectly fine. Because JSX is just a JavaScript expression.

Now let's check!, We only want to render the Entire Menu in case that we actually have some pizzas.  
`Remember empty array is a truthy value.` So we check for the length of the array. so if there is no pizza then length will be a zero, and indeed zero is a falsy value. so it will work.

```js
function Menu() {
  const pizzas = [];
  const numPizza = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {numPizza && (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
          ;
        </ul>
      )}
    </main>
  );
}
```

Working... But we get a zero (0) in UI. **Why is that?**  
That is because of short-circuiting again. So **when the AND operator short circuits it will simply not evaluate the second part but instead result of the operation will become the left side of && operator.** So as numPizzas, which is length of Pizzas array, is zero therefore that's what we get in the UI. That's not happened in previous example because, as isOpen stores boolean value, and `REACT` will not render true or false value, but it will happily render a zero.  

So as a conclusion, we should never ever have the left side of AND operator a number, We should always try to have true or false values. So we can do here is:

```js
{numPizzas > 0 && (
  <ul>...</ul>
)}
```

Because of this behavior many people say that we should never use the `AND-OPERATOR` to do conditional rendering. I don't really agree with that, because sometimes it's nice to very quickly do some conditional rendering with this. But I do prefer the `ternary operator` to do conditional rendering.

---

## `Conditional_Rendering_With_Ternaries`

Let's check out how we do the same thing with the ternary operator, Instead of the And && operator. In ternary operator we have three parts. **1.** Condition. **2.** If conditions true then operation on that case. **3.** Else branch, which is in this case just null.

```js
function Menu() {
  const pizzas = pizzaData;
  const numPizza = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {numPizza > 0 ? (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
          ;
        </ul>
      // ) : null}
      ) : <p>We're still working on our menu. Please come back later.</p>}
    </main>
  );
}
```

Now advantage of using the ternary operator is that we can display some alternative. so instead of null let's write some text.  

`REMEMBER:` As as rules of JSX inside the JavaScript mode from JSX we cannot write any JavaScripts. What we need to do is to write something that actually produces a value and if else statement doesn't produce a value.

---

## `Conditional_Rendering_With_Multiple_Returns`

The third way in which we can conditionally render some JSX or some component is by **using multiple returns**. Up until this point, all our components only ever had exactly one return keyword. But we can add more return keyword based on some condition. But of course each component still only return one block of JSX, but that return can depend on a condition.

In component before entering in to the JSX we can use any JavaScript code, like here⤵ we're using if statement... So here we have two return blocks, but these two returns cannot happen at the same time.

So,

```js
function Footer() {
  const hour = new Date().getHours();
  const openHour = 0;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  if (!isOpen) {
    return (
      <p>
        We're happy to welcome you between {openHour}:00 and {closeHour}:00.
      </p>
    );
  }

  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>We're open until {closeHour}:00. Come visit us or order online</p>
          <button className="btn">Order</button>
        </div>
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
}
```

Now the problem in this case⤴ is that we are now no longer rendering the footer element around the p tag. If we want to render in exact same way then we want to add footer also in if block. Otherwise the footer is only render if the restaurant is open. In this case we want footer so, we just leaving the ternary operator.

Usually the early return, like we did here is **more useful when we want to render entire components conditionally**. But not just pieces of JSX.

Remember for each Pizza we have a soldOut property, so if there a soldOut property to true, then we'll return early. With this the pizza that is sold out will not appear on the UI.

```js
function Pizza(props) {

  if (props.pizzaObj.soldOut) return null;

  return (
    <li className="pizza">
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name}></img>
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price + 3}</span>
      </div>
    </li>
  );
}
```

### `CONCLUSION ON CONDITIONAL RENDERING`

My recommendation is to use the ternary operator whenever we need to return some piece of JSX based on a condition. We can use if statements, so multiple returns, in cases when both block are entirely different or in any block we have null.

---

## `Extracting_JSX_Into_New_Component`

To practice the concept of components and using props just a little bit more. Let's extract the part of the footer into a new component. So the JSX inside a footer component is getting a little bit too long. So take the some of them into a new component. Props is quite similar to passing arguments into a functions.

```js
function Footer() {
  const hour = new Date().getHours();
  const openHour = 0;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  if (!isOpen) {
    return (
      <p>
        We're happy to welcome you between {openHour}:00 and {closeHour}:00.
      </p>
    );
  }

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
}

function Order(props) {
  return (
    <div className="order">
      <p>
        We're open until {props.closeHour}:00. Come visit us or order online
      </p>
      <button className="btn">Order</button>
    </div>
  );
}
```

---

## `Destructuring_Props`

Now we know what props are, let's make our lives a little bit easier when working with props in practice.  
Each time that we pass some props into a component, that component will then automatically receive object of props, which will contain all the props that we passed in. **Even in any component we haven't pass any props there always exits an empty props object.**

Here Instead of using props.propertyName again and again for every property, we **destructure** it and just use the property.

```js

// From Menu Component
<ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
          ;
        </ul>


// Pizza Component
function Pizza({ pizzaObj }) {
  if (pizzaObj.soldOut) return null;

  return (
    <li className="pizza">
      <img src={pizzaObj.photoName} alt={pizzaObj.name}></img>
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.price + 3}</span>
      </div>
    </li>
  );
}

```

`Remember:` In object destructuring the objectName should be exact same as the property. So here pizzaObj was inside the props.pizzaObj, So In destructuring we should always use pizzaObj.

Here By `destructuring` we have very better conventions that which props this component receiving. Before this we had the generic props for all props.

We can send multiple props and destructure them. **And if we try to destructure a property that doesn't exist, it simply undefined**.

---

## `REACT_Fragments`

Let's now learn what a REACt fragment and when exactly we might need one.

In menu we want a new paragraph. But only when there is a pizza in menu. So we put that after ternary if operator. But after putting that REACT start yelling at us, saying *JSX expression must have one parent element*. So this exactly what we discussed in **JSX_Rules** lecture. So **a piece of JSX can only have in fact one root element**. Before to solve this error, we just wrapped into a div. But here it's mess up our format. We do not want to render one element which contains these two(p & ul), but we really want to render these two elements in separate. So this is the case in which we need **REACT fragment.**

**REACT Fragment** basically let's us group some elements together without leaving any trace in the HTML tree, so in the DOM. For that all we need to do is to wrap the elements inside this⤵.

```js
<>
...
</>
```

Now sometime we need to add a key to a REACT fragment. For example when we're using it to render a list and so then we need to actually write it in a slightly different way.

```js
<REACT.Fragment key="anything"></REACT.Fragment>
```

---

## `Setting_Classes_And_Text_Conditionally`

