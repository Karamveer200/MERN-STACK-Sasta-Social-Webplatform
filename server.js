const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

connectDB();

//INIT Middleware (Bodyparser)
app.use(express.json({ extended: false }));
//Make upload folder publicly available to fetch profile
app.use('/uploads', express.static('uploads'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

//Make avail static asset in production
// if(process.env.NODE_ENV==='production'){
app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server started on PORT ${PORT}`);
});
