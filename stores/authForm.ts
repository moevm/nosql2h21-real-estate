import authApi from "core/api/auth";
import { SignInRequestData, SignUpRequestData } from "core/types/api";
import RequestStatus from "core/types/requestStatus";
import { makeAutoObservable } from "mobx";
import authStore from "./auth";
import toasts from "./toasts";

class AuthFormStore {
  requestStatus: RequestStatus | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async signIn(data: SignInRequestData): Promise<void> {
    try {
      this.requestStatus = RequestStatus.pending;
      const resData = await authApi.signIn(data);
      if (resData.success === true) {
        authStore.setUser(resData.data);
        authStore.isChecked = true;
        this.requestStatus = RequestStatus.success;
        toasts.addNotification(`Success SignIn, ${resData.data.email}!`, "success");
      } else {
        throw new Error(resData.error);
      }
    } catch (error) {
      this.requestStatus = RequestStatus.error;
      toasts.addNotification("Some error of SignUp!", "warning");
      toasts.addNotification((error as Error).message, "error");
      console.error(error);
    }
  }

  async signUp(data: SignUpRequestData): Promise<void> {
    try {
      this.requestStatus = RequestStatus.pending;
      const resData = await authApi.signUp(data);
      if (resData.success === true) {
        authStore.setUser(resData.data);
        authStore.isChecked = true;
        this.requestStatus = RequestStatus.success;
        toasts.addNotification("Success SignUp!", "success");
        return;
      }

      throw new Error(resData.error);
    } catch (error) {
      this.requestStatus = RequestStatus.error;
      toasts.addNotification("Some error of SignUp!", "warning");
      toasts.addNotification((error as Error).message, "error");
      console.error(error);
    }
  }
}

const authFormStore = new AuthFormStore();
export default authFormStore;
