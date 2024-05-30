const express=require("express");
const router=express.Router();
const Homecontroller=require("../controllers/homecontroller");
const Aboutcontroller=require("../controllers/aboutcontroller");
const Coursecontroller=require("../controllers/coursecontroller");
const Singlecontroller=require("../controllers/singlecontroller");
const Eventcontroller=require("../controllers/eventcontroller");
const Contactcontroller=require("../controllers/contactcontroller");
const Logincontroller=require("../controllers/logincontroller");
const Registercontroller=require("../controllers/registercontroller");
router.get("/About",Aboutcontroller.view);
router.post("/About",Aboutcontroller.save);
router.get("/Home",Homecontroller.view);
router.get("/Course",Coursecontroller.view);
router.post('/Home',Homecontroller.save);
router.get("/Single",Singlecontroller.view);
router.post("/Single",Singlecontroller.save);
router.get("/Event",Eventcontroller.view);
router.get("/Contact",Contactcontroller.view);
router.post("/Contact",Contactcontroller.save);
router.get("/",Logincontroller.view);
router.post("/",Logincontroller.save);
router.post("/Register",Registercontroller.save);
router.get("/Register",Registercontroller.view);
module.exports=router; 


