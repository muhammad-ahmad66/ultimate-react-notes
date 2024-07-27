
# `React Router Building Single-Page Applications (SPA)`

## `Table of Contents`

1. [Section Overview](#section-overview)
2. [Creating Our First App With Vite **WorldWise**](#creating-our-first-app-with-vite_worldwise)
3. [Routing and Single Page Applications](#routing-and-single-page-applications)
4. [Implementing Main Pages and Routes](#implementing-main-pages-and-routes)
5. [Linking Between Routes with Link and NavLink](#linking-between-routes-with-link-and-navlink)
6. [Styling Options For React Applications](#styling-options-for-react-applications)
7. [Using CSS Modules](#using-css-modules)
8. [Building the Pages](#building-the-pages)
9. [Building the App Layout](#building-the-app-layout)
10. [Nested Routes and Index Route](#nested-routes-and-index-route)
11. [Implementing the Cities List](#implementing-the-cities-list)

---

## `Section Overview`

Welcome to our first real world project. So in this section, we're gonna learn and use the most important third party library that is used in almost all react projects. And that library is **React Router.** So with React Router, we are able to build applications with multiple pages that feel as fluid and smooth as the apps on our smartphones. And these are what we call Single Page Applications (SPA).

And so throughout this section we'll gain hands on experience by building this gorgeous single page application called WorldWise while also using a new way of styling react applications called **CSS Modules.** So we have a lot of ground to cover and so let's get back to work.

---

## `Creating Our First App With Vite_WorldWise`

Welcome to our biggest project yet, which is gonna be called worldWise. And what's special about this one is that **we're gonna use Vite** for the first time to set up this project instead of **create-react-app**.

Let's now actually set up a new application on our computer using Vite for the very first time.  
As always we need to open up a new terminal or a command prompt and move to the folder where we want to create that project. And so now instead of using **npx create-react-app** we will do **npm create Vite@4**. And in the future once you start building your own applications with Vite you will then use **@latest**. So to use the latest version of Vite.  

So let's just type **npm install** or just **npm i** for short. And so this will then install all the packages but it will be a lot faster than with create react app. So there's a lot less packages necessary apparently, so this is going to be a lot faster. But while this is installing and actually now it already finished but what I wanted to do now was just to take a quick look at the file structure. So we have our node modules again which will contain all the libraries necessary, so React, React DOM and a bunch of other ones that are necessary behind the scenes.  
Then we have also the public folder again, but this time index.html is actually outside that folder. So that's another small difference here. And the reason for that is simply that the developer who maintains this template here thinks basically that this is the best structure.  
Let's just take a look here at our source(src) folder. And so here we see that instead of an index.js we have this main.jsx. **So the file extension is now this jsx which as we can see down here stands for JavaScript JSX**. So it's pretty much the same as a JavaScript file but **Vite really needs this to be JSX files and not just JS files**. So here the entry point is not index.jss, but again this file called main.jsx. And notice how this one almost doesn't have any junk at all. So unlike the index.js file that we get from create react app. Alright.  
Then we also have our app.jsx file as always. This one is just a bit different, but let's just as always get rid of everything and then here I will use that snippet that we started using in the previous section to very quickly scaffold a new component. **rfc**

Here is another difference, we don't do that with **npm start**. So instead we can check out here that we have **dev** script. And so here we need to run **npm run dev**. Okay. And so that's running now successfully but notice how it actually didn't open up a new browser tab. So we need to manually do that.  

And now to finish, remember how I also told you at the beginning of the course that the **great thing about create react app is that it already comes with all the important developer tools pre installed.** And the most important one of those is by far ESLint. ESLint helped us so much and prevented so many bugs from happening. So building a React app without ESLint is a bit like coding half blinded.

So we really don't want that. And so we now need to config ESLint here in our Vite project. So again we need to do that manually each time that we set up a new project with Vite.

**`Let's then config ESLint.`**

So to configure ESLint we need to install a few npm packages. So that's ESLint itself, then the Vite ESLint plugin. And finally we also need to install all the react specific ESLint rules. So that's ESLint config react app.  
**_`npm install  eslint vite-plugin-eslint eslint-config-react-app --save-dev`_**

And next we need to actually config our project to integrate with these packages. So the first step was to install those 3 packages and the second one is to create a new file called **`.eslintrc.json`**. And so here we can basically configure the behavior of ESLint.  
And in this case what we want to do is to extend the default rules of ESLint with those react rules that we just installed.  

```json
// .eslintrc.json
{
  "extends": "react-app"
}

```

And then finally, we also need to config our Vite project with this **`vite.config.js`** file. So in this file we can configure all kinds of things about development and building of our project but here all we need to do is to now add the ESLint plugin to this array. So for that we first import that here. So import ESLint from the vite-plugin-eslint and then finally we add that here to our plugins array.

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint"; // new added

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()], // eslint() new added
});
```

Give it a save and that should then work.  
So with this we have vite correctly set up. It is a little bit of work but you just have to write down somewhere how it works and then do it every time. So that's not too bad especially if it's a big project that you will be working on for a long time.

But anyway with this we have our project set up and so now we can start learning about the main concepts that we will talk about in this section which are routing, single page applications, and React Router.

---

## `Routing and Single Page Applications`

So this section is all about **React Router** and **Single Page Applications**. And so let's start by understanding what these actually are.  

So **when we use routing in a web application, we basically match different URLs to different views in the user interface.** **In the specific case of React, we match each URL to a specific React component and we call each of these matches between a URL and a component a route.** **Then when one of those specific URLs gets visited, the corresponding react component will be rendered.**  
For example, we could show this homepage,(image ⤵) so this home component whenever a user visits the root URL of example.com. But when they go to slash login on the same URL, we then show the login component. And if they log in successfully we can then redirect them to the slash app path. So to show them the app screen. So in this example, we have 3 routes that the user can visit, the root URL, /login and /app, which will all render different React components.

So basically, this enables users to navigate between different screens of the application by simply using links and the URL in the browser. At the same time, routing like this keeps the user interface nicely in sync with the current browser URL, which has a couple of nice advantages that we're gonna discuss later.  

Now, this type of routing that I just described here only works this way on the client side, so in the user's browser. There is of course also routing on the server side but not in client side React applications like the ones that we have been building and that we will build in this section. But anyway, most front end frameworks have these client side routing capabilities baked right into the framework. But React is different because it relies on third party packages for many different functionalities and Routing is one of them.

![What is react routing](./ss/what-is-routing.jpeg)

**So in React, routing is usually handled by this third party package called `React Router`.** And this is probably the most important and most used React third party library out there. So if you want to learn React development, you need to learn React Router. The reason for that is that **routing is fundamental for building something that we call Single Page Applications.**

So single page applications or spas(SPAs) for short, are **web applications that are executed entirely on the client.** So only in the user's web browser. And just like we discussed before, **single page applications rely heavily on the concept of routes where different URLs correspond to different views.**  
And here (⤵see image) is how single page applications work. Whenever a user clicks on a special link provided by the router, the URL in the browser simply changes. In the case of React, this job is usually done by React Router.  
Now **changing the URL will then trigger the DOM to be updated as a result.** And in single page applications, it's always JavaScript that will update the DOM and therefore the page. u

Usually on a normal web page when we click on a link, the browser will load a completely new page and then show us that new page. But single page applications are completely different. **The page is simply updated by JavaScript which means that there will never be a complete page reload and that's the whole point of the single page application.** It's the entire app in just one page. So without any hard reloads. This makes the web application feel just like a native desktop or a mobile application, which is really a fantastic user experience.

Now going back to React, whenever the URL is changed, React router and React itself will update the DOM by simply rendering the component that corresponds to the new URL. And then, the whole cycle can be repeated as many times as necessary. So each time the user keeps clicking on a router link that will change the URL and the component that's being displayed on the screen, all without reloading the page.  
Now it's quite common that some pages need to display some external data, but that's not a problem at all. Whenever that happens, a component can just load some additional data from a server, usually from some kind of web API.  
So while the single page app itself runs entirely on the client, it can always communicate with a server in order to fetch some data that it needs, just like we have been doing before in other applications.  
**What we cannot do is to load a completely new page because then it would no longer be a single page app.** Now we could actually say that all react apps are in fact single page applications because all of them are never reloaded. Right?  
So think of all the apps that we have built up until this point. They were all apps where React updated to DOM and so they didn't have to reload ever.  
However, in a professional application that's just not enough. So big and complex applications rely on URLs and need the routing capabilities that I described in this lecture because only then they can become real single page applications.

---

## `Implementing Main Pages and Routes`

So now that we know what routing and routes are, let's use the React Router library for the very first time. So in order to implement some routes for the main pages in our application.  
So with routing we now want to **associate basically specific parts of the URL to specific components in our application.**

So to start, let's actually create the pages, So the components for the pages. And for that, I will create a new folder inside our sources and I will call this one pages. So pages is for these structural components that we will then match to these URLs.  
**And let's start with the product page**. So `product.jsx` and then let's again use that snippet to be a bit faster.  
Let's also create just a few more pages. So let's do the `homepage.jsx`. And then let's also create a pricing page, `pricing.`jsx.

Okay. And so with this we have three pages and so we can create three routes for them. And so that's what we will do next.  
Let's install our react router package. So **npm install react-router-dom@6** and then very important it needs to be the one for the dom.

**Now since react version 6.4, there are two big ways of defining routes in our code** **and we are going to use the more traditional approach which is basically to define our routes in a declarative way.** So what this means is that basically we will use a couple of special components that react router gives us to define our routes right in the JSX.

So that sounds confusing and so let's just do it. So we start by using the `BrowserRouter`.  
make sure you have imported BrowserRouter from 'react-router-dom'. So now in there we need the Routes component and again make sure that it has been correctly imported. And now finally we do the actual route definition.

So we need all of these other components here but then now we can finally use the Route component. And so this is where we define basically the URL which is called the **path prop** and then for each path of course we will be able to define one component. And here let's start with product. So the one that we already have here right now, and then here we need to define a **react element**. So not just the name of a component but really a React element which we get by using the component.

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

```

And so let's check that out in our component tree. And so now we get all these components that we have here right inside our component tree plus a few other ones. `But mainly we have our browser router, then router, then the routes that we wrote into our code, and finally the product component.`  
So what React Router did was to take a look at the URL here, and so then it saw that we had product here. And so then it saw all these different routes that we defined here and it then selected the 1 that matches that part of the URL. And so that's product, and so then this element here will be displayed here in the UI.

Now let me just show you something here. So let's say we had some div around all of these and then here we had some h1 element with something like this:

```jsx
return (
  <div>
    <h1>Hello</h1>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  </div>
```

So then this h1 would always stay in the all the pages.  
So if you had a part of the page that you really want to always stay the same, then this is how you would do it.  
But usually what we do is to just have our app component basically deciding which page should be displayed in the UI. It will not really have its own output. All it will do is, displaying one of the pages which is the one that matches the route(url).

Now to finish let me just show you another thing. So let's create here another page called **`PageNotFound.jsx`**, And so what we can do now is at the end, create a route with the path set to the **star**. And so this will basically catch all the routes that were not matched to 1 of these other 3. And so this is how we basically implement a page not found.  

```jsx
<Route path="*" element={<PageNotFound />} />
```

Alright. So, again, **this last route here with the star will basically be matched if none of the other routes are matched.** So this then catches like any URL that is not matched by all routes. So let's say this 1 and then we get not found which makes sense because none of our routes really match this URL here.

Great. So at this point we have basically half of the single page application. So we already have all our routes but at this point we cannot really transition from them without a page reload. So all we are doing here is to manually change the URL and then our application goes to that page. But of course that's not what we want. So you want that single page app feeling where we can seamlessly transition between pages. And so that's what we will implement in the next lecture by linking between these pages.

---

## `Linking Between Routes with Link and NavLink`

So let's now create some links between our different routes in order to really turn our application into a single page application.  
**So to start, let's say that on our homepage we want a link to the pricing page. So how are we going to do that?** Well, let's try with the most obvious idea that we might get which is to simply create an anchor element. So basically creating a link in the traditional html way.

```js
function Homepage() {
  return (
    <div>
      <h1>WorldWise</h1>
      <a href="/pricing">Pricing</a>
    </div>
  );
}

export default Homepage;
```

Let's now try to click this and see what happens. So, **it actually did move to that page, but if you watched closely, then maybe we can notice that the whole page actually reloaded.** And so this is not what we want. We don't want any hard refreshes of our page, but instead we want to seamlessly move from one page to the other simply by replacing the DOM content here on our page. So this is not what we want.

So let's get rid of it. **And instead, we will now use the Link element that is  provided by React Router.** So let's do that and let's make sure that it's got imported. And now here we can use the **to prop**. And so this is where we then specify /pricing. And it's important that we specify the slash, so that our URL always starts from the root. So basically we get root slash pricing.  
Okay. So let's go back and let's reload here. And now watch what happens as we click here down there. We moved to another page and we got no new requests except this SVG here for some reason (see in dev Network tab), but that really doesn't matter. So the only thing that really happened was that our DOM got replaced. And we can also see that nicely in our component tree now. So let's go back. So now we have our homepage and as I click here notice that the only thing that changed was that immediately here or component tree changed.

```jsx
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <h1>WorldWise</h1>
      <Link to="/pricing">Pricing</Link>
    </div>
  );
}

export default Homepage;
```

Okay. And so that's how we use the link component from React Router to seamlessly transition between pages, making this now a single page application.  

**Great. So we can move now from the homepage to the pricing page, but what about all other pages?** Well, **let's just implement a page navigation which we can then reuse in all these pages so that we can transition between them.**  
So that's going to be a new component but not a new page. And so let's come here and create a new folder called components. And so this is where we will then create our **PageNav.jsx** component.

```jsx
// PageNav.jsx
import { Link } from "react-router-dom";

function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
```

So let's include this in all of the pages.

```jsx
function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>WorldWise</h1>
    </div>
  );
}
export default Homepage;
```

And now, yeah, beautiful. So we can really now seamlessly navigate through our application and nothing reloads and it feels just really nice.  

Now one thing that we do many times in navigation like these, is to display which is the currently visited page. So for example, highlighting right now the pricing page since this is the page that we are visiting.  
And so actually React Router gives us a tool for that. So instead of using **Link**, we can use the **NavLink** element.

**And so now it works exactly the same thing as before but if we inspect this element then we see that the currently active page gets class of active.** **And so then in our CSS we can select this class and style this element differently.**  
Now, for now we don't have any CSS yet because we will learn how to use a different way of incorporating CSS into a project this time. But later once we have that then we will be able to style this active class. And speaking of CSS that will actually be the topic of our next lecture. So how we can use different ways of CSS in our applications. And so let's move there right now.

```jsx
// PageNav.js component
import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;

```

---

## `Styling Options For React Applications`

One important part of building web applications is of course to style them with CSS. Now up until this point, we have always just included a **global external CSS file** into our applications and then used the class names from there in our JSX. However, in this project we will do something a bit different, which is to use CSS modules.  

But before we do that I want to take a minute to quickly explore all the different options that we can use to style react applications because there are actually a lot of them. **But first you might be wondering, why are there actually so many different ways of styling a React app?**  
Well, it's because one fundamental philosophy of React is to be an opinionated in regards to many common aspects of building web applications. And so one of them is styling. So React really doesn't care about how you style your applications. And so as a result, we have lots of different styling options, most of them being provided by 3rd party libraries.

### `Styling Options`

1. So the first option is one that we have used a few times in the beginning which is to **simply apply some inline CSS to JSX elements using the style prop.** And this is actually more common in React than in regular HTML because of React's idea of separation of concerns. Now an inline style is scoped to the particular JSX element that it's applied to, which means that it is locally scoped. So it applies only to that exact element.  
2. Now we have also multiple times **included an external CSS file and then simply applied the CSS classes using the className prop.** And the same would actually also have worked for a Sass file. Now in this case, **our styles are actually global** which means that every single JSX element in the entire application could use any of these classes in the external CSS file. And this can create huge problems, especially in big projects.  
    For example, because you won't know which components are using which classes. And when you then update 1 of the classes it will have repercussions in other components. Or when a developer adds a new class with a name that already exists that will create clashes between those two classes. So basically global CSS is a nightmare in large apps. **So in professional projects, CSS is almost never global.** Instead, CSS should be scoped to an individual component which brings us to the next styling options which is CSS modules.  
3. **CSS modules are pretty similar to regular CSS files with the difference that we write just one CSS file for each of our components.** **The styles in that file will then be scoped to only that component so that no other component can use them.** And this then makes the components way more modular and reusable. And at the same time it better reflects react separation of concerns. And in fact, this is exactly what we will do in this project.
4. Now if we want to take it even one step further we can go with **a CSS in JavaScript library like styled components.** So as the name says, with CSS in JavaScript, we actually write our CSS inside a JavaScript file. So in the same file where we define our components. What's special about a CSS in JavaScript library is that **it allows us to create React components that have our styles directly applied to them,** which we can then use just like regular components. So this fully embraces the React philosophy that a component should contain all the information about its appearance. And so that includes CSS.
5. And finally, **we can also use a utility first CSS framework like `tailwind`,** which is getting more popular every day.  
    So in tailwind you use predefined utility classes to define individual styles, to use flexbox, to make layouts responsive, to make hover effects, and really to design your entire UI and all that without ever having to leave the JSX markup.
6. Finally we do actually have one more option here **which is basically to not write any CSS at all.** Wait, what? No CSS? **Well, it is actually possible because we can build our entire project using a fully fledged UI component library,** for example, like `Material-UI`, `Chakra-UI` or `Mantine`.  
    So essentially a component library like those contains all kinds of pre built and pre styled components that are common in most web applications. This is however not ideal for beginners, but again it might be worth exploring later.

![Styling Options in React](./ss/styling-options-in-react.jpeg)

---

## `Using CSS Modules`

Let's now learn all the fundamentals of CSS modules that we need, which is actually really easy.  
So luckily for us, CSS modules already come out of the box both with create react app and Vite. So there's nothing to install in order to make CSS modules work. Now as we just learned in the previous lecture, what we do with CSS modules is to create one external CSS file per component.

So let's do that  for PageNav.js component. So right in the components folder, we will create a new file. And now this file needs to follow the convention of the name of the component, so PageNav and then the important part is that we add dot module dot css, like this: **`PageNav.module.css`** And so this is now the CSS module for the PageNav component. And so now here we can define some classes. So let's for example create a nav class. Now here really we need to define class names. **We cannot use the element selector like ul, li etc.**

```css
/* PageNav.module.css file */
.nav {
  display: flex;
  justify-content: space-between;
}

/* ul {
  list-style: none;
} */ /* This will not going to work. */
```

Now if we save this then you see that of course nothing changed here for now and that's because we still need to import and use these class names now in our markup. So we have to connect these two files by basically importing these styles into this PageNav component. And then as usual, we add these classes that we defined to our elements. **All the classes that we define in the module are basically exported into one big object that we can then use. And usually we call that simply styles.**  
And so now this nav class that we defined in css module is available on **styles.nav**, so on styles object. And so, to add that class, we need to enter JavaScript mode then use `styles.nav.`

```jsx
import styles from "./PageNav.module.css";

function PageNav() {
  return
    <nav className={styles.nav}>
}
```

And for some reason it seems like the styles here have actually been applied on ul as well. So this does work but it's a really bad idea because this will then select all the ul elements on the entire application which defeats the whole purpose of CSS modules where this styles, so these classes are supposed to only be applied to this component. **So never use the normal element selector but here instead, we will now basically select all the unordered lists that are inside our nav class. `.nav ul`**

Now notice how here in dev tool we got this really weird class name. And so this is what CSS modules does. So they take our class name that we defined ourselves and then they attach a random ID to the end. And so if we then create another nav class in some other CSS module that will get a different random ID. And so then these are in the end different classes again.

**And so now let me show you how this can really avoid naming clashes.** So a problem where we or another developer on the team might accidentally create a new class name that already exists which might then mess up all the other ones. So the other elements that use that class name. So that's a common problem when we use global CSS like we have been doing. So let's now avoid that. And in order to do that, let's first create a new page, which will be called AppLayout.js, so this will basically be for the main application where we have that list on the left side and the map on the right side. So let's then add another route for that page right in the App file.

```js
<Route path="app" element={<AppLayout />} />
```

So now we have another route working in our application and now let's also create a navigation for this app. So that's going to be a new component and so let's call this one the `AppNav.jsx` and let's right away also create the CSS module. So `AppNav.module.CSS`. Alright.

What I really wanted to do now was to create another class with exactly the same class name as we have in the other navigation. So I will now again create a nav class and this one will have a background color of purple.

And by the way, here we could also immediately destructure the styles object, to extract our classes. -NOT RECOMMENDED

```css
/* AppNav.module.css */
.nav {
  background-color: rebeccapurple;
}
```

```jsx
// AppNav.jsx
import styles from "./AppNav.module.css";
// import { nav } from "./AppNav.module.css";

function AppNav() {
  return <nav className={styles.nav}>App Navigation</nav>;
}

export default AppNav;
```

**And now let's talk about global CSS** because sometimes we of course do need some CSS that is really global, like a global reset or setting some font properties on the body. So some stuff that we usually do in a CSS file. And so for that, we can actually keep including an external CSS file like we have been doing all this time. So to do that, let's grab index.css file from starter folder and paste it into src folder as usual. And include our CSS file right into main.jsx.

**So this global file has are basically the definition of the CSS variables which are going to be global and these resets but no class names anywhere to be seen.**

But anyway, what I want to do now here at the end since we are already speaking about global CSS is to show you **how we can define some more global CSS also inside CSS modules.**

```css
/* In PageNav.module.css */
.test {
  background-color: red;
}
```

**So let's say that we wanted a test class, which for some reason we wanted to include into our Homepage but without importing this module.**

```jsx
// In Homepage.jsx
<h1 className="test">Home Page WorldWise</h1>
```

So this really wouldn't work right now because as we already know this class that we just exported from the CSS module is now prefixed or actually it get added to the end with random id , right? And therefore, our homepage here cannot read just the test class. So that's the whole reason why we have to export our classes into the styles object and then use it. But again, let's say that now we wanted to use it as regular css class, so basically we want to create a global test class. We could do that like this:

```css
/* PageNav.module.css */
:global(.test) {
  background-color: red;
}
```

So we could do this by using this global function and then wrapping our selector in there. And so now as we save this then this test class gets global as the name says. And so now our h1 here can access the test class without that weird string attached to it in the end. Now this is not really helpful but it was important to show you how this global function works because now **we can use this in order to style the active link** like we have been talking about before that active link will get the `active` class, So remember how the page that is currently active gets the active class attached to it.

So like this. Now if we were trying to do this, .nav and then selecting the active class in there this wouldn't work. like this:

```css
.nav .active{
  background-color: green;
}
/* will not work, as this active will get random id at the end */
```

And so you see that indeed it has the active class name but it doesn't work. And so that's because again CSS modules will see this class from our css module and it will then add that random string to it.nAnd so then that class will be different from that one that got automatically.  
And so the solution to that in a case like this is to use global. And now that works. So now we get our green background.

```css
.nav :global(.active) {
  background-color: green;
} 
/* will work */
```

So this global function is usually mostly important when we are working with some classes that are provided from external sources. So in this case, the active class is given to us by
React Router. And so then if we want to style that we need to use this global thing. So otherwise, if we just want to define some global classes we wouldn't do it inside a module but just inside our global CSS file.

Alright. And so this is actually all that I wanted to show you about CSS modules. **There's also something else which is called `composing classes`** but I think that's not really important. So we're not going to talk about that here because this is really all you need to know in order to effectively use CSS modules in your own projects and of course also in this one.

---

## `Building the Pages`

So now that we know the fundamentals of both the technologies that we're gonna use in this project, so that's React Router and CSS modules, we are now ready to build the actual pages of the application. And so let's now go do that.  
And what I mean by actual pages are, Homepage, Product Page, Pricing Page, and Login Page.

let's also grab 4 images and drag them into the public folder. So just like we have been doing before, we will use images from the public folder, not from this assets folder that we also have inside the sources folder. So the **assets folder is, to be directly imported into our JavaScript code.**

So our homepage now looks like this, by getting starter file. `Homepage.jsx` and `Homepage.module.css`.

```jsx
// Homepage.jsx [Starter File]
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
      </section>
    </main>
  );
}

```

```css
/* Homepage.module.css */
.homepage {
  height: calc(100vh - 5rem);
  margin: 2.5rem;
  background-image: linear-gradient(
      rgba(36, 42, 46, 0.8),
      rgba(36, 42, 46, 0.8)
    ),
    url("../bg.jpg");
  background-size: cover;
  background-position: center;
  padding: 2.5rem 5rem;
}

.homepage section {
  display: flex;
  flex-direction: column;
  height: 85%;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  text-align: center;
}

.homepage h1 {
  font-size: 4.5rem;
  line-height: 1.3;
}

.homepage h2 {
  width: 90%;
  font-size: 1.9rem;
  color: var(--color-light--1);
  margin-bottom: 2.5rem;
}

```

Alright, let's now complete this Homepage and add a button down to the h2 tag. So this button or this link actually should take us to the App page. So to the AppLayout component. And so this should be a link. So one of those links from React router. So again, this will take us to the App page and here actually we are now using a global className which is the **cta** class And then `Start tracking now`.

```jsx
import Link from 'react-router-dom';
<Link to="/app" className="cta">
  Start tracking now
</Link>
```

And then of course we need to bring in the link from React Router dom. And so now that works. So this global className(cta)⤴, is located in our index.css file.

So next up, let's take care of the Logo. Which is actually part of the entire navigation. So in the Homepage we now want to get back that navigation **`(AppNav)`** that we already started to build.

Let's now open up the AppNav component because this is going to be our next task that we need to work on. So building now this page navigation and actually this is already looking pretty well. So what we should do is to add another nav link here for the login page. So this one will move us to the login page and then actually in our real app here, we don't have a link for the homepage.  
But instead, that Homepage will open as we click on this Logo. So let's remove this 1 here and then let's bring in the logo that we already have once again in our starter components.

Beautiful! There it is. So our navigation is working fine. We didn't include it here yet but it is working. **But now the only thing that we need to do is to actually include a link in the Logo.** Right now we see that it's not a link yet, and so let's open up the Logo by clicking here on this component. So command or control clicking. So here we return this image as we see. And so let's just wrap this img into a Link. **So this link coming, of course, from React Router.**

```js
// Logo.jsx
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />;
    </Link>
  );
}

export default Logo;
```

And so this time⤴ we are actually using a Link and not a NavLink because we don't want to add any special styles when this is selected. So that's really not necessary here. And so with this we finish our logo.  
Now let's open up these other pages and add this navigation(PageNav) there as well. So that's the `Login page`, the `Pricing page`, and the `Product page`. So all these pages will get that navigation.

```css
a.ctaLink:link,
a.ctaLink:visited {
  background-color: var(--color-brand--2);
  color: var(--color-dark--0);
  padding: 0.8rem 2rem;
  border-radius: 7px;
}
```

And notice here we are using basically the JavaScript way of writing the variable to define a CSS class, instead of the normal CSS way which would be like, cta-link

```jsx
// PageNav.jsx
import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
```

```jsx
// App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## `Building the App Layout`

Next up, let's build the static layout of the main application screen.

Let's now open up our `AppLayout.jsx` file so that we can now start working on this part. So basically what we want to achieve in the end is to having the Sidebar here and the Map. And so basically we will now create these two components first. So let's do that here inside our components. So Sidebar.jsx and Map.jsx.

```jsx
// Sidebar.jsx
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} By WorldWise Inc. All
          rights reserved
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
```

Let's now come to AppLayout.jsx and include the Sidebar there.

So we need to import css module again but now let me show you an easier way. So by using a snippet. So come to our index.css file where I placed this snippet code for you. Let's paste that code and so now we will have a snippet which we can use with this prefix of **`csm`**. So that stands for CSS Modules and that will then automatically import those styles for us.

Alright. So let's then build Map And for now here we will just write map and then also use some more styles. So our snippet, csm, and you see this makes it really a lot faster. So then it is **mapContainer** class and then let's include this right in the AppLayout.jsx

```jsx
// Map.jsx
import styles from "./Map.module.css";
function Map() {
  return <div className={styles.mapContainer}>Map</div>;
}
export default Map;
```

```jsx
// AppLayout.jsx
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
export default AppLayout;
```

So I usually like having the pages without much stuff in them so that most of the code is actually inside my components folder.

---

## `Nested Routes and Index Route`

So let's now move back to React router and learn about probably the most confusing part of declaring routes which are nested routes.  
**So we need nested routes when we want a part of the user interface to be controlled by a part of the URL.** So in this case we have cities or countries in the url, and according to the url we display cities or countries in sidebar. Also when we click on map the url (place of cites) is changing and as a result we got a form in sidebar. So nested routes are basically to implement exactly this behavior. So where we show a part of the UI based on some part of the URL.

Note how nested routes are not simply routes which are made up of multiple parts like /app/cities. So just because we have a longer path with these 2 parts this doesn't make it a nested route. Instead, this is actually a nested route because this path(/cities) influences what component is rendered inside the aside nav component.  

Okay, And so now let's do that in our code in our own application. So we want to now declare a couple of nested routes, and we do that basically inside a route element, in App.jsx, here we will do nested routes.

```jsx
<Route path="app" element={<AppLayout/>}/>
```

Let's transform this⤴ to a nested Route

```jsx
<Route path="app" element={<AppLayout />}>
  <Route path="cities" element={<p>List of cities!</p>} />
  <Route path="countries" element={<p>Countries</p>} />
  <Route path="form" element={<p>Form</p>} />
</Route>
```

Just doing like this we created a nested route. With this for now we are done. So we have defined three child routes of this app route.

But now where are these elements( all p tags for different routes) actually going to be displayed in the UI? **Or in other words, how are we now actually going to display one component or one element inside another component?**  
Well, that's where the Outlet component provided by React Router comes into play. So where do we actually want to display these elements (p tags for now)? Well, they should be inside the Sidebar. So right in that component we are now going to use that Outlet element.  **`<Outlet />`**

```jsx
// Sidebar component
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} By WorldWise Inc. All
          rights reserved
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
```

And there it is. So if we put /cites like this <http://localhost:5173/app/cities> then there is our list of cities paragraph that we defined right in nested route in App.jsx.

This paragraphs are render into the Outlet element, this is actually pretty similar to the children prop, which we use whenever we pass some element inside another element in JSX, but with Outlet  we are not using elements but routes. So of course the children prop is not going to work but instead we use something similar which is the **Outlet element.**

Okay. But what happens when we just put the /app alone, so without specifying any of the nested routes. Here inner sidebar is empty which is not what we want. Instead we want, when we come just to /app then we want to show by default the city list.  
**So we can actually do that with something called an `index route`.**

**An index route is basically the default child route that is going to be matched if none of other nested routes are matches.**

```jsx
<Route index element={<p>LIST of Cities</p>} />
```

And we could actually do the same thing with our homepage.

```jsx
<Route path="/" element={<Homepage />} />

// Change the above line to ⤵

<Route index element={<Homepage />} />
```

Now we want to implement AppNav component to go into different routes

Now if we think about this then what we just implemented here is actually very similar to something like a tabs component, but implemented in a very different way. So before if we wanted to implement a tab component where we have these tabs here and then the content changes according to which is the active tab, we would have implemented that using the useState hook to manage the currently active tab.  
But here with react router, we do the same thing but in a very different way. So instead of using the useState hook to manage state, we basically allow react router and the URL to store that state of the active tab. And so then whenever this URL here changes then we change which tab is currently active.  
So React Router is a whole new way of thinking about how we build an application. Now, of course, that doesn't mean at all that all we have learned before is useless.  
So we still build components like accordions or tapped components using the useState hook all the time. But from now on the overall navigation of the application is in the real world always managed by something like React router.

---

## `Implementing the Cities List`

Now it's time to load our city's data from a fake API again and then to actually render that data into the UI. And so let's start by actually creating the city list component. So city list dotjsx and then we use our snippet and let's also immediately bring in our CSS module. So our CSM snippet, and so now let's use that style object here in an unordered list. So styles dot city list.

And here for now, let's just write something. And so now here we want to finally replace this simple paragraph with the list of cities. So in this one and in the next child route actually as well. So city list, let's close that here and the same thing here again. Give it a save and then we get a problem.

So what do we have here? So apparently, it has something to do with the style. And, here, of course, it needs to be class name. And, yeah, that looks a lot better. Okay.

So next up, let's actually set up our fake API again so that we can then fetch our city data from there. And so just like in the previous section for that we will install the JSON server package. So please go ahead and do that right now and again inside our current project folder, and then we will just come here to our package. Json file and add right here a new script. So that we can then run and start that JSON server right from our console.

So let's call this one server and the command will be JSON server watch and then it's at datacities.jason. Then let's specify also the port at 8,000 and this time around I also want to add an artificial delay so that it looks as if the API always takes half a second to actually fetch the data. So let's reload here just to get rid of that error, and now here we should be able to run this. So npm run server and here again we have a problem where this is already in use. So let's try 9,000 and there we go.

So now that works. So if we copy now this local host and then 9,000, you see that well we don't really have our data but that's because here I need to add slash cities. And so here are 3 cities that we can now load into our application using the fetch function just like before. So where are we going to do that? Well, we could do it right here in the city list because this is where we will first need this data, but we will later on also need this data in some other places.

And in particular, if we look at our demo here, we need it here also in these countries. So these countries will be derived from all the cities. And finally, we also need it to display these markers here. So each city gets its own marker with some data of the city, and so then there we will need that data again. And so let's just place that data for now at least here in the app component.

So basically as global state that will be available to all components that we want to pass in using props. So let's create a new piece of state called cities and then set cities and then our use state hook starting with just an empty object and then let's also get a quick is loading state and set isLoading. Alright. And then we want to load this data here right on mount. So let's use useEffect.

So onMount, so on the initial render of this component. Now it doesn't make a lot of sense actually to load this data right as the entire application loads, for example right here. So as it is right now we actually start loading the city data even as we are only on this page here. So on one of these pages where we don't really need that data yet. But for now let's just do it this way because in the next section we will even change this anyway.

So let's define an async function here called fetchcds. And then here we are missing of course that function keyword. And so let's as always create a variable called res and then await a fetch request to our API. So let's just grab that there and actually let's place that URL outside. So at least this part here but not the city's part.

So this is basically our base URL and now here we can construct our URL for the fetch based on this base URL. And so this then is a bit more reusable. So in case we will need to change this base URL later then we don't need to search in our code for this fetch request. So then we need to await res.json and then set the cities with the data that we get back. Then in case there is some error let's add a catch block and just alert something was an error loading data.

And what's wrong here? Yeah, of course. I forgot to add that, catch block or that try block actually. Then here we need to close this function and then we need our finally to set our loading state back to false. So set is loading to false and of course in the very beginning we need to set it to true.

So this is pretty standard stuff that we have been doing all the time here. Okay. And so right now this should already been working at the very beginning. So when we first load our application, let's try that again. And if we check out our network tab, well then we cannot really see that but it should be there.

So it's easier probably to check our component and, yeah, so here is our city data. And so now we want to pass that data so that here we can show a loading spinner or we can show then the data itself. So let's do that. And so now we see the advantage of why here we need to use an element and not a component because now we can very easily pass in that data. So cities will be cities and then is loading equals is loading and the same thing here.

And don't worry about this duplicate code here because we will actually get rid of these props when we start talking about context in the next section. But anyway, now let's use this data right here. And, yeah, first of all we need to accept that. So cities and is loading. And so now the first thing that we want to do is to if is loading then we want to just return a spinner here.

So something indicating that the page is loading and only if that's not the case we want to then return this actual list. So we already have a spinner component actually. I think that's what it's called. Yeah. So right here we have the spinner And if you want, you can of course check out all the code for that.

But anyway, let's now just import that really quick here. So from and then spinner. Okay. But otherwise we want to of course render this list. And so as always what we do is to take our cities and then map over them.

So for each city object we want to create 1 city component. And so let's actually create that component here first. So, let's then call that the city item dot jsx. Okay. And so this will then take in the city and here it will return 1 li and let's just type city for now.

And then here we can bring that city item in and pass as a prop the current city. So pretty standard stuff and let's also define the key as the city dot id. Alright. And so here we have one city text for each of the cities. So let's reload this and we have a problem.

So cities dot map is not a function. And I know why that is. It's because by default here we have this empty object which should actually be an empty array. So let's see. And very shortly you saw the loading spinner there which should have lasted a bit longer.

So maybe we have some problem here with the delay, and here it should actually be 2 dashes like this. So then we need to quit the process with control c and run it again. Alright. Try that again, and yeah, beautiful. That looked a bit better there.

So it seems a bit more real this way. All right, and now this component here is now almost finished and so let's take care of the city items themselves. So first of all, each of them has some styles. So let's import them here and then the class name should be styles. Cityitem and we already see some change there.

But now let's work on the content itself. So here the class is style dot emoji because here we will display the emoji and let's actually destructure each of these cities. And to do that, let's first take a look at the shape of the objects. So right here, so we get the city name, the country, the emoji, the date, and some notes. Now we're not going to need all of them so let's just destructure the ones that we need.

So we want the city name of course, the emoji, and the date for now. And so that is going to come out of city. And so here let's now use emoji, and then let's keep going. So class name styles dot name. And then here let's use the city name.

Yeah. Nice. This is already starting to look similar to what we have here. Now we're just missing the date and then this button here we will add it later. Or maybe we will actually add it now but we can just give it no functionality.

So here let's actually use the time HTML element. And so then here the date and actually let's format this date a little bit because like this it doesn't look really nice and I think I have a function for that already here in the city component. So something like this. Let's just adapt this a bit. So placing this outside the component, of course, so that it doesn't always get recreated.

So here let's just remove the weekday which we don't really care about. And so then let's wrap that date into a format date function call. Nice. So almost the same. Now let's just add this button and wrap that into parenthesis here.

Okay. And then the button itself. So a bit annoying that Versus Code always places those quotes there. Maybe there is some way of changing that default and if you know about that then please let me know. But anyway, now here we have that button which of course will not do anything now but we will take care of that later.

So this is starting to look really beautiful. And now to finish let's just take care of the situation in which there is no cities yet. So imagining that the user uses the application for the very first time then there will be no data yet. So let's duplicate this here just so we don't lose the data and then let's just remove everything so we get just this empty array. So if we reload now then we get nothing.

We also don't get an error but it looks a bit, well, empty like that. And so let's change that right here in the city list component. So we can do some more conditional rendering. We are already testing for that situation, but let's also say if there is no items, so if cities.length is nonexistent then let's return some other component that I also already included which is this message component. So this is again just a presentational component which all it does is to receive a message string and then it displays that nicely in the UI with this emoji right there.

So let's use that and we pass in the message prop lowercase please. Add your first city by clicking on a city on the map. Alright. Of course, now our app doesn't know about this but there we go. Beautiful.

Now, of course, we cannot do that yet and so let's just get all the data back here give it a save and delete this file and so with this we have actually finished this lecture.

---
