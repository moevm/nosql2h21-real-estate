// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from "chai-http";
import { defaultUser } from "./populate";

function compareHouses(h1: any, h2: any): boolean {
  return Object.entries(h1).every((entry) => {
    if (entry[0] === "owner") return true;
    if (entry[0] === "address") return compareHouses(entry[1], h2[entry[0]]);
    return JSON.stringify(entry[1]) === JSON.stringify(h2[entry[0]]);
  });
}

describe("Houses test", () => {
  chai.use(chaiHttp);
  const agent = chai.request.agent("http://localhost:3000");

  let id: string;
  const house = {
    address: {
      lat: 0,
      lng: -715,
      value: "city, street, block, house",
      floor: 0,
      door: 1,
    },
    photo: ["https://picsum.photos/seed/picsum/200/300", "https://picsum.photos/seed/picsum/200/300"],
    description: "a nice house",
    type: 0,
    size: 128,
    hasBalcony: true,
    countBathrooms: 2,
    countRoom: 3,
    year: 2005,
    finishing: 0,
    owner: "", // Should be initialized during test.
  };

  it("Should create a house", async () => {
    house.owner = defaultUser.id;

    const res = await agent.post("/api/houses/new").send(house).set("Cookie", `accessToken=${defaultUser.token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(compareHouses(house, data)).to.be.equal(true);

    id = data._id;
  });

  it("Should get created house", async () => {
    const res = await agent.get(`/api/houses/${id}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(compareHouses(house, data)).to.be.equal(true);
    chai.expect(data.owner._id).to.be.equal(defaultUser.id);
  });

  it("Should get list of my houses", async () => {
    const res = await agent.get(`/api/houses/my`).set("Cookie", `accessToken=${defaultUser.token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(data.length).to.be.equal(2);
  });

  it("Should get list of all houses", async () => {
    const res = await agent.get("/api/houses");
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(data.length).to.be.equal(3);
  });

  it("Should delete created house", async () => {
    const res = await agent.delete(`/api/houses/${id}`).set("Cookie", `accessToken=${defaultUser.token}`);
    chai.expect(res).to.have.status(200);
    const { success, data } = JSON.parse(res.text);
    chai.expect(success).to.be.equal(true);

    chai.expect(compareHouses(house, data)).to.be.equal(true);
  });
});
