const env = process.env.NODE_ENV || "dev";

const config = () => {
  switch (env) {
    case "dev":
      return {
        dbURL: "mongodb://localhost:27017/node-api",
        jwtPassword: "nossacaraquelegal",
        jwtExpiresIn: "1d"
      };
    case "hml":
      return {
        dbURL: "mongodb://localhost:27017/node-api",
        jwtPassword: "nossacaraquelegal",
        jwtExpiresIn: "1d"
      };
    case "prod":
      return {
        dbURL: "mongodb://localhost:27017/node-api",
        jwtPassword: "aksaos#k#nas7as8a7s87a8$asjas@klsa",
        jwtExpiresIn: "10d"
      };
  }
};

console.log(`Initializing the API on ambient ${env.toUpperCase()}`);

module.exports = config();
