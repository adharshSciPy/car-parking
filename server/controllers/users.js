const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load User model
const User = require("../models/user");
// Load input validation
const SignupValidation = require("../validator/SignupValidation");
const SigninValidation = require("../validator/SigninValidation");
module.exports = {
  //  ---------------------------------------- //signup method to add a new user//--------------------------- //

  signup: async (req, res) => {
    const {firstName, lastName, email, password } = req.body;
    const { errors, isValid } = SignupValidation(req.body);

    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        console.log(req.body)
        await User.findOne({ email }).then(async (exist) => {
          if (exist) {
            errors.email = "Email already in use";
            res.status(404).json({ message: "Email is already in use", errors });
          } else {
            const hashedpassword = bcrypt.hashSync(password, 8);
            const result = await User.create({
              password: hashedpassword,
              firstName,
              lastName,
              email,
             
            });
            res.status(201).json({ message: "Account Created" });
          }
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Server Error' })
    }
  },


//Api checker
//   {
//     "firstName":"Demo",
//     "lastName":"One",
//     "email":"email@gmail.com",
//     "password":"Password@12",
//     "role": "admin"
// }




  //  ---------------------------------------- //signin method to add a new user//--------------------------- //
  signin: async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    const { errors, isValid } = SigninValidation(req.body);

    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        await User.findOne({ email }).then(async (user) => {
          if (!user) {
            errors.email =
              "Email does not exist ! please Enter the right Email or You can make account";
            res.status(404).json(errors);
          }
          // Compare sent in password with found user hashed password
          const passwordMatch = bcrypt.compareSync(password, user.password);
          if (!passwordMatch) {
            errors.password = "Wrong Password";
            res.status(404).json({message: 'Password not matched', errors});
          } else {
            // generating a token and storing it in a cookie
            const token = jwt.sign({ _id: user._id, }, "sooraj_DOING_GOOD", {
              expiresIn: "8h",
            });
            const options = {
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
              httpOnly: true,
              sameSite: "lax",
            };

            // console.log(data);
            // res.cookie("Authorization", token, options);
            res.status(201).json({
              token,
              userID: user._id,
              message: 'Logged In Succesfully'
            }); 
          }
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Server Error' })
    }
  },
//apiChecker
//   {  
//     "email":"email@gmail.com",
//     "password":"Password@12"
// }


  verifyToken: async (req, res) => {
    try {
      const token = req.body.token;
      const decoded = jwt.verify(token, "sooraj_DOING_GOOD")
      res.status(200).json(decoded)

    } catch (error) {
      return res.status(401).json({
        message: 'Auth Failed'
      });
    }

  },

  getUser: async (req, res) => {
    const id = req.params.id;
    console.log(id, "id vanno");
    try {
      const userdata = await User.findById(id);
      const data = {
        firstName: userdata.firstName,
        LastName: userdata.lastName,
        email: userdata.email,
      }
      res.status(200).json(data)

    } catch (error) {
      return res.status(401).json({
        message: 'Get Req Failed'
      });
    }
  }
}


