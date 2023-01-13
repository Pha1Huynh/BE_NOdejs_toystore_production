import userService from "../services/userService";
let createNewUser = async (req, res) => {
  try {
    let data = await userService.createNewUser(req.body);
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
  createNewUser,
};
