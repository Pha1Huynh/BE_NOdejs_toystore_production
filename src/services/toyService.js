import db from "../models/";
let getToy = (option, type) => {
  return new Promise(async (resolve, reject) => {
    let Toy = {};
    try {
      if (option === "ALL") {
        Toy = await db.Toys.findAll();
        let imageBase64 = "";
        if (Toy.image) {
          imageBase64 = Buffer.from(Toy.image, "base64").toString("binary");
        }
        Toy.image = imageBase64;
      }
      if (option === "SHORT") {
        Toy = await db.Toys.findAll({
          attributes: ["id", "name"],
        });
      }
      resolve({
        errCode: 0,
        data: Toy,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getToyById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Toy;
      if (id) {
        Toy = await db.Toys.findOne({ where: { id: id } });
        let imageBase64 = "";
        if (Toy.image) {
          imageBase64 = Buffer.from(Toy.image, "base64").toString("binary");
        }
        Toy.image = imageBase64;
      }
      resolve({
        errCode: 0,
        data: Toy,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllToy = () => {
  return new Promise(async (resolve, reject) => {
    let Toy = {};
    try {
      Toy = await db.Toys.findAll({
        raw: false,
        attributes: ["id", "name", "price", "image", "toyTypeId"],
        include: [
          //lay thong tin toy kem theo thong tin cua no ton tai trong thang allcode
          {
            model: db.Allcodes,
            as: "toyTypeData",
            attributes: ["value"],
          },
        ],
      });
      Toy = Toy.map((item) => {
        if (item.image) {
          item.image = Buffer.from(item.image, "base64").toString("binary");
          return item;
        }
      });

      resolve({
        errCode: 0,
        data: Toy,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let updateToy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("check data send", data);
      let toy = [];
      if (data && data.length > 0 && data.id) {
        toy = await db.Toys.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (!toy) {
          resolve({
            errCode: -1,
            errMessage: "Toy does not exist",
          });
        }
        if (toy) {
          toy.contentHTML = data.contentHTML;
          toy.contentMarkdown = data.contentMarkdown;
          toy.description = data.description;
          toy.name = data.name;
          toy.toyTypeId = data.toyTypeId;
          toy.image = data.image;
          toy.price = data.price;
          toy.width = data.width;
          toy.height = data.height;
          toy.weight = data.weight;
          toy.length = data.length;
          toy.toyInfo = data.toyInfo;
          await toy.save();
        }
      }
      resolve({
        errCode: 0,
        data: toy,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let createANewToy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result;
      if (data && data.name) {
        result = await db.Toys.create({ name: data.name });
      }
      resolve({
        errCode: 0,
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteToy = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result;
      let toy;
      if (id) {
        toy = await db.Toys.findOne({ where: { id: id }, raw: false });
        if (toy) {
          await toy.destroy();
          resolve({
            errCode: 0,
            errMessage: "Delete Success",
          });
        }
        if (!toy) {
          resolve({
            errCode: 0,
            errMessage: "Toy is not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getToy,
  getToyById,
  updateToy,
  createANewToy,
  deleteToy,
  getAllToy,
};
