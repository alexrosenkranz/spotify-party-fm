const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  spotifyId: {
    type: String,
    required: true,
    unique: true
  }
});

UserSchema.static("findOrCreate", async function(userInfo){
  
  const user = await this.findOne(userInfo);

  return user || this.create(userInfo);
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
