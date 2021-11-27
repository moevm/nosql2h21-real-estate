import { ApiQuery, ApiQueryWithPagintaion, RequestDataWithPagintaion, ResponseDataWithPagintaion } from "core/types/api";
import RequestStatus from "core/types/requestStatus";
import { action, makeObservable, observable } from "mobx";

export default class PaginatedListStore<
  T,
  Query extends ApiQueryWithPagintaion<Req, Res>,
  Req extends RequestDataWithPagintaion = RequestDataWithPagintaion,
  Res extends ResponseDataWithPagintaion<T[]> = ResponseDataWithPagintaion<T[]>,
  // eslint-disable-next-line prettier/prettier
  > {
  constructor(query: Query) {
    makeObservable(this, {
      requestStatus: observable,
      list: observable,
      pagination: observable,
      loadList: action,
      nextPage: action,
      prevPage: action,
      setLimit: action,
    });
    this.loadList = this.loadList.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.setLimit = this.setLimit.bind(this);
    this.query = query;
  }

  query: ApiQuery<Req, Res> | null = null;

  requestStatus: RequestStatus | null = null;

  list: T[] = [];

  pagination = {
    page: 0,
    limit: 10,
    total: 0,
  };

  protected _reqData: Req["data"] = {};

  async loadList(): Promise<void> {
    if (this.requestStatus === RequestStatus.pending) return;
    try {
      this.requestStatus = RequestStatus.pending;

      const req = {
        data: this._reqData,
        page: this.pagination.page,
        limit: this.pagination.limit,
      } as Req;
      if (!this.query) return;
      const res = await this.query!(req);
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
      throw error;
    }
  }

  async nextPage(): Promise<void> {
    if (this.pagination.page >= this.pagination.total / this.pagination.limit) return;
    this.pagination.page += 1;
    await this.loadList();
  }

  async prevPage(): Promise<void> {
    if (this.pagination.page <= 0) return;
    this.pagination.page -= 1;
    await this.loadList();
  }

  async setLimit(limit: number): Promise<void> {
    this.pagination.limit = limit;
    this.pagination.page = 0;
    await this.loadList();
  }
}
