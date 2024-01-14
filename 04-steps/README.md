# `State, Event, and Form Interactive Component__Steps Component`

## `Table-of-Contents`

1. [Start_Build_Steps_Component](#start_build_steps_component)
2. [Handling_Events_The_REACT_Way](#handling_events_the_react_way)
3. [What_Is_State](#what_is_state)
4. [Creating_State_Variable_with_useState](#creating_state_variable_with_usestate)
5. [Do_Not_Set_State_Manually](#do_not_set_state_manually)
6. [The_Mechanics_Of_State](#the_mechanics_of_state)
7. [Adding_Another_Piece_of_state](#adding_another_piece_of_state)
8. [Updating_State_Based_on_Current_State](#updating_state_based_on_current_state)
9. [More_Thoughts_About_State__State_Guidelines](#more_thoughts_about_state__state_guidelines)
10. [Challenge_1](#challenge_1)

---

## `Start_Build_Steps_Component`

We usually use a component called **App** as a root component of our application, so basically a component that's the parent of all other components.
Here we are building the App component in other file called App.js and will export the App component and then from the index.js we'll import it.

The static part of the State Application. Analyze the code. All we implemented that we learned in previous section.

```js
const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

export default function App() {
  const step = 1;

  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`${step >= 3 ? 'active' : ''}`}>3</div>
      </div>

      <p className="message">
        Step{step}: {messages[step - 1]}
      </p>

      <div className="buttons">
        <button style={{ backgroundColor: '#7950f2', color: '#fff' }}>
          Previous
        </button>
        <button style={{ backgroundColor: '#7950f2', color: '#fff' }}>
          Next
        </button>
      </div>
    </div>
  );
}

```

---

## `Handling_Events_The_REACT_Way`

Handling events in REACT is actually pretty straightforward. Let's now learn how it done.

We are not going to use the addEventListener method here, because that's the imperative way of building UIs. But in REACT we use a more declarative approach so we do not manually select DOM elements and so we do not also not use addEventListener. Instead we use something similar to the HTML inline event listener.

Basically we'll directly listen for the event right on the element where they will happen. like on button we add **onClick= then a function**, here click is the event name with prefixed on. That function will executed whenever there's a click happening on the DOM element.

```js
<button
  style={{ backgroundCol'#7950f2', color: '#fff' }}
  onClick={() => alert('previous')}
>
  Previous
</button>
```

This is how we add event listeners. We'll simply add onClick property directly on elements. It could be any other event instead of click, like **onMouseEnter={function}**  We do not call a function here, but really specify a function.

Usually we do not directly define the event handler function in the onClick property but instead we create a separate function and then pass that function in here. So usually we create those event handler function right in the component.

Handler function start with handle pretty standard in REACT development, just for convention.

```js
function handlePrevious() {
  alert('Previous');
}

<button 
style={{ backgroundColor:'#7950f2', color: '#fff' }}
  onClick={handlePrevious}
>
```

---

## `What_Is_State`

By using EventHandler we want to make component interactive. And for that we need **state**. Without a doubt **state** is a most important concept in REACT, so everything revolves around the **state**. And so we'll keep learning about state thorough out the entire course. Therefor, let's start with an overview of what exactly we'll learn about **state** while going through this course.  

**What is state, what it does and Why we need it?**  
We have learned how to pass data into a component by using **props**, which is data that coming from outside the component. **But what if a component needs to actually hold it's own data and also hold it over time? Also what if we want if we actually want to make our app interactive changing the UI as a result of an action?** That's where finally **State** comes into play. **So,**

`State` is basically data that a component can hold over time, and we use it for information that the component needs to remember throughout it's lifecycle. There for we can think of **state as being memory of a component**.  
Example of state can be simple thing like a **notification count**, the **text content** of an input field, or the **active tab** in a tabbed component. It can also be a bit more complex data, for example the **content of a shopping cart**. Now what all these pieces of sate have in common is that in the application the user can easily change these values, for example, when they read a notification, the count will go down by one, or when they click on the tab then that tab will become active. And therefor each of these components needs to be able to hold this data over time, so over the lifecycle of the application. And for that reason, each of these pieces of information is a **piece of state**.

Just the term `state` itself is more of a general term. So a `piece of state` or `state variable` is just one single actual variable in the component that we can define in our code. And the term `state` is more about the entire state that the component is in. So general term state is all the pieces of state together.

**Updating component state triggers REACT to re-render the component.** So whenever we update a piece of state in a component this will make react rerender that component in the UI. And a component view is basically just the component visually rendered on the screen.

Up until this point we always using the generic term **UI**, but now we are talking about a single component, so we call that a **view**. And all the views combined together together then make up the final UI.

`State` is how REACT keeps the UI in sync with data. Change the state will change the UI.

`Summarizing:` **State** allows developers to do two important things.

1. It allow us to update the component's view by re-rendering the component.
2. It allows us to persist local variables between multiple renders and re-renders.

***So in fact it's the most powerful tool that we have in the world of REACT.***

---

## `Creating_State_Variable_with_useState`

In our application we want when we click on next and previous buttons, we want the step(a variable) to change. step is currently set to one, we want this step variable to be dynamic. And for that we need to add a new piece of **state** to our component.

In order to use new **state** in a component, we do it in three steps.

1. We **add a new state** variable.
2. We **use it in the code** and usually in JSX.
3. We **update the piece of state** in some event handler.

Let's start with first step, which is to actually create the state variable. We do so by using **useState** function. The argument that we need to specify here is the default value of the state variable. That's in our case step 1. **useState function will returned an array.** Let's check that.

```js
const arr = useState(1);
console.log(arr);
// IN console we've an Array with two values

// LOG  
Array(2)
0: 1
1: ƒ ()
length: 2
```

Yeah we have an array of two elements. At the **first index we have the default value** that we specified, and the **second one is a function that we can use to update our state variable.**  
So what we usually do is to then immediately destructure this array right there. We usually said the function, (set and then variable) setState, here we declared state variable. like this⤵

```js
const [step, setStep] = useState(1);

```

Now we have done first step here, also we used `state`, so this step variable in the JSX. And so now the third step is to actually update the state in an event handler.

```js
function handleNext() {
  if (step < 3) setStep(step + 1);
}
```

---

Great, working...

**Just a few more things about the creation of the state variable.**

1. This **useState function is what we called a `hook` in REACT**. We can identify hooks because **they start with use keyword**, *like useState(1);*, So all the REACT functions that start with **use** like useState, useEffect or useReducer are REACT hooks and we'll learn in detail what a REACT hook is a bit later.
2. But for now what we need to know is that **we can only call hooks like useState on the top level of the function.** Only directly inside of the components, not inside an if statement or inside another function or inside a loop. Here we cannot use hooks in any of these handler functions(handlePrevious/Next).
3. We should really only update state using that setter function, like here setStep function, not manually.

---

## `Do_Not_Set_State_Manually`

We should only update state using the setter function. Now we'll just see what happens when we try to update state manually. See in code, we have step state variable defined as a const variable. So first change it to let, then to change we put this in handler function. step = step + 1; This would be a perfectly normal way of updating variables in JavaScript. just like this.

```js
let [step, setStep] = useState(1); // changed to let


function handleNext() {
  // if (step < 3) setStep(step + 1);
  step++;
}
```

But here clicking on Next button nothing happening. We don't get any error from REACT but simply nothing happens.  
Reason for that is that REACT has no way of knowing that this(step++) is actually trying update the state. So REACT has no magic way of knowing that we are updating the state variable in handleNext handler. That's why REACT provided us the setter function, which is a functional way of updating the state value, but without mutating it, but now we're directly mutating step variable. But REACT is all about immutability. And so therefore we can only update the state using the tools that react gives us. So setter function is actually tied to state variable. ***NEVER DO THIS MISTAKE. ALWAYS USE CONST AND ALWAYS USE THE SETTER FUNCTION.***

Another way in which this could happen, which might be a little bit less obvious, is when we use an object or an array for state.

```js
const [test] = useState({ name: 'Muhammad' });

test.name = 'Ahmad';
```

Here we not even use the setter function, but changed the state variable. This works actually, So mutating an object like this did actually trigger a new rerender of the component view. However, mutating objects like this is really, really a **BAD PRACTICE**. That's because sometime in more complex situations, this actually won't work.

***Always treat state as immutable in REACT. So something that we cannot change directly, but we can only change using the tools that REACT gives us. So always use state setter function.***

---

## `The_Mechanics_Of_State`

Let's get a better understanding of how exactly state works in REACT. Let's start from a fundamental REACT principle that we have already discussed earlier. Remember, how we learnt that we do not manipulate the DOM directly when we want to update a component's view, As REACT is declarative, not imperative. And so we never touch the DOM in our code. But this leads us to the question of how do we update the component on the screen whenever some data changes or whenever we need to respond to some event like a click? Now, we already know that the answer to this question is state, but here we're trying o derive it from first principle. So to answer that question we need to understand another fundamental REACT principle, which is the fact that REACT updates a component view by re-rendering that entire component whenever the underlying data changes. So conceptually, we can imagine this as REACT removing the entire view and replacing it with a new one each time a re-render needs to happen [We'll learn exactly what happens later.]. Now react preserves the component state throughout re-renders. Even though a component can be rendered and re-rendered time and time again the stat will not be reset unless the component disappears from the UI entirely, which is what we call **unmounting**.  
Now speaking of state, it is when state is updated that a component is automatically re-rendered. Let's imagine that there is an eventHandler in the view, for-example on a button that the user can click. So the moment that button is clicked, we can update a piece of state in our component using the set function coming from the useState hook. Then when REACT sees that the state has been changed, it will automatically re-render the component which will result in an updated view of the component.

So the conclusion of all this is that whenever we want to update a component view, we update it's state. And REACT will then react to that update and do its thing. And in fact, this whole mechanism is so fundamental to REACT tht it's actually the reason **why REACT is called REACT**.  
So on a high lever, moving from the component level to the application level, **REACT reacts to state changes by re-rendering the UI.**

---

## `Adding_Another_Piece_of_state`

So to practice state a little bit more, let's now implement the open and close functionality for our component.  

```js
// First Step in the State
const [isOpen, setIsOpen] = useState(true);
```

What do we want to achieve with this state variable is whenever it's true, we want the entire component to show, and if it's false we don't want it to show. So what this means is that we need conditional rendering. For conditional rendering first we need to go inside a JavaScript mode, then we use && operator. Remember we couldn't go directly inside the JavaScript mode without using any HTML element, so first we need to wrap up into html element, we used div. With this we finished second step of using state.  
Now the third part of using state is to actually update the state. So for that we need our button in th top-right corner, so we need some more JSX.  
After that we need eventHandler, clicking on this button. This time we'll create a function inline, so directly with onClick attribute. so here what should be the isOpen state when clicking on it? well, it should always be the opposite of the current state, we do that by using the not operator. WORKING...  

```JSX
<button className="close" onClick={() => setIsOpen(!isOpen)}>
  &times;
</button>
```

---

### `Entire Code`

```js
import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  // const [test] = useState({ name: 'Muhammad' });

  function handlePrevious() {
    if (step > 1) setStep(step - 1);
  }

  function handleNext() {
    if (step < 3) setStep(step + 1);
    // test.name = 'Ahmad';
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>

          <p className="message">
            Step{step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

```

---

## `REACT_Developer_Tools`

Since tools are so helpful for developers, the REACT team built dev tools specific for REACT, which can be extremely helpful when working with state.  
[get-dev-tool](https://react.dev/learn/react-developer-tools)  

Once it's installed on chrome, In console we have additional two tabs, Components and Profiler which are coming from the REACT dev tools.

Let's talk about the **components tab**, So components basically as the name says, is for showing a component tree. right now we only have one component which is App component. If we had more, then all of them would be showing up down and we could see our entire component. From there we can take a look at all the state that is inside each component. also we have props, so all the props that the currently selected component receiving, here we're receiving no props. After that we have list of all the hooks, now we have two state hooks. We can manipulate the hooks values to experiment with them. It's very similar to what we can do with CSS values.

---

## `Updating_State_Based_on_Current_State`

It's very common that we update a **state** variable based on the current value of that **state**. And so let's now learn how to best do that. And in fact, we are updating **state** based on the current **state** all the time here, for example in setStep setter function we take the current step then add/sub one, also in setIsOpen **state** also by toggling the current value. This is what I mean with updating **state** based on the current **state**. The way we're doing it right now is working just fine. Now **what happen if we call the setter function twice in handleNext function?** like this.⤵ In theory it should be incremented twice with 2 calls. so by first click it should go from step1 to step3. let's check.

```js
function handleNext() {
  if (step < 3) {
    setStep(step + 1);
    setStep(step + 1);
    // test.name = 'Ahmad';
  }
}
```

It only updated the **state** once. We'll go into detail why exactly this happens, in coming sections. But for now remember that, we should not update **state** based on the current state like the way we have been doing. Instead what we should do is to pass in a callback function, so instead of value, we pass a function which will receive as the argument the current value of the state.

```js
function handlePrevious() {
  if (step > 1) setStep((s) => s - 1);
}

function handleNext() {
  if (step < 3) {
    // setStep(step + 1);
    // setStep(step + 1);
    setStep((s) => s + 1);
    setStep((s) => s + 1);
  }
}
```

Now if we run this again then it works, so it's updating the state twice.

When we're not setting state based on the current state, then of course we can just pass in the value as normal, so without a callback. So in many situations the previous version(without callback) works just fine.

---

## `More_Thoughts_About_State__State_Guidelines`

Now we want to talk about few more important thoughts or ideas about the **state** as well as some practical guidelines.

- **Each component really has and manages it's own state.** So, even if we render the same component multiple times on one page, each of these component instances will operate independently from all the other ones. So if we change the state in one of the components that won't affect the other components at all. So **state really is isolated inside of each component.**
- If we analyze everything that we just learned about state, we can come to the conclusion that, we can think of the entire application view, so **the entire UI as a function of state**. In other words, the entire UI is always a representation of all the current states in all components.
- Taking this idea even one step further, **a REACT application is fundamentally all about changing state over time and of course also correctly displaying that state at all times.** And this is really what the declarative approach to building user interfaces is all about. So instead of viewing UI as explicit DOM manipulation with state, we now view a UI as a reflection of data changing over time.
- We describe that reflection of data using state, event handlers and JSX.

### `Practical guidelines about State`

- **Use a state variable for any data that the component should keep track of over time.** This is data that will change at some point.  
The easy way of figuring this out is to think of variables that need to change at some point in future. In vanilla JS, that's a **let** variable or an **array** or **object**.  
Another way of figuring out when we need state is: Whenever we want something in the component to be **dynamic,** create a piece of state related to that thing and then update the state when the thing should change. **Example:** A model window can be open or closed. So we create a state variable isOpen that tracks whether the model is open or not. On isOpen = true, we display the window, on isOpen = false we hide it.
- So whenever we want to change the way a component looks like or the data that it displays, just update its state, which we usually do inside an **event handler** function.
- There is one common **mistake** that many beginners make, which is to use state for every single variable that we need in a component. But that's not really necessary. So do not use state for variables that shouldn't trigger a re-render. Because that will just cause unnecessary re-renders which can cause **performance issues**.

---

## `A_Vanilla_JS_Implementation`

[Vanilla-JS_Code_For_Step_APP](public/vanilla.html)

---

## `Challenge_1`

SEE CODE OF DATE ADDITION

[Code_Here](https://codesandbox.io/p/sandbox/states-event-challenge-1-5xk6vp?file=%2Fsrc%2FApp.js%3A56%2C37)

```js
import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  // Date Addition
  const date = new Date();
  date.setDate(date.getDate() + count);

  function minusStepHandler() {
    setStep((s) => {
      if (s <= 1) return s;
      else return s - 1;
    });
  }
  function plusStepHandler() {
    setStep((s) => {
      return s + 1;
    });
  }

  function plusCounterHandler() {
    setCount((c) => c + step);
  }
  function minusCounterHandler() {
    setCount((c) => c - step);
  }

  return (
    <>
      <div>
        <button onClick={minusStepHandler}>➖</button>
        <span>Step: {step}</span>
        <button onClick={plusStepHandler}>➕</button>
      </div>

      <div>
        <button onClick={minusCounterHandler}>➖</button>
        <span>Count: {count}</span>
        <button onClick={plusCounterHandler}>➕</button>
      </div>

      <p>
        <span>
          {count === 0
            ? "Today "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>
    </>
  );
}


```

---

***Second part of this SECTION will built our First Real World Interactive Application. let's do that in 05-travel-list folder***

[🔝 Top](#table-of-contents)

---
