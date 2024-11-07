import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const bookController = new BookController();

// Gunakan authenticateToken pada semua endpoint yang butuh otorisasi
router.post('/', authenticateToken, bookController.addBook);
router.get('/', authenticateToken, bookController.getAllBooks);
router.get('/:id', authenticateToken, bookController.getBookById);
router.patch('/:id', authenticateToken, bookController.modifyBook);
router.delete('/:id', authenticateToken, bookController.removeBook);

export default router;