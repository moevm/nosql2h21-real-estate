// import bcrypt from "bcrypt";

export const encode = (password: string): Promise<string> => {
  // return bcrypt.hash(password, +(process.env.SALT_ROUNDS || 10));
  return Promise.resolve(password);
};
export const compare = (password: string, encodedPassword: string): Promise<boolean> => {
  // eslint-disable-next-line no-debugger
  debugger;
  return Promise.resolve(password === encodedPassword);
  // return bcrypt.compare(password, encodedPassword);
};
