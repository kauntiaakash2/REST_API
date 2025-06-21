const express = require('express');
const UserController = require('./routes/userRoutes');
const app = express();
const cors = require('cors');
const storage = require('node-persist');
storage.init();

app.use(express.json()); // Middleware to parse JSON bodies

app.use(cors()); // Third party middleware to handel frontend

app.use('/api/v1/user', UserController);

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});


//To get access to the API
// http://localhost:5000/api/v1/user
// To get all users
// http://localhost:5000/api/v1/user/3
// To delete user with id 3
// http://localhost:5000/api/v1/user/3
// To update user with id 3
