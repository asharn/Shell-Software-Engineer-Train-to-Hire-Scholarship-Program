import React from "react";
import { render } from "react-dom";

const Parent = ({ name }) => {
  return (
    <div>
      <h1>Parent</h1>
      <Child name={name} />
    </div>
  )
};

const Child = ({ name }) => {
  return (
    <div>
      <h1>Child</h1>
      <Grandchild name={name} />
    </div>
  );
};

const Grandchild = ({ name }) => {
  return (
    <div>
      <h1>Grandchild</h1>
      <h3>Name: {name}</h3>
    </div>
  );
};

const App = () => {
  const name = "Andrew";

  return <Child />;
};

ReactDOM.render(<App />, document.getElementById("root"));