import { AdvCard } from "components/moleculs";
import AdvCardLoading from "components/moleculs/advCard/AdvCardLoading";

import { observer } from "mobx-react";
import React from "react";
import advsStore from "stores/advs";
import PaginatedList from "../paginatedList";

const AdvsList: React.FC = () => {
  return (
    <>
      потом фильтры сюда бахну
      <PaginatedList store={advsStore} RowComponent={AdvCard} RowLoadingComponent={AdvCardLoading} />
    </>
  );
};

export default observer(AdvsList);
