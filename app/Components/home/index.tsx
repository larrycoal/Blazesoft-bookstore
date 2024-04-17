"use client"
import React, { useCallback, useState } from 'react';
import { getAllBooks, addBook, deleteBook,editBook } from "@/redux/features/books/booksSlice";
import { useDispatch } from 'react-redux';
import styles from "./home.module.css"
import Book from "../book"
import Modal from "../modal"
import { AppDispatch, useAppSelector } from '@/redux/store';
import { Tbook } from '@/types/bookType';
import { Tmodal } from '@/types/modalType';
import { Tedit } from '@/types/editType';

const Home = () => {
    const [showModal, setShowModal] = useState<Tmodal>({ open: false, mode: "", book: { name: "", category: "", price: 0, description: "" } })
    const [currentId, setCurrentId] = useState<number | any>(null)
    const dispatch = useDispatch<AppDispatch>();
    const { books } = useAppSelector((state) => state.bookReducer.value)
    const fetchAllBooks = useCallback(() => {
        dispatch(getAllBooks())
    }, [])


    const handleShowModal = (mode: String = "", id: number) => {
        let modalState = {
            ...showModal, open: !showModal.open, mode: mode
        }
        if (mode === "EDIT-BOOK") {
            const editBook = books[id]
            modalState.book = editBook
            setCurrentId(id)
        } else {
            modalState.book = { name: "", category: "", price: 0, description: "" }
        }
        setShowModal(modalState)
    }
    const handleAddEditBooks = (newbook: Tbook) => {
        if (showModal.mode === "EDIT-BOOK") {
            const newEdit:Tedit = {
                id:currentId,
                book:newbook
            }
            dispatch(editBook(newEdit))
        } else {
            dispatch(addBook(newbook))
        }
        fetchAllBooks()

    }
    const handleDeleteBook = (idx: number) => {
        dispatch(deleteBook(idx))
        fetchAllBooks()
    }

    const ShowAllBooks = () => {
        return books?.map((book, idx) => (
            <Book book={book} id={idx} handleDelete={handleDeleteBook} handleShowModal={handleShowModal} />
        ))
    }
    return (
        <div className={styles['main-wrapper']}>
            <div className={styles.books}>
                {
                    books ? <ShowAllBooks /> : (<div>loading</div>)
                }
            </div>
            <div className={styles['btn-wrapper']}>
                <button onClick={() => handleShowModal("ADD-BOOK", 0)}>+</button>
            </div>
            <Modal showModal={showModal} closeModal={handleShowModal} onFormSubmit={handleAddEditBooks} />
        </div>
    );
};

export default Home;