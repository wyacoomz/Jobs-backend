import User from "../models/user.model.js";

//  REGISTER SERVICE
export const registerUserService = async ({ name, email, password, confirmPassword, role }) => {
  // 1. Check password match
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  // 2. Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // 3. Set role (default to 'user')
  const assignedRole = role === "recruiter" ? "recruiter" : "user";

  // 4. Create user
  const user = await User.create({ name, email, password, role: assignedRole });

  // 5. Generate token
  const token = user.generateToken();

  return { user, token };
};

// LOGIN SERVICE
export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new Error("Invalid credentials");
  }

  const token = user.generateToken();
  return { user, token };
};
