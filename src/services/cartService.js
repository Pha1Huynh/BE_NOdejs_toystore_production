import jwt from "jsonwebtoken";
import db from "../models/index";

let addItemToCart = (accessToken, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.toyId) {
        //add
        let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        let userId = user.id;
        let [addCartItem, created] = await db.Cart.findOrCreate({
          where: {
            userId: data.userId,
            toyId: data.toyId,
            cartStatusId: "S1",
          },
          defaults: {
            userId: data.userId,
            toyId: data.toyId,
            cartStatusId: "S1",
            number: data.number,
          },
          raw: false,
        });
        if (!created) {
          let newNumber = +addCartItem.number + +data.number;

          addCartItem.number = newNumber;
          await addCartItem.save();
          resolve({
            errCode: 0,
            errMessage: "Add to cart success",
          });
        } else {
          resolve({
            errCode: 0,
            errMessage: "Add to cart success",
          });
        }
      } else {
        resolve({
          errCode: 1,
          errMessage: "Missing params",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteItemFromCart = (accessToken, toyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (toyId) {
        //find
        let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        let userId = user.id;
        let itemCart = await db.Cart.findOne({
          where: {
            userId: userId,
            toyId: toyId,
            cartStatusId: "S1",
          },
          raw: false,
        });
        if (itemCart) {
          //delete
          await itemCart.destroy();
          resolve({
            errCode: 0,
            errMessage: "Delete item from cart success",
            data: itemCart,
          });
        } else {
          resolve({
            errCode: 0,
            errMessage: "Delete item from cart failed",
          });
        }
      } else {
        resolve({
          errCode: 1,
          errMessage: "Missing params",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getCartByUserId = (accessToken, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      let userId = user.id;
      let cartByUserId = {};
      if (type === "Header") {
        cartByUserId = await db.Cart.findAll({
          raw: false,
          where: {
            userId: userId,
            cartStatusId: "S1",
          },

          include: [
            {
              model: db.Toys,
              as: "toyData",
              attributes: { exclude: ["image"] },
            },
          ],
        });
      } else {
        cartByUserId = await db.Cart.findAll({
          raw: false,
          where: {
            userId: userId,
            cartStatusId: "S1",
          },

          include: [
            {
              model: db.Toys,
              as: "toyData",
            },
          ],
        });
      }

      if (cartByUserId) {
        if (type !== "Header") {
          cartByUserId.map((item) => {
            item.toyData.image = Buffer.from(
              item.toyData.image,
              "base64"
            ).toString("binary");
            return item;
          });
        }

        resolve({
          errCode: 0,
          errMessage: "Get cart by user id success",
          data: cartByUserId,
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Get cart by user id failed",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let payItemFromCart = (accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (accessToken) {
        //find
        let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        let userId = user.id;
        let itemCart = await db.Cart.update(
          { cartStatusId: "S2" },
          {
            where: {
              userId: userId,
              cartStatusId: "S1",
            },
            raw: false,
          }
        );
        if (itemCart) {
          //update status S1 to S2

          resolve({
            errCode: 0,
            errMessage: "Pay Success",
            data: itemCart,
          });
        } else {
          resolve({
            errCode: 0,
            errMessage: "Pay failed",
          });
        }
      } else {
        resolve({
          errCode: 1,
          errMessage: "Missing params",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  addItemToCart,
  getCartByUserId,
  deleteItemFromCart,
  payItemFromCart,
};
