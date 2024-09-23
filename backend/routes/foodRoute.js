// import express from "express";
// import { addFood,listFood,removeFood } from "../controllers/foodController.js";
// import multer from "multer";

// const foodRouter = express.Router();

// // Image store engine
// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// })

// const upload = multer({storage:storage})

// foodRouter.post("/add",upload.single("image"),addFood)
// foodRouter.get("/list",listFood)
// foodRouter.post("/remove",removeFood);

// export default foodRouter;

// routes/foodRoute.js
import express from "express";
import { addFoodItem, updateFoodItem, deleteFoodItem, listFoodItems } from "../controllers/foodController.js";

const router = express.Router();

// Rota para adicionar um item de comida
router.post("/", addFoodItem);

// Rota para atualizar um item de comida
router.put("/:id", updateFoodItem);

// Rota para remover um item de comida
router.delete("/:id", deleteFoodItem);

// Rota para listar itens de comida
router.get("/", listFoodItems);

export default router;
