import React from 'react';
import { ChatMessage } from '../types';

interface BubbleProps {
  message: ChatMessage;
  index: number;
}

const Bubble: React.FC<BubbleProps> = ({ message, index }) => {
  return (
    <div
      className={`bubble__message ${
        message.sender.toLowerCase().includes('alice')
          ? 'bubble__second-person'
          : ''
      }`}
      key={message.timestamp.getTime()}
    >
      <div id={`chat-message-${index}`}>
        <p>
          <span>
            <div className='chat__sender'>{message.sender}</div>
            <div className='chat__message'>{message.message}</div>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Bubble;
