const router = require("express").Router();
const User = require("../model/User");
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //Validate The Data Before
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    //check email exist
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist)  return res.status(400).send('Email already exist');
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch {
    res.status(400).send(err);
  }
});

router.get("/registers", (req, res) => {
  res.send("ajsdosjd");
  console.log("asjhdus");
});

module.exports = router;
