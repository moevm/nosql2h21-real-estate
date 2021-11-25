// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from "chai-http";
import { defaultUser } from "./populate";

describe("Replies test", () => {
  chai.use(chaiHttp);
  const agent = chai.request.agent("http://localhost:3000");

  let id: string;
  const reply = {
    text: "Good house. My house.",
    rating: 100,
  };

  it("Should create a reply", async () => {
    const { house } = defaultUser;

    const res = await agent.post(`/api/houses/${house}`).send(reply).set("Cookie", `accessToken=${defaultUser.token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(data.text).to.be.equal(reply.text);
    chai.expect(data.rating).to.be.equal(5);

    id = data._id;
  });

  it("Should get created reply", async () => {
    const res = await agent.get(`/api/repls/${id}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(data.text).to.be.equal(reply.text);
    chai.expect(data.house).to.be.equal(defaultUser.house);
  });

  it("Should get list of my replies", async () => {
    const res = await agent.get(`/api/repls/my`).set("Cookie", `accessToken=${defaultUser.token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(data.length).to.be.equal(2);
  });

  it("Should delete created reply", async () => {
    const res = await agent.delete(`/api/repls/${id}`).set("Cookie", `accessToken=${defaultUser.token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(data.text).to.be.equal(reply.text);
  });
});
