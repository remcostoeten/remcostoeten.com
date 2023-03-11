import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  text: string;
  onClose: () => void;
}

function Modal({ text, onClose }: ModalProps) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{text}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <ul>
        <motion.li whileHover={{ scale: 1.05 }}>
          <a href="#" onClick={handleLinkClick}>Open Modal</a>
        </motion.li>
      </ul>
      {showModal && <Modal text="This is the modal text" onClose={handleModalClose} />}
    </div>
  );
}

export default App;
