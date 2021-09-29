import { Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { observer } from "mobx-react";
import React from "react";
import toasts from "stores/toasts";

const useStyles: any = makeStyles(() => ({
  container: {
    position: "absolute",
    // border: 3px solid black,
    margin: "auto",
    bottom: 8,
    left: 0,
    right: 0,
    top: "auto",
    width: "100%",
    pointerEvents: "none",
    "& > *": {
      pointerEvents: "all",
      width: 400,
      margin: "0 auto",
    },
  },
}));

const ToastManager: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      {toasts.list.map((e) => (
        <Alert
          key={e.id}
          onClose={() => {
            toasts.closeNotification(e.id);
          }}
          severity={e.type}
        >
          {e.text}
        </Alert>
      ))}
    </div>
  );
};

export default observer(ToastManager);
