const validate = require('../Utils/Validate');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const redisClient = require('../Config/RedisDB');

// const cookieOptions = {
//    httpOnly: true,
//    secure: process.env.NODE_ENV === 'production',
//    sameSite: 'strict',
//    maxAge: parseInt(process.env.JWT_MAX_AGE)
// };



const cookieOptions = {
   httpOnly: true,
   secure: process.env.NODE_ENV === 'production' ? true : false,
   sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
   maxAge: parseInt(process.env.JWT_MAX_AGE)
};


const Register = async (req, res) => {

   try {
      const { emailId, password, contact, firstName } = req.body;

      if (!emailId || !password || !contact || !firstName) {
         return res.status(400).json({
            success: false,
            message: 'All required fields must be provided',
         });
      }

      const existingUser = await User.findOne({ emailId });
      if (existingUser)
            return res.status(400).json({
            message: 'User already exists',
         });

      const result = validate(req.body);
      if (!result.success){
            return res.status(400).json({
            message: result.message,
         });
      }

      // console.log('password', password)
      req.body.password = await bcrypt.hash(password, 10);

      if (!process.env.SECRET_KEY || !process.env.JWT_EXP) {
         throw new Error('JWT configuration missing');
      }

      const user = await User.create(req.body);
      const Token = jwt.sign(
         { _id: user._id, role: user.role, emailId: user.emailId },
         process.env.SECRET_KEY,
         { expiresIn: process.env.JWT_EXP }
      );

      res.cookie('Token', Token, cookieOptions);

      res.status(201).json({
         success: true,
         message: 'User registered successfully',
         userId: user._id,
         firstName: user.firstName,
         lastName: user.lastName,
         emailId: user.emailId,
         contact: user.contact,
         role: user.role,
      });
   } catch (error) {
      if (error.code === 11000) {
         return res.status(409).json({
            success: false,
            message: 'Email or contact already exists',
         });
      }
      return res.status(500).json({
         message: 'Internal server error',
         error: error.message,
      });
   }
};



const Login = async (req, res) => {

   try {
      const { emailId, password } = req.body;

      if (!emailId || !password) {
         return res.status(400).json({ 
            success: false, 
            message: 'Email and password are required' 
         });
      }

      const user = await User.findOne({ emailId });
      if (!user) {
         return res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials' 
         });
      }

      const isMatched = await bcrypt.compare(password, user?.password);
      if (!isMatched) {
         return res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials-pass' 
         });
      }

      if (!process.env.SECRET_KEY || !process.env.JWT_EXP) {
         throw new Error('JWT configuration missing');
      }

      const Token = jwt.sign(
         { _id: user._id, role: user.role, emailId: user.emailId },
         process.env.SECRET_KEY,
         { expiresIn: process.env.JWT_EXP }
      );

      res.cookie('Token', Token, cookieOptions);

      res.status(201).json({
         success: true,
         message: 'User logged in successfully',
         userId: user._id,
         firstName: user.firstName,
         lastName: user.lastName,
         emailId: user.emailId,
         contact: user.contact,
         role: user.role,
      });
   } catch (error) {
      // console.error('Login error:', error);
      return res.status(500).json({
         success: false,
         message: 'Login failed',
         error: error.message,
      });
   }
};



const Logout = async (req, res) => {

   try {
      // console.log('logout')
      const { Token } = req.cookies;
      if (!Token) {
         return res.status(400).json({
            success: false,
            message: 'No active session',
         });
      }

      const payload = jwt.decode(Token);
      if (!payload)
         return res.status(400).json({
            message: 'Invalid token',
         });

      await redisClient.set(`Token:${Token}`, 'Blocked');
      await redisClient.expireAt(`Token:${Token}`, payload.exp);

      res.clearCookie('Token', cookieOptions);

      return res.status(201).json({
         success: true,
         message: 'User logged out successfully',
      });
   } catch (error) {
      return res.status(500).json({
         message: 'Internal server error',
         error: error.message,
      });
   }
};

const DeleteUser = async (req, res) => {
   try {
      const { Token } = req.cookies;

      if (!Token) {
            return res.status(401).json({
            message: 'Authentication token missing',
         });
      }

      const user = await User.findById(req.user?._id);
      console.log(user);
      if (!user) {
            return res.status(404).json({
            message: 'User not found',
         });
      }

      await User.findByIdAndDelete(req.user._id);

      const payload = jwt.decode(Token);
      await redisClient.set(`Token: ${Token}`, 'Blocked');
      await redisClient.expireAt(`Token: ${Token}`, payload.exp);

      res.clearCookie('Token');
      return res.status(200).json({
         message: 'User deleted successfully',
      });
   } catch (error) {
      return res.status(500).json({
         message: 'Failed to delete user',
         error: error.message,
      });
   }
};

const fetchUser = async (req, res) => {
   try {
      const { firstName, lastName, emailId, contact, role } = req.user;
      res.status(200).json({
         firstName,
         lastName,
         emailId,
         contact,
         role,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};


const updateUser = async (req, res) => {
   try {
      // console.log(req.body)

      const { emailId, contact } = req.body;
      if (emailId) throw new Error('Email is immutable');

      if (contact) throw new Error('Contact is immutable');

      const user = await User.findByIdAndUpdate(req.user?._id, req.body, {
         runValidators: true,
         new: true,
      });

      if(!user)
         return res.status(404).json({
            message: 'User not found'
         })
         
      res.status(200).json({
         firstName: user.firstName,
         lastName: user.lastName,
         emailId: user.emailId,
         contact: user.contact,
         role: user.role,
      });
   } catch (error) {
      res.status(400).json({
         message: error.message,
      });
   }
};


const validUser = async (req, res)=>{


   const reply = {
      success: true,
      firstName: req.user?.firstName,
      emailId: req.user.emailId,
      _id: req.user._id,
      role: req.user.role
   }

   res.status(200).json({
      user: reply,
      message: 'Valid user'
   })
}


module.exports = { Register, Login, Logout, DeleteUser, fetchUser, updateUser, validUser };
