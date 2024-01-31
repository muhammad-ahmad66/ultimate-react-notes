
# `Travel List Project`

## `Table-Of-Contents`

1. [Building_Project_Layout](#building_project_layout)
2. [Rendering_Items_list](#rendering_items_list)
3. [Building_Form_Handling_Submission](#building_form_handling_submission)
4. [ControlledElements](#controlledelements)
5. [State_VS_Props](#state_vs_props)
6. [Exercise_1-Building_Accordion](#exercise_1-building_accordion)
7. [Challenge_2](#challenge_2)
8. [Next_Section](#next_section)
9. [What_is_Thinking_in_REACT](#what_is_thinking_in_react)
10. [Fundamentals_of_State_Management](#fundamentals_of_state_management)
11. [Thinking_About_State_And_Lifting_State_Up](#thinking_about_state_and_lifting_state_up)
12. [Deleting_an_Item_Child_to_Parent_Communication](#deleting_an_item_child_to_parent_communication)
13. [Updating_Item_Complex_Immutable_data_Operation](#updating_item_complex_immutable_data_operation)
14. [Derived_State](#derived_state)
15. [Calculating_Statistics_As_Derived_State](#calculating_statistics_as_derived_state)
16. [Sorting_Items](#sorting_items)
17. [Clearing_the_List](#clearing_the_list)
18. [Moving_Components_into_Separate_Files](#moving_components_into_separate_files)
19. [Exercise_1-Accordion_V1](#exercise_1-accordion_v1)
20. [The_Children_Prop_Making_a_Reusable_Button](#the_children_prop_making_a_reusable_button)
21. [Exercise-2_Accordion_V2](#exercise-2_accordion_v2)
22. [Challenge_1-Tip_Calculator](#challenge_1-tip_calculator)

---

## `Building_Project_Layout`

`Breaking up the User Interface into a components`

![Project Components](project-components.JPG)

`Codes in index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```

In App.js file, as always we'll create an export App function as a root component. And then we'll have 4 big functions/components that are identified in above image.  
For now we are building all of these components in App.js file, but in real world we create a new file for each component.

[🔝 Back to Top](#table-of-contents)

---

## `Rendering_Items_list`

Rendering list is one of the most common tasks in REACT development. Let's now render a list of packing items.  
We have an array of few objects,each object describe one item to be packed. like this:

```js
const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
];
```

Remember to render a list we simple used map method on the array.

```js
function PackingList() {
  return (
    <ul className="list">
      {initialItems.map((item) => (
        <Item item={item} />
      ))}
    </ul>
  );
}
```

here we have lot of item, first the name of the component(Item), the name of the prop, and then the object itself, which remember is the argument of the callback function in each iteration on the map method.  
We also add some styles conditionally.

```js
const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Charger', quantity: 1, packed: false },
];

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.description}
        {item.quantity}
      </span>
      <button>❌</button>
    </li>
  );
}

```

[🔝 Back to Top](#table-of-contents)

---

## `Building_Form_Handling_Submission`

One of the most important things that we do on the web is to interact with web applications through forms. So forms are fundamental in web applications. Let's now start learning, how to work with forms in REACT.

When we build forms in REACT, we use the normal HTML form element. In form, we have a select element, input element and then a button.  
In select element, we have 20 option elements, so we do not manually duplicate options 20 times. Instead we'll create an array of 20 elements and loop over that array, and in each iteration we create a new option element. To create a new array in REACT, we will do is to go into JavaScript mode and then use **Array.from method**, in this method we pass length as an object as a first argument, that will then create an empty array with 20 elements. And then as a second argument we will pas a callback function, in that callback function we have access to current element and index, now we just return index + 1. So as a result we get an array of 1 to 20 values as an elements.

```js
<select>
  {Array.from({ length: 20 }, (_, i) => i + 1)}
</select>
```

Now on this **from method** we'll chain a **map method**, and loop over currently created array, and create a new list of option elements.

```js
<select>
    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
      <option value={num} key={num}>{num}</option>
        ))}
</select>
```

Remember: In each list item in REACT we need to pass a unique key, In this case that's the value(num) itself.

Let's now talk about events, What we want to happen here is when we click on add button we want this form to be submitted. We can then react to this form submission with an event handler. Just like before we will add the event handler inside the Form component. And we listen onSubmit event on the form element.

```js
// Form Component
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item" />
      <button>Add</button>
    </form>
  );
}
```

Now the question is **how do we actually ge the data from the form into the handleSubmit eventHandler?** There are multiple ways of doing this. we could get that data right from the event object(e). However in REACT we usually don't do this. Instead we use something called **controlled elements**, but that's a topic for whole new lecture.

[🔝 Back to Top](#table-of-contents)

---

## `ControlledElements`

Let's now learn about yet another fundamental REACT concept, which is **controlled elements**.

By default, input fields like input and select, they maintain their own state inside the DOM, so basically inside the HTML itself. Now this makes it hard to read their values and it als leaves this state right here int the DOM, which is not ideal. So in REACT, we usually like to keep all this state in just one central place, So inside the REACT application and not inside the DOM. And in order to do that we use a technique called controlled elements. With this technique it is REACT who controls and owns the state of these input fields and no longer the DOM.  
Since we want to now keep these data inside the application, what that means is that we need some **state**. Because that form data of course changes over time and we also want to maintain our application in sync with it.  
In order to implement the Controlled Elements technique, we follow to three steps.

1. We create a piece of state.

    ```js
    const [description, setDescription] = useState('');```

2. Use this state as a value of the input field, so the value of input filed.

    ```js
    <input type="text" placeholder="Item" value={description} />
    ```

3. Need to connect this state with the value that we actually going to type there in input field. So for that also on the same element(input element) we need to listen for the change event.

```js
<input
        type="text"
        placeholder="Item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
/>
```

Basically here⤴ whenever we type something in the input field, the change event is fired off and we can react to that event with the onChange event handler. event handlers always receive the event object, then on the event we read the target, which is basically the entire element.

Just do the same thing for select element

```js
const [quantity, setQuantity] = useState(1);
<select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
```

Here the value of the quantity is as a string, the reason for that is e.target.value is always gonna be a string. So before we place this value into the state let first convert into the number. We could use + operator before +e.target.value Or we can use Number function.

`Quick Recap`  
The technique of control elements basically consists of three steps. We **define a piece of state**, then we **use that piece of state** on the element that we want to control, and then finally we need to **update that state variable** and we do so with the onChange event.

Let's now go ahead and quickly use these values in handleSubmit handler function.

```js
function handleSubmit(e) {
    e.preventDefault();

    const newItem = { description, quantity, packed: false, id: Date.now() };

    console.log(newItem);
  }
```

Now we got that value, just to finish let's tweak our handle submit function a little bit, for example, when we submit the form without any item, then it still works, but the description is simply empty string, which is our default value of description in useState. However we don't want this to happen, so when there is no description, then we shouldn't even be able to submit the form. That is simple enough. We can add a guard clause in handleSubmit handler.  
Finally when we submit the form the input fields should go back to it's initial state, so empty state. For that we can simply use our setter functions.  

```js
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    setDescription('');
    setQuantity('');
  }
```

Now we have render this data into the UI. We may not use props because these(PackingList & Form) are siblings. The Form is not a parent component of the PackingList component, and therefore we cannot pass props from Form to the PackingList component. `Data only fow down the tree, but not up or side ways.` So need to find another solution. And so this is where we really need to start thinking more about state and state management. For this section we leave this project here, and in next section we will talk about `thinking in REACT`.

[🔝 Back to Top](#table-of-contents)

---

## `State_VS_Props`

A very common beginner question or sometimes even an interview question is this. **What's the difference between state and props?**  

- **State is an internal data**, owned by component. While **Props is an external data**, owned by parent component. We can think of props as a function parameters. So as a communication channel between parent and child components.
- Stats can be thought of as a components memory, because it can hold data over time(across multiple re-renders).
- State can be updated by the component itself, this will then cause the component to be rerendered by REACT. Therefore we use this mechanism of state to make components interactive. On the other side **props** works very differently, **they are read only**. They cannot modified by the component that is receiving them.
- However, **when the child component receives new updated props that will actually also cause the component to rerender**. So whenever a piece of state is passed as a props to the child component, then when that state updates, both components (component owning, and component receiving, the state) are rerendered.
- State is used by developers to make components interactive, Props are use to give the parent component, the ability to configure their child components.

[🔝 Back to Top](#table-of-contents)

---

## `Exercise_1-Building_Accordion`

It's not super hard to understand how state works in REACT, but it can actually be quite tricky to understand how exactly to use it in practice in different situations. But this is a number one skill that we need to have as a REACT developer, and that's way we'll do some practice here.

What we're gonna build is a Flash card project, where a flash card is basically a question on one side. and then when we click on it we get the answer on the other side. when we click on another card then the fist one is close and open clicked one, it's just like an accordion. Here all we need is one piece of state to control all of these cards. This piece of state will keep track of which question ID is currently the active question.

We have an array with all the questions as objects.

### `Style Code and Comments⤵`

```js
import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null); // null, because we want none of the qustion to opened in the beginning.

  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null); // condition for if click again, then it should close
  }

  return (
    <div className="flashcards">
      {questions.map((question) => (
        <div
          key={question.id}
          onClick={() => handleClick(question.id)} // remember here, don't do this directly: handleClick(question.id)
          className={question.id === selectedId ? "selected" : ""}
        >
          <p>
            {question.id === selectedId ? question.answer : question.question}
          </p>
        </div>
      ))}
    </div>
  );
}

```

[🔝 Back to Top](#table-of-contents)

---

## `Challenge_2`

In this challenge, we will upgrade the date counter, that we built before.

[CodeSandBox-Link](https://codesandbox.io/p/sandbox/Stats-event-challenge-1-forked-z7cqnw?file=%2Fsrc%2FApp.js%3A1%2C1-74%2C1)

**`Code`**  

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
  const date = new Date();
  date.setDate(date.getDate() + count);

  function plusCounterHandler() {
    setCount((c) => c + step);
  }
  function minusCounterHandler() {
    setCount((c) => c - step);
  }

  function handleReset() {
    setStep(1);
    setCount(0);
  }

  return (
    <>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={minusCounterHandler}>➖</button>
        {/* <span>Count: {count}</span> */}
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />

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

      {count !== 0 || step !== 1 ? (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : null}
    </>
  );
}

```

[🔝 Back to Top](#table-of-contents)

---

## `Next_Section`

### `Thinking in REACT State Management`

This section we'll cover

- Thinking in REACT
- State management
- When and where to create state
- Derived state
- Lifting up state

[🔝 Back to Top](#table-of-contents)

---

## `What_is_Thinking_in_REACT`

Let's start this section by discovering what thinking in REACT is actually all bout. As we noticed by now, building REACT application requires a completely new mindset because it's just very different applications with vanilla JavaScript. So to build REACT apps, we not only need to learn how to work with the REACT API in practice, with all the different functions like useState, but we also need to be able to think in REACT. We need to enter the REACT mindset. **What does thinking in REACT mean?**  
Thinking in REACT means that we have a very good metal of how and when to use all teh REACT tools like components, state, props, general data flow, effects and many more. It's also about always thinking in terms of state transitions rather than in element mutations.We can also view thinking in REACT as a whole process, which can help us to build apps in a more structured way.

- The first step in this process is to **break the desired UI into components** and establish how these components are related to one another. This also includes thinking about reusability and composability of components
- After that we can start by **building a static version of the application**. So without any state and interactivity. This is great because by doing this we do most of the coding up front before having to worry about state and interactivity.  
- In step three, where we **think about state**. Here we decide, When we need state, What types of state we need and where to place each piece of state.
- Finally, we think about establishing **how data flows through the application.** This includes thinking about one way data flow, child to parent communication and the way global state should be accessed.  
These lase 2 steps, what we collectively called **state management**, which is the main focus of this section.

SEE THEORY LECTURE PDF

[🔝 Back to Top](#table-of-contents)

---

## `Fundamentals_of_State_Management`

As state is the most important concept in REACT, Therefore, managing state is also the most important aspect when it comes to thinking in REACT. Let's now talk about fundamentals of state management in REACT.

As we already know we can use the use state function to create multiple pieces of state in order to track data that changes over the lifecycle of an application.  
State management can be defined in different ways by different peoples. But I like to think of ***state management as deciding when we need to create new pieces of state, what types of state we need, where to place each piece of state inside our code, and also how all the data should flow through the app.***

We use an analogy that State management is basically **giving each piece of state a home within our code.** Up until this point we never have to worry about the states, We simply placed each state in a component that needed it. `But` as an application grows, the need to find the right home for each piece of state starts to become really important. No matter if that home is the component where we first need the state, some parent component or even global state.

Let's analyze the difference between the big two types of state that exist in REACT. **Global state** and **Local state**. In RECT each piece of state is either local state or global state.

### `1. Local State`

- States that is only needed in one component or in a few different components like child or sibling components.
- We simply create a piece of local state using the useSate function inside a certain component, and that piece of state is then only accessible to that exact component and maybe to its child components, if we pass the state using props.

### `2. Global State`

- State that many components might need, therefore, when we define state as being global that piece os state will become accessible to every single component in the entire app.
- It's shared between all components and therefore we can also call this shared state.
- In practice we can define global state using **React Context API** or also an external global management library like **Redux**

**We should always start with local state.** Only move to global state if we really need it.

**How to decide when we actually need state and where we should place it?**  
It all starts with realizing that we need to store some data. When this happens, the first question to ask is, **will this data change at some point in time?** If the answer is no, then all we need to use regular variable, and probably a const variable. However if the data does need to change in the future, the next question **is it is possible to compute/calculate this new data from existing piece of state or props?** If that's the case, then we should derive the state, so calculated based on an already existing state or props. However most of the time we cannot derive state. In that case, we nee to ask whether updating the state should rerender the component. We have already learned that updating the state always rerender a component, but there is actually something called a red which persists data over time like regular state but does not rerender a component, it's basically a special type of state. Most of time we actually do want to state rerender the component. So in this case, create a new piece of state using the useState function and then place that new piece of state into the component that we are currently building. That's the always start with local state guideline that we talked about in the previous lecture. With tis we've completed **when to create state.**  

Let's now focus on **where to place each new piece of state?** If the state variable that we just created is only used by the current component, then simply leave it in that component. However, the state variable might also be necessary for a child component, and in that case, simply pass the state down into the child component by using props. If the sate variable is also necessary for one or a few sibling components, or even for a parent of the current component, it's time to move the state to the first common parent component. **In REACT this is what we call lifting state up**. Finally the state variable might be needed in even more than just a few siblings, so it might be necessary all over the place in teh component tree, here we use global state.

[🔝 Back to Top](#table-of-contents)

---

## `Thinking_About_State_And_Lifting_State_Up`

Now we're back to the **faraway application.** Let's add some important state to the application and then also lift that state up.

Before we start doing that, let's recap where we left off at the end of previous section. We made a form  with two input elements(input, select), and the state of these two elements is controller inside the form component with the description and quantity state. Then whenever that form submitted the submit event will fire off. And so then we are handling that submit event on form using onSubmit property with the handleSubmit function. Then if there is a description, we create a new item object, which right now we're just logging to the console. But now let's do something else. So we want to store this information(newItem object) somewhere. And to help us with that, we can actually use the flow chart that we just looked at in the previous lecture(see pdf file).  
The result of looking to the flowchart is that we need to create a new piece of state in the component that we are currently building, this is the answer to the when to create a new state variable. So let's create a new state variable in the Form called items.

```js
const [items, setItems] = useState([]);
// As the itemList is an array of objects, so we will give empty array as a default value.
// Because when a user open the app newly then there should be no items in the list.
```

Now let's actually use the set items function to add our new items to the items array.  
The new item array will be the current items array plus the new item added to the end. It means the new state depends on the current state, therefore here we need to pass in a callback function, instead of directly passing the newItem in setItems setter function. And also remember that in REACT we cannot mutate state, so we cannot use simply .push() method, because with that we would be mutating. **React is all about immutability.** The solution here is to create a brand new array which contains all the current items plus the new one, we simply use spread operator.

```js
 function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
```

Here our updating logic is working just fine. But this state is now nowhere being displayed in the UI yet. So we are not using this items variable anywhere in our JSX yet. And the reason for that is that actually we do not need these items in this current component. The only goal of the form component is to add new items to this array, but not to render it. Instead, remember that who renders these items is actually the PackingList component. But with this, we now created ourselves a problem. Right now our item state is here inside the form component, However, we need the item state variable in the PackingList component. And so now how do we get this state from the form to the packing list? We cannot pass it as a prop because the form is not a parent component of packing list, it's simply a sibling component. Instead we now need to use a technique that I mentioned before, which is to **lift up state**.  

What we're going to do now is to take this state(item state), and we'll move it to the closest common parent component, in this case it's the app component. And we pass items to the PackingList and Setter function to the form as a props.

`Analyze this code⤵`

```js
import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);
    setDescription('');
    setQuantity('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.description}
        {item.quantity}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>🎒 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}


```

We now have our handleAddItems function right here in the app, which is exactly where the piece of state also lives. So where we have the home of the items state. So all the logic about updating the items state is in the same component(App). However, it's the form that is actually responsible for creating new items. And therefor we need to give this form component access to a function that can update the state, that function is handleAddItems. As we discussed before we can pass anything as prop, including functions. So here in App Component we pass in handleAddItems as a prop and we call that prop onAddItems, which of course could be called any thing. And receives in the Form component and, we call that onAddItems function whenever the form is submitted.

***So whenever multiple sibling components need access to the same state, we move that piece up to the first common parent component.***

---

### `Reviewing_Lifting_Up_State`

We just created an important piece of state and lifted it up to a parent component that is common to both components that need to use or to update that state. However, this whole idea might still be a bit confusing because in fact, it can seem quite counterintuitive. let's now look at another example and some diagram to really understand how lifting up state works and why it's so important.

State lifting is something that we need to do all the time in REACT app. And remember that we need this pattern in the first place as a direct consequence of REACT's one way data flow.

We can call the technique of passing down a setter function, **child to parent communication** or also **inverse data flow**. Because usually data only flows down, but here we basically have a trick that allows us to have the data flowing up as well, as we passing data to a setter function from the child component.

[🔝 Back to Top](#table-of-contents)

---

## `Deleting_an_Item_Child_to_Parent_Communication`

We just learned what child to parent communication means, And so let's now do some more of it in order to delete items from our list. The idea is whenever we click on one of the cross next to item, then it will delete the item from the state and therefore from the user interface.  
Since this click is happening inside the Item component, but the state is lives inside of the App, so in the parent component and therefore this is another case of child to parent communication.  

Let's now create a new function called handleDeleteItem in the App component, where our state lives. In order to delete an item, we need to know which item it actually is the should be deleted. To do that we will pass in the ID whenever call this handler function. **To delete an item we will delete the item from the UI by updating the state.**

```js
function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
```

⤴ To delete an item from items array, we will use filter method, which will loop over the array, and in each iteration it will access to the items object. And here we will filter out the items that has id that received in function.  

Now all we need to do is to call this function, whenever the click happened on the cross❌ button. So do got access in the child, we have to pass the deleteItemHandler function as a prop into the PackingList.

```js
<PackingList items={items} onDeleteItem={handleDeleteItem} />
```

Now receive this prop inside the PackingList, and then pass to the Item component as a prop again, because the click will happen will there.

```js
<button onClick={onDeleteItem}>❌</button>
```

If we do just like this⤴, then it will not gonna work. Because we simply specify the function name and call it without any arguments, then REACT will call the function as the event happens, and it does so by passing in the event object, so it'll simply pass the event object. But we want here is id of the current item as an argument. So like this it will work:

```js
<button
  onClick={(e) => {
  onDeleteItem(item.id);
  }}>
```

[🔝 Back to Top](#table-of-contents)

---

## `Updating_Item_Complex_Immutable_data_Operation`

Let's take care of updating items by toggling their packed status. So we will create a checkbox before each item, and when a user clicks on that checkbox then it should marked as packed. So in li element we'll add a input with type checkbox.  

And we want also to transform this checkbox element into a controlled element. `Remember` a controlled element means that, the element has the value defined by some state, and also has an event handler which listens for the changes and updates the state accordingly. The value of this checkbox element will the *item.packed* which will be either true or false. And then we will listen to the onChange event.

```js
 function handleToggleItem(id) {
    setChecked((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
```

This ⤴ is how we update an array in REACT. Here we loop over the array using map method, and then each iteration we have an object of item, and we'll check for id of the currently check/unchecked element, if it is then we will modify that object's packed property, otherwise will return the same object. Remember here map method will create a new array of objects.

```js
// Passing as a props to PackingList component
<PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
```

```js

// Receiving in PackingList component and also passing to Ite component
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}
```

```js
// Finally, Receiving and using onToggleItem prop in Item component. 
// From here we're calling onToggleItem handler function.

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.description}
        {item.quantity}
      </span>
      <button
        onClick={(e) => {
          onDeleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

```

[🔝 Back to Top](#table-of-contents)

---

## `Derived_State`

Another aspect that we talked in the state management was derived state. **Derived state is state that is computed from some existing piece of state or from props.** if we create similar kind of state separately creates very difficult of keep data in sync, because same data is places in different states. It also creates a second problem, as it'll then rerender the component three times, which is absolutely unnecessary for same data. **So if one state is dependent on another, then we will simply derived a state from another.** Most of the time we cannot derive state, but whenever we have a situation where one state can be computed from any existing one, then we should not create a new state, but instead always prefer derived state.

[🔝 Back to Top](#table-of-contents)

---

## `Calculating_Statistics_As_Derived_State`

Let's now use the idea of derived state in practice. We want to calculate the statistics, so calculating the number of items on the list, how many we packed, and then percentage of that. Now, if we think about these numbers, for example, the number of items in the list, that number can be directly computed from the items array itself. And so derived state is perfect for this.

But before we use derived state we will discuss and take an example what we should not to do.

```js
// App component
const [items, setItems] = useState([]);
const numItems, setNumItems = useState(0) // Shouldn't do like this

// Now we also have to update this setNumItems function in each of the handler functions
// like in handleAddItem and handleDeleteIem. like this⤵
function handleAddItem(){
  setItem(items =>[...items, item] )
  setNumItems(num => num +1)
}

```

So instead of doing this we can define a new variable, and to assign a value we simply derive from items state, so we just calculate based on the items array. like this:

```js
const numItems = items.length;
```

This works because as soon as the items(state) are updated, the component will rerender. And when the component rerenders, that means that the App function is called again, and therefore this statement⤴ will run again, therefor the length  will be also updated.

But here this numItems variable, we actually don't need it right in the App component, but in the Stats component. So we have two options one. The first one is to keep num items in the App component and pass it as a prop into Stats. But what makes more sense is to actually calculate this derived Stats(numItems) into the Stats component itself. Because we will be calculating three values, if we calculate them in the App component then we will have to pass all that three values as a prop into Stats components.  
When a percentage is 100% then we would like to display an entirely different message, telling them they are done.  
And also in case where length of items is 0, so there is no items then also want to display something else, and even we don't need to calculate any of derived states. This is very good use case of earlier return, we could also say guard clause.

`This Lecture Code`

```js

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'You got everything! Ready to go ✈'
          : `🎒 You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

```

[🔝 Back to Top](#table-of-contents)

---

## `Sorting_Items`

Let's add a new feature to our application, which is to allow users to sort the items by three different criteria. Basically we'll build select button, from there a user can choose which of these criteria they want to sort the list by. Somethings that is very common in most web applications, let's now build very simple version of that.

We will add those buttons right in the PackingList component.

```js
// In the PackingList component
 <div className="actions">
        <select>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
```

Now let's see how we can actually implement this. First of all we need to know inside of App component, what is the currently selected option for sorting. So for that we will once again transform this select element into a controlled element. So for that we need our three step. 1. create a new state, so creating in PackingList component. 2. use that state variable in JSX. So we'll give sortBy as a value of select element. 3. Attach the onChange event handler to update the sortBy variable, by using setSortBy function.

```js
// First step
const [sortBy, setSortBy] = useState('input');

// Second and Third steps
<div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
```

Now all we left here to implement the logic to sort according to the selected option.  
**How do we get our application to display the items sorted by whatever criteria we selected?** Basically we'll just create a new items which is then sorted by that criteria. So we're not going to manipulate the original items array, that state should unchanged. So we will now use again derived state, because sorting one array can of course be computed based on that initial array.

so we create a new variable called sortedItems, and will store elements in this array conditionally. **If the sortBy variable is equal to 'input'** then we will fill sorted array as the elements are in items array, so no changes here, because it's default one.

```js
let sortedItems;

if (sortBy === 'input') sortedItems = items;
```

And now **if the sortBy variable is equal to 'description'** then, we use slice method on items array, this will create a copy of items array. This is important because sort method is a mutating method.

```js
if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
```

**Finally if sortBy is equal to 'packed'**, then ... As packed is boolean so we need to convert it to a number.

```js
if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

```

`Full Code of this lec`

```js
function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}
```

---

## `Clearing_the_List`

Let's now make our application feature complete by adding a button to clear up the entire list at once. And so to do that we all add new button after the select element.

```js
// In App component
function handleClearList() {
    setItems([]);
  }

// In PackingList component(get accessed using prop)
<button onClick={onClearList}>Clear list</button>
```

Now we will add when a user click on the clear button, first show the alert window, to prevent accidentally deleting everything.  That is pretty easy because that's just a standard DOM function, so that's the function that's not really part of JavaScript, but it's part of web API. we will use confirm function, in this function we can pass in any sting, that going to be the message that the user will see. When the use clicks on ok the variable will hold true, if the user clicks cancel it become false.

```js
  function handleClearList() {
    const confirmed = window.confirm('Are you sure you want to delete items?');
    
    if (confirmed) setItems([]);
  }
```

---

## `Moving_Components_into_Separate_Files`

Let's now split up App.js file into multiple component files. This will just be a very simple exercise of taking each components and placing them into their own file. Create a new file in src for each component and paste the code into it.  
Remember in JavaScript there are two types of exports 1. named (should import with exact same name) 2.default export(importing, the name may be anything.)  

Just select each component and right click, then click on refactor, to the new file. VS code will do automatically export and import.  
Taking it one step further we can ever put all components into a new folder called components.

With this we're finished this project.

---

## `Exercise_1-Accordion_V1`

```js
import { useState } from 'react';
import './index.css';

const faqs = [
  {
    title: 'Where are these chairs assembled?',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
  },
  {
    title: 'How long do I have to return my chair?',
    text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
  },
  {
    title: 'Do you ship to countries outside the EU?',
    text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          title={el.title}
          text={el.text}
          num={i + 1}
          key={el.title}
        />
      ))}
    </div>
  );
}

function AccordionItem({ num, title, text }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className={`item ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num}` : num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? '➖' : '➕'}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}


```

Here we see each of box has their own state, so when we click on any of the box, it opens or close. So we need to have a state in the AccordionItem component. Each of the items operates completely independently from the other ones. i-e if we can open multiple boxes at a time.

---

## `The_Children_Prop_Making_a_Reusable_Button`

It's time to learn about yet another fundamental concept that we use all the time in REACT development, and that's the **children prop**.  

To practice this we'll use Steps project, that we built in previous section. To see actual code go there.

The idea is that we want to create a reusable buttons for previous and next buttons. And we also want to add an emoji to these buttons as well.  

```js
function Button() {
  return (
    <button
      style={{ backgroundColor: '#7950f2', color: '#fff' }}
      onClick={handleNext}
    >
      Text
    </button>
  );
}
```

Now the idea is the we can pass in color, background color, clickHandler, and the text as a props.

***`This is our Reusable Button`***

```js
function Button({ textColor, bgColor, onClick, text, emoji }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
     <span>{emoji}</span> {text}
    </button>
  );
}
```

***`And here we are calling that Button`***

```js
<Button
  textColor="#fff"
  bgColor="#7950f2"
  text="Previous"
  onClick={handlePrevious}
  emoji='👈'
/>
```

Let's now say we also want to add an emoji, that's easy enough. All we have to do is pass as prop and accepts it in Button component. Added there⤴

That works nice. But now let's say we want the emoji on Pre button before the text as it's right now, and on Next button it should be after the text, here we have a problem. because our emojis are left side of the text on both buttons. We could add yet another prop to specify the direction, but here we've already so many props.  

**`Instead use the children prop`**, So instead of passing in **direction**, **emoji**, and **text**, what if we simply pass the content right into the button as well? In other words, **what if we could pass simply some JSX into the component and then the component could use that JSX and simply display it?**  
We can actually do that in REACT. Notice that! up until this point, all our components have always been self-closing. So we never had like this **<Button Props>Content</Button>**, But in fact, we can do exactly this. Just like we do in html elements where we have an opening tag, then some content, and then a closing tag.  

`These are out Buttons, That calling Button component`

```js
<Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevious}>
  <span>👈</span> Previous
</Button>

<Button textColor="#fff" bgColor="#7950f2" onClick={handleNext}>
  Next <span>👉</span>
</Button>
```

Now it's time to give the Button element access to whatever content we wrote in between the opening tag and the closing tag. So that's where finally the children prop comes into play. ***The children prop the prop that each REACT component automatically receives and teh value of the children prop is exactly what is between the opening and closing tags fo the component. We simply have to write children in the Component as a prop.*** And this is a predefined keyword inside REACT.

```js
// Reusable Button Component
function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

```

*And with this we just gained a brand new and really really important tool that is used all the time. It's actually is one of the most useful features. It allows us to make our components truly reusable.*

---

## `More_Reusability_with_the_children`

Let's now built another reusable component by leveraging the children prop once again. This time let's say we wanted a component do display a message. In that message we want to display, current step, and the different content for different steps.

```js
function StepMessage({ step, children }) {
  <p className="message">
    <h3>Step{step}</h3>
    {children}
  </p>;
}
```

Here we left an empty hole as a children, this empty hole can then be filled with whatever we pass in between opening and the closing tag of StepMessage component. Here the deference with button is that, in Button that whole was all the content of the button. but here  StepMessage we have always display h3 tag, with step itself and then children.

`Calling StepMessage`

```js
<StepMessage step={step}>{messages[step - 1]}</StepMessage>
```

---

## `Exercise-2_Accordion_V2`

V2
When we click on one of the items, then it will open, and then we we'll on another one then only that one stays open and all the other ones are closed. It means each Item has no longer controlled whether it's open or not, Instead it's now the accordion who knows which of the items are opened and then only that item basically is allowed be open.  

We create a new state variable in accordion component call curOpen, which holds the currently opened item number. Then we pass that number into AccordionItem component, from there it will calculate whether is currently open or not.

```js
import { useState } from 'react';
import './index.css';

const faqs = [
  {
    title: 'Where are these chairs assembled?',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
  },
  {
    title: 'How long do I have to return my chair?',
    text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
  },
  {
    title: 'Do you ship to countries outside the EU?',
    text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [curOpen, setIsOpen] = useState(null);

  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          title={el.title}
          num={i + 1}
          key={el.title}
          curOpen={curOpen}
          onOpen={setIsOpen}
        >
          {el.text}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ num, title, onOpen, curOpen, children }) {
  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num}` : num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? '➖' : '➕'}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

```

---

## `Challenge_1-Tip_Calculator`

We're going to build very simple tip calculator.

[See on CodeSandBox](https://codesandbox.io/p/sandbox/eloquent-brook-7qc8lw?file=%2Fsrc%2FApp.js%3A1%2C1-87%2C1)

### `CODE`

```js
import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  const tip = bill * ((percentage1 + percentage2) / 2 / 100);
  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the service?
      </SelectPercentage>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label htmlFor="bill">How much was the bill:</label>
      <input
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
        id="bill"
        type="text"
        placeholder="Bill value"
      />
    </div>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      <label htmlFor="">{children}</label>
      <select
        name=""
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely Amazing (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h3>
      You pay ${bill + tip} ({bill} + {tip} tips)
    </h3>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}

```

---

***`END OF SECTION`***  
***`31/01/2024`***

---
