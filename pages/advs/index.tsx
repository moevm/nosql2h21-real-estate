import type { NextPage } from "next";
import Head from "next/head";
import WithBar from "components/templates/WithBar";
import AdvsList from "components/organisms/AdvsList";

const Advs: NextPage = () => {
  return (
    <WithBar>
      <Head>
        <title>NoSQL | Advs</title>
      </Head>

      <AdvsList />
    </WithBar>
  );
};

export default Advs;
