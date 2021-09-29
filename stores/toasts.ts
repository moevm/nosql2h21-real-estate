import genLocalId from "core/helpers/genLocalId";
import { Toast } from "core/types/toast";
import { makeAutoObservable } from "mobx";

class Toasts {
  list: Toast[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addNotification(text: Toast["text"], type: Toast["type"]): void {
    const id = genLocalId();
    this.list.push({
      id,
      text,
      type,
    });
    const timer = setTimeout(() => {
      this.closeNotification(id);
      clearTimeout(timer);
    }, 5000);
  }

  closeNotification(id: string): void {
    this.list = this.list.filter((t) => t.id !== id);
  }
}

const toasts = new Toasts();
export default toasts;
