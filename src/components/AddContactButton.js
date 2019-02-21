import React, { useState } from "react";
import styled from "@emotion/styled";
import { FaPlusCircle } from "react-icons/fa";
import { AddContactMutation } from "./AddContact.graphql";

const StyledAddContactButton = styled.span`
  color: white;
  padding: 0;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1em;
  margin-top: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const AddContactButton = () => {
  const [modalVisible, setModalVisibility] = useState(false);

  const closeModal = () => setModalVisibility(false);

  return (
    <StyledAddContactButton>
      <FaPlusCircle onClick={() => setModalVisibility(true)} />
      <AddContactMutation
        visible={modalVisible}
        onClickAway={() => setModalVisibility(false)}
        closeModal={closeModal}
      />
    </StyledAddContactButton>
  );
};

export default AddContactButton;
