var express = require('express')
var cors = require('cors')
var app = express()

// get the client
const mysql = require('mysql2');
const bodyParser = require('body-parser');
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'userdb'
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/users', function (req, res, next) {
    try {
        connection.query(
            'SELECT * FROM `users`',
            function(err, results, fields) {
                if (err) throw err;
                res.json(results);
               
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Err");
    }
})

app.get('/user/:id', function (req, res) {
    const id = req.params.id;
    try {
        connection.query(
            'SELECT * FROM `users` WHERE user_id = ?',
            [id],
            function(err, results, fields) {
                if (err) throw err;
                res.json(results);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("ERR");
    }
})


app.post('/user/create', function (req, res, next) {
    try {
        connection.query(
            'INSERT INTO `users`(`user_fname`, `user_lname`, `user_email`, `user_img`) VALUES (?,?,?,?)',
            [   
                req.body.user_fname,
                req.body.user_lname,
                req.body.user_email,
                req.body.user_img
            ],
            function(err, results, fields) {
                if (err) throw err;
                res.json(results);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("ERR");
    }
})

app.put('/user/update', function (req, res, next) {
    try {
        connection.query(
            'UPDATE `users` SET `user_fname`=? ,`user_lname`=?, `user_email`=? , `user_img`=? WHERE `user_id` = ?',
            [   
                req.body.user_fname,
                req.body.user_lname,
                req.body.user_email,
                req.body.user_img,
                req.body.user_id
            ],
            function(err, results, fields) {
                if (err) throw err;
                res.json(results);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("ERR");
    }
})

app.delete('/user/delete', function (req, res, next) {
    try {
        connection.query(
            'DELETE FROM `users` WHERE `user_id` = ?',
            [   
                req.body.user_id
            ],
            function(err, results, fields) {
                if (err) throw err;
                res.json(results);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("ERR");
    }
})
////////////////////////////////product///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/items', function (req, res, next) {
    try {
        connection.query(
            'SELECT * FROM `items`',
            function(err, results, fields) {
                if (err) throw err;
                res.json(results);
               
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Err");
    }
})

app.get('/item/:id', function (req, res) {
    const idItem = req.params.id;
    try {
        connection.query(
            `SELECT  u.user_id, u.user_fname, u.user_lname, u.user_email, u.user_img, i.item_id, i.item_name, i.item_img
            FROM users u 
            JOIN items i 
            ON u.user_id  = i.user_id 
            WHERE u.user_id = ?;`,
            [idItem],
            function(err, results, fields) {
                if (err) throw err;
                res.json(results);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("ERR");
    }
})

app.post('/items/create', function (req, res, next) {
    try {
        connection.query(
            'INSERT INTO `items`(`user_id`,`item_name`, `item_img`) VALUES (?,?,?)',
            [   
                req.body.user_id,
                req.body.item_name,
                req.body.item_img,
               
            ],
            function(err, results, fields) {
                if (err) throw err;
                res.json(results);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("ERR");
    }
})

app.put('/items/update', function (req, res, next) {
    try {
        connection.query(
            'UPDATE `items` SET `item_name`=? ,`item_img`=? WHERE `item_id` = ?',
            [   
                req.body.item_name,
                req.body.item_img,
                req.body.item_id
               
            ],
            function(err, results, fields) {
                if (err) throw err;
                res.json(results);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("ERR");
    }
})

app.delete('/item/delete', function (req, res, next) {
    try {
        connection.query(
            'DELETE FROM `items` WHERE `item_id` = ?',
            [   
                req.body.item_id
            ],
            function(err, results, fields) {
                if (err) throw err;
                res.json(results);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("ERR");
    }
})
app.listen(1975, function () {
  console.log('CORS-enabled web server listening on port 1975')
})