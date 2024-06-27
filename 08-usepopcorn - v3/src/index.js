import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";
// import ExpendingText from "./ExpendingText";
// import App from "./currency-converter";
import App from "./useGeolocation";

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
    <App />

    {/* <StarRating maxRating={5} />
    <StarRating
      size={24}
      maxRating={5}
      color="#ff0000"
      className="test"
      messages={["Terrible", "bad", "okay", "good", "Amazing"]}
      defaultRating={3}
    />
    <Test /> */}
    {/* <ExpendingText /> */}
  </React.StrictMode>
);
