import type { NextPage } from "next";
import Head from "next/head";
import WithBar from "components/templates/withBar";
import HousesList from "components/organisms/housesList";

const Advs: NextPage = () => {
  return (
    <WithBar>
      <Head>
        <title>NoSQL | Advs</title>
      </Head>
      <HousesList />
    </WithBar>
  );
};

export default Advs;
