import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import User from '../models/userModel.js';

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
};

// Função para criar um token JWT
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Registrar usuário
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
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
};

// Função para obter o usuário pelo ID
export const getUserById = async (id) => {
    try {
        const user = await userModel.findByPk(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Função para obter o perfil do usuário
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Presumindo que o ID do usuário está no objeto req.user
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Retorna os dados do usuário, excluindo a senha
        const { password, ...userData } = user.dataValues;
        res.status(200).json(userData);
    } catch (error) {
        console.error("Erro ao obter perfil do usuário:", error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

// Exportando as funções
export { loginUser, registerUser };
