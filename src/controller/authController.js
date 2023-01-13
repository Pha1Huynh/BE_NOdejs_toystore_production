import authService from "../services/authService";
import jwt from "jsonwebtoken";
let handleLogin = async (req, res) => {
  try {
    let data = await authService.handleLogin(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleLogout = async (req, res) => {
  try {
    let data = await authService.handleLogout(req.body.refreshToken);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getInfoUserWithToken = async (req, res) => {
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
    let data = await authService.getInfoUserWithToken(accessToken);

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let authenToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  // 'Beaer [token]'
  if (!authorizationHeader) {
    res.status(200).json({
      errCode: -1,
      errMessage: "Undefined accesstoken",
    });
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.status(200).json({
      errCode: -1,
      errMessage: "Undefined accesstoken",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(200).json({
        errCode: -1,
        errMessage: "Accesstoken invalid",
        errName: err.message,
      });
    } else {
      next();
    }
  });
};
let refreshAccessToken = async (req, res) => {
  try {
    let data = await authService.refreshAccessToken(req.body.refreshToken);
    if (data.errCode === 0) {
      return res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleLogin,
  authenToken,
  refreshAccessToken,
  handleLogout,
  getInfoUserWithToken,
};
