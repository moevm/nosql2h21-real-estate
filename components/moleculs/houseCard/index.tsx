import { Card, CircularProgress, Typography } from "@mui/material";
import { HouseType, House, FinishingType } from "core/models";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { MapsHomeWorkOutlined } from "@mui/icons-material";
import RequestStatus from "core/types/requestStatus";
import s from "./style.module.scss";

type Props = {
  data: House;
};

const getCustomTitle = (house: House): string => {
  const p1 =
    (house.type === HouseType.apartment && "Апартаменты") ||
    (house.type === HouseType.house && "Дом") ||
    (house.type === HouseType.flat && "Комната");
  const p2 = house.size ? `, ${house.size} м2` : "";
  return [p1, p2].join(" ");
};

const HouseCard: React.FC<Props> = (props) => {
  const { data } = props;
  const image = data.photo[0] || "";
  const [imageRequestStatus, setImageRequestStatus] = useState<RequestStatus>(
    (image && RequestStatus.pending) || RequestStatus.success,
  );

  const title = useMemo(() => getCustomTitle(data), [data]);

  return (
    <Card className={s.card} variant="outlined">
      <div className={s.image}>
        {(imageRequestStatus === RequestStatus.pending && <CircularProgress className={s.progress} />) ||
          ((!image || imageRequestStatus === RequestStatus.error) && <MapsHomeWorkOutlined className={s.houseIcon} />)}
        {image && imageRequestStatus !== RequestStatus.error && (
          <Image
            src={image}
            alt="house photo"
            layout="fill"
            objectFit="cover"
            onLoadingComplete={() => {
              setImageRequestStatus(RequestStatus.success);
            }}
            onError={() => {
              setImageRequestStatus(RequestStatus.error);
            }}
          />
        )}
      </div>
      <div className={s.info}>
        <div className={s.header}>
          <Typography variant="h5">{title}</Typography>
        </div>
        <Typography variant="subtitle1">{data.finishing === FinishingType.norm ? "Нормальный" : "Плохой"} ремонт</Typography>
        {/* <Typography className={s.title}>{data.title}</Typography> */}
        <div className={s.geo}>
          <Typography className={s.geo}>{data.address.value}</Typography>
        </div>
        <Typography className={s.text}>{data.description}</Typography>
      </div>
    </Card>
  );
};

export default HouseCard;
