# `usePopcorn Project`

## `Table of Contents`

1. [How to Split UI into Components](#how-to-split-ui-into-components)
2. [Splitting Components-In Practice](#splitting-components-in-practice)
3. [Component Categories](#component-categories)
4. [Prop Drilling](#prop-drilling)
5. [Component Composition](#component-composition)
6. [Fixing Prop Drilling with Composition_Build Layout](#fixing-prop-drilling-with-composition_build-layout)
7. [Using Composition to Make a Reusable Box](#using-composition-to-make-a-reusable-box)
8. [Passing Element as Props_Alternative to children](#passing-element-as-props_alternative-to-children)
9. [Building Reusable Star Rating Component](#building-reusable-star-rating-component)
10. [Improving Reusability with Props](#improving-reusability-with-props)
11. [PropTypes](#proptypes)
12. [Entire Code of Reusable Rating Component](#entire-code-of-reusable-rating-component)
13. [CHALLENGE 1_Text Expander Component](#challenge-1_text-expander-component)

---

## `How to Split UI into Components`

We're back in a section about thinking in REACT, which is all about state data flow and components. We already talk about state management in detail, and so now it's time to talk more about components.  
**How do we split up a UI into components and when should actually create new components?**  
One way in which we can start answering these questions is by looking at component size. So we can classify every component based on its size which means that we can place every component X-axis, on one extreme there would be very small components, and on the other extreme it would be very large components, but none of these extremes are ideal.

### `Too Big Component`

Imagine we're building a hero section, so one way of doing it would be to create just one huge component for the entire card. **However that would create a whole set of problems.**

1. There will be too much stuff going on in this component, so it has way too many responsibilities. So components are just like javascript functions in the sense that if a function does too many different things, we should break it up into multiple functions. And so the same applies to the REACT components.
2. It needs too many props in order to work properly.

**_So in general, these two problems makes it very hard to reuse the component, which is one of the big advantages of components._**  
3. Also huge components generally contains a lot of code that might be complex and intertwined, which ultimately makes the whole component hard to understand and to use.

**Most apps will have few huge components that are not meant to be reused.** For example, we might have huge Page component which contains the layout of the entire app or page.

### `Too Specific Component`

Now, **does this means that we should do the opposite and create many small components?** Most of the time that would probably be a terrible idea as well. If we build entire app like this way, then we would end up with thousands of mini components.

**Some very small components are necessary!** Because they are highly reusable and very low complexity.

### `Normal/Ideal`

So most of the time the goal is to create components that strike the right balance between being too large/broad or too small/specific. So here come **how we split into these components?**

**The 4 Criteria for splitting a UI into components.**

1. Components should creates a **logical separation** of the content or even of the layout of a page.
2. Try to make some of the components **reusable**.
3. Ensure that each component has a **single, well-defined responsibility** and also should not **complex**.
4. Personal **coding style**.

#### `Framework to create new components`

I'll give you something like a framework that will help you to create new components from bigger components. The idea is that when we're creating a new component and we're in doubt about what the component should include, just start with a relatively big component but not a huge component, and then split that bigger component into smaller components as it becomes necessary. **When does it become necessary to split big components into multiple components?** Here where the four criteria come into play. So let's analyze these 4 criteria one by one.

**Logical Separation:**

- Does a component contain pieces of content that don't belong together? then split it into new component.

**_`Just see Theory lectures. pdf file`_**

---

## `Splitting Components-In Practice`

Let's now split one huge component into many small ones.

In starter file we've already built one very huge component named as App, which we'll split into smaller components.

```js
// Huge App Component
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </nav>

      <main className="main">
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "–" : "+"}
          </button>
          {isOpen1 && (
            <ul className="list">
              {movies?.map((movie) => (
                <li key={movie.imdbID}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <>
              <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                  </p>
                </div>
              </div>

              <ul className="list">
                {watched.map((movie) => (
                  <li key={movie.imdbID}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
    </>
  );
}
```

First we'll separate the nav element and the main element into it's own components, NavBar and Main respectively. so to start that's is the best logical separation of the content.

It's done. Now NavBar we have a logo, an input field for search, and then Number of results. So grab the input field and extract it into its own component called Search.

```js
function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>

      <Search />

      <p className="num-results">
        Found <strong>X</strong> results
      </p>
    </nav>
  );
}

function Search() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
```

Here ⤴ in NavBar component we see first we have built in html element for logo and then our own component which is Search and then P tag to display search result, that's looks pretty ugly. So we will extract those two(logo & p) into it's own components. So then we make NavBar component really nice and clear with three components. So we end up like this:

```js
function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults />
    </nav>
  );
}
```

Now we're ready to break up the Main component. Here we have no clear logical separation. So the first visual division may be one component for left box as **ListBox** and one for right box as **WatchedBox**.

After that we'll extract List(MovieList) from ListBox and also component for each list item(Movie).

Now we let this WatchedBox component, so first we separate the summary with list(WatchSummary).

Now separate the watch movies list.(WatchedMovieList), and also list items into its own component.

Now Finished!!

---

## `Component Categories`

Let's quickly talk about different component categories that naturally emerge in most REACT code bases. So most of components will naturally fall into one of three categories.

1. Stateless/Presentational components.
   👉 **No state**  
   👉 Can receive **props** an simply present received data or other content.  
   👉 Usually small components and **reusable**.
2. Stateful components
   👉 **Have state**  
   👉 Can still be **reusable**
3. Structural components
   👉 **Pages**, **layouts** or **screens** of the page  
   👉 Can be huge and not reusable.

---

## `Prop Drilling`

We left a small problem in our one of the components that we just created earlier. Let's now go fix that problem and in the process, discover the problem of prop drilling.  
Here we're not dynamically calculating the number of results. Basically we're not taking the list of movies and reading how many there and then displaying them. What we need to do here is to the get access the movies state right in NumResults component. Remember the movies state is inside of the MovieList component.  
**And remember NumResults is not a direct child component of MovieList, instead the MovieList is a child component of Main component and the NumResults component is a child component of NavBar component. And both NavBar and Main components are inside of the App component.** The solution of this is to lift the state up to the closest parent component. After that we need to pass it down as a prop to where we need it. And this is where the problem of prop drilling is come into play. So we need this movie state inside of MovieList component, but this MovieList is really deeply nested inside the component tree.

What we doing right now⤵ is called prop drilling.

```js
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar />
      <Main movies={movies} />
    </>
  );
}

function Main({ movies }) {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox />
    </main>
  );
}

function ListBox({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <MovieList movies={movies} />}
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
```

So basically prop drilling means that we pass some prop through several nested child components in order to get the data deeply nested components. `App` -> `Main` -> `ListBox` -> `MovieList`. All these intermediate components, they didn't actually even need this prop. So this is a **prop drilling**.  
So we'll look at ways of fixing prop drilling a bit later in this section. But for now, let's finally also make this prop in the `NavBar` -> `NumResults` component.

```js
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
```

---

## `Component Composition`

There is one essential principle that we really need to focus on now, which is `component-composition`.  
In order to talk about component composition, we first need to take a look at **what happens when we simply use or include a component in another component JSX**. like this:

```javascript
function Model(){
  return {
    <div className='model'>
      <success />
    </div>
  }
}

function  Success(){
  return <p>Well done!</p>
}
```

⤴ So the Success component inside the Model component, this is exactly what we have been doing with our components most of the time. However, **when it comes to reusability, this creates a big problem**. That's because right now the success component really is inside of model. They are deeply linked together in the JSX. Therefore, we cannot reuse this model component to display some other message inside of it, for example an error message. In order t solve this, we now bring the technique of component composition, where we can compose the Model and Success components together. Like this:

```javascript
function Model({children}){
  return {
    <div className='model'>
      {children}
    </div>
  }
}

function  Success(){
  return <p>Well done!</p>
}
```

Here we have Model component again, but with a fundamental difference. This Model component does not include a predefined component, but instead it accepts children with the **children prop**. Now if we get our success component again, we can now basically just pass it into the model by placing it between the opening and closing tags when use Model. like this:

```javascript
<Model>
  <Success />
</Model>
```

This composition works because of `children prop`. We can pass any other component in Model when including, which makes this Model component highly reusable.  
**So essentially when we do component composition, we leave the hole/empty slot in the component ready to be filled with any other component that we want.** So let's say that later we needed another Model window somewhere else in the app, but that one renders the error message. That's pretty easy now:

```js
<Model>
  <Error />
</Model>
```

**_Formally, Component composition is the technique of combining different components by using the children prop or by explicitly defining components as props._**

We use components for two big reasons or in two important situations.

1. When we want **to create highly reusable and flexible components**, such as Model window.
2. **To fix a prop drilling problem**, like the one that we found in the previous lecture. This is actually great for creating layouts as we do in next lecture.

**_Keep in mind that this is only possible because components do not need to know their children in advance,which allows us to leave these empty slots inside of them in the form of children prop._**

---

## `Fixing Prop Drilling with Composition_Build Layout`

Let's now use component composition in order to fix the prop drilling problem we have just encountered before. And in the process, we'll also find a way better solution to building layouts in React applications.

Let's start by fixing the prop drilling problem in `NavBar` -> `NumResults` component.

**How can we use component composition in order to solve this problem?**
Well, what if we could use the NumResults component right in the App component instead of in NavBar. Then we wouldn't have to pass in this movie's prop into the NavBar component. We can actually do this exact same thing with the component composition. So in NavBar instead of accepting the movies, let's accept the children.

```js
// export default function App() {
//   const [movies, setMovies] = useState(tempMovieData);

//   return (
//     <>
//       <NavBar movies={movies} />
//       <Main movies={movies} />
//     </>
//   );
// }

// UPDATE TO THIS ONE⤵

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main movies={movies} />
    </>
  );
}

// function NavBar({ movies }) {
//   return (
//     <nav className="nav-bar">
//       <Logo />
//       <Search />
//       <NumResults movies={movies} />
//     </nav>
//   );
// }

// UPDATED TO THIS ONE⤵
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

// STAY SAME
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
```

This was easy, let's fix the worst problem of prop drilling that we also have, for the movies list. So let's do the same for the Main component.

```javascript
// AFTER FIXING. THE APP COMPONENT
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <WatchedBox />
      </Main>
    </>
  );
}
```

**This is actually a really really a nice way of building layouts in React applications. So just by looking a return JSX from the App/root component, we can nicely see the entire layout and also the entire component tree.**

---

## `Using Composition to Make a Reusable Box`

We used composition in order to solve a prop drilling problem and to build our layout in a way nicer way. And now let's use it to build a reusable box component.  
We already converted the ListBox component to use the children prop in order to fill that slot, what the component that we passed in in ListBox, which is MovieList component. Now we could go ahead and do exact same thing with WatchedBox component. This WatchedBox component is very similar to the ListBox component, both has isOpen state and JSX and also some conditionally rendering. So this is an amazing candidate to create a reusable component.

Make a component with named as `Box`

```JS
// UPDATED APP COMPONENT
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

// REUSABLE BOX COMPONENT
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
```

**By adding children prop in Box's JSX after condition, we allow to render any child component if isOpen is true.** In first Box we only one children component and in second Box we have 2 child components.

---

## `Passing Element as Props_Alternative to children`

In the lecture about component composition, we said that we can use the children prop for composition or an explicitly define prop, let's know simply explore that!  
So instead of children prop in a component and then passing in a component like we did, we can use and explicit prop as an alternative.

Instead of accepting children in Box, let's say we accept something called element, and it can really be called anything like el or anything else.

```javascript
function Box({ element }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && element}
    </div>
  );
}
```

Now in App component passing element in Box component.

```javascript
<Box element={<MovieList movies={movies} />} />

// If there is multiple tags/components then we need fragment.
<Box element={
  <>
    <WatchedSummary watched={watched} />
    <WatchedMovieList watched={watched} />
  </>
}
/>
```

Complete App Component

```javascript
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box element={<MovieList movies={movies} />} />
        // If there is multiple tags/components then we need fragment.
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          }
        />
        {/* <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box> */}
      </Main>
    </>
  );
}
```

The app now looks exactly the same as before, but we basically passed in an element or multiple elements instead of using the children prop.

**This pattern is used some library, for example, in React Router.** But in this case, let's go back to what we had before because I think that looks a lot nicer, and also it's a clearly preferred way of doing this in React.

**_By the way, In VS-Code, On component calling, hover over the component and click control + mouse to go the component definition._**

---

## `Building Reusable Star Rating Component`

Let's now build a small, reusable and flexible Star Rating Component. So it displays multiple stars and then as we hover over them, it displays the currently selected(hovered) rating on right side of the stars.  
Now, we will develop this component in complete isolation, so outside of the current application, so that we could reuse it anywhere we wanted and also make it really flexible by allowing for different props.

In our project, let's create a new file called StarRating.js and import it into index.js file. And comment out our App Component and CSS file importing statements. So we only have StarRating component.

So start with JSX, so with structure, we have two containers one for stars and one for start count message.  
For starts we want to dynamically generate these star elements instead of writing them directly one by one.

Let's use the technique that we used before in Far-Away app. In javascript mode we can write Array.from({length: 5}), in from method we can specify an object with the length property, set it to 5 initially, and this then create an empty array with 5 elements that we can then immediately loop over by passing in a function as a second argument in from method. In this function we are not interested in elements themselves but we need index.

```js
export default function StarRating() {
  return (
    <div>
      <div>
        {Array.from({ length: 5 }, (_, i) => (
          <p key={i}> S{i + 1}</p>
        ))}
      </div>
      <p>10</p>
    </div>
  );
}
```

Now let's define some styles. We'll all our styles inline here in JSX. So for inline styles we need to define an object and assign it to the style property. like this

```js
<div style={}></div>
```

We'll define this object separately outside of the JSX.

```js
export default function StarRating() {
  const containerStyle = {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  };

  return <div style={containerStyle}></div>;
}
```

Now we can do even better, which is to take this entire containerStyle object, which will never change and it doesn't depend on anything that in the component, so we can place it completely outside of the component, And by doing so this style object will not have to be regenerated by JavaScript each time that this component is rendered. Otherwise each time that this component is render, this style object well get regenerated again.

```javascript
const containerStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

export default function StarRating() {
  return (
    <div style={containerStyle}>
      <div>
        {Array.from({ length: 5 }, (_, i) => (
          <p key={i}>S{i + 1}</p>
        ))}
      </div>
      <p>10</p>
    </div>
  );
}
```

Now let's also create some other styles for the star container. And also create some styling for the text.

```js
const containerStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};

export default function StarRating() {
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: 5 }, (_, i) => (
          <p key={i}>S{i + 1}</p>
        ))}
      </div>
      <p style={textStyle}>10</p>
    </div>
  );
}
```

And now to finish, let's do what we said right in the very beginning, which is to basically allow the user to set the maximum number of amount of stars, so the maximum rating.  
Pass the maxRating and accept in StarRating component.

```jS
// IN INDEX.JS FILE
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} />
    <StarRating maxRating={10} />
  </React.StrictMode>
);

// IN StarRating.JS FILE
export default function StarRating({ maxRating }) {
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <p key={i}>S{i + 1}</p>
        ))}
      </div>
      <p style={textStyle}>10</p>
    </div>
  );
}
```

**But what if someone used this component without specifying the Max rating property? like this <StarRating />** So in this case we need to do is to set a default value for rating. To do that we can actually leverage the power of Destructuring in JavaScript because whenever we destructure an object, we can actually set a default value as we do so. like this:

```javascript
export default function StarRating({ maxRating = 5 }) {
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <p key={i}>S{i + 1}</p>
        ))}
      </div>
      <p style={textStyle}>10</p>
    </div>
  );
}
```

This is a very common way of setting default props in REACT application.

---

## `Creating the Stars`

Next up, let's actually create the stars and make the component dynamic by reacting to a click event.

Whenever we click on the stars, we then want to display the current rating in the paragraph element. So since we want the UI rerender based on an event, so we want something to happen on the screen, we need state. So create a new stat of rating. and set initial value to 0, then in paragraph there is no rating yet then in paragraph we see a 0, which is not an ideal, because if the rating is still zero, that simply means doesn't mean that the user hasn't basically rated yet. so we do this either the rating, if zero then empty string. **_<p style={textStyle}>{rating || ""}</p>_**

**Now where we do need to listen the click event?** Basically, when the user clicks on first star then the rating should become one, and if he clicks on second star then the rating should become two and so on. So this means is that we need to listen for the click event on each of the stars.  
Let's start by defining the onClick attribute when calling Star component.

```js
<Star key={i} onRate={() => setRating(i + 1)} />
```

And to handle click event we did exact same thing that we done in previous lectures.

Now to finish, what we want to do is to display only the amount of starts equal to the rating in full color and all the other stars empty, so with only border color. We already have the empty stars in svg, so now we want to basically display the star conditionally, render either full color or empty stars.  
For that in Start component we need second prop for full or not. if it's full then we display the full svg else other one.  
Now how do we define whether a star is full or not? It's pretty easy, full should be boolean value. When calling Star we set if the rating is greater or equal to current index +1 then full should be true, otherwise full should be false.

```js
export default function StarRating({ maxRating = 5 }) {
  const [rating, setRating] = useState(1);

  function handleRating(rating) {
    setRating(rating);
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={rating >= i + 1 ? true : false}
          />
        ))}
      </div>
      <p style={textStyle}>{rating || ""}</p>
    </div>
  );
}

function Star({ onRate, full }) {
  return (
    <span role="button" style={starStyle} onClick={onRate}>
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#000"
          stroke="#000"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#000"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
```

**_Here we added role property(html) for span tag for accessibility._**

---

## `Handling Hover Events`

Let's now handle the event of user hovering over the stars. So whenever we hover a star we get all the stars before hovered one has like a temporary rating. It's completely different than the rating state that we build in previous lecture.

So, now we need a brand new piece of state to basically store that temporary rating. That make sense because, something(hover) happening on screen causing the rendering the Stars component.

```js
// StarRating component
const [tempRating, setTempRating] = useState(0);
```

Now in order to handle the hover event, let's go down to our Star component and where we handle the click, we also handle the hover. There not any hover event but instead we have `onMouseEnter` and `onMouseLeave` events.

To display colored svg star if there is a tempRating then we check tempRating >= i+1 if it's true then assign true to full otherwise we check the condition rating >=i+1.

```js
full={tempRating ? tempRating >= i : rating >= i + 1}

// For text label
<p style={textStyle}>{tempRating || rating || ""}</p>
```

---

## `Props as a Component API`

When we build a reusable component like the one we are currently building, we should carefully think about what props the component needs. So  
**Let's now shortly look at how to think about props.**

👉 As we start working on our components, we should get into the mindset that any component is always created by someone and always consumed by someone. Now, we you working on your own, the component creator and the consumer is of course the same person. Creator is the person building a component and defining what props the component can accept, while consumer uses the component somewhere in the application by specifying values for the props. The reason for this separation between creator and consumer is that if we have this mindset, we can think the component props as the public API of the component. **So as a component creator, when we choose what props the consumer is allowed to pass in, we are essentially defining the public interface of our component. And at the same time we are choosing how much complexity of the component we want to expose to the consumer of the API, because at the end a component is just and abstraction.** So we're encapsulating a part of the UI and the associated login into a component and allow consumers to interact with that component via props.  
👉 When we decide about what props to allow in a component, we need to find a good balance on how strict we want to be. So how many props we want to enable for configuration, eg Let's say we're building a weather component, we could make it extremely simple only allowing one prop, the location. It might be perfectly fine, but it might also make the component not flexible enough or maybe even straight out useless for the consumers. On the other hand, we could allow props for the URL of the weather data, the number of days, weather should be daily or hourly, how many days, which temperature unit and so on. So too many props make the component way too hard to use for the consumer because we're exposing too much complexity. So,  
**When deciding on the right API for your components try to strike the right balance between too many and too little props, based on the project needs.**  
👉 If you really need to expose too much props, make sure to at least provide some good default values for many of them.

---

## `Improving Reusability with Props`

Let's make our component really flexible and reusable by defining a nice public API for consumers to use it. Right now our component is quite un-flexible and therefore not really reusable. It might be useful in one very specific case where we want the component to look and behave exactly like we had. Imagine that we want to reuse this component in many other applications or maybe even publish it to npm to share it with all React developers around the world, then they will probably not find this component very useful. Those developers they will probably want to define things like colors of the stars or may be size of stars and text in order to make this component fit into their own applications. So what we're going to do now is to try to define a good public API for this component.

So Start with color and size.  
Now we need to define style object of text and stars into a component, because now we will specify some properties which will depend on the props, as the props are only accessible inside the component. With some additions and modifications we set that the user can easily change the color and size of the stars and text. **_`Analyze The Code!👇`_**

Now sometimes consumers or users of the component want to have even more control over the styling. So it's is a good idea to allow users to pass in a class name, where the user can put their own css using that class and pass in the className. By default it will just an empty className, so the empty string. And we add this className to the overall container.

Now another thing that sometimes we see on teh web is instead of just displaying the rating numbers, display some message according to the rating. So we could pass an Array of messages, like this. **_message={["Terrible", "bad", "okay", "good", "Amazing"]}_**. And display these strings instead of the numbers. By default it will an empty array. However to display the message we first need to check for empty array, and also check the number of elements in the array, because if there is number of star is 5 and string is 2 then it will not make much sense.

Wow Great! Let's keep going, because there is still at least one important thing missing, and that is to allow the consumer to set a default rating. Default rating means if a client/customer leaves without any rating, then any consumer may want to to store some default rating, so that will be pre-selected on UI. The default value of defaultRating will be zero and we put this default rating as a initial value of rating state. like this: **_const [rating, setRating] = useState(defaultRating);_**

**May be you heard that, _You should never initialize state from props, like we did hare for rating state._ However this is only true if you want the state variable to stay in sync with that passed in props, In other words, if you want to state value to update in case that the prop value is also updated. Here we're using this default rating as initial state only.**

One last important this we're still missing right now which is the fact that the consumer might actually need the rating state outside of the StarRating component. Maybe a consumer want to add some text after the whole component displaying "This movie was rated \_\_\_ stars". Here in dash we need the star state. Example:

```js
function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {moveRating} stars</p>
    </div>
  );
}
```

So what they need is some state. So the user can use some state by their own like this: **const [movieRating, setMovieRating] = useState(0);** And whenever the rating state(inside the component) changes, this movieRating should be updated accordingly. **So how do we do that???**  
So, we want to give the consumer of this component the ability to pass in a set function. We allow the consumer to pass onSetRating handler. No default value needed here. And now all we have to do is on the handler rating is to not only set the internal rating, but also set teh external rating.

```js
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
// import App from './App';
import StarRating from "./StarRating";
import { useState } from "react";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} />
    <StarRating
      size={24}
      maxRating={5}
      color="#ff0000"
      className="test"
      messages={["Terrible", "bad", "okay", "good", "Amazing"]}
      defaultRating={3}
    />
    <Test />
  </React.StrictMode>
);
```

```js
// StarRating.js
import { useState } from "react";

const containerStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const starContainerStyle = {
  display: "flex",
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {" "}
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
```

---

## `PropTypes`

Let's add type checking to the component's props using prop types. **With prop types we can basically specify the type of value that we expect the consumer of the component to pass in for each of the props.** For example we can define that maxRating must be a number. And this is what we call type checking. **If you really care about this, you should actually use TypeScript instead of JavaScript -Recommended**

First import PropTypes object from the prop-types package. **import PropTypes from "prop-types";** No need of install this package, because create-react-app already comes with this package pre-installed.

In order to do the type checking, on the component, we specify the propTypes property. Here it's important that we write it with lowercase like this: StartRating.propTypes, although we import it in Uppercase. We assign this propTypes an object. And in this object we specify type of each of the prop, but know with uppercase as we imported. We can also chain isRequired(make this prop required) here.

```js
StarRating.propTypes = {
  maxRating: PropTypes.number,
  // maxRating: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};
```

---

## `Entire Code of Reusable Rating Component`

```js
import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
// import App from './App';
import StarRating from "./StarRating";
import { useState } from "react";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} />
    <StarRating
      size={24}
      maxRating={5}
      color="#ff0000"
      className="test"
      messages={["Terrible", "bad", "okay", "good", "Amazing"]}
      defaultRating={3}
    />
    <Test />
  </React.StrictMode>
);
```

```js
// StarRating.js

import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const starContainerStyle = {
  display: "flex",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {" "}
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
```

---

## `CHALLENGE 1_Text Expander Component`

Now time to build a reusable text expander component.

```js
const displayText = isExpended
  ? children
  : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

// Split the text to convert to an array and then took the array element from index 0 to collapsedNumWords and then to convert into string use join method and then at the end added three dots.
```

### `Entire Code for Reusable Text Expender`

```javascript
import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "#1f09cd",
  expanded = false,
  className = "",
  children,
}) {
  const [isExpended, setIsExpended] = useState(expanded);

  const displayText = isExpended
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  const buttonStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
    color: buttonColor,
  };

  return (
    <div className={className}>
      <span>{displayText}</span>
      <button style={buttonStyle} onClick={() => setIsExpended((exp) => !exp)}>
        {isExpended ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
```

---

**_`08 June 2024 - 4:03 PM --- -Muhammad Ahmad`_**

---
