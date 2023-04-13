const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6437fa8f5d48ef3b246e5cc9')
    .then(user => {
      req.user=user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://dhruvbhanu1003:Dhruv2808@cluster0.0oqu9aj.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result=>{
    User.findOne().then(user=>{
      if(!user){
        const user=new User({
          name:'dhruv',
          email:'dhruv.bhanu.1003@gmail.com',
          cart:{
            items:[]
          }
        })
        user.save();
      }
    })
    app.listen(3000);
  }).catch(err=>console.log(err))

