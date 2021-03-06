import { Advertisement, AdvTargetType, FinishingType, HouseType, Tag, User } from "core/models";
import { AdvertisementDBModel, HouseDBModel, TagDBModel, UserDBModel } from "serverSide/db/shema";
import usersData from "./users.json";
import cianData from "./cian.json";
import tagsData from "./tags.json";

export const generateDBData = async (): Promise<Advertisement[]> => {
  if (!Array.isArray(usersData) && !Array.isArray(cianData) && !Array.isArray(tagsData)) return [];
  const tags = await TagDBModel.insertMany(tagsData.map((value) => ({ value })));

  const users = await UserDBModel.insertMany(usersData);
  const randomInt = (num: number = 1): number => Math.round(Math.random() * num);
  const randomHouseType = (): HouseType => randomInt(2);
  const randomFinishingType = (): FinishingType => randomInt(1);
  const randomAdvTargetType = (): AdvTargetType => randomInt(1);
  const randomRating = (): number => randomInt(5);
  const randomTags = (): Tag[] =>
    Array.from(
      new Set([
        tags[randomInt(tags.length - 1)],
        tags[randomInt(tags.length - 1)],
        tags[randomInt(tags.length - 1)],
        tags[randomInt(tags.length - 1)],
        tags[randomInt(tags.length - 1)],
        tags[randomInt(tags.length - 1)],
        tags[randomInt(tags.length - 1)],
        tags[randomInt(tags.length - 1)],
        tags[randomInt(tags.length - 1)],
        tags[randomInt(tags.length - 1)],
      ]),
    );

  const randomUser = (): User => users[Math.round(Math.random() * (users.length - 1))];
  const advsData = await Promise.all(
    cianData.map(async (record) => {
      const owner = randomUser();
      const replies = new Array(Math.round(3 + Math.random() * 10)).fill(0).map(() => {
        const user = randomUser();
        return {
          owner: user._id,
          text: `Hello, im ${user.firstName} ${user.lastName}.`,
          rating: randomInt(),
        };
      });
      const address = {
        lat: record.coords.lat,
        lng: record.coords.lng,
        value: record.address,
        floor: record.floor_number,
        door: randomInt(100),
      };
      // eslint-disable-next-line no-debugger
      // debugger;
      const h = {
        owner: owner._id,
        address,
        photo: record.images.split(",") || [],
        description: record.description,
        type: randomHouseType(),
        size: parseFloat(record.area) || 0,
        hasBalcony: Math.random() > 0.5,
        countBatrooms: Math.round(1 + Math.random() * 3) || 1,
        countRoom: record.rooms_count,
        year: record.building_year || 1990,
        finishing: randomFinishingType(), // repair_type
        lenToMetro: 0, // calc from map when created
        rating: randomRating(),
        replies,
      };
      const preTitle = record.description?.split(" ").slice(1, 4).join(" ");
      const house = await HouseDBModel.create(h);
      const adv = {
        title: preTitle ? preTitle[0].toUpperCase() + preTitle.slice(1) : "title",
        price: record.price,
        house,
        target: randomAdvTargetType(),
        tags: randomTags(),
      };

      return adv;
    }),
  );
  const advs = await AdvertisementDBModel.insertMany(advsData);
  return advs;
};
