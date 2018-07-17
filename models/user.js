const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
  spotifyId: {
    type: String,
    required: true,
    unique: true
  }
});

UserSchema.static('findOrCreate', async (userInfo) => {
  const user = await this.findOne(userInfo);
  return user || this.create(userInfo);
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
