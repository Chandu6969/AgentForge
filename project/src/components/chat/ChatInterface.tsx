import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, MoreVertical, Loader, Bot, RefreshCw, Trash } from 'lucide-react';
import Button from '../ui/Button';
import { Message } from '../../utils/types';
import { chatApi } from '../../services/api';
import { simulateTypingDelay } from '../../utils/helpers';

interface ChatInterfaceProps {
  agentId: string;
  conversationId?: string;
  onCreateNewChat?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  agentId, 
  conversationId,
  onCreateNewChat
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load conversation messages on first render
  useEffect(() => {
    if (conversationId) {
      const loadMessages = async () => {
        try {
          const fetchedMessages = await chatApi.getMessages(conversationId);
          setMessages(fetchedMessages);
        } catch (error) {
          console.error('Failed to load messages:', error);
        }
      };
      
      loadMessages();
    } else {
      // New conversation, show a welcome message
      setMessages([
        {
          id: 'welcome',
          content: "Hi! I'm your AI assistant. How can I help you today?",
          role: 'assistant',
          timestamp: new Date(),
          agentId,
        },
      ]);
    }
  }, [conversationId, agentId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage]);

  // Auto-resize textarea as content grows
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
      agentId,
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await chatApi.sendMessage(
        conversationId || 'new',
        userMessage.content,
        agentId
      );
      
      // Simulate streaming effect for the AI response
      setIsTyping(true);
      
      // Get the assistant's response content
      const responseContent = response.assistantMessage.content;
      
      // Calculate delay based on message length
      const typingDelay = simulateTypingDelay(responseContent);
      
      // Start with empty string and gradually reveal more
      let displayedContent = '';
      const contentLength = responseContent.length;
      const incrementSize = Math.max(1, Math.floor(contentLength / 25)); // Adjust for speed
      
      for (let i = incrementSize; i <= contentLength; i += incrementSize) {
        // Set the partially revealed content
        setStreamingMessage(responseContent.substring(0, i));
        
        // Wait for a small delay before revealing more
        await new Promise(resolve => setTimeout(resolve, typingDelay / 25));
      }
      
      // Ensure the full message is displayed
      setStreamingMessage(responseContent);
      
      // Add the complete assistant message to the chat
      setTimeout(() => {
        setIsTyping(false);
        setStreamingMessage('');
        
        setMessages(prev => [
          ...prev,
          response.assistantMessage
        ]);
      }, 100);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          content: 'Sorry, I encountered an error while processing your request. Please try again.',
          role: 'assistant',
          timestamp: new Date(),
          agentId,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-50 rounded-lg overflow-hidden border border-neutral-200">
      {/* Chat header */}
      <div className="bg-white p-4 border-b border-neutral-200 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <Bot size={16} className="text-primary-600" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-neutral-900">AI Assistant</h3>
            <p className="text-xs text-neutral-500">Powered by your documents</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={onCreateNewChat}
          >
            New Chat
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            aria-label="More options"
          >
            <MoreVertical size={16} />
          </Button>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-neutral-200'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div className={`text-xs mt-1 ${
                message.role === 'user' ? 'text-primary-100' : 'text-neutral-400'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        
        {/* Streaming message */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-white border border-neutral-200">
              <p className="whitespace-pre-wrap">
                {streamingMessage}
                <span className="animate-pulse">▋</span>
              </p>
            </div>
          </div>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="bg-white p-4 border-t border-neutral-200">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="w-full px-4 py-3 pr-10 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none transition"
            rows={1}
            disabled={isLoading}
          />
          
          <div className="absolute right-2 bottom-2 flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Regenerate response"
              className="h-8 w-8 p-0 rounded-full"
            >
              <RefreshCw size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              aria-label="Clear chat"
              className="h-8 w-8 p-0 rounded-full"
            >
              <Trash size={16} />
            </Button>
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="h-8 w-8 p-0 rounded-full"
              aria-label="Send message"
            >
              {isLoading ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;