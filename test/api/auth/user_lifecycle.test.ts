// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from "chai-http";

describe("User account lifecycle test", () => {
  chai.use(chaiHttp);
  const agent = chai.request.agent("http://localhost:3000");

  it("Should create user and log in", () => {
    return agent
      .post("/api/auth/signup")
      .send({
        email: "new.test.user@site.com",
        password: "1234567",
        firstName: "New User",
        lastName: "Test",
      })
      .then((res) => {
        chai.expect(res).to.have.cookie("accessToken");
        chai.expect(res).to.not.have.cookie("accessToken", "");
      });
  });

  it("Should delete user", () => {
    return agent.get("/api/auth/signout").then((res) => {
      chai.expect(res).to.have.cookie("accessToken", "");
    });
  });
});
