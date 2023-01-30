import React, { useState } from 'react';

export default function TaskComponent(props) {
  // console.log('props', props);
  console.log('props.task', props.task);
  
  return (
    <>
      {/* <h1>TaskComponent</h1> */}
      <h1>{props.task.title}</h1>
    </>
  );
}