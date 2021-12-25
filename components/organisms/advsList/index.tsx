import { observer } from "mobx-react";
import React from "react";
import advsStore from "stores/advs";
import { AdvCard, AdvCardLoading } from "components/moleculs";
import PaginatedList from "../PaginatedList";

const AdvsList: React.FC = () => {
  return (
    <>
      <PaginatedList store={advsStore} RowComponent={AdvCard} RowLoadingComponent={AdvCardLoading} />
    </>
  );
};

export default observer(AdvsList);
