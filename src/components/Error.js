import React from "react";
import styled from "@emotion/styled";

const StyledError = styled.div`
    width: 50%
    color: white;
    padding: 15px;
    margin: 10px 0;
    background-color: #202020;
    opacity: 0.8;
    box-shadow: rgba(20, 20, 20, 0.27) 0.0555556rem 0.0555556rem 1.11111rem;
    font-weight: bold;
`;

const Error = () => (
  <StyledError>
    <span role="img" aria-label="error">
      ❗
    </span>
    Something went wrong!
  </StyledError>
);

export default Error;
