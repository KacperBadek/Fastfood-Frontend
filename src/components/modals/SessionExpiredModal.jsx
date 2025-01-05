import Modal from "./Modal.jsx";

export default function sessionExpiredModal({message, toggleModal}) {
    return (
        <Modal toggle={toggleModal}>
            <p>{message}</p>
            <button onClick={toggleModal}>OK</button>
        </Modal>
    )
}