import React from "react";
import Title from "./Title";
import AddContactButton from "./AddContactButton";
import styled from "@emotion/styled";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
`;

const Header = () => (
  <StyledHeader>
    <Title title="Contacts"/>
    <AddContactButton />
  </StyledHeader>
);

export default Header;
