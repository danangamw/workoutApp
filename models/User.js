import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
UserSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await this.create({ email, password: hashedPassword });

  return user;
};

// static login method
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

const User = mongoose.model('User', UserSchema);

export default User;
