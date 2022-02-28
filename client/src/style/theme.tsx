
import { DefaultTheme } from "styled-components";

const size = {
    mobile: '400px',
    tablet: '767px', 
    desktop: '768px'
};

export const theme: DefaultTheme = {
  red: "#E51013",
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#2F2F2F",
  },
  white: {
    lighter: "#fff",
    darker: "#e5e5e5",
  },
  mobile: `(max-width: ${size.mobile})`, 
  tablet: `(max-width: ${size.tablet})`, 
  desktop : `(min-width: ${size.desktop})`
};

export default theme