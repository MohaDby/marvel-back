import mongoose from "mongoose";

const Signup = mongoose.model("Signup", {
  email: String,
  username: String,
  token: String,
  hash: String,
  salt: String,
  favoriteCharacters: [String],
  favoriteComics: [String],
});

export default Signup;
