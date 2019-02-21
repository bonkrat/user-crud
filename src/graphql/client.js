import ApolloClient from "apollo-boost";

/**
 * Builds an Apollo client that points to an Apollo Server for user CRUD.
 * @param {*} config
 */
export function createClient(config = {}) {
  const client = new ApolloClient({
    uri: "http://localhost:4001/graphql"
  });

  return client;
}

export default createClient();
