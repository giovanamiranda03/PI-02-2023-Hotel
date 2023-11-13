import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-family: 'inter', sans-serif;
  }
  
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #16161A;
    color: #fff;
    box-shadow: 0px 0px 5px #ccc;
  }
`;

export default Global;