import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import DeleteContactButton from "./DeleteContactButton";

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

const deleteMutation = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id)
  }
`;

export const DeleteContactMutation = ({ id }) => (
  <Mutation
    mutation={deleteMutation}
    update={cache => {
      const { contacts } = cache.readQuery({ query });
      cache.writeQuery({
        query,
        data: { contacts: contacts.filter(c => c.id !== id) }
      });
    }}
  >
    {deleteContact => (
      <DeleteContactButton id={id} deleteContact={deleteContact} />
    )}
  </Mutation>
);

DeleteContactMutation.propTypes = {
  /**
   * A contact ID
   */
  id: PropTypes.string
};
