const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //Validate The Data Before
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);
    //check email exist
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist)  return res.status(400).send('Email already exist');

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({user: user._id});
  } catch {
    res.status(400).send(err);
  }
});

router.get("/registers", (req, res) => {
  res.send("ajsdosjd");
  console.log("asjhdus");
});

router.post('/login', (req, res) => {
  //Validate The Data Before
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    
});

module.exports = router;
