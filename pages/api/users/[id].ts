import { ErrorMessagesTypes, ServerApiHandler, UserRequestData, UserResponseData } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import { UserDBModel } from "lib/db/shema";

// Bundles nothing.
const get: ServerApiHandler<UserRequestData, UserResponseData> = async (req, res) => {
  const { id } = req.query;

  const data = await UserDBModel.findById(id);
  if (!data) throw new Error(ErrorMessagesTypes.err404);

  const result = data.toObject();
  delete result.password;
  res.status(200).json({ success: true, data: result });
};

export default apiHandleMethods().get(get).prepare();
