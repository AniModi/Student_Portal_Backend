const FeeReferences = require("../models/FeeReferences");
const StudentVerifications = require("../models/StudentVerifications");
const StudentDocument = require("../models/StudentDocument");

async function uploadFeeReferences(req, res) {
  const {
    username,
    semester,
    instituteFeeReferences,
    hostelFeeReferences,
    messFeeReferences,
  } = req.body;

  try {
    let feeReferences = await FeeReferences.findOne({
      username: username,
      semester: semester,
    });

    const updateFields = {};

    if (
      instituteFeeReferences !== undefined &&
      instituteFeeReferences !== null &&
      instituteFeeReferences !== ""
    ) {
      updateFields.instituteFeeReferences = instituteFeeReferences;
    }

    if (
      hostelFeeReferences !== undefined &&
      hostelFeeReferences !== null &&
      hostelFeeReferences !== ""
    ) {
      updateFields.hostelFeeReferences = hostelFeeReferences;
    }

    if (
      messFeeReferences !== undefined &&
      messFeeReferences !== null &&
      messFeeReferences !== ""
    ) {
      updateFields.messFeeReferences = messFeeReferences;
    }

    console.log(updateFields);

    if (feeReferences) {
      feeReferences = await FeeReferences.findOneAndUpdate(
        { username: username, semester: semester },
        updateFields,
        { new: true }
      );
    } else {
      feeReferences = new FeeReferences({
        username: username,
        semester: semester,
        ...updateFields,
      });
      await feeReferences.save();
    }

    res.status(200).json({ success: true, data: feeReferences });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
}

async function fetchAllReferences(req, res) {
  try {
    const feeReferences = await FeeReferences.find({});
    if (!FeeReferences) {
      res.status(200).json({ success: true, data: null });
    }
    res.status(200).json({ success: true, data: feeReferences });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
}

async function fetchReferences(req, res) {
  const { username, semester } = req.params;

  try {
    const feeReferences = await FeeReferences.findOne({
      username: username,
      semester: semester,
    });
    if (!feeReferences) {
      res.status(200).json({ success: true, data: null });
    }
    res.status(200).json({ success: true, data: feeReferences });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
}

async function verifyFees(req, res) {
  const {
    username,
    semester,
    instituteFeeVerified,
    hostelFeeVerified,
    messFeeVerified,
  } = req.body;
  const updateFields = {};

  if (instituteFeeVerified !== undefined && instituteFeeVerified !== null) {
    updateFields.instituteFeeVerified = instituteFeeVerified;
  }

  if (hostelFeeVerified !== undefined && hostelFeeVerified !== null) {
    updateFields.hostelFeeVerified = hostelFeeVerified;
  }

  if (messFeeVerified !== undefined && messFeeVerified !== null) {
    updateFields.messFeeVerified = messFeeVerified;
  }

  try {
    let studentVerifications = await StudentVerifications.findOne({
      username: username,
      semester: semester,
    });

    if (studentVerifications) {
      studentVerifications = await StudentVerifications.findOneAndUpdate(
        { username: username, semester: semester },
        updateFields,
        { new: true }
      );
    } else {
      studentVerifications = new StudentVerifications({
        username: username,
        semester: semester,
        ...updateFields,
      });
      await studentVerifications.save();
    }

    res.status(200).json({ success: true, data: studentVerifications });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
}

async function upload(req, res) {
  console.log(req.body);
  const {
    username,
    instituteFeeReceipt,
    hostelFeeReceipt,
    messFeeReceipt,
    semester,
  } = req.body;

  const updateFields = {};

  if (
    instituteFeeReceipt !== undefined &&
    instituteFeeReceipt !== null &&
    instituteFeeReceipt !== ""
  ) {
    updateFields.instituteFeeReceipt = instituteFeeReceipt;
  }

  if (
    hostelFeeReceipt !== undefined &&
    hostelFeeReceipt !== null &&
    hostelFeeReceipt !== ""
  ) {
    updateFields.hostelFeeReceipt = hostelFeeReceipt;
  }

  if (
    messFeeReceipt !== undefined &&
    messFeeReceipt !== null &&
    messFeeReceipt !== ""
  ) {
    updateFields.messFeeReceipt = messFeeReceipt;
  }

  console.log(updateFields);
  try {
    let studentDocument = await StudentDocument.findOne({
      username: username,
      semester: semester,
    });
    if (studentDocument) {
      studentDocument = await StudentDocument.findOneAndUpdate(
        { username: username, semester: semester },
        updateFields,
        { new: true }
      );
    } else {
      studentDocument = new StudentDocument({
        username: username,
        semester: semester,
        ...updateFields,
      });
      await studentDocument.save();
    }
    res.status(200).json({ success: true, data: studentDocument });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
}

module.exports = {
  uploadFeeReferences,
  fetchReferences,
  fetchAllReferences,
  verifyFees,
  upload,
};
