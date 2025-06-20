const express = require('express');

const app = express(); //server creation

//local server port 5000
app.get('/', (req, res) => {
  res.status(200).send('Get Triggered'); //response to the request
});
app.post('/', (req, res) => {
  res.status(200).send('Post Triggered'); //response to the request
});
app.put('/', (req, res) => {
  res.status(200).send('Update Triggered'); //response to the request
});
app.delete('/', (req, res) => {
  res.status(200).send('Delete Triggered'); //response to the request
});
app.listen(5000, () => {
  console.log('Server is running on port 5000'); //server running message
}); //server listening on port 5000


// Uncomment the following code to create additional routes
// //local server port 5000/about
// app.get('/about', (req, res) => {
//   res.status(200).send('<h1>This is my About Us</h1>'); //response to the request
// });
// //local server port 5000/contact
// app.get('/contact', (req, res) => {
//   res.status(200).send('<h1>This is my Contact Us</h1>'); //response to the request
// });

// app.listen(5000, () => {
//   console.log('Server is running on port 5000'); //server running message
// }); //server listening on port 5000