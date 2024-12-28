import './Modal.css';

export default function Modal({toggle, children}) {
    return (
        <div className="modal">
            <div className="overlay" onClick={() => toggle(null)}></div>
            <div className="modal-content">
                <button className="close-modal" onClick={() => toggle(null)}>
                    X
                </button>
                {children}
            </div>
        </div>
    )
}