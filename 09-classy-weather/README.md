# `React Before Hooks Class-Based React`

## `Table of Contents`

1. [Section Overview](#section-overview)
2. [Our First Class Component](#our-first-class-component)
3. [Working with Event Handlers](#working-with-event-handlers)
4. [Class Components VS Function Components](#class-components-vs-function-components)
5. [Starting the Classy Weather App](#starting-the-classy-weather-app)
6. [Fetching Weather Data](#fetching-weather-data)
7. [Displaying the Weather](#displaying-the-weather)
8. [Remove Boilerplate Code with Class Fields](#remove-boilerplate-code-with-class-fields)
9. [Child to Parent Communication](#child-to-parent-communication)
10. [Lifecycle Methods](#lifecycle-methods)

---

## `Section Overview`

Welcome to the last and optional section of the intermediate react part of the course. This one is all about class based react. **So once upon a time, we used to write react components in quite a different way. Instead of using functions and hooks, we used classes and so called life cycle methods.**  
Now you will most likely never have to write a class component in your work or personal projects, but you will encounter them in older code bases and you might even need to convert class components to function components at some point.

---

## `Our First Class Component`

Let's start with our very first class component. So basically, **back in the day before 2019, in React we would write components not using functions but using JavaScript classes.**

So the class keyword, then the name of the componentName and then this class would actually be a child class of react.component. So extends and then react.component. And so therefore, we would have to also import react in every component file. So import React from React. Okay.

And then we should also export this component. Let's do that down here. Export default, Counter. Okay. And so this is how we would set up a brand new component using classes.

```js
import React from "react";

class Counter extends React.Component {}

export default Counter;
```

So, using ES6 classes, so modern JavaScript classes which extend the parent class of `React Component`. **And this parent class gives us a couple of methods and one of them is the render method.** So every single react component that is written with classes needs to include the render method. **So this render method is basically equivalent to the function body of a function component.** **So every single class component needs to have a render method which returns some JSX.**

So let's just do that here. And JSX, of course, works in the exact same way as in function components.

```javascript
class Counter extends React.Component {
  render() {
    return (
      <div>
        <button>-</button>
        <span>0</span>
        <button>+</button>
      </div>
    );
  }
}
```

So next up, let's actually **add some state to our component which works in a very different way than in function components.** **Because here, we cannot use the use state hook.** **So hooks are only for function components but not of course for class components.** That's the huge difference between the 2 actually.

**And so in a class component, if we want to add state to a component, we first need to call the `constructor method`.**

**So this one(constructor) is part of all ES6 classes and it receives props and it also calls the parent constructor as well by using the `super method` or the super function.** And it does so by passing in the props again.

So this is a lot of boilerplate that we have to write when we want to use class components. And so this is why basically all React developers now prefer functional components. So, again, this is a lot of work and super annoying to having to write all this boilerplate that really doesn't do anything, at least not anything super useful. Okay.

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>...</div>;
  }
}
```

**And now to initialize state, we do that also right in the constructor method. That's because this method(constructor) here is called each time a new object is instantiated from this class.**

But anyway, **here we are now defining basically a state property on the current object.** So the current component will get the state that we define here. **So that(state) has to be an object and then for each state variable that we want we need to create one property in this object**. So we want to count, as our first state and initial value of 1. And so this is yet another huge difference between functional and class components.

```js
 constructor(props) {
    super(props);

    this.state = {
      count: 0, // defining & initializing count state variable
    };
  }
```

So in class components, we only have 1 huge state object and not multiple state variables like we do with the useState hook. Now we can access that state(count) in our render method. So instead of the 0, let's actually access the state. **And the way we have to do this is again a little bit annoying.** **So we have to write `this.state.count`**

```js
<span>{this.state.count}</span>
```

So, **the `this` keyword here(in render method) will in this case simply point to the current component instance.** And so then from there we read the state and from there the count. And so in class components, you will see this kind of thing all the time. It's always gonna be this dot state dot something or this dot props dot something.

**_`CODE`_**

```javascript
import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 30,
    };
  }
  render() {
    return (
      <div>
        <button>-</button>
        <span>{this.state.count}</span>
        <button>+</button>
      </div>
    );
  }
}

export default Counter;
```

And so next, what we need to do is to then of course attach some event handlers to these buttons to then actually update the state. So let's do that in the next lecture.

---

## `Working with Event Handlers`

Let's now learn how we can work with event handlers and how we update state in class components.  
So just like before, basically here we want to use the onClick property in order to add an event handler to this button. But now, **where do we actually write that event handler?** Well, **remember how I said that this render method here is basically equivalent to the function body of a functional component or a function component.** So I use these 2 terms interchangeably so they're basically the same.  
But anyway, **since this is equivalent to basically the function body of the functional component, we might think that this is where we now define our event handlers.** So just like we do in functional components, right? **However, that's not what we do in class components.** So in class components this render method should be as clean as possible. **So it should contain as little render logic as possible.**

And so instead, **our handler functions are defined as class methods.** So let's define handleDecrement(), And so with this, we have a brand new class method. And so here, now we update the state.  
But before we do that. let me actually show you something that we need to do first. So let log the **this keyword** because the **this keyword** is necessary all the time. But now let's then connect this onClick prop with this handler function. And the way we do that is again using the **this keyword** and then handle decrement.

```js
handleDecrement() {
  console.log(this);
}

// in render method
<button onClick={this.handleDecrement}>-</button>;
// this keyword basically points to the current component instance which will inherit this method(handleDecrement) from the class definition.
```

In console we get `undefined` or in other words that the **this keyword** inside this handler here is undefined. However, we need the **this keyword** to point to the current component because that's how we will update the state. So we will update the state by doing `this.setState`. So we are going to need the **this keyword**. But again, it is currently undefined.  
**And the reason for that is simply the way in which JavaScript works.** **So when React calls our event handler, it first actually behind the scenes creates a copy of this function. And so then the function call is just a normal function call which is not bound to any object.** And so because of that this function then loses the binding to the current **this keyword**. Note that, **All event handlers that are called here inside the JSX will lose their binding to the **this keyword**.**

`And so we need to fix that by coming again to our constructor method and then we basically need to overwrite the method. So writing this.handleDecrement = this.handleDecrement and then we use the bind method to manually bind the **this keyword** to this function.`

```js
constructor(props) {
  super(props);
  this.state = {
    count: 30,
  };
  this.handleDecrement = this.handleDecrement.bind(this);
}
```

And so by doing this, we basically give this method access to the current component instance again. And so now if we click this minus button we see that we actually get access to this object. So we can see even the state, the props that it received and some other stuff. Now we have to update the state.

And so as I mentioned earlier, we do this(update state) by calling the setState method on the **this keyword**. And the way this setState method works is very similar to the state setter functions that we get back from a useState hook call.

So basically we can update state in 2 different ways. **We can just pass in the new state in setState method** or **we can update the state based on the current state.**  
So let's actually do the second 1. So by providing a callback function, which gets access to the entire current state object. So let's call that currentState and then let's actually explicitly return the new state object just so we know that this is what we need to do.

```js
handleDecrement() {
    this.setState((curState) => {
      return { count: curState.count - 1 };
    });
  }
```

So we need to return a new object where the count property is then updated. So we can get the current count from curState.count and then we just minus 1.

Let me just tell you the other way, the first way of updating the state. And so here we could also have passed in simply a value. So setting the count, for example, to 10 whenever we click here.

```js
handleDecrement() {
  this.setState({ count: 10 });
}
```

So we see that works as well. But of course, here we want to set state based on the current state.

_Alright. And by the way, notice how all the concepts behind react that we have been talking about before still apply to class components. So things like updating the state will rerender the UI and all things like that. So those fundamentals haven't changed. The only thing that's changing is that we write the component in a completely different way._

Okay, And so now let's, instead of just displaying the number here, display the date. So just like we did before in that date calculator. And so this kind of very simple render logic is actually allowed here in the render method.

So we just shouldn't define functions here like we do in our render logic in functional components but some simple logic like this is allowed. So we define our date. Let's just pass in a string here so that JavaScript can parse the date object out of it. So let's say we are in 2027 and then we want to set the date.

```javascript
render() {
    const date = new Date("August 28 2024");
    date.setDate(date.getDate() + this.state.count);

    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>
          {date.toDateString()} [{this.state.count}]
        </span>
        <button onClick={this.handlerIncrement}>+</button>
      </div>
    );
  }
```

Okay. And so with this we finish this short introduction to class components and are now ready to build the ClassyWeather application. But before we go do that, let's just quickly learn all the differences between class components and function components in the next video.

---

### `Quick Info`

REMEMBER: The **arrow function** will automatically binds **this keyword** to the instance of the class, without explicit binding in the constructor.

```js
handleDecrement = () => {
  console.log(this);
};
// Here no need to explicitly bind the this keyword to the instance from the constructor
```

---

### `Entire code till now`

```js
import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handlerIncrement = this.handlerIncrement.bind(this);
  }

  handleDecrement() {
    this.setState((curState) => {
      return { count: curState.count - 1 };
    });
    // this.setState({ count: 10 });
  }

  handlerIncrement() {
    this.setState((curState) => {
      return { count: curState.count + 1 };
    });
  }

  render() {
    const date = new Date("August 28 2024");
    date.setDate(date.getDate() + this.state.count);

    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>
          {date.toDateString()} [{this.state.count}]
        </span>
        <button onClick={this.handlerIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;
```

---

## `Class Components VS Function Components`

**Now before we really dive into class components, it's a good idea to get familiar with all the main differences between function components and class components.**

- Function components are the **current way of creating components in React** as they were introduced into React in 2019 with React version 16.8. Class components on the other hand have been around for a long time. So since version 0.13 back in 2015. Now, technically, React has always had function components but without hooks. So before 16.8, function components were very limited and not really useful because they couldn't even have their own state.
- In order to create a function component we just **use any type of JavaScript function no matter if a function declaration or an arrow function.** With class components, as the name says, we have to create an ES6 class that extends the provided `react.component` parent class.
- when we're using class components we're actually **using object oriented programming principles,** like having to use the this keyword to read incoming props and to define local component state, which can become a bit annoying over time. With function components on the other hand, these things are much easier. So to read props, all we have to do is to use the received props object and to define local state we can use the useState hook.
- But probably the biggest difference between these 2 types of components is how they handle side effects and the component lifecycle. **So in class components, we actually have special methods that were defined by react in order to run code at different points of the life cycle. And so these are called life cycle methods** and we will look at the most important ones throughout this section. Now with function components, **we care a lot more about synchronization rather than the component life cycle.** And we do so by using the useEffect hook. I mean, we know that this synchronization with useEffect still kind of translates into the component life cycle, but the focus is more on synchronizing the component with a side effect.
- And actually I think it's safe to say that **hooks in general are the big and the main difference between function and class components.** Hooks just introduced a completely new way of thinking and of writing React applications. So the day that hooks were introduced React development really changed forever. And if you ask me it actually changed for a lot better.

But anyway, **some smaller differences are** in event handlers and in a way in which we return the JSX from our components. So **in function components, we simply handle events with functions that we define inside the component function body.** While **in class components we have to create a new class method for every single event handler.**  
Now as for the JSX, **in function components we return our JSX from the function while in class components we need to return JSX from a special render method which is yet another react specific thing that you need to remember when you work with class components.**

So in general, function components with hooks have a lot of advantages over class components. They are easier to build because they require a lot less react specific boilerplate code and they produce much cleaner code. And the main reason for this cleaner code is that the useEffect hook combines all code related to the life cycle in 1 single place. While in class components, that code is usually spread across multiple lifecycle methods, which can become quite confusing in large components.

Now, 1 of the big reasons why hooks were introduced in the first place is that they make it much easier to share stateful logic simply by creating custom hooks.  
And finally, in function components we can get rid of the annoying and error prone **this keyword** which was especially hard to grasp for many beginners.

**The only advantage I would say that class components have is the fact that some people find it easier to understand the component life cycle because of life cycle methods with explicit names such as componentDidMount or componentWillUnmount.**

![Function Components VS Class Components](./ss/function-components-vs-class-components.jpeg)

---

## `Starting the Classy Weather App`

`Previously wrote codes⤴ are in Counter.js file.`

So let's start working on the ClassyWeather application.

```js
// App Component__just static
import React from "react";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input type="text" placeholder="Search for location..." />
          <button>Get Weather</button>
        </div>
      </div>
    );
  }
}

export default App;
```

And next up let's make this input field⤴ a controlled element. So an element where React controls and owns the state. And so this idea of controlled elements is exactly the same as before in function components. So many of the things that we learned previously still apply to class components.  
And so **this means that we now need to give this component state.** **And remember that we do that by calling the constructor method which is a method that is available on all JavaScript classes.** So this is not coming from React but this one is called with props so that we can then call the parent component. So that is react component by using the super keyword.

```js
constructor(props) {
    super(props);
    this.state = {
      location: "Islamabad",
      weatherData: null,
    };
  }
```

Okay. So this is really like a recipe that we need to follow and it's always the same. And so that's why we say that these class components have a lot more boilerplate code. So it's all of this stuff that doesn't really do much but which we still have to do in order to make this work.

**Now just like always, we use this state variable as a value of input field. But now that state lives in `this.state.location.`**  
Now all we have to do is to **then listen for the change event and update the state as the user types.** And so again, we get the current event and then here we set the state. **So in class components we do this by using `this.setState` and then we pass in the new object or at least the properties that have changed.**  
So location will be equal to `e.target.value`.

```javascript
<input
  type="text"
  placeholder="Search for location..."
  value={this.state.location}
  onChange={(e) => this.setState({ location: e.target.value })}
/>
```

And so if we reload this now, then that's working just fine. And we can see that also here in the dev tools. So you see that just like before we can see the entire state down. The only difference is that now it doesn't say hooks and it doesn't have here the numbers for the hooks of course as well.

**Notice that here in this event handler function(onChange)⤴, we didn't have to manually bind the this keyword like we did before. We only have to do that when we define the event handler as an outside method,** which is exactly what we will do next. So basically as an event handler for the event of clicking on the button.  
So let's do that and let's call it fetchWeather. And for now we will only just log **this keyword** to the console.

Let's just reload that. And now as we click the button, we get again that our **this keyword** is undefined. And that's going to be a problem because we will need the **this keyword** here to later set some state. And so just like we did in our counter we need to now explicitly bind the **this keyword** to this method.

So we say this dot weather is equal to this dot fetchWeather and then we explicitly bind the this keyword to this method. So basically giving it access to the current component instance so that then we can set the state on there.

```js
// In constructor
this.fetchWeather = this.fetchWeather.bind(this);

// Handler function
fetchWeather() {
  console.log("Loading data...");
  console.log(this);
}

// Render function
<button onClick={this.fetchWeather}>Get Weather</button>
```

---

## `Fetching Weather Data`

So now it's time to fetch the weather data according to the user's input location. And to do that, I actually already prepared much of the code. So that's right here in starter.js. So let's copy all of this and close that and then just paste it before our actual App component.

So here we have basically a function that will get these weather icons.

```js
function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}
```

Then we also have this function that converts a country code to an emoji just to make this look a little bit nicer.

```js
function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
```

And then we have a function for formatting a day. So that one will be responsible to showing the weekday in the result.

```js
function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}
```

But what we're interested in is this get weather location.

```js
async fetchWeather() {
  try {
    // 1) Getting location (geocoding)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
    );
    const geoData = await geoRes.json();
    console.log(geoData);

    if (!geoData.results) throw new Error("Location not found");

    const { latitude, longitude, timezone, name, country_code } =
      geoData.results.at(0);
    console.log(`${name} ${convertToFlag(country_code)}`);

    // 2) Getting actual weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );
    const weatherData = await weatherRes.json();
    console.log(weatherData.daily);
  } catch (err) {
    console.err(err);
  }
}
```

And in fact, all this⤴ we need is to grab this code. So just to try catch and cut it from here and then this function itself we actually don't need it. So just grab that code there from try/catch blocks then get rid of this temporary code and paste that there in fetchWeather method.

Okay. Let's just quickly go through what this code here does in fetchWeather function. So we have this API here at open-meteo.com <https://open-meteo.com/en/docs>. It's basically just a free weather API.  
So if you want you can check out the documentation here but that's not necessary here right now. To use this API we first need to basically geocode or location into a latitude, longitude, a country and so on. So first we do a fetch request to this endpoint right their in geoRes variable with our location string which will then return basically all the information about that location. And so then here we are for now simply logging that to the console. So the name of the location that came back and then converting the country to an emoji flag.

And then once we have that information we plug that here into this URL endpoint(weatherRes). So the latitude, longitude and time zone are things that this endpoint(weatherRes) needs. And so that's why first we need to convert our location to basically this information. And so then we get the data here and again for now just log it to the console.

So let's just reload. Let's click here and so you see that it's actually working. So let's see what we have here. So first we have the geoData and so then in the results we have basically different possible results where we then take the first one. So we take geoData.results and the first one and from there we get all this information that we need. Okay. Then we display the name that came back together with the emoji, and finally we have the weather data. So that's weather data dot daily. And so here we have all the information that we will need to then later display the weather.

**_`Analyze the code`_**

---

Okay. Now 1 thing that I want to start by doing here is to create an is loading state. So just like we have been doing before, we want to indicate the user that we are currently loading. And so let's add a new piece of state.  
And as I said previously, here we now do not create multiple state variables, but instead we add them all to the same object.

```js
this.state = {
  location: "Islamabad",
  isLoading: false,
};
```

And then here in the beginning of the try block we simply do `this.setState`. **And so now here comes a very important part.** So in this object that we pass to set state we only need to specify the actual properties that we want to change. So here we just need to write isLoading set to false and that will then not override the location. So it will really only update this is loading property. **And this is important to mention because with the useState hook, if we updated the state that is an object we could not do this.** We would first have to destructure the current state and then we would mutate any property.  
And at the end let's add a finally block here which will run no matter if the code here threw an error or not, and there set the isLoading state to false.

And then down here in or render output, let's do some conditional rendering. So, this dot state dot is loading.

```js
{this.state.isLoading && <p className="loader">Loader...</p>}
```

And now next up, we also want to get the city and of course the weather onto the user interface which means that we need 2 new pieces of state. And by the way we need to get also the location into the UI even though we already have it here in input field as a value, because sometimes it's actually different. So for example, if we search for LONDON, so if we just type LON then our API will automatically assume that it is LONDON. So here we then want to display that the weather is indeed coming from London, not just from LON.  

So let's call displayLocation and it starts as an empty string and then also the weather and initialize this onw as an empty object because it will later also become an object. Alright.

```js
this.state = {
  location: "Islamabad",
  isLoading: false,
  displayLocation: "",
  weather: {},
};
```

And so let's now do this dot setState and then display location.

```js
this.setState({
  displayLocation: `${name} ${convertToFlag(country_code)}`,
});
```

And the same thing for the weather. So here, this dot setState, and object and then weather.

```js
this.setState({ weather: weatherData.daily });
```

### `CODE`

```JS
import React from "react";

