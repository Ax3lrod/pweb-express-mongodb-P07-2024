import type { IBook } from '../models/book.models';
import Book from '../models/book.models';
import { isValidObjectId } from 'mongoose';

class MechanismService {
    async borrowBook(id: string): Promise<IBook> {
        if (!isValidObjectId(id)) {
            throw new Error(`Invalid book ID format: ${id}`);
        }

        const book = await Book.findById(id);
        if (!book) {
            throw new Error(`Book with ID ${id} not found`);
        }

        if (book.qty < 1) {
            throw new Error('Book is out of stock');
        }

        // Decrease qty by 1 when borrowed
        book.qty -= 1;
        await book.save();

        return book;
    }

    async returnBook(id: string): Promise<IBook> {
        if (!isValidObjectId(id)) {
            throw new Error(`Invalid book ID format: ${id}`);
        }

        const book = await Book.findById(id);
        if (!book) {
            throw new Error(`Book with ID ${id} not found`);
        }

        // Check if qty is less than initialQty before incrementing
        if (book.qty >= book.initialQty) {
            throw new Error('All book is already returned');
        }

        // Increase qty by 1 when returned
        book.qty += 1;
        await book.save();

        return book;
    }
}

export default new MechanismService();
