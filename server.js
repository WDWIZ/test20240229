const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const path = require('path');
const cookieParser = require("cookie-parser");

const FRONTEND = process.env.FRONTEND_SERVER_URL;

require('dotenv').config();

express.urlencoded({ extended : false });

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

const clubRouter = require('./routes/clubs.js')();
app.use("/clubs", clubRouter);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/login', (req, res) => {
    /*
    if (req.session.user){
        res.json(req.session.user);
    }

    else{
        //res.json({isLogined: false});
        if (req.query.doLogin && req.query.successURL){
            res.statusCode = 302;
            res.setHeader("Location", `http://localhost:3001/?doLogin=${req.query.doLogin}&successURL=${req.query.successURL}`);
            res.redirect(302, `https://iam.jshsus.kr/?service=newjshsus&successURL=${req.query.successURL}`);
            res.end();
        }

        else{
            res.json({isLogined: false});
        }
    }
    */

    if (req.cookie.userData) res.json(req.cookie.userData);
    else res.json({isLogined: false});
});

app.get('/api/login', async (req, res) => {
    console.log(req.query);
    const userID = req.query.userID;
    const successURL = (req.query.successURL != "undefined") ? req.query.successURL : "";

    const userNameQuery = await db.users.findAll({
        attributes: ["name", "stuid"],
        where: {
            id: userID
        }
    });

    const userName = (userNameQuery) ? userNameQuery[0].name : null;
    const userStuid = (userNameQuery) ? userNameQuery[0].stuid : null;
    const userData = {
        isLogined: true,
        userName: userName,
        userStuid: userStuid,
        userID: userID
    };
    const userDataString = JSON.stringify(userData);

    res.cookie('userData', userDataString, { 
        httpOnly: false,
        secure: true,
        sameSite: 'none',
        maxAge: 900000
    });

    res.status(302);
    res.redirect(`${FRONTEND}${successURL}`);
    res.end();
});

module.exports = app;