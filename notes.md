# Ultimate React Course

## Demo Project

let's start by building our very first react component, which is essentially a piece of the user interface. A component in react is just a function, and these functions/components in react can return something called JSX, which is a syntax that looks like HTML, and which will basically describe what we can see on the screen.  

```js
export default function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <button>Get Advice</button>
    </div>
  );
}
```

Just like this we build a component  
Now what we do here is whenever we click on this button, we want a new advice from an API and display it on our User Interface.

Now we have:

```js
export default function App() {
  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    console.log(data.slip.advice);
  }

  return (
    <div>
      <h1>Hello World!</h1>
      <button onClick={getAdvice}>Get Advice</button>
    </div>
  );
}
```

Now we want here is that the advice should be displayed in the h1 in place of Hello World!. For that we need a concept called **state** and **state** is most fundamental concept of react. So **whenever we need something to change in the user interface, we change the state.**

```js
const [advice, setAdvice] = useState("");
```

here this use state is a function in react, which returns an array. and so here we destructuring that array⤴. So first position of the array, we have the value of the state that we called advice here, and the second position of the array we have something called a setter function. So a function that we can use to update the piece of state.  
Now right in the getAdvice function we can now use the setAdvice function to update the state. And then whenever this piece of state is updated, the user interface will also be updated. Now to update we call that function:   **setAdvice(data.slip.advice);**  
Now all we have to do is to use this advice right in the JSX, which is basically just like html, BUT we can add some JavaScript to it as well. We can enter JavaScript mood by using the curly braces. we already did that on onClick method.

```js
    <h1>{advice}</h1>
```

```js

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount]=useState(0);


  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount( c => c+1);
  } 

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get Advice</button>
      <p>
      You have read <strong>{count}</strong> pieces of advice
      </p>
    </div>
  );
}
```

Now working...  
_Basically what happened is when we click the button the getAdvice function should be called. so it get called, and it fetches the data and then update the state. we update the state by calling setAdvice function. And remember whenever we do that(calling this setAdvice function) the whole component is executed again, then the advice will again change therefor it then change the UI._

Now we want to display down some text which tells us how many times basically we have clicked the button. something like this <p>You have read <strong>23</strong>pieces of advice.</p>  
So this is another place where we need some state. Now in useState the initial value should be zero.  
setCount( c => c+1); Here we simply takes the current count and then adds one, that will become the new count. code ⤴

Now when we load for the first time then we have no advice here at all. Let's change that, so whenever we open up the app for the first time, we already are graded with our very first piece of advice. We can do that something called an effect.
useEffect takes two arguments 1- A function that we want to get executed at the beginning. And the second which is called the dependency array, but that doesn't matter for now.

Now we just separate a new component down for the message i-e p tag. We put the component's first letter in uppercase as a convention. Then we'll put that function/component in the App component as an html tag. Here we have not access to the count variable which is not specified in the Message.  So need to pass it right into the component.  We do that by using something called **Prop**. **Prop** is basically just like parameter to a function. And we accept in the function as an object called props, not like normal arguments. Now the count is as a property of the props object.

FINAL CODE

```JS
import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get Advice</button>
      <Message count={count} />
    </div>
  );
}

function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advice
    </p>
  );
}
```

---

## A_First_Look_At_React

### Why_Do_Front-End_Frameworks_Exist?

Why Frameworks exist, and why not use vanilla JavaScript to built our apps?  
Back in the day, before around 2010, all websites were always rendered on the server. In server-side rendering a website is assembled on the web-server/backend, and based on data and templates, the resulting html, css, and javascript code is then to the client side, so to the web browser. Typical example of server-side rendering is all websites built on wordpress. On the client side we use very little code of javascript. However over time developers started writing more and more javascript code to be executed by the browser. At some point these became fully fledged web applications, which then let to the rise of so-called single page applications. So these are basically web pages that are rendered on the client, not on the server.

In client side rendering the work of rendering a web page is shifted from th server the client. Now we don't call these web pages anymore, but web applications.  
Now a web application still needs data which usually comes from the backend in the form of an API. The application consumes this API data and render a screen for each view of the application. And these single page applications essentially feel as we were using a native desktop or phone application, we can click on links or submit forms without the page ever reloading. So we're technically always on the same page and therefore the name single page app.

**Single-Page Applications with Vanilla JavaScript?? Right??**  
No, we don't want to actually build large scale applications with vanilla JavaScript. **Why??** will take case later.

Let establishing that building any frontend application is really all about handling data and then displaying that data in a nice user interface. That's basically all a web application does. So it receives data, changes the data as user use the app and it always display the current data on the screen. What this means is that the most important task of a single page app and really of any app and website is to keep the user interface in sync with the data, or in other words is to make sure that UI always displays the current state of the data.  
Display the correct data is actually a really hard problem to solve.  
Without a framework it would be impossible to keep this huge amount of data in sync with the super complex UI.  

**Why it's a bit problem in Vanilla JavaScript?**  

1. Building a complex frontend with vanilla JavaScript alone requires large amounts of direct DOM traversing and manipulation.  
2. In typical JavaScript apps state such as simple text or numbers are often times simply stored in right in the DOM, so right in the HTML elements themselves, rather than in a central place in the application. As a result, we ends up with many parts of app accessing and changing the DOM state directly, which makes the spaghetti code even harder to understand.

So Frameworks exits because  
_**keeping a user interface in sync with data is really hard and a lot of work*** Front-end frameworks **solve this problem** and take it away from developers._  
_**It also enforce a correct way of structuring and writing code**_

---
