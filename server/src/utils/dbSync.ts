import EventEmitter from 'events';

class DbSync {
  private eventName: string;
  private complete: boolean;
  private status: boolean;
  private emitter: EventEmitter;
  private interval: any;

  constructor(eventName, emitter) {
    this.eventName = eventName;
    this.complete = false;
    this.status = false;
    this.emitter = emitter;
  }

  private clear() {
    clearInterval(this.interval);
  }

  private callback(res, rej) {
    return () => {
      // console.log('interval is running');
      if (this.complete) {
        this.clear();
        res(this.status);
      }
    };
  }

  public setEmitter() {
    // console.log('set');
    this.emitter.removeAllListeners(this.eventName);
    this.emitter.once(this.eventName, (status: boolean) => {
      this.fin(status);
    });
  }

  public run() {
    // console.log('run');
    return new Promise((res, rej) => {
      this.interval = setInterval(this.callback(res, rej), 1000);
    });
  }

  private changeStatus(status: boolean) {
    this.status = status;
  }

  public fin(status: boolean) {
    // console.log('fin');
    this.changeStatus(status);
    this.complete = true;
  }
}

export { DbSync };
