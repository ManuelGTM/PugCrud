const router = require("express").Router();
const db = require("../../dbConfig.js");
const bcrypt = require("bcrypt");

router.get("/users", (req, res, next) => {
  let arr = ["Manuel", "Jose", "Kevin", "Rodolfo"];
  res.render("index", { arr });
  next();
});

router.get("/users/login", (req, res, next) => {
  res.render("login");
  next();
});

router.get("/users/Register", (req, res, next) => {
  res.render("Register");
  next();
});

router.post("/users/Register", async (req, res) => {
  let { name, email, password, password2 } = req.body;

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push("Please enter all fields");
  }
  if (password < 6) {
    errors.push("Password should be at least 6 characters");
  }
  if (password != password2) {
    errors.push("Password do not match");
  }

  if (errors.length > 0) {
    res.render("Register", { errors });
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) throw err;

        if (results.rows.length > 0) {
          errors.push("Email already registered");
          res.render("Register", { errors });
        } else {
          db.query(
            `INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING iduser, password`,
            [name, hashedPassword, email],
            (err, results) => {
              if (err) throw err;
              req.flash("success_msg", "You are now registered. Please log in");
              res.redirect("/users/login");
            },
          );
        }
      },
    );
  }
});

module.exports = router;
