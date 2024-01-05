
# Pure_React

We'll discuss how to write REACT code without any modern tooling and any built step. So right inside a regular HTML file.

To add react to our file we include the React library as a script.
Check out <https://react.dev/>

In pure REACT we cannot use JSX, returning from the react component, so we use React.createElement() function. And will pass the html element that we want to create.  

```js
function App() {
  return React.createElement("header");
}
```

Here we also have to tell React render to the page, so we will add to the DOM.

```js
const root = React.createRoot(document.getElementById('root')); 
// We created our root element. 
// All elements that we added will add to the root element, which in this case div with id root.

root.render(React.createElement(App));
// Here we render by creating a new element out of the App component.
```

Now the createElement doesn't always takes only name of the html element. But also so called props which in this case null. And as  a third argument the children of this element. Here we write just a string.

```js

return React.createElement("header", null, 'Hello React!');

```

```js
function App() {
  // Here we can add any logic.
  const time = new Date().toLocaleTimeString();

  return React.createElement("header", null, `Hello React! ${time}`);
}
```

As a last small thing lets update this element every second with the new time. So we use state. **Remember that State is necessary whenever we want to update something on the screen.**  

```js
function App() {
  // Here we can add any logic.
  // const time = new Date().toLocaleTimeString(); // No need any more

  const [time, setTime] = React.useState(new Dat().toLocaleTimeString());

  // To update in every second, we need something called an Effect.
  React.useEffect(function() {
    setInterval(function() {
      setTime(new Date().toLocaleTimeString());
    }, 1000)
  }, []);

  return React.createElement("header", null, `Hello React! ${time}`);
}
```
