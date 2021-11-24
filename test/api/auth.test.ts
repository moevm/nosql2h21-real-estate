// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from "chai-http";
import { getTokenCookie } from "./populate";

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

  it("Should create user and log in", async () => {
    const res = await agent.post("/api/auth/signup").send(user);
    chai.expect(res).to.have.status(200);
    chai.expect(res).to.have.cookie("accessToken");
    token = getTokenCookie(res.get("Set-Cookie")) ?? "";
    chai.expect(token).not.to.be.equal("");
  });

  it("Should log user out", async () => {
    const res = await agent.put("/api/auth/signout");
    chai.expect(res).to.have.status(200);
    chai.expect(res).to.have.cookie("accessToken", "");
  });

  it("Should log user in", async () => {
    const res = await agent.put("/api/auth/signin").send(user);
    chai.expect(res).to.have.status(200);
    chai.expect(res).to.have.cookie("accessToken", token);
  });

  it("Should get current user", async () => {
    const res = await agent.get("/api/auth/me");
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai
      .expect(
        Object.entries(user).every((entry) => {
          return entry[1] === data[entry[0]];
        }),
      )
      .to.be.equal(true);
  });

  it("Should delete user", async () => {
    const res = await agent.delete("/api/auth/signup");
    chai.expect(res).to.have.status(200);
    chai.expect(res).to.have.cookie("accessToken", "");
  });
});
