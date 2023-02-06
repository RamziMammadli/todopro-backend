const express = require("express");
const { postController } = require("../controllers/postController");
const router = express.Router();

router.get("/", postController.getAll);
router.get("/:id", postController.getbyid);
router.post("/", postController.add);
router.delete("/:id", postController.deletebyid);
router.put("/:id", postController.updatebyid);
module.exports = router;




// const express = require("express");
// const { UserController } = require("../controller/user.controller");

// const router = express.Router();

// router.get("/", UserController.getAll);
// router.post("/login", UserController.login);
// router.post("/confirmcode", UserController.confirmCode);

// module.exports = router;
