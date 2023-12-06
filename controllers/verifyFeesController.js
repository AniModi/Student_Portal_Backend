const FeeReferences = require("../models/FeeReferences");

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

module.exports = {
  uploadFeeReferences,
  fetchReferences,
  fetchAllReferences,
};
