export const enumToNumArray = <T>(MyEnum: T): number[] => Object.values(MyEnum).filter((value) => typeof value === "number");
