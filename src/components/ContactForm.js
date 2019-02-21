import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import moment from "moment";
import { ClassNames } from "@emotion/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StyledInput = styled.input`
  width: 100%;
  font-size: 0.75rem;
  letter-spacing: 0.01rem;
  line-height: 1.5;
  background: #f3f3f3;
  color: #202020;
  -webkit-font-smoothing: antialiased;
  margin: 0 0 15px 0;
  padding: 5px 5px 5px 5px;
  box-shadow: none;
  box-sizing: border-box;
`;

const ContactForm = ({ contact, setContact }) => {
  return (
    <form>
      <span>Name</span>
      <br />
      <StyledInput
        type="text"
        value={contact.name || ""}
        label="Name"
        onChange={e => {
          setContact({ ...contact, name: e.target.value });
        }}
      />
      <br />
      Email Address
      <br />
      <StyledInput
        type="text"
        label="Email Address"
        value={contact.email || ""}
        onChange={e => {
          setContact({ ...contact, email: e.target.value });
        }}
      />
      <br />
      Birthday
      <br />
      <ClassNames>
        {({ css }) => (
          <DatePicker
            className={css`
              font-size: 0.75rem;
              letter-spacing: 0.01rem;
              line-height: 1.5;
              background: #f4f4f4;
              color: #202020;
              -webkit-font-smoothing: antialiased;
              margin: 0 0 15px 0;
              padding: 5px;
              box-sizing: border-box;
              width: 300px;
            `}
            value={
              contact.birthday
                ? moment(contact.birthday).format("MMM Do, YYYY")
                : ""
            }
            onChange={date => {
              setContact({ ...contact, birthday: date });
            }}
            style={{
              backgroundColor: "green"
            }}
          />
        )}
      </ClassNames>
    </form>
  );
};

ContactForm.propTypes = {
  /**
   * The contact to render.
   */
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    birthday: PropTypes.instanceOf(Date),
    email: PropTypes.string
  }),
  /**
   * Handler for setting the contact when the form fields change.
   */
  setContact: PropTypes.func
};

export default ContactForm;
