# `How React Works Behind the Scenes`

## `Table of Contents`

1. [Project Setup and Walkthrough](#project-setup-and-walkthrough)
2. [Components, Instances, and Elements](#components-instances-and-elements)
3. [Instances and Elements in Practice](#instances-and-elements-in-practice)
4. [How Rendering Works_Overview](#how-rendering-works_overview)

---

## `Project Setup and Walkthrough`

### `Starter Code For this Project`

```javascript
import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
```

---

## `Components Instances and Elements`

Let's start with the conceptual difference between React components, component instances and React elements. _This is a pretty common interview question._

**Components** are what we write in order to describe a piece of the user interface. It's just a regular JavaScript function, but it's a function that returns React elements. So it returns an element tree, and we usually write these elements using JSX syntax. A component is a generic description of the UI, So we can essentially think of a component as blueprint or a template. And out of this blueprint/template React creates one or multiple **component instances**. React does this each time we use the component somewhere in our code. If we create three instances of a component, then React will call the component three times. So,  
**Component Instances** is an actual physical manifestation/appearance of a component living in our component tree. While the **component** is itself is really just a function that we wrote before being called. **Each instance of a component holds it's own state and props and that also has its own lifecycle.** So component instance can be born, it can live for some time until it will eventually die.  
As React executes the code, in each of these instances, each of them will return one or more **React elements**. Behind the scenes the JSX get converted into multiple React.createElement function calls. Then, as React calls these createElement functions the result will be a **React element.** So, **React element is the result of component/function in our code. It simply a big immutable JavaScript object that react keeps in memory.** `What is this object actually?`  
A React element basically contains all the information that is necessary in order to create DOM elements for the current component instance. This React element will eventually be converted to actual DOM elements and then paint it onto the screen by the browser.  
**Based on all these, the DOM elements are the actual final visual representation of the component instances in the browser.** It's not React elements that are rendered to the DOM. React elements just live inside the React application and have nothing to do with the DOM. They are simply converted to DOM elements when they are painted on the screen at the end.

---

## `Instances and Elements in Practice`

Let's now shortly look at component instances and React elements in our code.
👉 We can actually look at the component instance simply by using the component and logging it to the console. **_console.log(<componentName/>)_**

```javascript
console.log(<DifferentContent />);
```

By running this we should see something in the console. So as soon as React sees this component calling, it will internally call the different content function and will then return the react element that we have in console. In console we also has **type: DifferentContent** because this is an instance of DifferentContent. Why we don't call the component directly, calling the function ourselves? like **_DifferentContent()_** We can do that also.

```javascript
console.log(DifferentContent());
```

By this⤴ we still got a react element. However, it's a very different one. This one has no longer has the type of DifferentContent. Instead it's a div so **type: div**, which is basically just the content of this component. So what this means is that right now React does not no longer see this as a component instance, and instead it just see the raw React element, which is really not what we want. So never do this. Because when we call directly, then React no longer sees as a component instance.

**_So, always call the component like this <componentName/>, not as function calling like componentName()_**

---

## `How Rendering Works_Overview`

It's time to finally learn about how exactly React renders our applications behind the scenes. We'll discuss in next three lectures.

### `Some Recaps from Previous Lectures`

As we build our application, what we're really doing is building a bunch of components. We then use these components to inside other components as many times as we want, which will cause React to create one or more instances of each component, which will holds their own states and props. And there each JSX will produce a bunch of react.createElement function calls, which internally will produce a react element for each component instance. And this react element will ultimately be transformed to DOM elements and displayed as a UI on the screen.

**Now let's talk about how these React elements actually end up in the DOM and displayed on the screen.**

In this lecture we're going to have a quick overview of each of the phases involved in displaying our components onto the screen. _This process that we're about to study is started by React each time that a new render is triggered. Most of the time by updating state somewhere in the application. So state changes trigger renders._ So the first phase is `Render is Triggered`.

`Render Phase:` In this phase React calls our component functions and figures out how it should be update the DOM, in order to reflect the latest state changes, however it does actually not update the DOM in this phase.  
**_In React rendering is not about updating the DOM or displaying elements on the screen. Rendering only happens internally inside of React and so it does not produce any visual changes._** _In all the previous sections I have always used the term rendering with the meaning of displaying elements on the screen because that was just easy to understand. However as we just learned, the rendering is really this phase(render phase) plus next phase(commit phase)._

`Commit Phase:` In this phase new elements might be placed in the DOM and already existing elements might get updated or deleted in order to correctly reflect the current state of the application. So, it's really this commit phase that's responsible for what we traditionally call rendering.

`Browser Paint:` Then finally the browser will notice that the DOM has been updated and so it repaints the screen. Now this has nothing to do with React anymore, but it's still worth mentioning that, it's this final phase that actually produces the visual changes that users see on their screen.

![How components are displayed on the screen](./how-components-display.jpeg)

---
