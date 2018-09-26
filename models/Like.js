const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const now = moment();

const LikeSchema = new Schema({
  like: { type: Boolean, required: true },
  user_id: {
    type: Schema.Types.ObjectId, ref: 'user'
  },
  timestamp: { type: String, default: now.format("dddd, MMMM Do YYYY, h:mm:ss a") }
});

module.exports = mongoose.model("Like", LikeSchema);
