/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
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

  // Speech bubble popup states
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('chatbot_popup_dismissed') === 'true';
    }
    return false;
  });

  // Speech bubble timer effect (appears 5s after load, hides after 12s, repeats every 45s if chat is closed)
  useEffect(() => {
    if (isOpen || dismissed) {
      setShowBubble(false);
      return;
    }

    let hideTimeout: NodeJS.Timeout;
    const showTimeout = setTimeout(() => {
      if (!isOpen && !dismissed) {
        setShowBubble(true);
        hideTimeout = setTimeout(() => {
          setShowBubble(false);
        }, 12000);
      }
    }, 5000);

    const interval = setInterval(() => {
      if (!isOpen && !dismissed) {
        setShowBubble(true);
        hideTimeout = setTimeout(() => {
          setShowBubble(false);
        }, 12000);
      }
    }, 45000);

    return () => {
      clearTimeout(showTimeout);
      clearInterval(interval);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [isOpen, dismissed]);

  const handleDismissBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBubble(false);
    setDismissed(true);
    try {
      sessionStorage.setItem('chatbot_popup_dismissed', 'true');
    } catch (err) {}
  };

  const handleBubbleClick = () => {
    setShowBubble(false);
    setIsOpen(true);
  };

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
                    className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-3xs ${
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

      {/* Speech Bubble Popup */}
      <AnimatePresence>
        {showBubble && !isOpen && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 text-left cursor-pointer group z-56"
            onClick={handleBubbleClick}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center space-x-2">
                <div className="h-7 w-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs shrink-0">
                  👋
                </div>
                <p className={`text-xs font-semibold text-slate-800 leading-snug group-hover:text-teal-700 transition ${isGu ? 'font-gujarati text-[13px]' : ''}`}>
                  {isGu ? "હું તમારી શું મદદ કરી શકું?" : "May I help you?"}
                </p>
              </div>
              <button
                onClick={handleDismissBubble}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition shrink-0 cursor-pointer"
                title="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-slate-200 transform rotate-45" />
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
        <svg className="w-full h-full rounded-full overflow-hidden block" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Background circle / pale mint backdrop */}
          <circle cx="50" cy="50" r="49" fill="#E6F8F6" />
          
          {/* Uniform shoulders / collar */}
          <path d="M 15 100 C 15 75 35 70 50 70 C 65 70 85 75 85 100 Z" fill="#0D9488" />
          {/* White medical collar */}
          <path d="M 32 78 L 50 92 L 68 78 L 62 70 L 50 80 L 38 70 Z" fill="#FFFFFF" />
          <circle cx="50" cy="86" r="1.5" fill="#0D9488" />
          {/* Dental Cross Pin */}
          <rect x="47" y="77" width="6" height="6" rx="1.5" fill="#0D9488" />
          <path d="M 50 78.5 V 81.5 M 48.5 80 H 51.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

          {/* Hair back */}
          <circle cx="50" cy="46" r="32" fill="#2C1D11" />

          {/* Neck */}
          <rect x="42" y="55" width="16" height="20" rx="4" fill="#FFC299" />

          {/* Face base */}
          <ellipse cx="50" cy="46" rx="25" ry="28" fill="#FFC299" />

          {/* Ears */}
          <circle cx="25" cy="46" r="3.5" fill="#FFC299" />
          <circle cx="75" cy="46" r="3.5" fill="#FFC299" />

          {/* Headset (Receptionist headset headband and mic) */}
          <path d="M 25 42 A 26 26 0 0 1 75 42" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Headset earpiece right */}
          <rect x="72" y="42" width="6" height="8" rx="3" fill="#1E293B" />
          {/* Headset mic boom */}
          <path d="M 72 48 Q 66 60 56 62" stroke="#334155" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="55" cy="62" r="2.2" fill="#1E293B" />

          {/* Hair Front / Bangs with side parting */}
          <path d="M 25 36 C 25 22 40 18 50 18 C 66 18 75 26 75 38 C 64 28 36 28 25 36 Z" fill="#2C1D11" />
          <path d="M 25 36 Q 42 34 50 20 Q 62 34 75 38 C 75 22 62 16 50 16 C 36 16 26 24 25 36 Z" fill="#3D2616" />

          {/* Eyebrows */}
          <path d="M 34 36 Q 38 33 43 35" stroke="#2C1D11" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M 57 35 Q 62 33 66 36" stroke="#2C1D11" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Eyes */}
          {/* Left Eye */}
          <ellipse cx="38" cy="43" rx="4.2" ry="5.2" fill="#FFFFFF" />
          <ellipse cx="38" cy="44" rx="2.8" ry="3.2" fill="#1E293B" />
          <circle cx="37" cy="42" r="1.1" fill="#FFFFFF" />
          {/* Right Eye */}
          <ellipse cx="62" cy="43" rx="4.2" ry="5.2" fill="#FFFFFF" />
          <ellipse cx="62" cy="44" rx="2.8" ry="3.2" fill="#1E293B" />
          <circle cx="61" cy="42" r="1.1" fill="#FFFFFF" />

          {/* Eyelids */}
          <path d="M 34 40 Q 38 38 42 40" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 58 40 Q 62 38 66 40" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Rosy Cheeks */}
          <ellipse cx="31" cy="51" rx="4.5" ry="2.5" fill="#FF8888" opacity="0.6" />
          <ellipse cx="69" cy="51" rx="4.5" ry="2.5" fill="#FF8888" opacity="0.6" />

          {/* Nose */}
          <path d="M 50 45 Q 51.5 51 48 52.5" stroke="#D97706" strokeWidth="1.6" fill="none" strokeLinecap="round" />

          {/* Friendly Smile showing teeth */}
          <path d="M 38 57 Q 50 68 62 57 Z" fill="#BE123C" />
          <path d="M 40 58 Q 50 66 60 58 Z" fill="#FFFFFF" />
        </svg>
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-white animate-pulse">
          1
        </span>
      </motion.button>
    </div>
  );
}
