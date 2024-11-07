import { Request, Response, NextFunction } from 'express';
import MechanismService from '../services/mechanism.services';

export class MechanismController {
    async borrowBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const bookId = req.params.id;
            const book = await MechanismService.borrowBook(bookId);
            res.status(200).json({ message: 'Book borrowed successfully', book });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error' });
            }
        }
    }

    async returnBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const bookId = req.params.id;
            const book = await MechanismService.returnBook(bookId);
            res.status(200).json({ message: 'Book returned successfully', book });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error' });
            }
        }
    }
}

export default new MechanismController();
