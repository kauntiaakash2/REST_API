const express = require("express");
const {addUser, getAllUser, getUserById, deleteUserByID, updateUserByID, loginUser} = require("../controllers/userController");
const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/", addUser);
router.delete("/:id", deleteUserByID);
router.put("/:id", updateUserByID);
router.post('/login', loginUser);

module.exports = router;
