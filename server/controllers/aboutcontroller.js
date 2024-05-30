const mysql = require("mysql");

const con = mysql.createPool({
    connectionLimit: 10,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    port: process.env.DB_PORT || 3307,
    connectTimeout: 10000, // 10 seconds
    acquireTimeout: 10000  // 10 seconds
});
exports.view = (req, res) => {
    res.render('About');
};

exports.save = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) {
            console.error("Error connecting to database: ", err);
            return res.status(500).send("Database connection error");
        }
        const { Firstname, Lastname, Password } = req.body;
        connection.query("INSERT INTO application (Firstname, Lastname, Password) VALUES (?, ?, ?)", [Firstname, Lastname, Password], (err, rows) => {
            connection.release();
            if (!err) {
                res.render("About",{msg:"User details added successfully!."});
            } else {
                console.error("Database insert error: ", err);
                res.status(500).send("Database insert error");
            }
        });
    });
};
