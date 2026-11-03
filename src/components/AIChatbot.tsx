/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatbotProps {
  language?: 'en' | 'gu';
}

export default function AIChatbot({ language = 'gu' }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isGu = language === 'gu';

  const greetingEn = "Namaste! I'm the Patel Dental Hospital assistant. How can I help you?";
  const greetingGu = "નમસ્તે! હું પટેલ ડેન્ટલ હોસ્પિટલનો આસિસ્ટન્ટ છું. હું તમારી શું મદદ કરી શકું?";

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: isGu ? greetingGu : greetingEn
    }
  ]);

  // When language prop changes, if only the initial greeting is present, update it instantly.
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && (prev[0].content === greetingEn || prev[0].content === greetingGu)) {
        return [{ role: 'assistant', content: isGu ? greetingGu : greetingEn }];
      }
      return prev;
    });
  }, [language]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);

    const fallbackReply = isGu
      ? "કૃપા કરીને +91 9510397046 પર કૉલ અથવા WhatsApp કરો."
      : "Please call or WhatsApp +91 9510397046.";

    try {
      const response = await fetch('https://chat.pdhrajkot.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, language })
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch (parseErr) {
        console.error('Failed to parse response JSON:', parseErr);
      }

      const reply = (data && data.reply) ? data.reply : fallbackReply;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      console.error('Chat network request failed:', err?.message || err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: fallbackReply
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const titleText = isGu ? 'પટેલ ડેન્ટલ આસિસ્ટન્ટ' : 'Patel Dental Assistant';
  const statusText = isGu ? 'ઓનલાઇન • રાજકોટ એક્સપર્ટ ડેસ્ક' : 'Online • Rajkot Expert Desk';
  const placeholderText = isGu ? 'તમારો પ્રશ્ન અહીં લખો...' : 'Type your question here...';
  const typingText = isGu ? 'ટાઈપ થઈ રહ્યું છે...' : 'typing...';

  const chips = isGu
    ? ['ડેન્ટલ ઇમ્પ્લાન્ટ્સ', 'રૂટ કેનાલ', 'સમય અને સરનામું', 'એપોઇન્ટમેન્ટ બુક કરો']
    : ['Dental Implants', 'Root Canal', 'Timing & Address', 'Book Appointment'];

  return (
    <div id="ai-chatbot-widget" className="fixed right-5 bottom-20 md:bottom-6 z-55">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-16 right-0 w-[90vw] sm:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden font-sans text-left"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-4 text-white flex items-center justify-between shrink-0 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-[#0D9488] flex items-center justify-center shadow-md relative shrink-0">
                  <Sparkles className="h-5 w-5 text-white" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm tracking-tight text-white ${isGu ? 'gujarati-title font-gujarati text-[15px]' : ''}`}>
                    {titleText}
                  </h3>
                  <span className={`text-[10px] text-emerald-400 font-medium block ${isGu ? 'font-gujarati' : ''}`}>
                    {statusText}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-3xs ${
                      m.role === 'user'
                        ? 'bg-[#0D9488] text-white rounded-br-xs font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs font-normal'
                    } ${isGu && m.role === 'assistant' ? 'font-gujarati text-[13px]' : ''}`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-500 border border-slate-200/80 px-4 py-2.5 rounded-2xl rounded-bl-xs text-xs font-medium flex items-center space-x-1.5 shadow-3xs">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className={`ml-1 text-[11px] text-slate-400 italic ${isGu ? 'font-gujarati' : ''}`}>{typingText}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
              {chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className={`px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-semibold rounded-full border border-teal-200/60 whitespace-nowrap transition cursor-pointer ${isGu ? 'font-gujarati text-[12px]' : ''}`}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={placeholderText}
                className={`flex-1 px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800 font-medium ${isGu ? 'font-gujarati' : ''}`}
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="h-10 w-10 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-50 text-white flex items-center justify-center transition cursor-pointer shadow-md shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(13,148,136,0.45)] cursor-pointer relative group transition-all"
        title={titleText}
      >
        <MessageSquare className="h-6 w-6 text-white" />
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-white animate-pulse">
          1
        </span>
      </motion.button>
    </div>
  );
}
