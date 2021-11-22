import type { NextPage } from "next";
import Head from "next/head";
import WithBar from "components/templates/WithBar";
import HousesList from "components/organisms/HousesList";

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
