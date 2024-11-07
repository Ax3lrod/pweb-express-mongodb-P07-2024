import { Router } from 'express';
import MechanismController from '../controllers/mechanism.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Mechanism routes
router.post('/borrow/:id', authenticateToken, MechanismController.borrowBook);
router.post('/return/:id', authenticateToken, MechanismController.returnBook);

export default router;
