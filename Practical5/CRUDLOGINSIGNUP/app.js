const express = require('express');
const app = express();

const path = require('path');

const user = require('./model/user');

const dbconnect = require('./dbconfig/dbconfig');
dbconnect();

const viewsPath = path.join(__dirname, '/pages/')
require('dotenv').config();
const PORT = process.env.PORT;

const pageUrl = path.join(__dirname, 'pages/');
app.use('/css', express.static(
    path.join(__dirname, 'node_modules/bootstrap/dist/css')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(pageUrl + "index.html")
})

//Signup get & post
app.get("/signup", (req, res) => {
    res.sendFile(pageUrl + "signup.html")
})
app.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
        const {
            email, username, password } = req.body;

        if (email == '' || username == '' || password == '') {
            console.log('All fields required !');
        }
        //Check user is already there in the database ot not
        const checkuser = await user.find({ email: email });
        if (checkuser.length == 0) {
            const newuser = {
                email: email,
                username: username,
                password: password
            }
            await user.create(newuser);
            res.sendFile(path.join(pageUrl, "index.html"))
        }
        else {
            console.log('User already exists !');
        }
    }
    catch (err) {
        console.log('Error :' + err);
    }
})

console.log(pageUrl);
app.get("/login", (req, res) => {
    res.sendFile(pageUrl + "login.html")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username == '' || password == '') {
            console.log('Email and password are required!');
            return res.status(400).json({
                success: false,
                message: 'Email and password are required!'
            });
        }

        // Check if the user exists in the database using either username or email
        const checkuser = await user.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        });

        if (checkuser) {
            // Verify the password
            if (checkuser.password === password) {
                console.log('Login successful!');
                res.status(200).json({
                    success: true,
                    message: 'Login successful!',
                    redirectUrl: '/'
                });
            } else {
                console.log('Incorrect password!');
                res.status(401).json({
                    success: false,
                    message: 'Invalid credentials! Please check your password.'
                });
            }
        } else {
            console.log('User does not exist!');
            res.status(404).json({
                success: false,
                message: 'User does not exist! Please check your email/username.'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});