import express from "express";
import homeController from "../controller/homeController";
import toyController from "../controller/toyController";
import allcodesController from "../controller/allcodesController";
import userController from "../controller/userController";
import authController from "../controller/authController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("hello world");
  });
  //admin
  router.get("/api/get-all-users", homeController.getAllUser);
  router.get("/api/get-toy", toyController.getToy);
  router.get("/api/get-allcodes-by-type", allcodesController.getAllcodesByType);
  router.get("/api/get-toy-by-id", toyController.getToyById);
  router.post("/api/create-a-new-toy", toyController.createANewToy);
  router.put("/api/update-toy", toyController.updateToy);
  router.delete("/api/delete-toy", toyController.deleteToy);
  //client
  router.get("/api/get-toy-by-type", toyController.getToyByType);
  router.get("/api/get-all-toy", toyController.getAllToy);

  //auth
  router.post("/api/login", authController.handleLogin);
  router.post("/api/logout", authController.handleLogout);
  router.post("/api/refresh-access-token", authController.refreshAccessToken);
  router.get(
    "/api/get-info-user-with-token",
    authController.authenToken,
    authController.getInfoUserWithToken
  );

  //user
  router.post("/api/create-new-user", userController.createNewUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
