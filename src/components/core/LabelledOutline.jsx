import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import InputLabel from "@material-ui/core/InputLabel";
import NotchedOutline from "@material-ui/core/OutlinedInput/NotchedOutline";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  content: (props) => ({
    padding: "15px 14px",
    borderRadius: 10,
    width: 195,
    height: 50,
    fontWeight: "bold",
    backgroundColor: theme.white,
    color: props.color,
  }),
  inputLabel: {
    position: "absolute",
    left: 0,
    top: 0,
    transform: "translate(0, 24px) scale(1)",
  },
}));

export default function LabelledOutline({ id, label, children, color }) {
  const [labelWidth, setLabelWidth] = useState(0);
  const labelRef = useRef(null);
  const classes = useStyles({ color: color });

  useEffect(() => {
    const labelNode = ReactDOM.findDOMNode(labelRef.current);
    setLabelWidth(labelNode != null ? labelNode.offsetWidth : 0);
  }, [label]);

  return (
    <div style={{ position: "relative", marginTop: "8px" }}>
      <InputLabel
        ref={labelRef}
        htmlFor={id}
        variant="outlined"
        className={classes.inputLabel}
        shrink
      >
        {label}
      </InputLabel>
      <div className={classes.root}>
        <div id={id} className={classes.content}>
          {children}
          <NotchedOutline notched labelWidth={labelWidth} />
        </div>
      </div>
    </div>
  );
}
