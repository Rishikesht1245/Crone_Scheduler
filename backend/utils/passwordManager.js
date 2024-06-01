import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (inputPass, actualPass) => {
  return bcrypt.compareSync(inputPass, actualPass);
};
