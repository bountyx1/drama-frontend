export default class OwnerError extends Error {
    constructor ({status, json}) {
      super(status);
      this.status = status;
      this.json = json;
    }
  }
  