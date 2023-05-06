import { getKeyboardsRoute } from "./getKeyboards";
import { getKeyboardRoute } from "./getKeyboardRoute";
import { postKeyboardRoute } from "./postKeyboardRoute";
import { deleteKeyboardRoute } from "./deleteKeyboardRoute";
import { putKeyboardRoute } from "./putKeyboardRoute";
import { loginRoute } from "./loginRoute";
import { signUpRoute } from "./signUpRoute";
import { getUsersRoute } from "./getUsersRoute";

export const routes = [
  getKeyboardsRoute,
  getKeyboardRoute,
  postKeyboardRoute,
  deleteKeyboardRoute,
  putKeyboardRoute,
  loginRoute,
  signUpRoute,
  getUsersRoute,
];
