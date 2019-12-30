const router = require("express").Router();
const User = require("../model/User");

//Validation
const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string()
    .min(6)
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required()
});

router.post("/register", async (req, res) => {
  //Validate The Data Before
  const validation = schema.validate(req.body);

  const ero = validation.error.details[0].message;
  if (ero !== null) return res.status(400).send(validation.error.details[0].message);
  
//   res.send(validation);
  
  const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  });
  try {
      const savedUser = await user.save();
      res.send(savedUser);
  } catch{
      res.status(400).send(err);
  }
});

router.get("/registers", (req, res) => {
  res.send("ajsdosjd");
  console.log("asjhdus");
});

module.exports = router;
