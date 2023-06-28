require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const multer = require("multer");
const PORT = process.env.PORT;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// const upload = multer({ dest: "uploads/" });
const storage=multer.diskStorage({
  destination:function(req,file,cb){
    return cb(null,'./uploads')
  },
  filename:function(req,file,cb){
    return cb(null,`${Date.now()}-${file.originalname}`)
  }
})
const upload=multer({storage});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  return res.render("homepage");
});
app.post("/upload", upload.fields([{name:"profileimage"},{name:'coverimage'}]), (req, res) => {
  res.redirect('/')
});
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
