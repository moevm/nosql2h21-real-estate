import PaginationFooter from "components/moleculs/paginationFooter";
import { ApiQueryWithPagintaion, RequestDataWithPagintaion, ResponseDataWithPagintaion } from "core/types/api";
import RequestStatus from "core/types/requestStatus";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import PaginatedListStore from "stores/helpers/PaginatedListStore";
import s from "./style.module.scss";

type Props<T> = {
  store: PaginatedListStore<T, ApiQueryWithPagintaion<RequestDataWithPagintaion, ResponseDataWithPagintaion<T[]>>>;
  RowComponent: React.FC<{ data: T }>;
  RowLoadingComponent?: React.FC;
};

const PaginatedList: React.FC<Props<any>> = (props) => {
  const { store, RowComponent, RowLoadingComponent } = props;
  useEffect(() => {
    store.loadList();
  }, [store]);
  const { requestStatus, list, pagination, nextPage, prevPage, setLimit } = store;

  return (
    <div className={s.container}>
      {requestStatus === RequestStatus.pending &&
        (RowLoadingComponent ? (
          <>
            <RowLoadingComponent />
            <RowLoadingComponent />
            <RowLoadingComponent />
            <RowLoadingComponent />
          </>
        ) : (
          "loading..."
        ))}
      {requestStatus === RequestStatus.success && (
        <>
          {list.length >= 0 ? list.map((e) => <RowComponent key={e._id} data={e} />) : "There is no data"}
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

export default observer(PaginatedList);
