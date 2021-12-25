import { Alert } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import toasts from "stores/toasts";
import s from "./style.module.scss";

const ToastManager: React.FC = () => {
  return (
    <div className={s.container}>
      {toasts.list.map((e) => (
        <Alert
          key={e.id}
          onClose={(): void => {
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
