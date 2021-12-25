import { Grid, Typography } from "@mui/material";
import { WithBar } from "components/templates";
import { observer } from "mobx-react";
import type { NextPage } from "next";
import Image from "next/image";
import authStore from "stores/auth";

const Home: NextPage = () => {
  return (
    <WithBar>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4">
          Привет, {authStore.me?.firstName} {authStore.me?.lastName}
        </Typography>
        <Typography>Это стартовая страница, и тут пока пусто</Typography>
        <Typography>Если хочешь увидеть функционал, глянь на меню слева</Typography>
        {/* <Typography variant="caption">Да это немного, но это честная работа</Typography> */}
        <Image src="/images/realwork.jpeg" width={300} height={200} alt="Да это немного, но это честная работа" />
      </Grid>
    </WithBar>
  );
};

export default observer(Home);
