import React from 'react';
import StyledAddTagComponent from './StyledAddTagComponent';

export default function TagComponent(props) {
  console.log('props', props);
  console.log('props.tag', props.tag);
  // esse componente precisa ser modificado para atender as necessidades do projeto atual

  return (
    <StyledAddTagComponent>
      {/* <h1>TaskComponent</h1> */}
      <p>{props.tag}</p>
      <button onClick={() => props.remove(props.tag)}>
        <h4>rem</h4>
      </button>
      <button onClick={() => props.add(props.tag)}>
        <h4>add</h4>
      </button>
      {/* <button onClick={() => props.add(props.tag)}>
        <h4>renomear</h4>
      </button> */}
      
    </StyledAddTagComponent>
  );
}