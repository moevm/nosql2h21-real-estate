import type { NextPage } from "next";
import Head from "next/head";
import { WithBar } from "components/templates";
import { AdvsList, NavTabs } from "components/organisms";
import AdvView from "components/organisms/AdvView";
import { useRouter } from "next/dist/client/router";
import { useEffect, useMemo } from "react";
import ErrorPage from "next/error";
import advStore from "stores/adv";
import { observer } from "mobx-react";

const tabs = [
  { label: "List", href: "/" },
  { label: "Map", href: "/?map" },
  { label: "Tabel", href: "/?table" },
  { label: "Diagram", href: "/?diagram" },
];

const Advs: NextPage = () => {
  const router = useRouter();

  const id = useMemo(() => (router.query.id as string) || null, [router]);

  useEffect(() => {
    if (id) advStore.loadData(id);
  }, [id]);

  return (
    <WithBar>
      <Head>
        <title>NoSQL | Adv</title>
      </Head>
      {/* {advStore.errored && <ErrorPage statusCode={404} title={`Page not found` as string} />} */}
      {advStore.data && <AdvView data={advStore.data} />}
    </WithBar>
  );
};

export default observer(Advs);
