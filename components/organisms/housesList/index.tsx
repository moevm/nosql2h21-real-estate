import HouseCard from "components/moleculs/HouseCard";
import HouseCardLoading from "components/moleculs/HouseCard/HouseCardLoading";

import { observer } from "mobx-react";
import React from "react";
import housesStore from "stores/houses";

import PaginatedList from "../PaginatedList";

const HousesList: React.FC = () => {
  return (
    <>
      потом фильтры сюда бахну
      <PaginatedList store={housesStore} RowComponent={HouseCard} RowLoadingComponent={HouseCardLoading} />
    </>
  );
};

export default observer(HousesList);
