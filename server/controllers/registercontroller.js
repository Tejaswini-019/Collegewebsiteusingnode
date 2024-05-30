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
    res.render("Register");
}

exports.save=(req,res)=>{
    const {Email,Password}=req.body;
    con.getConnection((err,connection)=>{
        connection.query("insert into register (Email,Password) values(?, ? )",[Email,Password],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("Login");
            }
            else{
                console.log("Error"+err);
            }
        })
    })
};