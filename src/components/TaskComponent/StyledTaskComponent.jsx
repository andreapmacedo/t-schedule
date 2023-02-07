import styled from 'styled-components';

// const StyledTaskComponent = styled.button`
const StyledTaskComponent = styled.div`
  display: flex;
  /* justify-content: space-between; */
  
  align-items: center;
  padding: 5px;
  
  background-color: antiquewhite;
  flex: 1 1 auto;
  border: 1px solid #00000029;
  box-shadow: 0 2px 2px #00000065;
  border-radius: 5px;
  /* max-width: 200px; */

  font-size: 1rem;

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    /* background-color: #f1f1f1; */
    /* justify-content: space-between; */
    /* align-items: center; */
    /* padding: 4px; */
    /* margin: 4px; */
    /* background-color: aquamarine; */
    /* flex: 1 1 auto; */
    /* border: 1px solid #00000029; */
    /* box-shadow: 0 2px 2px #00000065; */
    /* border-radius: 5px; */
    /* max-width: 200px; */
  }

  .task-description {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
    padding: 4px;
    margin: 4px;
    background-color: cadetblue;
    min-width: 250px;
    /* flex: 1 1 auto; */
    border: 1px solid #00000029;
    box-shadow: 0 2px 2px #00000065;
    border-radius: 5px;
    /* max-width: 200px; */
  }

  .item-description {
    display: flex;
  }
`;

export default StyledTaskComponent;
