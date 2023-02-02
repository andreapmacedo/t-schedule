import React from 'react';
import StyledTagComponent from './StyledTagComponent';

export default function TagComponent(props) {
  // console.log('props', props);
  // console.log('props.tag', props.tag);
  // esse componente precisa ser modificado para atender as necessidades do projeto atual

  return (
    <StyledTagComponent>
      {/* <h1>TaskComponent</h1> */}
      <p>{props.tag}</p>
      <button onClick={() => props.remove(props.tag)}>
        <h4>x</h4>
      </button>
    </StyledTagComponent>
  );
}