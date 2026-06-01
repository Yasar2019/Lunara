const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema(
  {
    question: { type: String, trim: true },
    answer: { type: String, trim: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    age: { type: Number, required: true, min: 18 },
    gender: { type: String, required: true, trim: true },
    interestedIn: { type: String, default: 'everyone', trim: true },
    bio: { type: String, default: '', maxlength: 500 },
    location: { type: String, default: '', trim: true },
    photos: [{ type: String, trim: true }],
    interests: [{ type: String, trim: true }],
    relationshipGoal: { type: String, default: '', trim: true },
    vibeTags: [{ type: String, trim: true }],
    prompts: [promptSchema],
    likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    superLikedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    passedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    verified: { type: Boolean, default: false },
    isAdultConfirmed: { type: Boolean, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model('User', userSchema);
