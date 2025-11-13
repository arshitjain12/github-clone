const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.get("/userProfile/:id", userController.getUserProfile);
userRouter.post("/signup", userController.singup);
userRouter.post("/login", userController.login);
userRouter.put("/updateUserProfile/:id", userController.updateUserProfile);
userRouter.delete("/deleteUserProfile/:id", userController.deleteUserProfile )
module.exports = userRouter;