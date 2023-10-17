export const validateSchema = (schema) => (req, res, next) => {
   try {
     schema.parse(req.body);
     console.log("si se pudo");
     next();
   } catch (error) {
     return res
       .status(400)
       .json(error.errors.map((error) => error.message));
   }
 };
 