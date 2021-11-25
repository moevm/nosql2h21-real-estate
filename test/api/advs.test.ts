// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from "chai-http";
import { defaultUser } from "./populate";

function compareAdvertisements(a1: any, a2: any): boolean {
  return Object.entries(a1).every((entry) => {
    if (entry[0] === "house") return true;
    if (entry[0] === "tags") return true;
    return JSON.stringify(entry[1]) === JSON.stringify(a2[entry[0]]);
  });
}

describe("Advertisements test", () => {
  chai.use(chaiHttp);
  const agent = chai.request.agent("http://localhost:3000");

  let id: string;
  const advertisement = {
    title: "My advertisement",
    price: 7505,
    target: 0,
    tags: ["my", "house"],
    house: "", // Should be initialized during test.
  };

  it("Should create an advertisement", async () => {
    advertisement.house = defaultUser.house;

    const res = await agent.post("/api/advs/new").send(advertisement).set("Cookie", `accessToken=${defaultUser.token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(compareAdvertisements(advertisement, data)).to.be.equal(true);

    id = data._id;
  });

  it("Should edit created advertisement", async () => {
    advertisement.tags = ["my", "house", "tag"];
    advertisement.price = 1205;

    const res = await agent.put(`/api/advs/${id}`).send(advertisement).set("Cookie", `accessToken=${defaultUser.token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(compareAdvertisements(advertisement, data)).to.be.equal(true);
  });

  it("Should get created advertisement", async () => {
    const res = await agent.get(`/api/advs/${id}`).set("Cookie", `accessToken=${defaultUser.token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(compareAdvertisements(advertisement, data)).to.be.equal(true);
    chai.expect(data.house._id).to.be.equal(defaultUser.house);
  });

  it("Should get list of my advertisements", async () => {
    const res = await agent.get(`/api/advs/my`).set("Cookie", `accessToken=${defaultUser.token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(data.length).to.be.equal(1);
  });

  it("Should get list of all advertisements", async () => {
    const res = await agent.get("/api/advs");
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(data.length).to.be.equal(2);
  });

  it("Should delete created advertisement", async () => {
    const res = await agent.delete(`/api/advs/${id}`).set("Cookie", `accessToken=${defaultUser.token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(compareAdvertisements(advertisement, data)).to.be.equal(true);
  });
});
