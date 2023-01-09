import db from "../models/";
let getAllcodesByType = async (allcodeType) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (allcodeType) {
        let Allcode = await db.Allcodes.findAll({
          where: { type: allcodeType },
        });
        resolve({
          errCode: 0,
          data: Allcode,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllcodesByType,
};
