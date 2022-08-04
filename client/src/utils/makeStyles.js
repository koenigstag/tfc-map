import { css } from "@mui/material/styles";
import { css as emotionCss } from "@emotion/css";

const makeStyles = (jss = {}) => {
  const cssStyles = {};
  const classnames = {};

  for (const key in jss) {
    if (Object.hasOwnProperty.call(jss, key)) {
      const element = jss[key];
      const basicClass = css(element);
      cssStyles[key] = basicClass;
      const basicClassName = emotionCss(basicClass.styles);
      classnames[key] = basicClassName;
    }
  }

  return () => classnames
};

export default makeStyles;
