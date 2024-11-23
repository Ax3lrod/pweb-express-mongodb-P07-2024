import type { IBook } from '../models/book.models';
import Book from '../models/book.models';
import { isValidObjectId } from 'mongoose';

export class BookService {
    async addBook(bookData: Partial<IBook>): Promise<IBook> {
        const book = new Book(bookData);
        return await book.save();
    }

    async getAllBooks(): Promise<IBook[]> {
        return await Book.find();
    }

    async getBookById(id: string): Promise<IBook | null> {
        return await Book.findById(id);
    }

    async modifyBook(id: string, bookData: Partial<IBook>): Promise<IBook | null> {
        try {
            if (!isValidObjectId(id)) {
                throw new Error(`Invalid book ID format: ${id}`);
            }
    
            const updatedBook = await Book.findByIdAndUpdate(id, bookData, { new: true });
            
            if (!updatedBook) {
                throw new Error(`Book with ID ${id} not found`);
            }
            
            return updatedBook;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to update book');
        }
    }

    async removeBook(id: string): Promise<IBook | null> {
        try {
            if (!isValidObjectId(id)) {
                throw new Error(`Invalid book ID format: ${id}`);
            }
     
            const deletedBook = await Book.findByIdAndDelete(id);
            
            if (!deletedBook) {
                throw new Error(`Book with ID ${id} not found`);
            }
            
            return deletedBook;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to delete book');
        }
    }

    // New borrowBook method
    async borrowBook(id: string): Promise<IBook> {
        try {
            if (!isValidObjectId(id)) {
                throw new Error(`Invalid book ID format: ${id}`);
            }

            // Find the book by ID
            const book = await Book.findById(id);
            if (!book) {
                throw new Error(`Book with ID ${id} not found`);
            }

            // Check if the book is available for borrowing
            if (book.qty < 1) {
                throw new Error('Book is out of stock');
            }

            // Decrement the qty by 1 and save
            book.qty -= 1;
            await book.save();

            return book;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to borrow book');
        }
    }
}

export default new BookService();
