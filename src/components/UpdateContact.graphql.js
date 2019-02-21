import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { findIndex } from "lodash";
import UpdateContactModal from "./UpdateContactModal";

const query = gql`
  {
    contacts {
      id
      name
      email
      birthday
    }
  }
`;

const updateMutation = gql`
  mutation UpdateContact(
    $id: ID!
    $name: String
    $email: String
    $birthday: String
  ) {
    updateContact(id: $id, name: $name, email: $email, birthday: $birthday) {
      id
    }
  }
`;

export const UpdateContactMutation = ({
  visible,
  contact,
  setContactToUpdate,
  closeModal
}) => (
  <Mutation
    mutation={updateMutation}
    update={cache => {
      const { id, name, email, birthday } = contact;
      const { contacts } = cache.readQuery({ query });
      const contactToUpdateIndex = findIndex(contacts, { id });
      // Add updated contact information.
      contacts.splice(contactToUpdateIndex, 1, {
        __typename: "Contact",
        id,
        name,
        email,
        birthday
      });
      cache.writeQuery({
        query,
        data: { contacts }
      });
    }}
  >
    {updateContact => (
      <UpdateContactModal
        visible={visible}
        contact={contact}
        setContactToUpdate={setContactToUpdate}
        closeModal={closeModal}
        updateContact={updateContact}
      />
    )}
  </Mutation>
);

UpdateContactMutation.propTypes = {
  /**
   * Controls showing the UpdateContactModal.
   */
  visible: PropTypes.bool,
  /**
   * The contact to update.
   */
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    birthday: PropTypes.string,
    email: PropTypes.string
  }),
  /**
   * Handler for setting the contact to update.
   */
  setContactToUpdate: PropTypes.func,
  /**
   * Handler for closing the UpdateContactModal.
   */
  closeModal: PropTypes.func
};
