"use client"
import React, { useEffect, useState } from 'react';
import styles from "./modal.module.css"
import { IoCloseCircleOutline } from "react-icons/io5";
import { Tbook } from '@/types/bookType';
import { Tmodal } from '@/types/modalType';

const Modal = ({ showModal, closeModal, onFormSubmit }: { showModal: Tmodal, closeModal: any, onFormSubmit: any }) => {
    const [formData, setFormData] = useState<Tbook>(showModal.book)
    const [error, setError] = useState({ error: false, type: "", message: "" })
    useEffect(() => {
        setFormData(showModal.book)
    }, [showModal.mode])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newFormData = { ...formData, [e.target.name]: e.target.value }
        setFormData(newFormData)
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (formData.name.trim() === "") {
            setError({ error: true, type: "name-input", message: "Name can not be empty" })
            return
        } else if (formData.category.trim() === "") {
            setError({ error: true, type: "category-input", message: "Category can not be empty" })
            return
        } else if (formData.description.trim() === "") {
            setError({ error: true, type: "description-input", message: "Description can not be empty" })
            return
        } else if (formData.price <= 0) {
            setError({ error: true, type: "price-input", message: "Price has to be greater than 0" })
            return
        } else {
            setError({ error: false, type: "", message: "" })
            onFormSubmit(formData)
            closeModal()
        }

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
                        <p className={styles.error}>{error.error && error.type === "name-input" ? error.message:null}</p>
                    </div>
                    <div>
                        <label>Category:</label>
                        <input
                            name='category'
                            type='text'
                            placeholder='Enter book category'
                            onChange={handleInputChange}
                            value={formData.category}
                        />
                        <p className={styles.error}>{error.error && error.type === "category-input" ? error.message : null}</p>
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
                        <p className={styles.error}>{error.error && error.type === "price-input" ? error.message : null}</p>
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name='description'
                            maxLength={250}
                            onChange={handleInputChange}
                            value={formData.description}
                        ></textarea>
                        <p className={styles.error}>{error.error && error.type === "description-input" ? error.message : null}</p>
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

export default Modal;