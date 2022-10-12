import React from 'react';
import styles from './Modal.module.css'
import { useRef } from 'react';
import useOnClickOutside from '../../hooks/useClickOutside';
import reactDon from 'react-dom'

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

