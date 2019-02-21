const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const querystring = require("query-string");
const url = require("url");

const hostname = "http://localhost:3000/accounts";

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type Contact {
    id: ID!
    name: String!
    birthday: String
    email: String
  }

  type Query {
    contacts: [Contact]
  }

  type Mutation {
    addContact(name: String!, email: String, birthday: String): Contact
    deleteContact(id: ID!): String
    updateContact(id: ID!, name: String, email: String, birthday: String): Contact
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    contacts: async () => {
      const { data: contacts } = await axios.get(hostname);
      return contacts;
    }
  },
  Mutation: {
    addContact: async (root, args) => {
      const { name, birthday, email } = args;
      const newContact = {
        name,
        birthday,
        email
      };
      const encodedContact = querystring.stringify(newContact);
      const { data } = await axios.post(hostname, encodedContact, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      const { id } = data;
      return {
        id,
        ...newContact
      };
    },
    deleteContact: async (root, args) => {
      const { id } = args;
      const deleteHref = url.resolve(hostname, `./accounts/${id}`);
      const { data } = await axios.delete(deleteHref);
      const { success } = data;
      return success;
    },
    updateContact: async (root, args) => {
      const { id, name, birthday, email } = args;
      const updateHref = url.resolve(hostname, `./accounts/${id}`);
      const contact = {
        name,
        birthday,
        email
      };
      const encodedContact = querystring.stringify(contact);
      const {
        data: { updated }
      } = await axios.put(updateHref, encodedContact, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      return updated;
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen(4001).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
