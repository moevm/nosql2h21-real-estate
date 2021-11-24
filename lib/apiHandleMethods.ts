/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import { Response, ServerApiHandler } from "core/types/api";
import { NextApiHandler } from "next";

const methods = ["GET", "POST", "PUT", "DELETE"] as const;
type Method = typeof methods[number];

const apiHandleMethods = <Q extends Record<string, string> = {}>() => {
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
      (): NextApiHandler<Response> =>
        async (req, res): Promise<any> => {
          try {
            if (handlers[req.method as Method]) {
              return handlers[req.method as Method]!(req, res);
            }
            return res.status(404).json({ success: false, error: "page not found" });
          } catch (error) {
            if (error instanceof Error) res.status(500).json({ success: false, error: error.message });
            else res.status(500).json({ success: false, error: "unknown error" });
          }
        },
  };
  return methodHandler;
};
export default apiHandleMethods;
