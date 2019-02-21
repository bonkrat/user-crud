import React from "react";
import PropTypes from "prop-types";
import { FaPencilAlt } from "react-icons/fa";
import styled from "@emotion/styled";

const StyledButton = styled.div`
  margin: 5px 0;
  opacity: 0.5;
  :hover {
    opacity: 1;
  }
`;

const UpdateContactButton = ({ openEditModal, setContactToUpdate }) => {
  return (
    <StyledButton>
      <FaPencilAlt
        onClick={() => {
          setContactToUpdate();
          openEditModal();
        }}
      />
    </StyledButton>
  );
};

UpdateContactButton.propTypes = {
  /**
   * Handler for opening the edit modal.
   */
  openEditModal: PropTypes.func,
  /**
   * Handler for setting the contact to update in the UpdateContactModal.
   */
  setContactToUpdate: PropTypes.func
};

export default UpdateContactButton;
