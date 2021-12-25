import { Card, Chip, CircularProgress, IconButton, Typography } from "@mui/material";
import { Advertisement, HouseType, AdvTargetType } from "core/models";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useMeridiemMode } from "@mui/lab/internal/pickers/hooks/date-helpers-hooks";
import { FavoriteBorder, MapsHomeWorkOutlined, Room } from "@mui/icons-material";
import RequestStatus from "core/types/requestStatus";
import advsStore from "stores/advs";
import s from "./style.module.scss";

type Props = {
  data: Advertisement;
};

const getCustomTitle = (adv: Advertisement): string => {
  const p1 =
    (adv.house.type === HouseType.apartment && "Апартаменты") ||
    (adv.house.type === HouseType.house && "Дом") ||
    (adv.house.type === HouseType.flat && "Комната");
  const p2 = (adv.target === AdvTargetType.sell && "на продажу") || (adv.target === AdvTargetType.rents && "в аренду");
  if (![p1, p2].every(Boolean)) return adv.title;
  return [p1, p2].join(" ");
};

const AdvCard: React.FC<Props> = (props) => {
  const { data } = props;
  const image = data.house.photo[0] || "";
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
            onLoadStart={() => {
              setImageRequestStatus(RequestStatus.pending);
            }}
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
          <Link href={`/abc/${data._id}`} passHref>
            <Typography className={s.titleLink} variant="h5">
              {title}
            </Typography>
          </Link>
          <IconButton aria-label="like" component="span" className={s.likeButton}>
            <FavoriteBorder />
          </IconButton>
        </div>
        {data.tags.map((tag) => (
          <Chip key={tag._id} label={tag.value} variant="outlined" />
        ))}
        <Typography variant="subtitle1">
          {data.price.toLocaleString()} ₽ {data.target === AdvTargetType.rents && "в месяц"}
        </Typography>
        {/* <Typography className={s.title}>{data.title}</Typography> */}
        <Link
          href={{
            pathname: "/abc/list/map",
            query: { lat: data.house.address.lat, lng: data.house.address.lng },
          }}
          passHref
        >
          <div className={s.geo}>
            <Typography className={s.geo}>{data.house.address.value}</Typography>
            <IconButton aria-label="show on map" component="span">
              <Room className={s.geoIcon} />
            </IconButton>
          </div>
        </Link>
        <Typography className={s.text}>{data.house.description}</Typography>
      </div>
    </Card>
  );
};

export default AdvCard;
