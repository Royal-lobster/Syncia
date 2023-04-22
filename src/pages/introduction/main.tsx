import React from 'react';
import MyComponentOne from './components/pic1';
import './components/styles/pic1.css';

const Example = () => {
  return (
    <div style={{backgroundColor:'black'}}>
     <MyComponentOne/>
    </div>
  );
};

export default Example;

export function sayHello() {
  console.log("Hello from sayHello function!");
}