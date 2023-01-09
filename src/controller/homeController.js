import db from "../models/";
import adminService from "../services/adminService";

let getAllUser = async (req, res) => {
  try {
    let allUser = await adminService.getAllUser();
    return res.status(200).json(allUser);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  getAllUser,
};
