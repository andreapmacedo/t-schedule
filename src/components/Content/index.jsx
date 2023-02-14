import React from "react";
import { Container } from "./styles";

const Content = ({children}) => {
  return (
    <Container>
      <h1>{children}</h1>
      {/* <h1>Content</h1> */}
    </Container>
  );
}

export default Content;