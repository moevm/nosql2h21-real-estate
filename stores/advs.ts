import { makeObservable, observable, override } from "mobx";
import advApi from "core/api/db/adv";
import { Advertisement } from "core/models";
import { AdvListRequestData } from "core/types/api";
import PaginatedList from "./helpers/PaginatedList";
import toasts from "./toasts";

class AdvsStore extends PaginatedList<Advertisement> {
  constructor() {
    super();
    makeObservable(this, {
      filters: observable,
      loadList: override,
    });
    this.loadList = this.loadList.bind(this);
  }

  filters: AdvListRequestData["data"] = {};

  async loadList(): Promise<void> {
    return super.loadList(advApi.list, this.filters).catch((error) => {
      if (error instanceof Error) {
        toasts.addNotification(error.message, "error");
      }
    });
  }
}

const advsStore = new AdvsStore();
export default advsStore;
