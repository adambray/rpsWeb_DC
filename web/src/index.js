import React from 'react';
import ReactDOM from "react-dom";

const domFixture = document.createElement('div');
domFixture.id = 'reactApp';
document.querySelector('body').appendChild(domFixture);


ReactDOM.render(
    <h1>Hello, world!</h1>,
  domFixture
);
