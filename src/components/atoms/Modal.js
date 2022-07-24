import React from 'react'
import "./modal.css";

export default function Modal() {
    const [isOpen, setIsOpen] = React.useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div className="modal">
            {isOpen && (
                <>
                    <input class="text-field" placeholder='Enter Url'></input>
                    <button onClick={closeModal} className="submit-button">Submit</button>
                </>
            )}
        </div>
    )
}