import { makeObservable, observable, override } from "mobx";
import advApi from "core/api/db/adv";
import { Advertisement } from "core/models";
import { AdvListRequestData } from "core/types/api";
import PaginatedList from "./helpers/PaginatedListStore";
import toasts from "./toasts";

class AdvsStore extends PaginatedList<Advertisement, typeof advApi.list> {
  constructor() {
    super(advApi.list);
    makeObservable(this, {
      filters: observable,
      loadList: override,
    });
    this.loadList = this.loadList.bind(this);
  }

  filters: AdvListRequestData["data"] = {};

  async loadList(): Promise<void> {
    this._reqData = this.filters;
    return super.loadList().catch((error) => {
      if (error instanceof Error) {
        toasts.addNotification(error.message, "error");
      }
    });
  }
}

const advsStore = new AdvsStore();
export default advsStore;
