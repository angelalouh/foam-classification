const router = require("express").Router();
const controller = require("./reactors.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:filter_selected").get(controller.list).all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;
