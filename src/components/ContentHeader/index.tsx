import React from 'react';
import SelectInput from '../SelectInput';


import { 
  Container,
  TitleContainer,
  Controllers 
}  from './styles';

interface IContentHeaderProps {
  title: string;
  lineColor: string;
  children: React.ReactNode;
  // controllers: React.ReactNode;
}

const ContentHeader: React.FC<IContentHeaderProps> = ({
  title, lineColor, children
}) => {
  
  return(
    <Container>
      <TitleContainer lineColor={lineColor}>
        <h1>{title}</h1>                
        {/* <h1>title</h1>                 */}
      </TitleContainer>
      <Controllers>
        {children}
      </Controllers>
    </Container>
  )
};

// const ContentHeader: React.FC<IContentHeaderProps> = ({
//   title, lineColor, children
// }) => (
//   <Container>
//     <TitleContainer lineColor={lineColor}>
//       {/* <h1>{title}</h1>                 */}
//       <h1>title</h1>                
//     </TitleContainer>
//     <Controllers>
//       <SelectInput />
//       {/* {children} */}
//       {/* <button type="button">Ação 1</button>
//       <button type="button">Ação 1</button> */}
//     </Controllers>
//   </Container>
// );


export default ContentHeader;