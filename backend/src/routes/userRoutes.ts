import express from 'express';
import { getAllUsers } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', protect, getAllUsers);

export default router;