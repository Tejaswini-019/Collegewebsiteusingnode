const mysql=require("mysql");
const con=mysql.createPool({
    connectionLimit:10,
    port:process.env.DB_PORT || 3307,
    host:process.env.DB_HOST || '127.0.0.1',
    database:process.env.DB_NAME,
    user:process.env.DB_USER,
    password:process.env.DB_PASS
})
exports.view=(req,res)=>{
    res.render("Login");
}

exports.save=(req,res)=>{
    const {Email,Password}=req.body;
    con.getConnection((err,connection)=>{
        if (err) throw err;
        connection.query("select * from register where Email= ? and Password= ?",[Email,Password],(err,rows)=>{
            connection.release();
            if (err) {
                console.error("Error executing the query: " + err);
                return res.status(500).send("Internal Server Error");
            }

            if (rows.length > 0) {
                res.redirect("/Home");
            } else {
                res.render("Login", { msg: "Unauthorized: Invalid email or password" });
            }
        })
    })
};
