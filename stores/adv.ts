import advApi from "core/api/db/adv";
import { Advertisement } from "core/models";
import { makeAutoObservable } from "mobx";

class Adv {
  data: Advertisement | null = null;

  errored: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async loadData(id: string) {
    try {
      const res = await advApi.read({ id });
      if (res.success) this.data = res.data;
    } catch {
      this.errored = true;
    }
  }
}

const advStore = new Adv();
export default advStore;
