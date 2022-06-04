const app = require("./app/server");
app.listen(process.env.PORT, () => {
  console.log(`server running on localhost::${process.env.PORT}`);
});
