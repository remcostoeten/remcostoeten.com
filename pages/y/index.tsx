import FeatureStory from '@/components/Chat/Article';
import React, { useEffect, useState } from 'react';
import ChatSearch from '@/components/Chat/ChatSearch';
import { ChatMessage } from '@/types';
import Header from '@/components/Chat/Header';
import Image from 'next/image'
const ChatHistory: React.FC = () => {
  const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
  const [showFullText, setShowFullText] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleReadMoreClick = () => {
    setShowFullText(true);
  };
  const handleReadLessClick = () => {
    setShowFullText(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.add('chat-ui');
    return () => {
      document.body.classList.remove('chat-ui');
    };
  }, []);

  useEffect(() => {
    const chatHistoryRaw: ChatMessage[] = require('../../apis-private/proper/y.json');
    const messageHistory: ChatMessage[] = chatHistoryRaw.map(
      (chatMessage) => ({
        ...chatMessage,
        timestamp: new Date(chatMessage.timestamp),
      })
    );
    setChatHistory(messageHistory);
  }, []);

  const handleJumpTo = (message?: ChatMessage) => {
    const index =
      message && message.timestamp
        ? chatHistory.findIndex((m) => m.timestamp === message.timestamp)
        : -1;
    const messageElement = document.getElementById(`chat-message-${index}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (term: string) => {
    if (term.length > 0) {
      const results = chatHistory.filter((message: ChatMessage) =>
        message.message.toLowerCase().includes(term)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };
  
return (
  <>
    <Header />
    <FeatureStory />
    <ChatSearch
      onSearch={handleSearch}
      onJumpTo={(message) => handleJumpTo(message)}
      chatHistory={chatHistory}
      searchResults={searchResults}
    />

    <div className='chat'>
      <div className='chat__chat-panel chat-history'>
{(searchResults.length > 0 ? searchResults : chatHistory.slice(0, 999999999)).map((message: ChatMessage, index: number) => (
  <div
    className={`bubble__message ${
      message.sender && message.sender.toLowerCase().includes('alice')
        ? 'bubble__second-person'
        : ''
    }`}
    key={message.timestamp.getTime()}
  >
    <div className='chat__sender'>
{message.image && (
  <div className='chat__sender'>
    <Image src={`/public/static/img/${message.image}`} alt={message.sender} />

  </div>
)}
      <p>{message.name}</p>
    </div>
    <div className='chat__message'>
      {message.type === 'received' ? (
        <Image src={message.attachments?.[0]?.data} alt='attachment' />
		
      ) : null}
	  <p>      {message.message}
</p>

      {/* {message.attachments?.length && message.type === 'received' && (
        <img src={message.attachments[0]?.data} alt='attachment' />
      )} */}
    </div>
  </div>
))}

      </div>
    </div>
  </>
);
};

export default ChatHistory;
