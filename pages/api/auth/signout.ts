import { LoggedInRequestData, ServerApiHandler, SignOutResponseData } from "core/types/api";
import { serialize } from "cookie";
import apiHandleMethods from "lib/apiHandleMethods";

// Bundles nothing.
const put: ServerApiHandler<LoggedInRequestData, SignOutResponseData> = async (req, res) => {
  res.setHeader("Set-Cookie", [serialize("accessToken", "", { maxAge: 0 })]);
  res.status(200).json({ success: true, data: null });
};

export default apiHandleMethods().put(put).prepare();
