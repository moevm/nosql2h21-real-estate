import type { NextPage } from "next";
import Head from "next/head";
import { WithBar } from "components/templates";
import { AdvsList, NavTabs } from "components/organisms";

const tabs = [
  { label: "List", href: "/" },
  { label: "Map", href: "/?map" },
  { label: "Tabel", href: "/?table" },
  { label: "Diagram", href: "/?diagram" },
];

const Advs: NextPage = () => {
  return (
    <WithBar>
      <Head>
        <title>NoSQL | Advs</title>
      </Head>

      {/* <NavTabs tabs={tabs} /> */}

      <AdvsList />
    </WithBar>
  );
};

export default Advs;
