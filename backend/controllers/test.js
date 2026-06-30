const bcrypt = require("bcryptjs");

const hash =
"$2b$10$zH9l9D2F0uM4n4q4sM9z4e9oK2Q4M5xVn6Yw1K3Q8V5D7F2G9H1Ja";

bcrypt.compare(
  "Admin123",
  hash
).then(console.log);