# `Performance Optimization and Advanced useEffect`

## `Table of Contents`

1. [CHALLENGE-1 Fix Performance Issues in Workout Timer](#challenge-1-fix-performance-issues-in-workout-timer)
2. [Setting State Based on Other State Updates](#setting-state-based-on-other-state-updates)
3. [Using Helper Functions In Effects](#using-helper-functions-in-effects)
4. [Closures in Effects](#closures-in-effects)

---

## `CHALLENGE-1 Fix Performance Issues in Workout Timer`

In this lecture, we're going to quickly set up yet another small project just to demonstrate some of the things that we just talked about useEffect. And in our starter files, we actually have again the complete project already. So come here to this folder, `workout Timer`, and then here the starter already contains the entire code.

```bash
npm install
npm start
```

Now, the first thing that I usually like to do in order to get myself familiar with a new project is to just check out the component tree with `Components` dev tool. So we see that all we have is **App component**, the **ToggleSounds component** up there, and **Calculator Component**.

As a challenge just familiar with this application by reviewing the code And then use Profiler tool on your own in order to identify a potential performance problem that you can then fix. So again, try to find a performance issue in this application according to what we learned in this section.

To show you that performance issue, all we have to do is to just start profiling, then wait a few seconds without even clicking anywhere, and then we just stop it. And so what we see then immediately is that we had eight renders where in each of them, all of the components got rerendered. And so the reason for these eight rerenders is the clock. so the clock makes App component rerender every single second. So that is coming here from this useEffect.

```jsx
// App component
useEffect(function () {
  const id = setInterval(function () {
    setTime(formatTime(new Date()));
  }, 1000);

  return () => clearInterval(id);
}, []);
```

So here⤴️ we are setting a Timer that runs once a second and which sets the time state to the current time. And so this means that this component, so the App component, is rerendered every single second. And as a consequence, both its child components will be rerendered as well. So this was the issue that I wanted you to find and then to fix.

*And so let's now fix it. And again, just note that maybe in a real-world application, we would not have to fix this unless one of these child components are, of course, really slow and heavy components.*

And so let's now open up the calculator and the ToggleSounds components. All right. **So what can we do about this performance issue?** Well, **if it is some children components that are re-rendering just because the parent component is re-rendering, then the solution is to memoize those components.** Right?

Now, remember how earlier we memoized a component by basically We're basically creating a new variable here like ToggleSounds, and then we would wrap the function into memo. like this:

```jsx
const ToggleSounds = memo(function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
})

export default ToggleSounds;
```

*However, since here we are actually exporting these components, it's a lot easier and nicer to just memoize down in export statement. Like this:*

```jsx
export default memo(ToggleSounds);

export default memo(Calculator);
```

**Do you think that this already fixes the problem?** Well, not really. So the calculator is indeed still being rerendered, but the ToggleSounds is no longer rerendering. So let's see what we can do.

**So remember that the `memo` function only works if the props that are being passed are the same between renders.** So in the ToggleSounds component, that is apparently the case, So **allowSound** is just a primitive value. So it's just a Boolean. And so therefore, that doesn't change across renders. And then the second prop is **setAllowSound** function.

`Remember that the state_setter function from useState is actually stable. So React guarantees that it doesn't change between renders.`  
And so this means that these two props do not change between renders. And so therefore, the ToggleSounds component does not rerender each time that the app rerenders. So we successfully memoed or memoized this one.

Now, about the Calculator component, the allowSound, of course, also stays stable, but And now the other prop the workouts is an array. And so here is where we have the problem. So since this is an array, which is essentially just a JavaScript object, this array gets recreated on every single render. And so, therefore, we now need to memoize this array in order for the memoizing of the component to work.

So let's do that. And It is useMemo because it's just a value and not a callback function. So let's wrap that into useMemo. And remember how here we need to pass in a function which React will then call on the initial render.

```jsx
const workouts = useMemo(() => {
  return [
    {
      name: "Full-body workout",
      numExercises: partOfDay === "AM" ? 9 : 8,
    },
    {
      name: "Arms + Legs",
      numExercises: 6,
    },
    {
      name: "Arms only",
      numExercises: 3,
    },
    {
      name: "Legs only",
      numExercises: 4,
    },
    {
      name: "Core only",
      numExercises: partOfDay === "AM" ? 5 : 4,
    },
  ];
}, []);
```

So close that here but then we are missing the dependency array. Give it a save. And now here we already got the warning, but we don't want to read the warning. So after the last lecture we want to actually now understand what is missing here in this dependency array.  
**So remember how we just learned that the dependency array needs to include all reactive values that are used inside the function, so inside the hook.** And we talked about useEffect in the previous lecture but the same thing applies to useCallback and useMemo.

So our reactive values in this component are of course these two state variables(allowSound & time) and also partOfDay variable because it depends on the time state. So it is using a reactive value and therefore this is also a reactive value. And since we are using that value inside workouts array this means that we now need to include it into the dependency array. So partOfDay, and now eslint is no longer complaining. Alright.

And so this should actually fix it. So let's try that again. That should be enough And nice. So now our calculator is also memoized. So that works.

And, yeah, that was basically the goal of this lecture. Now there's just another small thing that we can do which is about this function (formatTime(date)). So this function that is inside the component body and it doesn't actually use any reactive value. Right? And so there's no need to recreate this function on every render. And so let's cut that and place it out of the App component. So another very small optimization.

And so that's what we're gonna change next.

`Whole Code of **Workout Timer** App till now`

*`App.js`*

```jsx
import { useEffect, useMemo, useState } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";

function App() {
  const [allowSound, setAllowSound] = useState(true);
  const [time, setTime] = useState(formatTime(new Date()));

  // Will be be AM or PM
  const partOfDay = time.slice(-2);

  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  function formatTime(date) {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  }

  useEffect(function () {
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

export default App;
```

*`Calculator.js`*

```js
import { memo, useState } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  const playSound = function () {
    if (!allowSound) return;
    const sound = new Audio(clickSound);
    sound.play();
  };

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={() => {}}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={() => {}}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
```

*`ToggleSounds.js`*

```js
import { memo } from "react";

function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default memo(ToggleSounds);
```

---

## `Setting State Based on Other State Updates`

Let's now implement the missing functionality of this application which is to actually make the buttons to work in order to manually adjust the duration.

```jsx
const [number, setNumber] = useState(workouts.at(0).numExercises);
const [sets, setSets] = useState(3);
const [speed, setSpeed] = useState(90);
const [durationBreak, setDurationBreak] = useState(5);

// Derived State
const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;

const mins = Math.floor(duration);
const seconds = (duration - mins) * 60;
```

So right now, the duration adjusts each time that we set one of these states. So notice how we have 4 pieces of state in our code, one for the **number**, then for the **sets**, for the **speed** and for the **duration of the length**. And so then the duration is a derived state which is on every render calculated from these 4 state variables. So, of course, as soon as we update one of these state variables, the component re renders and then the duration gets recalculated and displayed. So that's just very common stuff that we have been doing all the time.  

But now, again, we actually want to make these buttons(`+` & `-`) work. So we want the duration to update as a result of clicking these two buttons.

And so that means that the duration now needs to be a new piece of state. So let's do that. So duration and setDuration = use state and let's start at 0.

```jsx
const [number, setNumber] = useState(workouts.at(0).numExercises);
const [sets, setSets] = useState(3);
const [speed, setSpeed] = useState(90);
const [durationBreak, setDurationBreak] = useState(5);

const [duration, setDuration] = useState(0);
```

We want to calculate the duration each time that a user click on one of these buttons(+ & -) but also each time that one of other state variables changes. So basically of updating the duration state each time one of the above state variables updates.

There are two ways in which we could do that.

1. So we could **update the duration each time that we update one of other states in the event handler function.** We have one event handler for each of them. For example, one for the number of sets. So as I was saying we could now in each of these event handlers not only update the state that it is about but also the duration state. Let's actually just do this here as an example. So this is not the solution that we're going for but I just want to exemplify this.

```jsx
<label>Break length</label>
<input
  type="range"
  min="1"
  max="10"
  value={durationBreak}
  onChange={(e) => {
    setDurationBreak(e.target.value);
    setDuration(
      (number * sets * speed) / 60 + (sets - 1) * e.target.value
    );
  }}
/>
```

And so that would actually work, right? But we would then have to do this⤴️ in every single event handler. So repeating this code all over the place.  
**So instead of doing this, we will now again use the `useEffect` hook to basically synchronize these states with one another.**

**We'll use the useEffect hook to keep the duration state in sync with all of the other state variables.** Now notice how I said earlier in that long lecture about the useEffect hook that this is exactly what we usually should **not** do.  
However, I think that in this situation this is a perfectly fine use case for the useEffect hook because there are so many state variables here involved that it just becomes very impractical and even unreadable and confusing do it in the way that I just demonstrated you.

Okay, And the dependency array, we can already write it ourselves so that we understand why we actually need this effect. So in dependency  array we will want to **set the duration** whenever the **number** changes or when the **sets** change or when the **speed** changes or when the **durationBreak** changes. Alright.

```javascript
useEffect(
  function () {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
  },
  [number, sets, speed, durationBreak]
);
```

And so then we will be back to the application working in the exact same way as before. And so now with this in place we can implement functionality of these two buttons(+ & -).  
So let's actually write separate event handler functions in this case. So functionHandleInc, we get the current duration and we want to return the duration plus 1.

```javascript
function handleInc() {
  setDuration((duration) => duration + 1);
}

<button onClick={handleInc}>+</button>
```

Nice. Now, let me just show you something. So I'm trying to find a situation where we have half a minute, like 36:30. And so in this case, when we click on the `+` button, we actually want to round it to the next value. So that would be 37.00 in this situation and not 37.30. So what we can do is first round that down with Math.floor(duration) + 1.

Okay. And now let's also create handle decrement. So handleDec. And here, we're gonna do the opposite. So we will first round up the current duration and then we will subtract 1.

```javascript
function handleDec() {
  setDuration((duration) => Math.ceil(duration) - 1);
}
```

Now the problem is actually we go to negative values. So let's fix that. And so here, let's use a ternary. So if the duration is still greater than 1, then do this, but otherwise, then the next duration will be 0. Alright.

```jsx
function handleDec() {
  setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
}
```

So these buttons now work. In order to do that we needed to transform the duration into a state variable. And so then to update that state variable in an easy way, we created the effect which listens for the state change in any one of our four state variables. And if that happens, it will then calculate our new duration. **And so here we have the classic example of using an effect to update state based on another state update, which again is not always desirable and it's not always the best solution.** But here I think it is perfectly fine because otherwise we would have to spread the logic into 4 different event handler functions, which wouldn't be really nice.

Now, let me actually show you the downside here. So using the profiler. Let's start. So only updating once which we would think only gives us one render. But actually we do have 2 renders. So the calculator is rendered and then again.

And so this is exactly the problem of the useEffect hook to update states. So basically the first state update is the number of sets updating which will then trigger the effect. But the effect only runs after the render has already happened. And so then when we set the state again we get a second render.

**So React is not able to batch these 2 renders in one simply because the effect actually runs way after the render has already happened.** And so just be aware of that issue whenever you do something like this. So whenever you can, again avoid this but when you have so many state variables here that influence the value of another state then you can do this.

---

## `Using Helper Functions In Effects`

In this lecture, we're gonna **play a sound whenever the duration state changes.** And this will bring up all kinds of interesting issues that we are gonna solve using the strategies that we have learned in the advanced useEffect lecture earlier.

```javascript
const playSound = function () {
  if (!allowSound) return;
  const sound = new Audio(clickSound);
  sound.play();
};
```

And I already created this⤴️ function to play a certain sound.

So what we have to do is to first import a sound file from src folder.

```js
import clickSound from "./ClickSound.m4a";
```

So we import that file and then store it into some variable and then we can use that using the **audio API from the browser**. So this is here⤵️just a browser feature.

```js
const sound = new Audio(clickSound);
sound.play();
```

So this then creates a new audio which I just called sound and then on that we can call the play method.  

Alright. And so now let's use this function in order to play sound each time that the duration updates.  
**So where does that actually happen? So where does the duration update?** Well, easy enough. In our newly created handler functions and in the effect. And so let's just play or actually call that function in all those places.  
Let's already test if this works. And, yeah, I can very clearly hear that sound in my headphones.

```jsx
const playSound = function () {
  if (!allowSound) return;
  const sound = new Audio(clickSound);
  sound.play();
};

useEffect(
  function () {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    playSound();
  },
  [number, sets, speed, durationBreak]
);

function handleInc() {
  setDuration((duration) => Math.floor(duration) + 1);
  playSound();
}

```

Okay. But, of course, as we change the duration here, that will not yet play the sound. And so let's also place that in useEffect⤴️. Okay. But now this playSound is actually a reactive value because it uses another reactive value. So this allowsSound prop. So it(allowSound) is actually a prop but we see that it is a prop that is actually state. So that allows sound prop is a state variable and therefore it allSound is a reactive value. And so this function(playSound) is then also a reactive value and then we need to place it right in the dependency array like this:

```jsx
useEffect(
  function () {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    playSound();
  },
  [number, sets, speed, durationBreak, playSound]
);
```

Now, notice how in the console we get these issues which tells us that a *sound cannot be played before the user interacts with the document.* So the user first need to click or really do something before the first sound can be played. But let's just ignore this issue in this situation.

Okay. So we placed our playSound function in the dependency array in order not to lie to react about the dependencies. **But watch the problem that this actually creates.** So as I try to update the state now by clicking on the + and - buttons, nothing really happens. We hear the sound like playing twice and very shortly it goes up and then goes down again. So we see a flicker.  
**And so that is a big problem. So let's find out what the problem here is**.

*So each time that we click on the button (+ | -), it will set the duration and it will play the sound. Right? Now, updating the state will with setDuring, of course, rerender the component which will recreate this function(playSound). So React will see a brand new function. And since this function(playSound) is part of the dependency array of the effect it will then run the effect as well. And so that's where the duration is then set again but using the current values which actually haven't changed. So when we click here none of these four values changes. And so when the duration is then set here for the second time it will use these values again which will make it so that the duration immediately goes back. And so that's why we see that flashing. So for a fraction of a second, it will go to 53 from 52, but then immediately it will go back to 52. So that is the reason why this is happening and also why we kind of hear the sound twice. So we hear it from handleInc function and then hear it again from the effect.*

So what can we do? Well, as we learned in that lecture about the strategies on how to deal with helper functions, which this function(playSound) clearly is, there is a few things that we can do.

So the best strategy is always to **move a function out** of the component. **However, that doesn't work because this function is of course a reactive value that depends on this prop.** And so we cannot move it outside.

Then the other strategy would be to take the function and **move it into the useEffect**. But then the problem with that would be that we could no longer use it out in handleInc or in handleDec.

**So this is the situation where we need that function in multiple places.** **And so then what we have to do is to memoize the function.** And so then the function will not be recreated between these renders. So let's do that.

UseCallback and then here in the dependency array, what do you think we will need to place there? Well, we will need for sure this allowSound variable because this is a reactive value. So a value that can change over time. But what about this clickSound? Well, this one not really. So this is never gonna change and React knows that.

```js
const playSound = useCallback(
  function () {
    if (!allowSound) return;
    const sound = new Audio(clickSound);
    sound.play();
  },
  [allowSound]
);
```

And therefore, if we now save this we get no warnings. So meaning that our dependency array is complete. And so if we try this now again then it is actually back to working and it does work everywhere. Nice.

So yet another use case of the use callback hook. **Now one very interesting consequence is that now as we click on the sound toggle icon, it will actually play a sound.** Not when we turn it off, but when we turn it back on it will play a sound. So that's a bit strange, right?

**So why is that happening?** Well, notice how here **allowSound is in the dependency array of useCallback** which means that this function(playSound) actually does get recreated each time that allows sound changes. Therefore, when we toggle this icon, we get a new function which then in turn will make this effect here run again. And so that's where then the sound is played. Alright.

So this can quickly become confusing when you use all these useCallbacks and useEffects in your code.

And let's see how this actually becomes even worse because let me now update the state by clicking on + button and then watch what happens when I click on toggle icon. **So we saw that it basically reset our state.** So very strange, very confusing probably, but again, it is actually for the exact same reason that earlier we heard the sound when we click on icon.

So the reason for that is once again that whenever we click on that icon the allowSound state changes. And so then the function is recreated. So then on that update react sees a new function and since that function is here in the dependency array it will run this effect again. And so this effect will run with the current values of these 4 pieces of state. And so it will recalculate the duration based on that, basically ignoring that earlier we had manually changed the duration with these buttons. Okay?

**So of course I did all this on purpose. So I created this kind of sophisticated example to show you all these consequences that these hooks can have in our code just so I could show you the thought process behind analyzing what happens here.** So that you can in the future think about this stuff on your own. Okay? So I think that this is really really important and will make you a better REACT developer for sure.

Now the solution for this problem is to do something completely different. So instead of using useCallback and instead of playing the sound in useEffect and handler functions, we can do something entirely different. So let's think about this.  
**When do we actually want the sound to play? We want it to play whenever the duration changes, Right?**

So that's why we placed playSound function in these three places. However, there is a better way of doing that and way more clear and more intentional, **which is to simply synchronize the side effect of playing the sound with the duration state.** So instead of all these that we just did is to *create a new separate effect which will be responsible for playing the sound.* So basically for keeping the sound synchronized with the duration state.

We can now take this function(playSound) and remove the useCallback.

So anyway, now we can remove playSound from all of over. And so now in effect we want to call that function.

```javascript
useEffect(
  function () {
    const playSound = function () {
      if (!allowSound) return;
      const sound = new Audio(clickSound);
      sound.play();
    };

    playSound();
  },
  [duration, allowSound]
);
```

And so again this time we were able to finally move the helper function into the effect. And so this is also great demonstration that we should in fact have **one effect for each side effect** that we want to have. Or in other words, **one effect should only be responsible for setting the duration, not for setting the duration and playing a sound.** So instead we just create one effect that is responsible for playing the sound and we do that whenever the duration changes.

So here we actually, voluntarily declared the `duration` variable in the dependency array of effect even though we are not using it anywhere in the effect. So this is simply to tell the effect that we wanted to run whenever the duration changes. And now here we are then missing allowSound reactive value.

And with this everything should be well. And just like before when we click on the toggle sound icon the sound will play. And so the reason for that is this allowSound variable right in the dependency array. So causing playSound function to play which even makes sense in this situation.

Nice. So this was quite a journey where we explored a little bit deeper how these dependency array works and how these different hooks interact with one another. So that thought process that I showed you I think is pretty important and so I hope that you liked this lecture. nSo this deep dive into useEffect and into all the techniques that we can use together with it.

---

## `Closures in Effects`

To finish this section, let's now revisit the topic of `stale closures` so that we can dive a little bit deeper into this important topic. So when we first learned about useEffect, maybe you have wondered why useEffect actually needs the dependency array in order to know when it should execute the effect. **So why can't the effect not simply rerun automatically whenever it should?** So to analyze this issue we need to talk about **closures**.

`So in JavaScript, a closure is basically the fact that a function captures all the variables from its lexical scope. So from the place that it was defined at the time that the function was created.`  
So again, whenever a function is created, it closes over the effects of that lexical environment at the time. And so **it will always have access to the variables from the place where it was defined.**  

**In React hooks actually rely heavily on this concept of JavaScript closures and that is especially true for useEffect.**

And since this is such a great confusion for many React developers, I wanted to take some time here to now talk about closures and stale closures in the useEffect hook so that you understand even better how all of this works. So this is the type of advanced lecture that you probably are not gonna find in most other React courses.

So let's just write a very simple effect. In this function all that I want to do is to change the document title to a string which contains the number of exercises.

```jsx
useEffect(function () {
  document.title = `Your ${number}-exercise workout`;
}, []);
```

So as I mentioned at the beginning of this lecture, this function(in effect), so by the time that this function was first created, **it closed over the variable environment that was present at the time that this function was created**. So that was in the initial render. So a closure has been created at the time that this first render was created and it closed over the props and the state in the case of react.  

**And in react, we can actually also call this `current state` and the `current props` a snapshot.** And so any function that was created at the initial render and then not recreated still has access to that initial snapshot of state and props.  
So this function is created at the beginning but then never again. And so therefore, here we now have a closure with that initial snapshot. And with the dependency array that we have right now, which is basically here the empty dependency array as this default, this function will actually never be recreated again. **And so it will never get access to the current new snapshot**.

So all of this is to say that what was created here is what we call a `stale closure`. **So it's an outdated closure because the function has captured the values from a time where the number was still something else.**

But again, if we change some states to something else it is still showing the outdated value, so the initial value in the above useEffect. So the value from the closure.

**So essentially the effect function cannot see all of these variables unless we specify them in the dependency array.**

And so let's now do that. So let's specify at least the `number` variable.

```js
// useEffect(
//   function () {
//     document.title = `Your ${number}-exercise workout`;
//   },
//   []
// ); 
// with empty dependency array this function will only have the initial value of number variable, even though we change the number.

useEffect(
  function () {
    document.title = `Your ${number}-exercise workout`;
  },
  [number]
);

```

And so basically specifying a dependency array is a bit like telling the useEffect hook something like, `hey, I know that you cannot see the current values in the current render, but I promise that you only need to rerun this effect whenever number here actually changes and everything else does not matter to you.`

Right? **And so if we change the number variable, let's say to 9, then React understands that the number state is actually important for this effect and so then it will re execute it. And by that time the function can then close over so it can then capture the new snapshot.** And so again, without putting in dependency array the values of the variable will be a stale value inside the stale closure. So that's why we really need to define all of these values in the dependency array.

```javascript
useEffect(
  function () {
    console.log(duration, sets);
    document.title = `Your ${number}-exercise workout`;
  },
  [number, duration, sets]
);
```

And so now in this case⤴️ the stale closure has completely been eliminated. So at this point our function will always get access to the latest snapshot that it is interested in (b/c we put all state variables in dependency array).

***`So the stale closure only happens if the function in useEffect is still referencing some old values that are outdated by the time that this function is running.`***

And that does it for this section. Please make sure to review all the parts that you found most confusing. And then once you're done with that, once again, I meet you in yet another new section. So hopefully, I see you there very soon.

---

## `WHOLE CODE`

### `Calculator.js File`

```javascript
import { memo, useCallback, useEffect, useState } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  const [duration, setDuration] = useState(0);

  // const playSound = useCallback(
  //   function () {
  //     if (!allowSound) return;
  //     const sound = new Audio(clickSound);
  //     sound.play();
  //   },
  //   [allowSound]
  // );

  useEffect(
    function () {
      setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    },
    [number, sets, speed, durationBreak]
  );

  useEffect(
    function () {
      const playSound = function () {
        if (!allowSound) return;
        const sound = new Audio(clickSound);
        sound.play();
      };

      playSound();
    },
    [duration, allowSound]
  );

  useEffect(
    function () {
      console.log(duration, sets);
      document.title = `Your ${number}-exercise workout`;
    },
    [number, duration, sets]
  );

  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  function handleInc() {
    setDuration((duration) => Math.floor(duration) + 1);
  }

  function handleDec() {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
```

### `App.js File`

```javascript
import { useEffect, useMemo, useState } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";

function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function App() {
  const [allowSound, setAllowSound] = useState(true);
  const [time, setTime] = useState(formatTime(new Date()));

  // Will be be AM or PM
  const partOfDay = time.slice(-2);

  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  useEffect(function () {
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

export default App;

```

### `ToggleSounds.js File`

```javascript
import { memo } from "react";

function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default memo(ToggleSounds);

```

---

***`11 / 04 / 2024`***  
***`Yougo House Rawalpindi`***

---
