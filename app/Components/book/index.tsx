import React from 'react';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

import styles from "./book.module.css"
import { Tbook } from '@/types/bookType';

const Book = ({ book, id, handleDelete, handleShowModal }: { book: Tbook, id: number, handleDelete: any, handleShowModal:any }) => {
    return (
        <div className={styles.card} key={id}>
            <div className={styles['card-inner']}>
                <div className={styles['card-front']}>
                    <p className={styles.title}>{book.name}</p>
                    <p className={styles.sub}>
                        <span className={styles.category}>{book.category}</span>
                        <span className={styles.price}>${book.price}</span>
                    </p>
                </div>
                <div className={styles['card-back']}>
                    <h3 className={styles['desc-title']}>Synopsis</h3>
                    <p className={styles.description}>
                        {book.description}
                    </p>
                    <div className={styles.actions}>
                        <button onClick={()=>handleShowModal("EDIT-BOOK",id)}><MdEdit /></button>
                        <button onClick={() => handleDelete(id)}><RiDeleteBin5Fill />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;