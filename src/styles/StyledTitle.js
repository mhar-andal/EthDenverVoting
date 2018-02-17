import styled, { keyframes } from "styled-components";

const StyledKeyframe = keyframes`
0% { background-position: 0px 0px; }
100% { background-position: 1000px 1000px; }
`;

export const StyledTitle = styled.div`
  color: #3498db;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  background: #e5e5e5;
  font-family: "Shrikhand", cursive;
  margin: 0;
  font-size: calc(800% + 1vmin);
  line-height: 110%;
  padding: 0 1em;
  background: #D50000;
  background: linear-gradient(
    to bottom,
    #2962FF 0%,
    #2962FF 33%,
    #fff 33%,
    #fff 66%,
    #D50000 66%,
    #D50000 100%
  );
  background-repeat: repeat;
  background-size: 100% 100%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation-name: ${StyledKeyframe};
  animation-duration: 15s;
  animation-iteration-count: infinite;
}
`;

export default StyledTitle;
