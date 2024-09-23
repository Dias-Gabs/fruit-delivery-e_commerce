// import userModel from '../models/userModel.js';
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";


// // Login user
// const loginUser = async (req,res) => {
//     const {email,password} = req.body;
//     try {
//         const user = await userModel.findOne({email});
        
//         if (!user){
//             return res.json({success:false,message:"Usuário não existe!"})
//         }

//         const isMatch = await bcrypt.compare(password,user.password);

//         if(!isMatch) {
//             return res.json({success:false,message:"Informações de login incorretas!"})
//         }

//         const token = createToken(user._id);
//         res.json({success:true,token})

//     }
//     catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Erro"})
//     }
//  }

// const createToken = (id) => {
//     return jwt.sign({id},process.env.JWT_SECRET)
// }

// // Register user
// const registerUser = async (req,res) => {
//     const {name,password,email} = req.body;
//     try {
//         // Checks if the user already exists
//         const exists = await userModel.findOne({email});
//         if (exists){
//             return res.json({success:false,message:"Usuário já existe!"})
//         }
//         if (!validator.isEmail(email)) {
//             return res.json({success:false,message:"Por favor, insira um email valído!"})
//         }
//         if (password.length<8) {
//             return res.json({success:false,message:"Por favor, use uma senha mais forte (igual ou maior a 8 caractéres...)"})
//         }
        
//         // hashing password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password,salt);

//         const newUser = new userModel({
//             name:name,
//             email:email,
//             password:hashedPassword
//         })

//         const user = await newUser.save()
//         const token = createToken(user._id)
//         res.json({success:true,token});

//     } 
//     catch (error){
//         console.log(error);
//         res.json({success:false,message:"Erro"})
//     }
// }

// export {loginUser,registerUser};

import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login do usuário
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ where: { email } });
        
        if (!user) {
            return res.json({ success: false, message: "Usuário não existe!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Informações de login incorretas!" });
        }

        const token = createToken(user.id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Erro" });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Registrar usuário
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Verifica se o usuário já existe
        const exists = await userModel.findOne({ where: { email } });
        if (exists) {
            return res.json({ success: false, message: "Usuário já existe!" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Por favor, insira um email válido!" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Por favor, use uma senha mais forte (igual ou maior a 8 caracteres...)" });
        }
        
        // Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        const token = createToken(newUser.id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Erro" });
    }
}

export { loginUser, registerUser };
