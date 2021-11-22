import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { AdvCard, PaginationFooter } from "components/moleculs";
import RequestStatus from "core/types/requestStatus";
import advsStore from "stores/advs";
import s from "./style.module.scss";

const AdvsList: React.FC = () => {
  useEffect(() => {
    advsStore.loadList();
    // return (): void => {
    //   advsStore.requestStatus = RequestStatus.pending;
    // };
  }, []);
  const { requestStatus, list, pagination, nextPage, prevPage, setLimit } = advsStore;

  return (
    <div className={s.container}>
      {requestStatus === RequestStatus.pending && "loading"}
      {requestStatus === RequestStatus.success && (
        <>
          {list.map((e) => (
            <AdvCard key={e._id} data={e} />
          ))}
          <PaginationFooter
            total={pagination.total}
            page={pagination.page}
            limit={pagination.limit}
            next={nextPage}
            prev={prevPage}
            setLimit={setLimit}
          />
        </>
      )}
    </div>
  );
};

export default observer(AdvsList);
