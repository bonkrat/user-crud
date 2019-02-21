import React from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import styled from "@emotion/styled";

const StyledButton = styled.div`
  margin: 5px 0;
  opacity: 0.5;
  :hover {
    opacity: 1;
  }
`;

const DeleteContactButton = ({ id, deleteContact }) => {
  return (
    <StyledButton>
      <FaTrash onClick={() => deleteContact({ variables: { id } })} />
    </StyledButton>
  );
};

DeleteContactButton.propTypes = {
  /**
   * Contact ID to delete.
   */
  id: PropTypes.string,
  /**
   * Handler for deleting the contact.
   */
  deleteContact: PropTypes.func
};

export default DeleteContactButton;
