import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit,
  X,
  Send,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  Cpu
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface VirtualConsultantProps {
  onOpenBooking: (service?: string) => void;
}

// Markdown parser helper for technical formatting without heavy external libraries
function formatMessageContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = '';

  lines.forEach((line, index) => {
    // Check for code blocks ```
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        elements.push(
          <div key={`code-${index}`} className="my-2.5 rounded-lg border border-cyan-500/30 bg-black/80 p-3 font-mono text-xs text-cyan-300 overflow-x-auto shadow-inner">
            {codeLang && (
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-sans border-b border-white/10 pb-1 flex items-center justify-between">
                <span>{codeLang}</span>
                <span className="text-[9px] text-cyan-400/80">AURA Architecture Stack</span>
              </div>
            )}
            <pre className="whitespace-pre-wrap">{codeBuffer.join('\n')}</pre>
          </div>
        );
        codeBuffer = [];
        inCodeBlock = false;
        codeLang = '';
      } else {
        // Start of code block
        inCodeBlock = true;
        codeLang = line.trim().replace('```', '');
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // Markdown Headers ### or ##
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={`h4-${index}`} className="font-semibold text-sm text-cyan-300 mt-3 mb-1.5 flex items-center gap-1.5 font-space">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
          {renderFormattedInline(line.replace('### ', ''))}
        </h4>
      );
      return;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={`h3-${index}`} className="font-bold text-base text-white mt-3.5 mb-1.5 border-b border-white/10 pb-1 font-space">
          {renderFormattedInline(line.replace('## ', ''))}
        </h3>
      );
      return;
    }

    // Bullet points (* or -)
    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
      const cleanLine = line.trim().replace(/^[-*]\s+/, '');
      elements.push(
        <div key={`bullet-${index}`} className="flex items-start gap-2 my-1 text-xs sm:text-sm text-slate-300 pl-1">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0 shadow-sm shadow-blue-400/50" />
          <div className="flex-1 leading-relaxed">{renderFormattedInline(cleanLine)}</div>
        </div>
      );
      return;
    }

    // Numbered lists (1. , 2. )
    const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      elements.push(
        <div key={`num-${index}`} className="flex items-start gap-2 my-1 text-xs sm:text-sm text-slate-300 pl-1">
          <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 rounded px-1.5 py-0.5 shrink-0">
            {numberedMatch[1]}
          </span>
          <div className="flex-1 leading-relaxed pt-0.5">{renderFormattedInline(numberedMatch[2])}</div>
        </div>
      );
      return;
    }

    // Empty lines for spacing
    if (!line.trim()) {
      elements.push(<div key={`empty-${index}`} className="h-2" />);
      return;
    }

    // Standard paragraph
    elements.push(
      <p key={`p-${index}`} className="text-xs sm:text-sm leading-relaxed text-slate-300 my-1">
        {renderFormattedInline(line)}
      </p>
    );
  });

  return elements;
}

