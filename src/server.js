const app = require("./app/index.js");

const PORT = app.get("PORT");

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
