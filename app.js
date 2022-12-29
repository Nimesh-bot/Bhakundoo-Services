const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')


require('dotenv').config({ path: './.env' });

const app = express();

const mongooseConnect = require('./services/dbConnect');
mongooseConnect.connect;

app.use(helmet());
app.use(express.json());
app.use(cookieParser())
app.use(morgan('dev'));
app.use(cors({
    origin: '*',
    credentials: true
}));

// var whitelist = ['http://localhost:3000', /** other domains if any */ ]
// var corsOptions = {
//   credentials: true,
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions));

app.use('/', require('./routes/public.route'));
app.use('/admin', require('./routes/admin.route'));
app.use('/auth', require('./routes/auth.route'));
app.use('/user', require('./routes/user.route'));

// app.use((req, res) => {
//     res.status(404).send('Not Found');
// })

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})

