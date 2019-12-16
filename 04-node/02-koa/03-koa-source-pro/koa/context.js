module.exports = {
  get url() {
    return this.request.url;
  },
  get body() {
    return this.response.body;
  },
  set body(body) {
    this.response.body = body;
  },
  get method() {
    return this.request.method;
  }
};
