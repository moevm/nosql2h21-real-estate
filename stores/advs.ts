import { action, makeObservable, observable, override } from "mobx";
import advApi from "core/api/db/adv";
import { Advertisement } from "core/models";
import { AdvListRequestData } from "core/types/api";
import PaginatedList from "./helpers/PaginatedListStore";
import toasts from "./toasts";

const defaultFilters = {
  title: undefined,
  price: {},
  target: undefined,
  finishing: undefined,
  size: {},
  countBathrooms: {},
  rating: {},
  ownerRating: {},
  hasBalcony: undefined,
};

// @ts-ignore
class AdvsStore extends PaginatedList<Advertisement, typeof advApi.list> {
  constructor() {
    super(advApi.list);
    makeObservable(this, {
      filters: observable,
      clearFilters: action,
      loadList: override,
    });
    this.loadList = this.loadList.bind(this);
    this.loadAll = this.loadAll.bind(this);
  }

  filters: AdvListRequestData["data"] = defaultFilters;

  clearFilters(): void {
    this.filters = defaultFilters;
  }

  async loadList(): Promise<void> {
    this._reqData = this.filters;
    return super.loadList().catch((error) => {
      if (error instanceof Error) {
        toasts.addNotification(error.message, "error");
      }
    });
  }

  async loadAll(): Promise<void> {
    this._reqData = this.filters;
    console.log(this.filters);
    return super.loadAll().catch((error) => {
      if (error instanceof Error) {
        toasts.addNotification(error.message, "error");
      }
    });
  }
}

const advsStore = new AdvsStore();
export default advsStore;
