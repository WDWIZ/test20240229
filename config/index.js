require('dotenv').config();
const env = process.env;

const development = {
    "username": "root",
    "password": "I am Mineppl12",
    "database": "jshsus",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
};

const test = {
    "username": "root",
    "password": "I am Mineppl12",
    "database": "jshsus",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
};

const production = {
    "username": "root",
    "password": "I am Mineppl12",
    "database": "jshsus",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
}


module.exports = { development, test, production };