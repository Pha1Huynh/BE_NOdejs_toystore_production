import cartService from "../services/cartService";

let addItemToCart = async (req, res) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res.status(200).json({
        errCode: -1,
        errMessage: "Undefined accesstoken",
      });
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(200).json({
        errCode: -1,
        errMessage: "Undefined accesstoken",
      });
    }
    let data = await cartService.addItemToCart(accessToken, req.body);

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let deleteItemFromCart = async (req, res) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res.status(200).json({
        errCode: -1,
        errMessage: "Undefined accesstoken",
      });
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(200).json({
        errCode: -1,
        errMessage: "Undefined accesstoken",
      });
    }
    let data = await cartService.deleteItemFromCart(
      accessToken,
      req.query.toyId
    );

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getCartByUserId = async (req, res) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res.status(200).json({
        errCode: -1,
        errMessage: "Undefined accesstoken",
      });
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(200).json({
        errCode: -1,
        errMessage: "Undefined accesstoken",
      });
    }

    let data = await cartService.getCartByUserId(accessToken, req.query.type);

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let payItemFromCart = async (req, res) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res.status(200).json({
        errCode: -1,
        errMessage: "Undefined accesstoken",
      });
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(200).json({
        errCode: -1,
        errMessage: "Undefined accesstoken",
      });
    }
    let data = await cartService.payItemFromCart(accessToken);

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  addItemToCart,
  getCartByUserId,
  deleteItemFromCart,
  payItemFromCart,
};
