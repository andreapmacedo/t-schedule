import styled from 'styled-components';

export const Container = styled.div`
  
  grid-area: MH;
  
  background-color: ${props => props.theme.colors.secondary}; // #252A48102030

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid ${props => props.theme.colors.gray};


`;

export const Profile = styled.div`
    
  
  color: ${props => props.theme.colors.white};
  
  
`;

export const Welcome = styled.div`
  
 
  
  background-color: ${props => props.theme.colors.secondary}; // #252A48102030

`;

export const UserName = styled.div`
  
 
  
  background-color: ${props => props.theme.colors.secondary}; // #252A48102030

`;
 