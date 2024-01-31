const bcrypt = require('bcrypt');

userSchema.pre('save', async function (next) {
  try {
    // Hash the password only if it's modified or a new user
    if (!this.isModified('password')) {
      return next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password along with the new salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Override the plain text password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
