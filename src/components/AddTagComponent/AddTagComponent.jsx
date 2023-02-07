import React, {useContext} from 'react';
import MainContext from '../../context/MainContext';
import StyledAddTagComponent from './StyledAddTagComponent';
import { setTagsOnLocalStorage } from '../../data/localStorage';

export default function TagComponent(props) {
  const { tags, setTags } = useContext(MainContext);
    

  /**
   * o próprio componente é do tipo button
   */
  const removeTag = (tag) => {
    console.log('removeTag', tag);
    tags.splice(tags.indexOf(tag), 1);
    setTags([...tags]);
    setTagsOnLocalStorage(tags);
  }

  return (
    <StyledAddTagComponent onClick={() => props.add(props.tag)} >
      {/* <h1>TaskComponent</h1> */}
      <p>{props.tag}</p>
      {/* <button onClick={() => props.remove(props.tag)}>
        <h4>rem</h4>
      </button>
      <button onClick={() => props.add(props.tag)}>
        <h4>add</h4>
      </button> */}
      <button onClick={() => removeTag(props.tag)}>
        <h4>excluir</h4>
      </button>
      
    </StyledAddTagComponent>

    // <StyledAddTagComponent>
    //   {/* <h1>TaskComponent</h1> */}
    //   <p>{props.tag}</p>
    //   <button onClick={() => props.remove(props.tag)}>
    //     <h4>rem</h4>
    //   </button>
    //   <button onClick={() => props.add(props.tag)}>
    //     <h4>add</h4>
    //   </button>
    //   {/* <button onClick={() => props.add(props.tag)}>
    //     <h4>renomear</h4>
    //   </button> */}
      
    // </StyledAddTagComponent>
  );
}