import { observer } from "mobx-react";
import React from "react";
import advsStore from "stores/advs";
import { AdvCard, AdvCardLoading } from "components/moleculs";
import { PaginatedList } from "components/organisms";

const HousesList: React.FC = () => {
  return (
    <>
      потом фильтры сюда бахну
      <PaginatedList store={advsStore} RowComponent={AdvCard} RowLoadingComponent={AdvCardLoading} />
    </>
  );
};

export default observer(HousesList);
