import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next) => {

    const {token} = req.headers;
    if(!token) {
       return res.json({success:false,message:"Login não autorizado!"})
     }
    // const { authorization } = req.headers;
    //     if (!authorization) {
    //         return res.json({ success: false, message: "Login não autorizado!" });
    //     }
    //         const token = authorization.split(" ")[1];
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Erro"})
    }

}

export default authMiddleware;