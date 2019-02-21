import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import posed from "react-pose";
import moment from "moment";
import { DeleteContactMutation } from "./DeleteContact.graphql";
import UpdateContactButton from "./UpdateContactButton";

const Birthday = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.01rem;
  line-height: 1.5;
  color: #f4f4f4;
  -webkit-font-smoothing: antialiased;
  margin-top: 20px;
`;

const Email = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.01rem;
  line-height: 1.5;
  color: #f4f4f4;
  -webkit-font-smoothing: antialiased;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  letter-spacing: 0.01rem;
  line-height: 1.5;
  color: #fafafa;
  -webkit-font-smoothing: antialiased;
`;

const StyledContact = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%
    color: white;
    padding: 15px;
    margin: 8px 0;
background: rgb(32,32,32);
background: linear-gradient(90deg, rgba(32,32,32,1) 0%, rgba(38,38,38,1) 100%, rgba(32,32,32,1) 100%);
    opacity: 0.8;
    box-shadow: rgba(20, 20, 20, 0.27) 0.0555556rem 0.0555556rem 1.11111rem;
    :hover {
        opacity: 1;
        cursor: pointer;
    }
`;

const ContactAnimation = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: {
    ease: [0.01, 0.64, 0.99, 0.56]
  }
});

const Contact = ({ contact, setContactToUpdate, openEditModal }) => {
  const { id, name, birthday, email } = contact;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 250);
  });

  return (
    <ContactAnimation pose={isVisible ? "visible" : "hidden"}>
      <StyledContact>
        <div>
          <Name>{name}</Name>
          <Email>{email}</Email>
          <Birthday>
            <span role="img" aria-label="birthday">
              🎂
            </span>{" "}
            {moment(birthday).format("MMM Do, YYYY")}
          </Birthday>
        </div>
        <div>
          <UpdateContactButton
            contact={contact}
            openEditModal={openEditModal}
            setContactToUpdate={() => setContactToUpdate()}
          />
          <DeleteContactMutation id={id} />
        </div>
      </StyledContact>
    </ContactAnimation>
  );
};

Contact.propTypes = {
  /**
   * The contact to render.
   */
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    birthday: PropTypes.string,
    email: PropTypes.string
  }),
  /**
   * Handlers for setting the contact to update for the UpdateContactModal.
   */
  setContactToUpdate: PropTypes.func,
  /**
   * Handler for opening the edit modal.
   */
  openEditModal: PropTypes.func
};

export default Contact;
