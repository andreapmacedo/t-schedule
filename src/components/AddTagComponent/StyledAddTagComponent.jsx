import styled from 'styled-components';

const StyledAddTagComponent = styled.button`
  display: flex;
  /* justify-content: space-between; */
  
  align-items: center;
  padding: 4px;
  margin: 4px;
  background-color: aquamarine;
  flex: 1 1 auto;
  border: 1px solid #00000029;
  box-shadow: 0 2px 2px #00000065;
  border-radius: 5px;
  /* max-width: 200px; */

  /* font-size: 0.8rem; */
  font-size: 16px;
  
  p {
    margin: 4px;
    font-size: 16px;
  }

  button {
    background-color: transparent;
    /* border: none; */
    border: 1px solid #00000029;
    border-radius: 100%;
    cursor: pointer;
    margin: 4px;
    padding: 4px;
    font-size: 16px;
  }

`;

export default StyledAddTagComponent;
