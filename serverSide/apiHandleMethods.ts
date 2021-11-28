/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import { ResponseData, ServerApiHandler } from "core/types/api";
import { MongoServerError } from "mongodb";
import { NextApiHandler } from "next";

const methods = ["GET", "POST", "PUT", "DELETE"] as const;
type Method = typeof methods[number];

const apiHandleMethods = () => {
  const handlers: { [key in Method]?: NextApiHandler | undefined } = {};
  const methodHandler = {
    get: <Req, Res>(handler: ServerApiHandler<Req, Res>) => {
      handlers.GET = handler;
      return methodHandler;
    },
    post: <Req, Res>(handler: ServerApiHandler<Req, Res>) => {
      handlers.POST = handler;
      return methodHandler;
    },
    put: <Req, Res>(handler: ServerApiHandler<Req, Res>) => {
      handlers.PUT = handler;
      return methodHandler;
    },
    delete: <Req, Res>(handler: ServerApiHandler<Req, Res>) => {
      handlers.DELETE = handler;
      return methodHandler;
    },
    prepare:
      (): NextApiHandler<ResponseData> =>
        async (req, res): Promise<any> => {
          try {
            if (handlers[req.method as Method]) {
              return await handlers[req.method as Method]!(req, res);
            }
            return res.status(404).json({ success: false, error: "page not found" });
          } catch (error) {
            if (error instanceof Error || error instanceof MongoServerError) {
              return res.status(500).json({ success: false, error: error.message });
            }
            return res.status(500).json({ success: false, error: "server error" });
          }
        },
  };
  return methodHandler;
};
export default apiHandleMethods;
