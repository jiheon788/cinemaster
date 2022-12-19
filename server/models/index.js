const mongoose = require("mongoose");

const UserSchema = require("./schemas/user");
const CartSchema = require("./schemas/cart");
const StarSchema = require("./schemas/star");
const ReviewSchema = require("./schemas/review");
const RecommendSchema = require("./schemas/recommend");

const LikeSchema = require("./schemas/like");

exports.User = mongoose.model("User", UserSchema);
exports.Cart = mongoose.model("Cart", CartSchema);
exports.Star = mongoose.model("Star", StarSchema);
exports.Review = mongoose.model("Review", ReviewSchema);
exports.Like = mongoose.model("Like", LikeSchema);
exports.Recommend = mongoose.model("Recommend", RecommendSchema);
