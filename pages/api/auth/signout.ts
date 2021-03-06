import { LoggedInRequestData, ServerApiHandler, SignOutResponseData } from "core/types/api";
import { serialize } from "cookie";
import apiHandleMethods from "serverSide/apiHandleMethods";

const post: ServerApiHandler<LoggedInRequestData, SignOutResponseData> = async (req, res) => {
  res.setHeader("Set-Cookie", [serialize("accessToken", "", { maxAge: 0, path: "/" })]);
  res.status(200).json({ success: true, data: null });
};

export default apiHandleMethods().post(post).prepare();
