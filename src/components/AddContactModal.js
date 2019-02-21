import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-awesome-modal";
import styled from "@emotion/styled";
import ContactForm from "./ContactForm";
import Title from "./Title";

const StyledModalContents = styled.div`
  font-size: 0.75rem;
  height: 100%;
  width: 100%;
  padding: 50px;
  background: rgb(32, 32, 32);
  background: linear-gradient(
    90deg,
    rgba(32, 32, 32, 1) 0%,
    rgba(38, 38, 38, 1) 100%,
    rgba(32, 32, 32, 1) 100%
  );
  box-sizing: border-box;
  cursor: arrow;
`;

const ModalButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const SubmitButton = styled.div`
  padding: 10px;
  color: #202020;
  background-color: #f4f4f4;
  cursor: pointer;
`;

const CancelButton = styled.div`
  padding: 10px;
  color: #f4f4f4;
  background-color: #202020;
  border: 1px solid #f4f4f4;
  cursor: pointer;
`;

const AddContactModal = ({ addContact, visible, closeModal }) => {
  const [contact, setContact] = useState({});

  const { name, email, birthday } = contact;

  const closeAndClearModal = () => {
    closeModal();
    setContact({});
  };

  return (
    <Modal visible={visible} width="400" effect="fadeInUp">
      <StyledModalContents>
        <Title title="New Contact" />
        <ContactForm contact={contact} setContact={setContact} />
        <ModalButtons>
          <CancelButton onClick={() => closeAndClearModal()}>
            Cancel
          </CancelButton>
          <SubmitButton
            onClick={() => {
              addContact({ variables: { name, email, birthday } });
              closeAndClearModal();
            }}
          >
            Add Contact
          </SubmitButton>
        </ModalButtons>
      </StyledModalContents>
    </Modal>
  );
};

AddContactModal.propTypes = {
  /**
   * Handler for adding a contact
   */
  addContact: PropTypes.func,
  /**
   * Controls visibility of the AddContactModal
   */
  visible: PropTypes.bool,
  /**
   * Handler for closing the modal.
   */
  closeModal: PropTypes.func
};

export default AddContactModal;
