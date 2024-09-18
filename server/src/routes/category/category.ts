import {addCategory, deleteCategory, getAllCategories, getCategory, updateCategory} from "../../controllers/categoryController";
import {Router} from "express";

const categoryRouter = Router();

// this routes for admin
categoryRouter.post( '/category', addCategory );
categoryRouter.get('/all-categories', getAllCategories);
categoryRouter.get('/category/:id', getCategory);
categoryRouter.put('/category/:id', updateCategory);
categoryRouter.delete('/category/:id', deleteCategory);

export default categoryRouter;