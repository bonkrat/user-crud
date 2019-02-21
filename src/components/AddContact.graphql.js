import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import AddContactModal from "./AddContactModal";
import { query } from "./ContactList.graphql";

const addMutation = gql`
  mutation AddContact($name: String!, $email: String, $birthday: String) {
    addContact(name: $name, email: $email, birthday: $birthday) {
      id
      name
      email
      birthday
    }
  }
`;

export const AddContactMutation = ({ visible, closeModal }) => (
  <Mutation
    mutation={addMutation}
    update={(cache, { data: { addContact } }) => {
      const { contacts } = cache.readQuery({ query });
      cache.writeQuery({
        query,
        data: { contacts: [addContact].concat(contacts) }
      });
    }}
  >
    {addContact => (
      <AddContactModal
        addContact={addContact}
        visible={visible}
        closeModal={closeModal}
      />
    )}
  </Mutation>
);

AddContactMutation.propTypes = {
  /**
   * Controls visibility of the AddContactModal
   */
  visible: PropTypes.bool,
  /**
   * Handler for closing the modal
   */
  closeModal: PropTypes.func
};
