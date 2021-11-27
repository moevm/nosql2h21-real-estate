import { Card, Skeleton } from "@mui/material";
import React from "react";
import s from "./style.module.scss";

const HouseCardLoading: React.FC = () => {
  return (
    <Card className={s.card} variant="outlined">
      <div className={s.image}>
        <Skeleton variant="rectangular" animation="wave" height="100%" width="100%" />
      </div>
      <div className={s.info}>
        <div className={s.header}>
          <Skeleton animation="wave" width="60%" />
        </div>

        <div className={s.geo}>
          <Skeleton animation="wave" width="80%" />
        </div>
        <Skeleton animation="wave" width="20%" />
        <Skeleton animation="wave" width="76%" />
        <Skeleton animation="wave" width="70%" />
        <Skeleton animation="wave" width="82%" />
        <Skeleton animation="wave" width="73%" />
      </div>
    </Card>
  );
};

export default HouseCardLoading;
