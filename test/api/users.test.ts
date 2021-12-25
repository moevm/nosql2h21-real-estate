// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from "chai-http";
import { defaultUser } from "./populate";

function compareUsers(u1: any, u2: any): boolean {
  return Object.entries(u1).every((entry) => {
    if (entry[0] === "password") return u2[entry[0]] === undefined;
    return JSON.stringify(entry[1]) === JSON.stringify(u2[entry[0]]);
  });
}

describe("Users test", () => {
  chai.use(chaiHttp);
  const agent = chai.request.agent("http://localhost:3000");

  it("Should get specific user", async () => {
    const res = await agent.get(`/api/users/${defaultUser.id}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(compareUsers(defaultUser.user, data)).to.be.equal(true);
  });

  it("Should get list of all users", async () => {
    const res = await agent.get("/api/users");
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(data.length).to.be.equal(2);
  });
});
