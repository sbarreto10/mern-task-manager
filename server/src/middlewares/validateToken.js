import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
   res.header("Access-Control-Allow-Credentials", true);
   res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
   res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
   );
   res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
   );

   const { token } = req.cookies;

   if (!token)
      return res
         .status(401)
         .json({ message: "No token, authorization denied" });
   jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedUser) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
      req.user = decodedUser;
   });

   next();
};
