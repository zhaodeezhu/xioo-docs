class Events {

  constructor() {
    if(Events.instance) return Events.instance;
    this.list = {}
    Events.instance = this;
  }

  on(event, callback) {
    this.list[event] = callback;
  }

  send(event, data) {
    this.list[event] && this.list[event](data);
  }

}


module.exports = new Events();