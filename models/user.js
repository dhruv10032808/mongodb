const getDb=require('../util/database').getDb
const mongodb=require('mongodb')
class User{
  constructor(username,email){
    this.name=username;
    this.email=email;
  }
  save(){
    const db=getDb();
    return db.collection('users').insertOne(this)
  }
  static findById(userId){
    const db=getDb();
    return db.collection('users').findOne({_id:userId})
  }
}

module.exports = User;
