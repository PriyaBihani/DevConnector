const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    get user details from a protected route. With the help of middleware, we are sure that we are passing only that users information which is logged in.
// @access  Public
router.get('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password');
      return res.json(user);
   } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
   }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
   '/',
   [
      check('email', 'Please enter a valid email').isEmail(),
      check('password', 'Password is required').exists(),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      try {
         // See if user exists
         let user = await User.findOne({ email: email });

         if (!user) {
            return res
               .status(400)
               .json({ errors: [{ msg: 'Invalid Credentials' }] }); // to match the above error message
         }

         const isMatch = await bcrypt.compare(password, user.password);

         if (!isMatch) {
            return res
               .status(400)
               .json({ errors: [{ msg: 'Invalid Credentials' }] });
         }

         // Return jsonwebtoken - in the front end when user registers we want them to login right away
         const payload = {
            user: {
               id: user.id,
            },
         };

         jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
               if (err) throw err;
               return res.json({ token });
            }
         );
      } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
      }
   }
);

module.exports = router;
