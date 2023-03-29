// components/Modal.tsx
import React from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const ModalContent = styled.div`
	background-color: white;
	padding: 2rem;
	border-radius: 4px;
`;

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<ModalOverlay onClick={onClose}>
			<ModalContent onClick={(e) => e.stopPropagation()}></ModalContent>
		</ModalOverlay>
	);
};

export default Modal;
