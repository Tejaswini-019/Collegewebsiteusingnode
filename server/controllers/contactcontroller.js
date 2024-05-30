
const mysql = require("mysql");
const con = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || '127.0.0.1',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 3307,
});
exports.view=(req,res)=>{
    res.render("Contact")
}
exports.save = (req, res) => {
    const { Name, Email, Phoneno, Message} = req.body;
    con.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("INSERT INTO contact (Name, Email, Phoneno, Message) VALUES (?, ?, ?, ?)", [Name, Email, Phoneno,Message], (err, rows) => {
            connection.release();
            if (!err) {
                res.render("Contact");
            } else {
                console.log("error" + err);
                res.status(500).send("Database insert error");
            }
        });
    });
};
