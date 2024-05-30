const mysql = require("mysql");
const multer=require("multer");
const path=require("path");
const con = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || '127.0.0.1',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 3307,
});
const storage=multer.diskStorage({
    destination:"./public/images",
    filename:(req,file,cb)=>{
        cb(null, file.fieldname+ '-'+ Date.now() + path.extname(file.originalname));
    }
}
)
const upload=multer({
    storage:storage,
    limits:{ fileSize:1000000},
    fileFilter: (req,file,cb)=>{
        CheckFilter(file,cb)
    }
}).single("img");

function CheckFilter(file,cb){
    const filetype=/jpeg|jpg|png|gif/;
    const extname=filetype.test(path.extname(file.originalname).toLowerCase());
    const mimetype=filetype.test(file.mimetype);
    if(mimetype &&  extname){
        return cb(null, true)
    }
    else {
        cb('Error:Images Only!');
    }
};

exports.view = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM comments", (err, rows) => {
            connection.release();
            if (!err) {
                res.render("Single", { rows });
            } else {
                console.log("error: " + err);
                res.status(500).send("Database query error");
            }
        }); 
    });
};

exports.Single = (req, res) => {
    res.render("Single");
};

/**    const { comment, name,img } = req.body;
    con.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("INSERT INTO comments (comment, name, img) VALUES (?, ?, ?)", [comment, name, img], (err, rows) => {
            connection.release();
            if (!err) {
                res.render("Single");
            } else {
                console.log("error" + err);
                res.status(500).send("Database insert error");
            }
        });
    }); */

exports.save = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('Single', { msg : err});
            console.log("single error"+err);
        }
        else {
            if (req.file == undefined) {
                res.render('Single', { msg: 'No file selected!' });
                console.log("undefined error"+err);
            } 
            else {
                const { comment, name } = req.body; 
                con.getConnection((err, connection) => {
                    if (err) throw err;
                    const img = `images/${req.file.filename}`;
                    const query="INSERT INTO comments (comment, name, img ) VALUES (?, ?, ?)";
                    connection.query(query, [comment, name,img], (err, rows) => {
                        connection.release();
                        if (!err) {
                            res.render("Single", { msg: "User details added successfully" });
                        } else {
                            console.log("error" + err);
                            res.status(500).send("Database insert error");
                        }
                    });
                });
            }
        }
    })
};
