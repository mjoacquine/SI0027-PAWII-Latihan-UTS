// TODO C: Routing Menu (semua endpoint publik, tanpa autentikasi)
const express = require("express");
const router = express.Router();

// TODO C1: require menuController dari ../controllers/menuController
const menuController = require("../controllers/menuController");

// TODO C1: daftarkan kelima route ke fungsi controller yang sesuai
router.get("/", menuController.getAll);
router.get("/:id", menuController.getById);
router.post("/", menuController.create);
router.put("/:id", menuController.update);
router.delete("/:id", menuController.remove);

module.exports = router;