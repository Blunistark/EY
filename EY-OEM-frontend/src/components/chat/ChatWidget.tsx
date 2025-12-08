import { useState, useRef, useEffect } from 'react';
import { sendOEMChatMessage } from '@/lib/oemApi';
import type { ChatMessage, TimeRange, Region } from '@/lib/types';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatWidgetProps {
  title?: string;
  context?: {
    timeRange?: TimeRange;
    region?: Region;
    modelId?: string;
  };
}

export const ChatWidget = ({ title = 'OEM AI Assistant', context }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    const messageText = inputText.trim();
    if (!messageText) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await sendOEMChatMessage({
        message: messageText,
        conversationHistory: messages,
        context,
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        text: response.message,
        timestamp: response.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-oem-blue-600 hover:bg-oem-blue-700 text-white rounded-full shadow-glow-blue flex items-center justify-center transition-all hover:scale-110 z-50"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-oem-dark-gray border border-oem-border rounded-2xl shadow-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-oem-border bg-oem-medium-gray rounded-t-2xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-oem-blue-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{title}</h3>
                  <p className="text-xs text-oem-text-muted">Ask me anything</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-oem-text-muted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-oem-dark-gray">
              {messages.length === 0 && (
                <div className="text-center text-oem-text-muted text-sm mt-8">
                  <p>Hello! I'm your OEM AI Assistant.</p>
                  <p className="mt-2">
                    Ask me about fleet performance, regional trends, or service center analytics.
                  </p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === 'user'
                        ? 'bg-oem-blue-600 text-white'
                        : 'bg-oem-light-gray text-white'
                      }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-oem-light-gray rounded-2xl px-4 py-2">
                    <Loader2 className="w-4 h-4 text-oem-blue-400 animate-spin" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-oem-border bg-oem-medium-gray rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-oem-light-gray text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-oem-blue-500 text-sm border border-oem-border"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-oem-blue-600 hover:bg-oem-blue-700 disabled:bg-oem-light-gray disabled:cursor-not-allowed text-white p-2 rounded-xl transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