// STARTER FILE START

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

class App extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      location: "Islamabad",
      isLoading: false,
      displayLocation: "",
      weather: {},
    };

    this.fetchWeather = this.fetchWeather.bind(this);
  }

  async fetchWeather() {
    try {
      this.setState({ isLoading: true });

      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);

      // console.log(`${name} ${convertToFlag(country_code)}`);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      // console.log(weatherData.daily);
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.err(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            placeholder="Search for location..."
            value={this.state.location}
            onChange={(e) => this.setState({ location: e.target.value })}
          />
        </div>
        <button onClick={this.fetchWeather}>Get Weather</button>

        {this.state.isLoading && <p className="loader">Loader...</p>}
      </div>
    );
  }
}

export default App;

```

---

## `Displaying the Weather`

Next up, let's actually render the received weather data. And for that, let's create a brand new component. And w will actually do that again here in the same file after the App component. let's call this one here Weather, and so it again extends react dot component. And as usually, we start out with the render method which again is called each time that the component is rendered.

```js
class Weather extends React.Component {
  render() {
    return (
      <div>
        <h2>Weather</h2>
      </div>
    );
  }
}
```

And now, of course, we need to include this component in our JSX in App component. So let's do that conditionally. So only when there actually is some weather data then we want to display the weather component.

So let's say this dot state dot weather, but this is not enough actually because by default this is also an object. Right? And so we actually need to read some property from this. So let's this dot state dot weather dot weathercode exists, So this is an array, this can only exist if the weather does exist. And so if that's the case then let's render the Weather component.  
And as a prop, let's actually pass in the weather that we want to render and then also the location.

```js
{this.state.weather.weathercode && (
  <Weather
    weather={this.state.weather}
    location={this.state.displayLocation}
  />
)}
```

So we're passing in weather and location, and so then we can receive these in Weather component as props. But more about that later, for now let's see if our component actually gets rendered as soon as the data arrives. And, yeah, so in our component tree now we also have the weather. Okay, and so now let's take those props.

**And in class components there's actually no easy way of destructuring all the received props.** So we can only do that in each method separately.  
**But first of all, let's actually see how we receive props in a component like this.** **And so let's log to the console `this.props`.** `console.log(this.props);` And so if we click here now then we should get, yeah, here it is. So here is the props object which contains the weather and the location.  

And now let's actually take all this data here out of the weather. So let's destructure the props which again we have to do it manually inside of each method. So we cannot do that centrally like we do in function components.

So props.weather, and so now let's take out all these things there. So temperature_2m_max, and let's also rename this to max. So this is basically just the maximum temperature. Okay. Let's copy that.

We also have the min which we will just call min. Let's take also the time and let's call this dates and then let's also take the weathercode and call this one codes. So codes because it is multiple codes, not just one.

So these are basically 4 arrays. And so in order to render those we need to of course loop over the arrays and then for each of them render 1 of these components right in UI. So that's going to be another component. Okay. And before we do that let's also quickly include the location here in the h2.

```js
render() {
console.log(this.props);
const {
  temperature_2m_max: max,
  temperature_2m_min: min,
  time: dates,
  weathercode: codes,
} = this.props.weather;

return (
  <div>
    <h2>Weather {this.props.location}</h2>
  </div>
);
}
```

And then let's finally do what I just said which is to loop over these arrays.

So let's create this list(ul) with the prop name and with the className of weather and then we will just loop over 1 of these arrays as always. So in this case since all of these 4 are actually arrays and we will need to pass the data for each of them into the new component, it doesn't really matter over which one we loop. So let's just choose the dates. And in here we will create a day component. And for now I will not pass anything in and so instead I will just create that component first.

```js
<ul className="weather">
  {dates.map((date) => (
    <Day />
  ))}
