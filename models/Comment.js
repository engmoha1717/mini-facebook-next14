import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: [true, "Comment content is required"],
    trim: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  isLike: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;




// const CommentSchema = new mongoose.Schema({
//   sender: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   post: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Post",
//     required: true,
//   },
//   content: {
//     type: String,
//     required: [true, "Comment content is required"],
//     trim: true,
//   },
//   likes: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }],
//   likesCount: {
//     type: Number,
//     default: 0
//   },
//   replies: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Comment'
//   }],
//   parentComment: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Comment',
//     default: null
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });