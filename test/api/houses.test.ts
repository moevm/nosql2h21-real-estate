// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from "chai-http";
import { defaultUser } from "./populate";

describe("Houses test", () => {
  chai.use(chaiHttp);
  const agent = chai.request.agent("http://localhost:3000");

  it("Should create a house", () => {
  });

  it("Should get created house", () => {
  });

  it("Should get list of my houses", () => {
  });

  it("Should get list of all houses", () => {
  });

  it("Should delete created house", () => {
  });
});