</ul>
```

So class day extends react dot component. And then our render method. And then in there return one list item(li) which will now just says day. And so let's check that.

```js
class Day extends React.Component {
  render() {
    return <li>Day</li>;
  }
}

```

And there we go. So we have 1 day component for each of the days.  
And so now let's pass in all the data that we need. So basically we need the current maximum temperature, the minimum, the date and the weather code for each particular day.  
So let's start with the date which is just the current date, then the max temperature, so the max array and then take the element at the current position. So here we also need to receive the current index and so then use that index here. Now the same thing with the minimum temperature. And, also, for the code. And finally, React also needs the key as always. And so here we can actually use the date itself which is going to be a unique string.

```js
<ul className="weather">
  {dates.map((date, i) => (
    <Day
      date={date}
      max={max.at(i)}
      min={min.at(i)}
      code={codes.at(i)}
      key={date}
    />
  ))}
</ul>
```

Let's again start by destructuring our props in Day component. So date, max, min, code is equals to this dot props.  
And now it's time to actually use that data to render the weather. So let's create a paragraph first with the date and then the minimum and the maximum temperatures. So let's use the HTML entity for degrees then a dash, so another HTML entity and then the max temperature. Okay.

And also we want the weather code now and for that we will create a span and you will see why that is in a minute. So let's just try this again, so we can see what changes we need to do next. And so here we are. So this is our temperature here which we should probably a round. Then we want to format these dates and we want to transform these strange looking weather codes here into something meaningful. And so that's where we have all those functions for that we included in the beginning.

Let's continue now with the code and the date. So for that we have the getWeatherIcon function which just takes in the code. So a code like this it will then return the corresponding emoji and we have the formatDay function. So let's now use both of them.

For first weather here that is basically today, I want to display actually today instead of current day. And so now we need to pass in another prop here into the day component which tells us whether this is actually the current day or not. So let's say, isToday. And then if it is today, it simply means that the index is equal to 0. So basically that it's the very first day component that will be rendered.  `isToday={i === 0}`

**`CODE`**

```JS
class Weather extends React.Component {
  render() {
    console.log(this.props);
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = this.props.weather;

    return (
      <div>
        <h2>Weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <Day
              date={date}
              max={max.at(i)}
              min={min.at(i)}
              code={codes.at(i)}
              key={date}
              isToday={i === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    const { date, max, min, code, isToday } = this.props;

    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p> {isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      </li>
    );
  }
}
```

**`Quick Recap`**

So we did a lot of things here in this lecture. Let's just quickly recap even though it wasn't really complicated stuff. So we just created weather component and included it here in case that there is some weather data. So basically in case that this property here exists on the weather. So we pass in weather and location and then here we destructure at least the weather right inside the render method. And if we had more methods that also needed access to these props then we would have to destructure them again in there.

**Now also notice that this component(Weather) here and also the day component, they both don't have the constructor method, right?** And so the reason for that is that when we don't need to initialize state and we don't need to explicitly bind to this keyword to some event handler methods then we actually don't even need to implement the constructor in the component in question. And so that's why these 2 actually don't have it. But anyway, here then we do pretty standard stuff. So we just loop over the dates array so that we can render one day component for each of the dates.

---

## `Remove Boilerplate Code with Class Fields`

Let's now remove some of the boilerplate code that we have been writing using the modern JavaScript class fields feature. But before we do that, let's quickly duplicate our file again and rename the copied one to App-v1.

**In JavaScript with class fields we can basically declare properties directly on a component instance right in the class definition, so outside of any method.**

So basically what we can do is taking the state object from constructor and paste it in top-level of class. And notice that here we do not need any **this keyword** because this will basically simply be placed on the component instance. And **since the this keyword is also the component instance, so that's really not needed anymore.** So we just basically take everything that we want to declare on a class instance and place that outside. That's a JavaScript feature not a React feature.

```js
class App extends React.Component {
  state = {
    location: "Islamabad",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  constructor(props) {
    super(props);
    // Cut from here and paste into ⤴
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  async fetchWeather() {...}
}
```

So it's doing the exact same thing as before. So that's already a huge win but we can do even better because **we can also define methods as class fields as well.** So instead of writing a method in the traditional way we can instead do a function expression. so a function that assign to a variable. **And the great thing about this is that we can now use an arrow function. And the great advantage of that is that arrow functions do not lose their binding to the this keyword.** **So arrow functions don't have their own this keyword and instead they get access to the surrounding one.** Therefore we no longer need to worry about binding of **this keyword** manually.

```js

constructor(props) {
  //   super(props);
    // this.fetchWeather = this.fetchWeather.bind(this); 
  // } // No longer needed this whole constructor

  // async fetchWeather() { // Deleted
  fetchWeather = async () => { ... }
}
```

So ESLint even tells us that this is now a the constructor function is useless constructor. So with this we got rid of all the boilerplate code that we had, and the biggest win by far is that we no longer need to manually bind the this keyword to our event handler methods. So now these methods are basically defined as a normal variable and so then using the async function that problem that we had with the this keyword simply disappears.

Now this function(fetchWeather()) here is really huge but unfortunately for us with class components there's no easy way of extracting it into somewhere else. So we cannot just remove this function from here like we could do with custom hooks in function components.

So if we have a lot of long methods like this then our components can get really annoyingly long. But again there's not really a way around this. But I still wanted to mention this here just so you could see another great advantage of functional components

---

## `Child to Parent Communication`

Let me now show you a quick example of child to parent communication which is a very important thing in react development and it works basically exactly the same in class based React.  
So what I want to do now is to quickly extract the input tag into its own component.let's create a new class, so a new component just called Input. And then the render method from which we simply return that input element.

But of course, then we get some errors because this input filed depends on some state and on updating state which is not living anymore in this current component(Input component). So the location state needs to stay in the app component because we need it in this fetch weather event handler.

**So we need to do what we always do which is to pass in these things as props.** So that's at this.state.location. And then here in Input component we receive that as props. So now it's no longer `this.state.location` but `this.props.location`. And so if I give it a safe now, then we are back to working here.

However, the state will, of course, still not update because the state again still lives in that other component, so in the App component. **And so this is where child to parent communication comes into play again.** So remember that that basically means that a child component needs to update the state in a parent component. **And the way we do that is to simply pass down the state updating function into the child component.** So we need to handle that event in App component and pass down as a prop.

So let's grab that and actually let's create a brand new event handler function. So just like we did in the previous lecture as a class field. So let's call this one setLocation.

```javascript

class App extends React.Component {

  ...

  setLocation = (e) => this.setState({ location: e.target.value });

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>

        <Input
          location={this.state.location}
          onChangeLocation={this.setLocation}
        />

        <button onClick={this.fetchWeather}>Get Weather</button>

        {this.state.isLoading && <p className="loader">Loader...</p>}

        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;

class Input extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search for location..."
          value={this.props.location}
          onChange={this.props.onChangeLocation}
        />
      </div>
    );
  }
}
```

---

## `Lifecycle Methods`

Let's finish this section with the 3 most important life cycle methods which are `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. And we are going to use these lifecycle methods to implement two more features into our application.  

1. We want to **search for weather as we type**. So each time that we type in search field a new search will be fired off.  
2. Other one is as we reload the page now then we should get the exact same location that we had before. And so that's by **storing the location in local storage each time that we type a new location.**

So let's now use lifecycle methods to implement these 2 features.  
**Lifecycle methods are essentially special methods that all React components get access to and which we can use to run side effects at different points of the component lifecycle.** **And the most important points of the lifecycle are mounting, rerendering, and unmounting of the component.**

So we already talked about these before when we first talked about the useEffect Hook. Now the life cycle methods are not exactly the same thing as the useEffect hook in function components, but they are the closest similar thing that we have in class components.

Let's start with the **componentDidMount** method. As the name of the method says, **this one is called immediately after rendering.** So basically after the DOM has been created **just like a useEffect hook with the empty dependency array.** And so this is the ideal place to perform some initial side effects as the component loads. So what we can do here as the component renders and first mounts is to call our fetch weather method, with initial value.

```js
componentDidMount() {
  this.fetchWeather();
}
```

**This is not exactly the same as the useEffect hook but the closest thing that we can imagine this being is the useEffect with the empty dependency array.**

So this only running on mount but not on rerenders. **Okay, but speaking of rerenders we also have a lifecycle method for that event.**  
And so that one is called **componentDidUpdate**. **Now what's special about this method is that React actually gives it access to the previous state and the previous props.**  
So the **first argument is the previous props** and the **second one is the previous state.** And so **this is then a bit similar to the useEffect hook with some variable in the dependency array.** For example, we can now use these previous state here to check if the location has changed. And so that's then similar to having a useEffect with location in the dependency array. The difference is that this method right here is not called on mount. So really only on rerender while this useEffect would of course also be called on mount, so on the initial render.  

So as I was saying we can now compare the current state with the previous state.

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.location !== this.state.location) {
    this.fetchWeather();
  }
}
```

And so this⤴ will then basically enable us to search for the weather as we type.

So you see it's already working. Now 1 downside that you can immediately see is that our fetching logic here is now spread across these two lifecycle methods. So we're fetching the weather on mount and also on re render. And so then we need to call this function here in 2 places. Now that's not a big deal of course in this situation, but in real world applications this used to be really a big problem. So we used to have logic that belongs together spread out over these different methods. So that then makes the code a lot harder to understand And to useEffect actually solved some of these problems. Again because this 1 here, so this effect like this would run both on mount and on rerender.

What we can also remove the initial location state to make this a bit more real world. But this will now give us a problem because right now on the component mount, componentDidMount will still attempt to fetch the weather even though right now we have no location. And so actually in this particular case it doesn't make any sense to even fetch the weather as the component mounts.

So we will now remove fetch from componentDidMount but still get an error. And so the problem is that there was no location found. So this API only starts searching for something if we have at least 2 characters in our string. So let's quickly fix that by coming here into the fetchWeather function and we can just say if this.state.location.length is less than 2 then just return. So then just don't do anything.

**And now what we want to do is that feature where it will remember our location in local storage. So how are we going to do that?**

Well, basically each time that we type a new character in search filed we want to store the location into local storage. And so then once again the componentDidUpdateLifecycle method is the perfect place for doing that. So besides fetching the weather, we also want local storage dot setItem, let's call this one location and then what we want to store there is this dot state dot location. And since this is already a string we don't even need to convert it to a string. _`localStorage.setItem("location", this.state.location);`_

And so what we have to do now is to **read that value from local storage as the component mounts**. And so the perfect place for that is again our componentDidMount lifecycle method. So here we will want to set our state based on that data that's coming from local storage. So this dot set state and then remember it always needs to be an object here. So with the location property and then simply local storage dot getItem from the key of location. Now when we run this app for the first time there won't be no local storage yet, and so let's then set a default of an empty string. Okay. And there it is. _`this.setState({ location: localStorage.getItem("location") || "" });`_

So let's reload here, and then that's working great. So let's just analyze what happens here. So as the component is mounted, it will then read this value from local storage, so in this componentDidMount life cycle method. So this then sets the state which will in turn rerender the component. And so then after that rerender, the componentDidUpdate method will get called. And so that's where we then fetch the weather because of course the new location will be different than the previous one. Great. So this is how we work with life cycle methods in a very simple way.

And now to finish, let's just take one more minute to talk about another life cycle method which is the **componentWillUnmount** method. So this one is a bit less important but let's just mention it here as well. Now this component, so the app component will actually never unmount, so it doesn't make sense to use it here. So let's do it here in the Weather component because of course this component will sometimes not exist. So when there is no string then there's also no weather component.

So we can just then use **componentWillUnmount**. And so **doing this is very similar to returning a cleanup function from a effect function.** **The difference is that this one really only runs after the component unmounts.** So after it disappears and is destroyed not between renders.

So again, this life cycle method is mostly used to clean up after some effects which in this case we don't really have. And so there's not really any meaningful thing that we can do here. So let's just log something to the console just to show you. So whether will unmount or is unmounting, it doesn't really matter. Alright.

To see this in fetchWeather function if the location.length is < 2 then, we not only want return but also just set the state to empty weather. Basically doing return this dot set state and then the weather should basically be reset to an empty object. So let's try that again. Okay. And then now we saw that the component disappeared and so then the component will unmount method was called and therefore we got this log here in our console. And so this again would be ideal to clean up after some side effects that we created.

---

There are many other life cycle methods but these are not that important and so therefore we will not talk about that here in this basically crash course of class components. So remember that the goal of the section was not for you to really learn how to write these class based components on your own, but more to understand how they work and what they look like in case you ever come across some of them in your work. In case that company still maintains some old code base. So that's perfectly possible thing to happen.

And now if you feel like it you could actually convert this entire application back to function components. So I think that would be a really really great exercise for you to practice everything that we have learned up until this point including understanding even better how these class components work.

**`CODE`**

```javascript
import React from "react";

