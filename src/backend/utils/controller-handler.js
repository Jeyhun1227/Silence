class ControllerHandler {
  constructor(name) {
    this.name = name;
  }

  fn =
    ({ fn, action }) =>
    (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch((err) => {
        console.log(err);
        next(err);
      });
    };
}
export default ControllerHandler;
