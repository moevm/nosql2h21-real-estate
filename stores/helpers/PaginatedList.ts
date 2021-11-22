import { ApiQuery, RequestDataWithPagintaion, ResponseDataWithPagintaion } from "core/types/api";
import RequestStatus from "core/types/requestStatus";
import { action, makeObservable, observable } from "mobx";

export default class PaginatedList<T> {
  constructor() {
    makeObservable(this, {
      requestStatus: observable,
      list: observable,
      pagination: observable,
      loadList: action,
    });
    this.loadList = this.loadList.bind(this);
  }

  requestStatus: RequestStatus | null = null;

  list: T[] = [];

  pagination = {
    page: 0,
    limit: 10,
    total: 0,
  };

  async loadList<
    Query extends ApiQuery<Req, Res>,
    Req extends RequestDataWithPagintaion,
    Res extends ResponseDataWithPagintaion<T[]>,
  >(query: Query, data: Req["data"]): Promise<void> {
    try {
      this.requestStatus = RequestStatus.pending;
      const req = {
        data,
        page: this.pagination.page + 1,
        limit: this.pagination.limit,
      } as Req;
      const res = await query(req);
      if (res.success === true) {
        const { data: resData, page, limit, total } = res.data;
        this.list = resData;
        this.pagination = { page, limit, total };
        this.requestStatus = RequestStatus.success;
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      this.requestStatus = RequestStatus.error;
      // if (error instanceof Error) {
      //   toasts.addNotification(error.message, "error");
      // }
      console.error(error);
      throw error;
    }
  }
}
