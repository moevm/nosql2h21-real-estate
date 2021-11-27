import { WithBar } from "components/templates";
import { observer } from "mobx-react";
import type { NextPage } from "next";
import authStore from "stores/auth";

const Home: NextPage = () => {
  return <WithBar>{`Hi, ${authStore.me?.firstName} ${authStore.me?.lastName}`}</WithBar>;
};

export default observer(Home);
