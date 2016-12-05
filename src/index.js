import React from 'react';
import ReactDOM from 'react-dom';
import Works from './Works';
import './css/main.css';

const works = [
    {
        id: "mark-six-checker",
        name: "Mark Six Checker",
        URL: "https://killing333.github.io/Mark-Six-Checker",
        description: "Check the mark six number in an efficient way."
    }
];

ReactDOM.render(
    <Works works={works}/>, document.getElementById( 'list-works' ));
