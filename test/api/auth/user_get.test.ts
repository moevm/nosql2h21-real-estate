// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from "chai-http";
import { accessToken, defaultUser, getData } from "../test_env";

describe("User self getting test", () => {
  chai.use(chaiHttp);
  const agent = chai.request.agent("http://localhost:3000");
  let token = "";

  before(() => {
    return accessToken().then((tk) => {
      token = `accessToken=${tk}` ?? "";
    });
  });

  it("Should get current user", () => {
    return agent
      .get("/api/auth/me")
      .set("Cookie", token)
      .then((res) => {
        chai.expect(res).to.have.status(200);
        const { success, data } = getData(res.text);
        chai.expect(success).to.be.equal(true);
        chai
          .expect(
            Object.entries(defaultUser).every((entry) => {
              return entry[1] === data[entry[0]];
            }),
          )
          .to.be.equal(true);
      });
  });
});
