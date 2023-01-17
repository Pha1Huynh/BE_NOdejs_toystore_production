import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

require("dotenv").config();

let buildAccessToken = async (data) => {
  let token = {};
  let accessToken = await jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRED_ACCESS_TOKEN,
  });
  token.accessToken = accessToken;
  const refreshToken = await jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  token.refreshToken = refreshToken;

  return token;
};
let handleLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      if (data && data.email && data.password) {
        let user = await db.Users.findOne({
          where: { email: data.email },
          attributes: ["id", "email", "password", "fullname", "roleId"],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(data.password, user.password);
          if (check) {
            delete user.password;

            let tokens = await buildAccessToken(user);

            let { accessToken, refreshToken } = tokens;
            let createToken = await db.Tokens.create({
              userId: user.id,
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
            resolve({
              errCode: 0,
              errMessage: "Login success",
              tokens: tokens,
              user: user,
            });
          } else {
            resolve({
              errCode: 2,
              errMessage: "Wrong password",
            });
          }
        } else {
          resolve({
            errCode: 2,
            errMessage: "Email does not exist",
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
let handleLogout = (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (refreshToken) {
        //check rgtoken db and logut
        let checkRefreshTokenDB = await db.Tokens.findOne({
          where: { refreshToken: refreshToken },
        });

        if (checkRefreshTokenDB) {
          //delete record
          let deleteRefreshToken = await db.Tokens.destroy({
            where: { refreshToken: refreshToken },
          });
          if (deleteRefreshToken) {
            resolve({
              errCode: 0,
              errMessage: "Logut success",
            });
          } else {
            resolve({
              errCode: 2,
              errMessage: "Logut failed",
            });
          }
        } else {
          resolve({
            errCode: 4,
            errMessage: "RefreshToken is invalid",
          });
        }
      } else {
        resolve({
          errCode: 1,
          errMessage: "Missing refreshToken",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let refreshAccessToken = (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (refreshToken) {
        //validate and refresh
        let checkRefreshTokenDB = await db.Tokens.findOne({
          where: { refreshToken: refreshToken },
          raw: false,
        });
        if (checkRefreshTokenDB) {
          //vẻify refreshtoken
          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, data) => {
              if (err) {
                resolve({
                  errCode: 2,
                  errMessage: err,
                });
              }
              // create new accesstoken
              const accessToken = jwt.sign(
                {
                  email: data.email,
                  roleId: data.roleId,
                  id: data.id,
                  fullname: data.fullname,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: process.env.EXPIRED_ACCESS_TOKEN,
                }
              );

              checkRefreshTokenDB.accessToken = accessToken;
              await checkRefreshTokenDB.save();
              let tokens = {};
              tokens.accessToken = accessToken;
              tokens.refreshToken = refreshToken;
              let user = {};
              user.id = data.id;
              user.email = data.email;
              user.fullname = data.fullname;
              user.roleId = data.roleId;
              resolve({
                errCode: 0,
                errMessage: "Verify success",
                tokens: tokens,
                user: user,
              });
            }
          );
        } else {
          resolve({
            errCode: 4,
            errMessage: "Token is valid",
          });
        }
      } else {
        resolve({
          errCode: 1,
          errMessage: "Missing token",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getInfoUserWithToken = (accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkAccessToken = await db.Tokens.findOne({
        where: { accessToken: accessToken },
      });
      if (checkAccessToken) {
        let data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        let id = data.id;
        let user = await db.Users.findOne({
          where: { id: id },
          attributes: { exclude: ["password"] },
        });
        if (user) {
          resolve({
            errCode: 0,
            errMessage: "Get User info success",
            data: user,
          });
        } else {
          resolve({
            errCode: 4,
            errMessage: "User is not exist",
          });
        }
      } else {
        resolve({
          errCode: 1,
          errMessage: "Token invalid",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleLogin,
  refreshAccessToken,
  handleLogout,
  getInfoUserWithToken,
};
