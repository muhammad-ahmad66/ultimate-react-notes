import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  /* flex-direction: ${(props) =>
    props.type === "vertical" ? "column" : "row"}; */
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
