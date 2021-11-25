// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from "chai-http";

describe("Tags test", () => {
  chai.use(chaiHttp);
  const agent = chai.request.agent("http://localhost:3000");

  it("Should get list of all tags", async () => {
    const res = await agent.get("/api/tags");
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(data.length).to.be.within(0, 4);
  });
});
