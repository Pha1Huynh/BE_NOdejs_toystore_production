import toyService from "../services/toyService";
let getToy = async (req, res) => {
  try {
    let data = await toyService.getToy(req.query.option);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getToyById = async (req, res) => {
  try {
    let data = await toyService.getToyById(req.query.id);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let updateToy = async (req, res) => {
  try {
    let data = await toyService.updateToy(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let createANewToy = async (req, res) => {
  try {
    let data = await toyService.createANewToy(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let deleteToy = async (req, res) => {
  try {
    let data = await toyService.deleteToy(req.query.id);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllToy = async (req, res) => {
  try {
    let data = await toyService.getAllToy();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getToyByType = async (req, res) => {
  try {
    let data = await toyService.getToyByType(type);
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
  getToy,
  getToyById,
  updateToy,
  createANewToy,
  deleteToy,
  getAllToy,
  getToyByType,
};
