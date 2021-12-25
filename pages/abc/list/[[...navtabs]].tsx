import type { NextPage } from "next";
import Head from "next/head";
import { WithBar } from "components/templates";
import { AdvFilters, AdvGraphs, AdvsList, AdvsMap, AdvTable, NavTabs } from "components/organisms";
import { useMemo } from "react";
import { useRouter } from "next/dist/client/router";

const tabsDefault = [
  { label: "List", href: "/" },
  { label: "Map", href: "/map" },
  { label: "Table", href: "/table" },
  { label: "Diagram", href: "/diagram" },
];

const Advs: NextPage = () => {
  const router = useRouter();
  const tabs = useMemo(
    () => tabsDefault.map((e) => ({ ...e, href: router.pathname.replace("/[[...navtabs]]", "") + e.href })),
    [router],
  );
  const value = useMemo(() => {
    const idx = tabs.findIndex(({ href }) => href === router.asPath);
    if (idx <= -1) return 0;
    return idx;
  }, [router, tabs]);

  return (
    <WithBar>
      <Head>
        <title>NoSQL | Advs</title>
      </Head>
      <AdvFilters flag={(value === 1 && "fullloading") || null} />
      <NavTabs tabs={tabs} value={value} />
      {value === 0 && <AdvsList />}
      {value === 1 && <AdvsMap />}
      {value === 2 && <AdvTable />}
      {value === 3 && <AdvGraphs />}
    </WithBar>
  );
};

export default Advs;
