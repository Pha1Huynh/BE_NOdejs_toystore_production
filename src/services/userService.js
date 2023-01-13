import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.email && data.password) {
        let hashPassword = await hashUserPassword(data.password);
        const [user, created] = await db.Users.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.emai,
            password: hashPassword,
          },
        });

        if (created) {
          resolve({
            errCode: 0,
            data: user,
            errMessage: "Create new user success",
          });
        } else {
          resolve({
            errCode: 1,
            data: user,
            errMessage: "Email already exist",
          });
        }
      } else {
        resolve({
          errCode: 0,
          errMessage: "Missing param",
        });
      }
      resolve({
        errCode: 0,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser,
};
