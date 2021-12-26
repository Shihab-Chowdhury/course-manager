import cors from 'cors';

// whitelisting all the origins
const whitelist = [
    
    'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {

    if (whitelist.indexOf(origin) !== -1) callback(null, true)
    
    else callback(new Error('Not allowed by CORS'));
    
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export const corsMiddleware = cors();