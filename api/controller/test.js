export const test = (req, res) => {
  res.json({ msg: "Test Api in routes folder!" });
};
export const secondTest = (req, res) => {
  res.send("Hello from 2nd test route");
};
