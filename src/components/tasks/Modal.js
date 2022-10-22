import React from 'react';
import styles from './Modal.module.css'

export default function ModalWindow({ children, isModalOpen = false, setIsModalOpen }) {
    return isModalOpen && (
        <>
            <div className={styles.overLay}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.close} onClick={e => setIsModalOpen(false)}>
                            <span>&#x2716;</span>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}

