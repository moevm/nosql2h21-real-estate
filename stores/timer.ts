import { makeAutoObservable } from "mobx";

class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
    this.increaseTimer = this.increaseTimer.bind(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }
}

const timer = new Timer();
export default timer;
