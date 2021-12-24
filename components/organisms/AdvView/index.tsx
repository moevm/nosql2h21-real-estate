import { observer } from "mobx-react";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Card, CircularProgress, Grid, Modal, Typography } from "@mui/material";
import { Advertisement, AdvTargetType, HouseType } from "core/models";
import Image from "next/image";
import RequestStatus from "core/types/requestStatus";
import { MapsHomeWorkOutlined } from "@mui/icons-material";
import ReplieCard from "components/moleculs/ReplieCard";
import s from "./style.module.scss";
import SpecificationsTable from "./SpecificationsTable";

type Props = {
  data: Advertisement;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
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

const AdvView: React.FC<Props> = (props) => {
  const { data } = props;
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const image = useMemo(() => data.house.photo[0] || "", [data]);
  const [imageRequestStatus, setImageRequestStatus] = useState<RequestStatus>(
    (image && RequestStatus.pending) || RequestStatus.success,
  );
  const title = useMemo(() => getCustomTitle(data), [data]);

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item spacing={2}>
          <Typography variant="h5"> {title}</Typography>
        </Grid>
        <Grid container item spacing={2}>
          <Grid container item sm={6} xs={12}>
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
          </Grid>
          <Grid container item sm={6} xs={12} direction="column">
            <Typography> {data.house.address.value}</Typography>
            <br />
            <Typography> Характеристики</Typography>
            <SpecificationsTable data={data} />
            <Box mt={1}>
              <Button variant="outlined" onClick={handleOpen}>
                Откликнуться
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid container item sm={6} xs={12}>
            <Box component={Card} p={1}>
              {data.house.description}
            </Box>
          </Grid>
          <Grid container item sm={6} xs={12} direction="column" spacing={1}>
            {data.house.replies.map((r) => (
              <Grid key={r._id} item>
                <ReplieCard data={r} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Почта для связи
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <a href={`mailto:${data.house.owner.email}`}>{data.house.owner.email}</a>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default observer(AdvView);
