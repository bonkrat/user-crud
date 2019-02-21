import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ContactList from "./ContactList";
import { get } from "lodash";

export const query = gql`
  {
    contacts {
      id
      name
      birthday
      email
    }
  }
`;

const ContactListQuery = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      const contacts = get(data, "contacts");
      return (
        <ContactList loading={loading} error={error} contacts={contacts} />
      );
    }}
  </Query>
);

export default ContactListQuery;
