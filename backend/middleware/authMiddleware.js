const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const userTable = require('../models/userModel')

const protectToken = asyncHandler(async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      //Tries to get the token from the header
      token = req.headers.authorization.split(' ')[1]

      // Verify & decode the token using the token from the header & using the secret in the .env file
      const decodedToken = jwt.verify(token, process.env.JWT_Secret)

      // Tries to find the user using the decoded ID & removes the password because we don't need, nor want it in our request
      req.user = await userTable.findById(decodedToken.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401) 
      throw new Error('You are not authorised to see this')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Token not authorised.')
  }
})

module.exports = {protectToken}

// This is what the Bearer token looks like
// The split occurs at the space between Bearer & the token itself
// Because arrays start at 0, we then take array 1 as the token which is the "tokengoeshereaaaaaaaaaaaaaaaaa" string
// This allows me to take just the token as that's what is needed
/*
array1.array2
Bearer tokengoeshereaaaaaaaaaaaaaaaaaaaaaa
*/