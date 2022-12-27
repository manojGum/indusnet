const authenticate = async (req, res, next) => {
  // if(!req.headers.authorization)
  // return res.status(400).send({message:"Authorization token not found or incorrect"});

  // if(!req.headers.authorization.startsWith("Bearer"))
  // return res.status(400).send({message:"Authorization token not found or incorrect"});

  // const token=req.headers.authorization.trim().split(" ")[1]
  // middle ware to check token avilabe or not if 
  const jwttoken = await req.cookies.jwttoken;
  const trackId = Math.floor(new Date());
  if (jwttoken === "")  // check token is not available then through an error 
    return res.status(400).send({
      trackId,
      message: "one-time password incorrect or already uesed it ",
    });
  if (jwttoken === "undefined") // check token is undefined  then through an error Authorization token not found or incorrect
    return res.status(400).send({
      trackId,
      message: "Authorization token not found or incorrect....!....",
    });
  if (!jwttoken) // if token is not available then through an error Authorization token not found or incorrect 
    return res
      .status(400)
      .send({ trackId, message: "Authorization token not found or incorrect" });

  req.token = req.cookies.jwttoken;
  return next();
};

module.exports = authenticate;
