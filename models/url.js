const mongoose = require("mongoose");

const urlschema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      //original url
      type: String,
      required: true,
    },
    visitHistory: [{ timeStamps: { type: Number } }],
    // for separating the urls created by different users
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const URL = mongoose.model("url", urlschema);
module.exports = URL;