// STARTER FILE START

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

class App extends React.Component {
  state = {
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  // constructor(props) {
  //   super(props);
  // this.fetchWeather = this.fetchWeather.bind(this);
  // }

  // async fetchWeather() {
  fetchWeather = async () => {
    if (this.state.location.length < 2) return this.setState({ weather: {} });

    try {
      this.setState({ isLoading: true });

      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);

      // console.log(`${name} ${convertToFlag(country_code)}`);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      // console.log(weatherData.daily);
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setLocation = (e) => this.setState({ location: e.target.value });

  // useEffect with empty dependency array[]
  componentDidMount() {
    // this.fetchWeather();
    this.setState({ location: localStorage.getItem("location") || "" });
  }

  // useEffect with dependency array [location]
  componentDidUpdate(prevProps, prevState) {
    if (prevState.location !== this.state.location) {
      this.fetchWeather();

      localStorage.setItem("location", this.state.location);
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>

        <Input
          location={this.state.location}
          onChangeLocation={this.setLocation}
        />

        {this.state.isLoading && <p className="loader">Loader...</p>}

        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;

class Input extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search for location..."
          value={this.props.location}
          onChange={this.props.onChangeLocation}
        />
      </div>
    );
  }
}

class Weather extends React.Component {
  componentWillUnmount() {
    console.log("Weather component unmounted");
  }
  render() {
    console.log(this.props);
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = this.props.weather;

    return (
      <div>
        <h2>Weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <Day
              date={date}
              max={max.at(i)}
              min={min.at(i)}
              code={codes.at(i)}
              key={date}
              isToday={i === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    const { date, max, min, code, isToday } = this.props;

    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p> {isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      </li>
    );
  }
}

```

---

**_`30 June 2024 6:27 AM`_**

---
