// models/User.js
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    image: {
      type: String,
    },
    posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    likedPosts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);
export default User;

// models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likesCount: {
    type: Number,
    default: 0
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  commentsCount: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps
PostSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for like count
PostSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
PostSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
export default Post;

// models/Comment.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  content: {
    type: String,
    required: [true, "Comment content is required"],
    trim: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likesCount: {
    type: Number,
    default: 0
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps
CommentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for like count
CommentSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for replies count
CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;











// import React, { useState } from 'react';
// import { Menu, Search, User, Home, Compass, Users, LogOut, Settings, ChevronDown } from 'lucide-react';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   return (
//     <div className="w-full">
//       <nav className="bg-white shadow-md w-full">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-between h-16">
//             {/* Left side - Logo and main nav */}
//             <div className="flex">
//               {/* Logo */}
//               <div className="flex-shrink-0 flex items-center">
//                 <div className="text-2xl font-bold text-blue-600 cursor-pointer">
//                   SocialApp
//                 </div>
//               </div>

//               {/* Main navigation - Desktop */}
//               <div className="hidden md:ml-6 md:flex md:space-x-4 items-center">
//                 <div className="flex items-center px-3 py-2 text-blue-600 border-b-2 border-blue-600 cursor-pointer">
//                   <Home className="h-5 w-5 mr-1" />
//                   <span>Home</span>
//                 </div>
//                 <div className="flex items-center px-3 py-2 text-gray-500 hover:text-gray-700 cursor-pointer">
//                   <Compass className="h-5 w-5 mr-1" />
//                   <span>Explore</span>
//                 </div>
//                 <div className="flex items-center px-3 py-2 text-gray-500 hover:text-gray-700 cursor-pointer">
//                   <Users className="h-5 w-5 mr-1" />
//                   <span>Friends</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right side - Search and Profile */}
//             <div className="flex items-center">
//               {/* Search Bar - Desktop */}
//               <div className="hidden md:block">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     className="w-64 px-4 py-1 pl-10 rounded-full border focus:outline-none focus:border-blue-500"
//                   />
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 </div>
//               </div>

//               {/* Profile Dropdown */}
//               <div className="ml-4 relative flex items-center">
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsProfileOpen(!isProfileOpen)}
//                     className="flex items-center space-x-2 focus:outline-none"
//                   >
//                     <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
//                       <User className="h-5 w-5 text-gray-500" />
//                     </div>
//                     <ChevronDown className="h-4 w-4 text-gray-500" />
//                   </button>

//                   {isProfileOpen && (
//                     <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
//                       <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center">
//                         <User className="h-4 w-4 mr-2" />
//                         Your Profile
//                       </div>
//                       <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center">
//                         <Settings className="h-4 w-4 mr-2" />
//                         Settings
//                       </div>
//                       <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center">
//                         <LogOut className="h-4 w-4 mr-2" />
//                         Sign out
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Mobile menu button */}
//               <div className="md:hidden ml-4">
//                 <button
//                   onClick={() => setIsMenuOpen(!isMenuOpen)}
//                   className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
//                 >
//                   <Menu className="h-6 w-6" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <div className="flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-md cursor-pointer">
//                 <Home className="h-5 w-5 mr-2" />
//                 Home
//               </div>
//               <div className="flex items-center px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-md cursor-pointer">
//                 <Compass className="h-5 w-5 mr-2" />
//                 Explore
//               </div>
//               <div className="flex items-center px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-md cursor-pointer">
//                 <Users className="h-5 w-5 mr-2" />
//                 Friends
//               </div>
//             </div>
//             {/* Mobile Search */}
//             <div className="px-2 pb-3">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full px-4 py-2 pl-10 rounded-full border focus:outline-none focus:border-blue-500"
//                 />
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// };

// export default Navbar;