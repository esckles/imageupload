import { model, Schema } from "mongoose";

interface iAuth {
  //profile
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avater: string;
  avaterID: string;
  accNumber: string;
  //

  wallet: number;
  transsactionHistory: [];
}

interface iAuthData extends iAuth, Document {}

const authModel = new Schema<iAuthData>(
  {
    userName: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
    },

    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    avater: {
      type: String,
    },
    avaterID: {
      type: String,
    },
    accNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iAuthData>("users", authModel);
