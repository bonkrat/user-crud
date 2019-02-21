import React from "react";
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
  background-color: #202020;
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

const UpdateContactModal = ({
  updateContact,
  visible,
  contact,
  setContactToUpdate,
  closeModal
}) => {
  const closeAndClearModal = () => {
    setContactToUpdate({});
    closeModal();
  };

  const { id, name, email, birthday } = contact;

  return (
    <Modal visible={visible} width="400" effect="fadeInUp">
      <StyledModalContents>
        <Title title="Update Contact" />
        <ContactForm contact={contact} setContact={setContactToUpdate} />
        <ModalButtons>
          <CancelButton onClick={() => closeAndClearModal()}>
            Cancel
          </CancelButton>
          <SubmitButton
            onClick={() => {
              updateContact({ variables: { id, name, email, birthday } });
              closeAndClearModal();
            }}
          >
            Update Contact
          </SubmitButton>
        </ModalButtons>
      </StyledModalContents>
    </Modal>
  );
};

UpdateContactModal.propTypes = {
  /**
   * Mutation handler for updating a contact.
   */
  updateContact: PropTypes.func,
  /**
   * Controls showing the UpdateContactModal.
   */
  visible: PropTypes.bool,
  /**
   * The contact to render.
   */
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    birthday: PropTypes.string,
    email: PropTypes.string
  }),
  /**
   * Sets the contact to update in the modal.
   */
  setContactToUpdate: PropTypes.func,
  /**
   * Handler for closing the UpdateContactModal.
   */
  closeModal: PropTypes.func
};

export default UpdateContactModal;
