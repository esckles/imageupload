import { Router } from "express";
import {
  changeUserPassword,
  createUser,
  forgetUserPassword,
  loginUser,
  readOneUser,
  updatedOneUserName,
  updateOneUserAvater,
} from "../controller/authController";

const router: any = Router;

//Auth
router.route("/register-account").post(createUser);
router.route("/login-user").post(loginUser);
router.route("/forget-account-password").post(forgetUserPassword);
router.route("/reset-account-password").patch(changeUserPassword);

//Proflie

router.route("/get-account-:userID").get(readOneUser);
router.route("/update-account-name/:userID").patch(updatedOneUserName);
router.route("/update-account-avater/:userID").patch(updateOneUserAvater);

export default router;
