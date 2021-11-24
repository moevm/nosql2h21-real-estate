import http from "http";

export function getTokenCookie(headers: string[]): string | undefined {
  return headers
    ?.find((cookie) => {
      return cookie.split("=")[0] === "accessToken";
    })
    ?.split("=")[1];
}

export const defaultUser = {
  user: {
    email: "test.user@site.com",
    password: "12345",
    firstName: "User",
    lastName: "Test",
  },
  token: "",
  house: "",
};

function populate(path: string, data: any, auth = "", getToken = false): Promise<string | any> {
  return new Promise<string | any>((resolve, reject) => {
    const dataStr = JSON.stringify(data);
    const req = http.request(
      {
        method: "POST",
        hostname: "localhost",
        port: 3000,
        path,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": dataStr.length,
          Cookie: `accessToken=${auth}`,
        },
      },
      (res) => {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", () => {
          try {
            const value = JSON.parse(body);
            if (value.success) {
              if (getToken) {
                const tk = getTokenCookie(res.headers["set-cookie"] ?? []);
                if (tk) resolve(tk);
                else reject(Error("No access token was specified!"));
              } else resolve(value.data);
            } else reject(Error("Request unsuccessful!"));
          } catch (e) {
            reject(Error(`Server error happened!\n${body}`));
          }
        });
      },
    );
    req.write(dataStr);
    req.end();
  });
}

// Creating test user and other user (to demonstrate difference between ALL and MY (houses and advertisements))
let otherToken = "";
before(async () => {
  defaultUser.token = (await populate("/api/auth/signup", defaultUser.user, "", true)) ?? "";

  otherToken = await populate(
    "/api/auth/signup",
    {
      email: "other.user@site.com",
      password: "09876",
      firstName: "User",
      lastName: "Other",
    },
    "",
    true,
  );
});

// Creating other users house and my house
let house: any;
before(async () => {
  defaultUser.house = (
    await populate(
      "/api/houses/new",
      {
        address: {
          lat: 245,
          lng: -1197,
          value: "My st., 45",
          floor: 3,
          door: 12,
        },
        photo: ["https://picsum.photos/seed/picsum/200/300", "https://picsum.photos/seed/picsum/200/300"],
        description: "my house",
        type: 2,
        size: 67,
        hasBalcony: false,
        countBathrooms: 2,
        countRoom: 4,
        year: 2005,
        finishing: 0,
      },
      defaultUser.token,
    )
  )._id;

  house = await populate(
    "/api/houses/new",
    {
      address: {
        lat: 10,
        lng: -10,
        value: "Pushkina st., Kolotushkikna h.",
        floor: 7,
        door: 19,
      },
      photo: ["https://picsum.photos/seed/picsum/200/300", "https://picsum.photos/seed/picsum/200/300"],
      description: "a house",
      type: 1,
      size: 149,
      hasBalcony: true,
      countBathrooms: 5,
      countRoom: 13,
      year: 1934,
      finishing: 1,
    },
    otherToken,
  );
});

// Creating other users advertisement
before(async () => {
  await populate(
    "/api/advs/new",
    {
      title: "Other user's advertisement",
      price: 1000,
      house: house._id,
      target: 1,
      tags: [],
    },
    otherToken,
  );
});
