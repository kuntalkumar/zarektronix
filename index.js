
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

//middleware 
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());



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


app.get("/",(req,res)=>{
    res.send("Api is working") // checking is the API working or not 

})



// sign up routes 
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

const PORT =8080; // Application server listening on this port 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
