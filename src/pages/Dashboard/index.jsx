import React from "react";
import { Container } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

const Dashboard = () => {

  const options = [
    {value: 'Lucas', label: 'Lucas'},
    {value: 'Maria', label: 'Maria'},
    {value: 'Ana', label: 'Ana'},
  ];

  return (
    <Container>  
        <ContentHeader title="Dashboard" lineColor="#F7931B">
          <SelectInput options={options}/>
        </ContentHeader>
    </Container>
  );
}

export default Dashboard;