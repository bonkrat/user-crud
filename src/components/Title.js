import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import posed from "react-pose";

const TitleAnimation = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: {
    ease: [0.01, 0.64, 0.99, 0.56]
  }
});

const StyledTitle = styled.h1`
  color: white;
`;
const Title = ({ title }) => {
  return (
    <TitleAnimation>
      <StyledTitle>{title}</StyledTitle>
    </TitleAnimation>
  );
};

Title.propTypes = {
  /**
   * The title text to render
   */
  title: PropTypes.string
};

export default Title;
