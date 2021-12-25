// import bcrypt from "bcrypt";

export const encode = (password: string): Promise<string> => {
  return Promise.resolve(password);
  // return bcrypt.hash(password, +(process.env.SALT_ROUNDS || 10));
};
export const compare = (password: string, encodedPassword: string): Promise<boolean> => {
  return Promise.resolve(password === encodedPassword);
  // return bcrypt.compare(password, encodedPassword);
};
