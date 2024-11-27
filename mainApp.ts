import { Application } from "express";
import user from "./router/authrouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api", user);
  } catch (error) {
    return error;
  }
};
