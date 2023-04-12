const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect=require('./util/database').mongoConnect
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
  User.findById('643701004721597afab38aa7')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  next()
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(()=>{
  app.listen(3000);
})

