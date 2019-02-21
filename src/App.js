import React from "react";
import Layout from "./components/Layout";
import { ApolloProvider } from "react-apollo";
import ContactList from "./components/ContactList.graphql";
import Header from "./components/Header";
import client from "./graphql/client";
import "./App.css";

const App = () => (
  <ApolloProvider client={client}>
    <Layout>
      <Header />
      <ContactList />
    </Layout>
  </ApolloProvider>
);
export default App;
