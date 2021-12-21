import type { NextPage } from "next";
import Head from "next/head";
import { WithBar } from "components/templates";
import { AdvsList, NavTabs } from "components/organisms";
import { useMemo } from "react";
import { useRouter } from "next/dist/client/router";
import AdvFilters from "components/organisms/AdvFilters";

const tabsDefault = [
  { label: "List", href: "/" },
  { label: "Map", href: "/map" },
  { label: "Tabel", href: "/table" },
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
      потом фильтры сюда бахну
      <AdvFilters />
      <NavTabs tabs={tabs} value={value} />
      {value === 0 && <AdvsList />}
      {value === 1 && "Тут карту нарисую"}
      {value === 2 && "Тут в виде таблицы"}
      {value === 3 && "Тут диграмму круглую"}
    </WithBar>
  );
};

export default Advs;
