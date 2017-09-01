
  //load bcrypt
  var bCrypt = require('bcryptjs');

  module.exports = function(passport,user){

  var Customer = user;
  var LocalStrategy = require('passport-local').Strategy;


  passport.serializeUser(function(user, done) {
          done(null, user.id);
      });


  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id).then(function(user) {
        if(user){
          done(null, user.get());
        }
        else{
          done(user.errors,null);
        }
      });

  });


  passport.use('local-signup', new LocalStrategy(

    {
      usernameField : 'customer_email',
      passwordField : 'customer_password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done){


      var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

       Customer.findOne({where: {email:customer_email}}).then(function(user){

      if(user)
      {
        return done(null, false, {message : 'That email is already taken'} );
      }

      else
      {
        var userPassword = generateHash(password);
        var data =
        { email:customer_email,
        password:customer_password,
        firstname: req.body.customer_first_name,
        lastname: req.body.customer_last_name
        };


        Customer.create(data).then(function(newUser,created){
          if(!newUser){
            return done(null,false);
          }

          if(newUser){
            return done(null,newUser);

          }


        });
      }


    });



  }



  ));

  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(

  {

  // by default, local strategy uses username and password, we will override with email
  usernameField : 'customer_email',
  passwordField : 'customer_password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(req, email, password, done) {

    var Customer = user;

    var isValidPassword = function(userpass,password){
      return bCrypt.compareSync(password, userpass);
    }

  Customer.findOne({ where : { email: customer_email}}).then(function (user) {

      if (!user) {
        return done(null, false, { message: 'Email does not exist' });
      }

      if (!isValidPassword(user.customer_password,password)) {

        return done(null, false, { message: 'Incorrect password.' });

      }

      var userinfo = user.get();

      return done(null,userinfo);

    }).catch(function(err){

      console.log("Error:",err);

      return done(null, false, { message: 'Something went wrong with your Signin' });


    });

  }
  ));

  }
