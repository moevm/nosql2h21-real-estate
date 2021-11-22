import React from "react";
import { ApiQueryWithPagintaion, RequestDataWithPagintaion, ResponseDataWithPagintaion } from "core/types/api";
import PaginatedListStore from "stores/helpers/PaginatedListStore";
import PaginatedList from "components/organisms/PaginatedList";
// waste
export const usePaginatedList = <
  T,
  Query extends ApiQueryWithPagintaion<RequestDataWithPagintaion, ResponseDataWithPagintaion<T[]>>,
  // eslint-disable-next-line prettier/prettier
  >(store: PaginatedListStore<T, Query>, RowComponent: React.FC<{ data: T }>): React.FC => {

  const ListComponent: React.FC = () => <PaginatedList store={store} RowComponent={RowComponent} />;
  return ListComponent;
};
