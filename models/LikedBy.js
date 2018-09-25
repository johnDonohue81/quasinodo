const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const now = moment();

//is like needed here? is there anything else needed in the likedbyschema other than the user that likes you id? Once we have that info sned it to the likesMe page and display 'liker' profile with the option to like back or decline. If they dislike, remove that profile from likesMe page and remove that userId from likers like array. If user2 likes the liker create a match. which means a new schema? isMatched: { type: Boolean, default: false }
const LikeBySchema = new Schema({
  like: { type: Boolean, default: false },
  user_id: {
    type: Schema.Types.ObjectId, ref: 'user'
  },
  timestamp: { type: String, default: now.format("dddd, MMMM Do YYYY, h:mm:ss a") }
});


module.exports = mongoose.model("LikedBy", LikeBySchema);
