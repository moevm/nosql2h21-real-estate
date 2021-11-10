import https from "https";

let token = "";

export const defaultUser = {
  email: "test.user@site.com",
  password: "12345",
  firstName: "User",
  lastName: "Test",
};

export async function accessToken(): Promise<string | null> {
  return new Promise<string | null>((resolve, reject) => {
    if (token) {
      resolve(token);
      return;
    }

    const data = JSON.stringify(defaultUser);
    const req = https.request(
      {
        method: "POST",
        hostname: "localhost",
        port: 3000,
        path: "/api/auth/signup",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      },
      (res) => {
        const tk = res.headers.cookie?.split(";").find((cookie) => {
          return cookie.split("=")[0] === "accessToken";
        });
        if (tk) {
          token = tk;
          resolve(tk);
        } else reject(Error("No access token was specified!"));
      },
    );
    req.write(data);
    req.end();
  });
}
