import { User } from "core/models";
import { makeAutoObservable } from "mobx";
import * as authApi from "core/api/auth";
import toasts from "./toasts";

class AuthStore {
  me: User | null = null;

  isChecked: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.setUser = this.setUser.bind(this);
    this.signOut = this.signOut.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
  }

  setUser(user: User | null): void {
    console.log(`user`, user);
    this.me = user;
  }

  async checkAuth(): Promise<void> {
    try {
      this.isChecked = false;
      const res = await authApi.getMe();
      if (res.success === true) {
        this.me = res.data;
        if (this.me?.firstName) toasts.addNotification(`Hi, ${this.me?.firstName}`, "success");
      } else {
        // TODO:
        this.me = null;
        throw new Error(res.error);
      }
    } catch (error) {
      console.error(error);
    }
    this.isChecked = true;
  }

  async signOut(): Promise<void> {
    this.isChecked = false;
    this.me = null;
    try {
      await authApi.signOut();
      toasts.addNotification("Success SignOut!", "info");
    } catch (error) {
      console.error(error);
    }
    this.isChecked = true;
  }
  // async signIn(data: SignInRequestData): Promise<void> {
  //   this.requestStatus = RequestStatus.pending;
  //   signIn("my-login", data);
  // }
}

const authStore = new AuthStore();
export default authStore;
