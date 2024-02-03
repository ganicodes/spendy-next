import bcryptjs from "bcryptjs";

// function to hash the password before saving into db
export const toHashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  return hashedPassword;
};

// verifying the password given by user with hashed password
export const verifyPassword = async (uiPassword, dbPassword) => {
  const isPasswordCorrect = await bcryptjs.compare(uiPassword, dbPassword);
  return isPasswordCorrect;
};
