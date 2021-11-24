// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from "chai-http";
import { defaultUser } from "./populate";

describe("Users test", () => {
  chai.use(chaiHttp);
  const agent = chai.request.agent("http://localhost:3000");

  it("Should get specific user", () => {
  })

  it("Should get list of all users", () => {
  });
});
