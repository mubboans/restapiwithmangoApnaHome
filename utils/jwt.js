const jwt = require("jsonwebtoken");
const crypto = require('crypto').webcrypto;
const createToken =({ payload, expiration }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiration,
    });
   
    return token;
  };
const createRefreshJWT = ({ payload, expiration }) => {
    const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: expiration,
    });
    return token;
  };

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachedTokens = ({ user}) => {
  const oneHour = '6h'
    const onehalfDay = '6h';
    const longerExp = '30h';
  
    const accessTokenJWT = createToken({ payload: { user }, expiration: oneHour });
    const refreshTokenJWT = createRefreshJWT({
      payload: { user},
      expiration: onehalfDay,
    });
  
    return {
      accessToken: accessTokenJWT,
      refreshToken: refreshTokenJWT,
    };
  };
const randomPassword = ()=>{
  
       var length = 20;
        var wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$';

       const arr= Array.from((new Uint32Array(length)))
          .map((x) => wishlist[x % wishlist.length])
          .join('')

          randPassword=arr
    return randPassword
} 

  module.exports = {
    createToken,
    createRefreshJWT,
    isTokenValid,
    randomPassword,
    attachedTokens,
  };
