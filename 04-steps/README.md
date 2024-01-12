# `State, Event, and Form Interactive Component__Steps Component`

## `Table of Contents`

1. [Start_Build_Steps_Component](#start_build_steps_component)
2. [Handling_Events_The_REACT_Way](#handling_events_the_react_way)
3. [What_Is_State](#what_is_state)

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
