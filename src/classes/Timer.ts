const ONE_SECOND = 1000;

export class Timer {
  startTime: number = 0;
  tempTime: number;
  delaySecond: number;

  constructor(
    delaySecond: number,
  ) {
    this.delaySecond = delaySecond;
    this.tempTime = 0;
  };

  isTime(timeStamp: number): boolean {
    let elapsed = (timeStamp - this.startTime) / ONE_SECOND;
    if (elapsed - this.tempTime >= this.delaySecond) {
      this.tempTime = elapsed;
      return true;
    };
    return false;
  }
}