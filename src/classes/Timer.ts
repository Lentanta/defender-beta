const ONE_SECOND = 1000;

export class Timer {
  startTime: number | null;
  tempTime: number;
  delaySecond: number;

  constructor(
    delaySecond: number,
  ) {
    this.startTime = null;
    this.delaySecond = delaySecond;
    this.tempTime = 0;
  };

  isTime(timeStamp: number): boolean {
    if (!this.startTime) { this.startTime = 0 };
    
    let elapsed = (timeStamp - this.startTime) / ONE_SECOND;
    if (elapsed - this.tempTime >= this.delaySecond) {
      this.tempTime = elapsed;
      return true;
    };
    return false;
  }
}