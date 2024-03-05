
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

//middleware 
app.use(bodyParser.json());

// connected to the data base (MongoDB)
mongoose.connect('mongodb+srv://kuntalkumar789:kuntal98@cluster0.vigwezr.mongodb.net/zarektronix', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// decleare the schema of user 
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});


const User = mongoose.model('User', userSchema);


//  All Routes
app.get("/",(req,res)=>{
    res.send("Api is working")
})


app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT =8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
