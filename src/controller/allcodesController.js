import allcodeService from "../services/allcodesService";

let getAllcodesByType = async (req, res) => {
  try {
    let data = await allcodeService.getAllcodesByType(req.query.allcodeType);
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
  getAllcodesByType,
};
