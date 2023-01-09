import db from "../models/";
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let User = await db.User.findAll();
      resolve({
        errCode: 0,
        data: User,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllUser,
};
