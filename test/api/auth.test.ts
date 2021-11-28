// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from "chai-http";
import { getTokenCookie } from "./populate";

function compareUsers(u1: any, u2: any): boolean {
  return Object.entries(u1).every((entry) => {
    if (entry[0] === "password") return u2[entry[0]] === undefined;
    return entry[1] === u2[entry[0]];
  });
}

describe("User test", () => {
  chai.use(chaiHttp);
  const agent = chai.request.agent("http://localhost:3000");
  let token = "";

  const user = {
    email: "new.test.user@site.com",
    password: "1234567",
    firstName: "New User",
    lastName: "Test",
  };

  it("Should create user", async () => {
    const res = await agent.post("/api/auth/signup").send(user);
    chai.expect(res).to.have.status(200);
    chai.expect(res).to.have.cookie("accessToken");
    token = getTokenCookie(res.get("Set-Cookie")) ?? "";
    chai.expect(token).not.to.be.equal("");
  });

  it("Should log user out", async () => {
    const res = await agent.put("/api/auth/signout").send(user).set("Cookie", `accessToken=${token}`);
    chai.expect(res).to.have.status(200);
    chai.expect(res).to.have.cookie("accessToken", "");
  });

  it("Should log user in", async () => {
    const res = await agent.put("/api/auth/signin").send(user);
    chai.expect(res).to.have.status(200);
    chai.expect(res).to.have.cookie("accessToken", token);
  });

  it("Should edit current user", async () => {
    user.email = "new.email@site.com";
    user.lastName = "Surname";

    const res = await agent.put(`/api/auth/me`).send(user).set("Cookie", `accessToken=${token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(compareUsers(user, data)).to.be.equal(true);
  });

  it("Should get current user", async () => {
    const res = await agent.get("/api/auth/me").set("Cookie", `accessToken=${token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(compareUsers(user, data)).to.be.equal(true);
  });

  it("Should delete user", async () => {
    const res = await agent.delete("/api/auth/me").set("Cookie", `accessToken=${token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(res).to.have.cookie("accessToken", "");
    chai.expect(compareUsers(user, data)).to.be.equal(true);
  });
});
