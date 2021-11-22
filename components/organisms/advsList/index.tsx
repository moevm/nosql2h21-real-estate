import { AdvCard } from "components/moleculs";
import RequestStatus from "core/types/requestStatus";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import advsStore from "stores/advs";
import s from "./style.module.scss";

const AdvsList: React.FC = () => {
  useEffect(() => {
    advsStore.loadList();
    // return (): void => {
    //   advsStore.requestStatus = RequestStatus.pending;
    // };
  }, []);

  return (
    <div className={s.container}>
      {advsStore.requestStatus === RequestStatus.pending && "loading"}
      {advsStore.requestStatus === RequestStatus.success && advsStore.list.map((e) => <AdvCard key={e._id} data={e} />)}
    </div>
  );
};

export default observer(AdvsList);