// Inline formatting (bold **text**, inline code `code`)
function renderFormattedInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="font-mono text-[11px] sm:text-xs text-amber-300 bg-amber-950/40 border border-amber-600/30 px-1 py-0.5 rounded">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export const VirtualConsultant: React.FC<VirtualConsultantProps> = ({ onOpenBooking }) => {
  const { t, lang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: t.consultant.welcomeMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [isOpen, messages, isLoading]);

  // Handle send message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    setErrorNotice(null);
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMessage: Message = {
      id: `usr_${Date.now()}`,
      role: 'user',
      text,
      timestamp: userTimestamp
    };

    // Update state immediately
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build history excluding initial greeting
      const historyPayload = updatedMessages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch('/api/consultant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          lang
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || t.consultant.errorMsg);
      }

      const modelTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newModelMessage: Message = {
        id: `mod_${Date.now()}`,
        role: 'model',
        text: data.reply,
        timestamp: modelTimestamp
      };

      setMessages((prev) => [...prev, newModelMessage]);
    } catch (err: any) {
      console.error('Failed to get consultant response:', err);
      setErrorNotice(err.message || t.consultant.errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset conversation
  const handleResetConversation = () => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        role: 'model',
        text: t.consultant.welcomeMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorNotice(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              aria-label={t.consultant.triggerTitle}
              className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#09090D]/90 backdrop-blur-xl border border-blue-500/40 text-white shadow-2xl shadow-blue-500/20 hover:border-blue-400 hover:shadow-blue-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {/* Glowing Aura Ring */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 opacity-30 blur group-hover:opacity-60 transition duration-300" />

              {/* Icon Container with live pulsating radar */}
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-700 shadow-lg text-white">
                <BrainCircuit className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
              </div>

              {/* Text content */}
              <div className="relative text-left hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {t.consultant.triggerBadge}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-xs font-semibold text-white tracking-wide font-space mt-0.5">
                  {t.consultant.triggerTitle}
                </p>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Expanded Interactive Consultant Drawer/Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label={t.consultant.headerTitle}
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[480px] max-h-[85vh] h-[640px] flex flex-col rounded-2xl bg-[#07070B]/95 backdrop-blur-2xl border border-blue-500/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] shadow-blue-900/30 overflow-hidden"
          >
            {/* Top Glowing Mesh Strip */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-amber-400" />

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600/80 to-violet-600/80 border border-blue-400/40 flex items-center justify-center text-white shadow-md">
                  <Cpu className="w-4 h-4 text-cyan-200" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#07070B]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white font-space tracking-tight">
                      AURA Architecture Agent
                    </h3>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                      {t.consultant.modelBadge}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {t.consultant.headerSubtitle}
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetConversation}
                  title={t.consultant.clear}
                  aria-label={t.consultant.clear}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title={t.consultant.minimize}
                  aria-label={t.consultant.minimize}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Flow Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-sm">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] font-mono text-gray-400">
                        {isUser ? 'Tú (CTO / Founder)' : 'AURA Principal Architect'}
                      </span>
                      <span className="text-[10px] text-gray-400">•</span>
                      <span className="text-[10px] font-mono text-gray-400">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-lg ${
                        isUser
                          ? 'bg-gradient-to-br from-blue-600/90 to-violet-700/90 text-white rounded-br-xs border border-blue-400/30'
                          : 'bg-[#0E0E14]/90 text-slate-200 rounded-bl-xs border border-white/10 shadow-black/50'
                      }`}
                    >
                      {isUser ? (
                        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        <div className="consultant-rich-text">
                          {formatMessageContent(msg.text)}

                          {/* Direct CTA embedded into consultant replies (when conversation is active) */}
                          {msg.id !== 'welcome' && (
                            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] text-gray-400 font-mono flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                Confidencialidad LSSI/RGPD
                              </span>
                              <button
                                onClick={() => {
                                  setIsOpen(false);
                                  onOpenBooking('Auditoría Arquitectura B2B');
                                }}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 transition shadow-sm font-space cursor-pointer"
                              >
                                {t.consultant.bookAudit}
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Loading / Thinking Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start"
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-mono text-cyan-400">AURA Principal Architect</span>
                    <span className="text-[10px] text-gray-400">•</span>
                    <span className="text-[10px] font-mono text-gray-400">Evaluando...</span>
                  </div>
                  <div className="rounded-2xl rounded-bl-xs px-4 py-3 bg-[#0E0E14]/90 border border-cyan-500/30 text-slate-300 flex items-center gap-3 shadow-lg">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-150" />
                      <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse delay-300" />
                    </div>
                    <span className="text-xs font-mono text-cyan-300">
                      {t.consultant.thinkingText}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Error Notice */}
              {errorNotice && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span className="flex-1">{errorNotice}</span>
                  <button
                    onClick={() => handleSendMessage()}
                    className="px-2 py-1 rounded bg-red-800/40 hover:bg-red-700/60 text-white font-mono text-[10px] cursor-pointer"
                  >
                    {t.consultant.retry}
                  </button>
                </div>
              )}

              {/* Suggested Prompts (shown especially at start) */}
              {messages.length <= 2 && !isLoading && (
                <div className="pt-2">
                  <p className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {t.consultant.suggestedTitle}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {t.consultant.suggestedPrompts.map((promptText, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(promptText)}
                        className="text-left text-xs p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-blue-500/30 text-slate-300 hover:text-white transition group flex items-center justify-between cursor-pointer"
                      >
                        <span className="line-clamp-2 pr-2">{promptText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyan-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Area */}
            <div className="p-3 border-t border-white/10 bg-black/40">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t.consultant.placeholder}
                    className="w-full bg-[#111118] text-white text-xs sm:text-sm placeholder-gray-500 rounded-xl px-3.5 py-2.5 pr-10 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none max-h-24 custom-scrollbar"
                  />
                  <div className="absolute right-2.5 top-2.5 text-[10px] font-mono text-gray-400 hidden sm:block">
                    ↵
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  aria-label={t.consultant.send}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-blue-500 hover:to-violet-500 transition shadow-md shadow-blue-500/20 shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>

              {/* Subtitle / Legal Disclaimer */}
              <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-gray-400">
                <span className="line-clamp-1">{t.consultant.disclaimer}</span>
                <span className="shrink-0 font-mono text-cyan-400/80">v3.8 Flash</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
