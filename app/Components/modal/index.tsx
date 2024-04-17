"use client"
import React, { useEffect, useState } from 'react';
import styles from "./modal.module.css"
import { IoCloseCircleOutline } from "react-icons/io5";
import { Tbook } from '@/types/bookType';
import { Tmodal } from '@/types/modalType';

const index = ({ showModal, closeModal, onFormSubmit }: { showModal: Tmodal, closeModal: any, onFormSubmit: any }) => {
    const [formData, setFormData] = useState<Tbook>(showModal.book)
    useEffect(() => {
        setFormData(showModal.book)
    }, [showModal.mode])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newFormData = { ...formData, [e.target.name]: e.target.value }
        setFormData(newFormData)
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        onFormSubmit(formData)
        closeModal()
    }
    const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        closeModal()
    }
    return (
        <div className={styles['modal-wrapper']} style={showModal.open ? { display: "flex" } : { display: "none" }}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>{showModal.mode === "ADD-BOOK" ? "Add a book" : "Edit book"}</h3>
                    <div onClick={closeModal} >
                        <IoCloseCircleOutline />
                    </div>
                </div>
                <form className={styles.form}>
                    <div>
                        <label>Name:</label>
                        <input
                            name='name'
                            type='text'
                            placeholder='Enter book title'
                            onChange={handleInputChange}
                            value={formData.name}
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <input
                            name='category'
                            type='text'
                            placeholder='Enter book title'
                            onChange={handleInputChange}
                            value={formData.category}
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            name="price"
                            type='number'
                            placeholder='Enter book title'
                            onChange={handleInputChange}
                            value={formData.price}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name='description'
                            maxLength={250}
                            onChange={handleInputChange}
                            value={formData.description}
                        ></textarea>
                    </div>
                    <div className={styles.action}>
                        <button onClick={handleCancel} className={styles['btn-secondary']}>Cancel</button>
                        <button onClick={handleSubmit} className={styles['btn-primary']}>{
                            showModal.mode === "ADD-BOOK" ? "Add book" : "Edit book"
                        }</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default index;