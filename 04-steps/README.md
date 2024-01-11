# `State, Event, and Form Interactive Component__Steps Component`

## `Table of Contents`

1. [Start_Build_Steps_Component](#start_build_steps_component)

---

## Start_Build_Steps_Component

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
