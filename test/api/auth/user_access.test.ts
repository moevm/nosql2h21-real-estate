// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from "chai-http";
import { defaultUser } from "../test_env";

describe("User app accessing test", () => {
  chai.use(chaiHttp);
  const agent = chai.request.agent("http://localhost:3000");

  it("Should log in user", () => {
    return agent
      .post("/api/auth/signin")
      .send(defaultUser)
      .then((res) => {
        chai.expect(res).to.have.cookie("accessToken");
        chai.expect(res).to.not.have.cookie("accessToken", "");
      });
  });

  it("Should log out user", () => {
    return agent.get("/api/auth/signout").then((res) => {
      chai.expect(res).to.have.cookie("accessToken", "");
    });
  });
});
