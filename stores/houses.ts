import { makeObservable, observable, override } from "mobx";
import { House } from "core/models";
import { AdvListRequestData } from "core/types/api";
import houseApi from "core/api/db/house";
import PaginatedList from "./helpers/PaginatedListStore";
import toasts from "./toasts";

class HousesStore extends PaginatedList<House, typeof houseApi.list> {
  constructor() {
    super(houseApi.list);
    makeObservable(this, {
      filters: observable,
      loadList: override,
    });
    this.loadList = this.loadList.bind(this);
  }

  filters: {} = {};

  async loadList(): Promise<void> {
    this._reqData = this.filters;
    return super.loadList().catch((error) => {
      if (error instanceof Error) {
        toasts.addNotification(error.message, "error");
      }
    });
  }
}

const housesStore = new HousesStore();
export default housesStore;
