const storage = require("node-persist");
const bycrypt = require("bcrypt");

(async () => {
  await storage.init(); // Required to initialize node-persist
})();

const getAllUser = async (_req, res) => {
  try {
    const values = await storage.values(); // Get all user data
    res.send(values); // Send as JSON
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const userData = await storage.getItem(id);
  if (userData) {
    res.status(200).json(userData); // ✅ FIXED: use .json to send object
  } else {
    res.status(404).send({ message: "User not found" });
  }
};

const addUser = async (req, res) => {
  const { id, name, email, password } = req.body;
  try {
    const hashPassword = await bycrypt.hash(password, 10);
    await storage.setItem(id, { id, name, email, password: hashPassword });
    res.status(201).send("New User Created Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

const deleteUserByID = async (req, res) => {
  const id = req.params.id;
  const userData = await storage.getItem(id);
  if (userData) {
    await storage.removeItem(id);
    res.status(200).send(`User ${id} deleted successfully`);
  } else {
    res.status(404).send({ message: "User not found" });
  }
};

const updateUserByID = async (req, res) => {
  const id = req.params.id;
  const userData = await storage.getItem(id);
  if (userData) {
    const { name, email, password } = req.body;
    if (name) userData.name = name;
    if (email) userData.email = email;
    if (password) userData.password = await bycrypt.hash(password, 10);
    await storage.setItem(id, userData);
    res.status(200).send(`User ${id} updated successfully`);
  } else {
    res.status(404).send({ message: "User not found" });
  }
};

const loginUser = async (req, res) => {
  const { email, password} = req.body;
  if (!email || !password) {
    return res.status(403).send("Email and password are required");
  }
  const allUsers = await storage.values();
  const user = allUsers.find(user => user.email === email);
  if (user) 
    {
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (isPasswordValid) {
      return res.status(200).send(`Welcome ${user.name}`);
    } else {
      return res.status(403).send("Invalid password");
    }
  } else {
    return res.send(`${email} not registered`);
  }
};

module.exports = {
  getAllUser,
  getUserById,
  addUser,
  deleteUserByID,
  updateUserByID,
  loginUser
};
