import React from 'react';

export default function TagComponent(props) {
  console.log('props', props);
  console.log('props.tag', props.tag);
  
  return (
    <>
      {/* <h1>TaskComponent</h1> */}
      <h1>{props.tag}</h1>
      <button onClick={() => props.remove(props.tag)}>Remover</button>
      
    </>
  );
}