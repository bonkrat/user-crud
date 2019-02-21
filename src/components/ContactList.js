import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Contact from "./Contact";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import Error from "./Error";
import { UpdateContactMutation } from "./UpdateContact.graphql";

const CenteredBeatLoader = () => (
  <BeatLoader
    color="white"
    css={css`
      display: flex;
      justify-content: center;
      position: absolute;
      top: 50%;
      left: 50%;
    `}
  />
);

const StyledContactList = styled.div`
  width: 100%;
  min-width: 200px;
  overflow-x: hidden;
  color: white;
  box-sizing: border-box;
  border-radius: 5px;
  padding-bottom: 50px;
`;

const ContactList = ({ loading, error, contacts }) => {
  const [modalVisible, setModalVisibility] = useState(false);
  const [contactToUpdate, setContactToUpdate] = useState({});
  const closeModal = () => setModalVisibility(false);
  const openModal = () => setModalVisibility(true);

  return (
    <StyledContactList>
      {loading && <CenteredBeatLoader />}
      {error && <Error />}
      {contacts &&
        contacts.map(contact => {
          const { id } = contact;
          return (
            <Contact
              contact={contact}
              key={id}
              openEditModal={() => openModal()}
              setContactToUpdate={() => setContactToUpdate(contact)}
            />
          );
        })}
      <UpdateContactMutation
        visible={modalVisible}
        contact={contactToUpdate}
        closeModal={closeModal}
        setContactToUpdate={setContactToUpdate}
      />
    </StyledContactList>
  );
};

ContactList.propTypes = {
  /**
   * True when fetching data.
   */
  loading: PropTypes.bool,
  /**
   * True if there's an error when fetching data.
   */
  error: PropTypes.object,
  /**
   * Array of contacts to display.
   */
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      birthday: PropTypes.string,
      email: PropTypes.string
    })
  )
};

export default ContactList;
