import React, { useState, useRef, useEffect } from 'react';
import Layout from '../Components/Layout';
import ConfirmationModal from '../Components/ConfirmationModal';
import { Sparkles, Brain, AlertTriangle, Lightbulb, ArrowRight, MessageSquare, Zap, Send, User, RotateCcw, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useTask } from '../context/TaskContext';
import { useNotification } from '../context/NotificationContext';

const AiInsightsPage = () => {

    const { token, info } = useTask()

    // State for chat
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);
    const { showNotification } = useNotification();
    const [isClearing, setIsClearing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleClearChat = async () => {
        if (messages.length === 0) return;

        setIsClearing(true);
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/task/ai/chats`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                setMessages([]);
                showNotification("Chat history cleared", "success");
            }
        } catch (error) {
            console.log(error);
            showNotification("Failed to clear chat history", "error");
        } finally {
            setIsClearing(false);
        }
    };



    // Mock Data for "Empty State" (Insights)
    const insights = [
        {
            title: 'Peak Performance',
            description: 'You complete 40% of high-priority tasks between 9 AM - 11 AM.',
            icon: Zap,
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/20'
        },
        {
            title: 'Optimization Opportunity',
            description: 'Grouping similar tasks could save you ~2 hours this week.',
            icon: Brain,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20'
        },
        {
            title: 'Risk Warning',
            description: '"Q4 Marketing" deadlines are approaching fast.',
            icon: AlertTriangle,
            color: 'text-red-400',
            bg: 'bg-red-500/10',
            border: 'border-red-500/20'
        }
    ];

    const suggestions = [
        "Create a task for For You ?",
        "Can I solve task problem?",
        "Generate a study plan for learning React ?",
        "Help me prioritize my current workload ?"
    ];

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (text = inputValue) => {
        if (!text.trim()) return;

        // Add user message
        const newUserMsg = { id: Date.now(), text: text, sender: 'user' };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/task/ai/assistant`, { userMessage: text }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"

                }
            })
            const aiResponse = res.data;

            console.log(res.data);


            let aiText = "";

            if (aiResponse.action === "CREATE_TASK") {
                aiText = `✅ Task created: ${aiResponse.data.title}`;
            } else {
                aiText = aiResponse.reply;
            }

            const aiMsg = {
                id: Date.now() + 1,
                text: aiText,
                sender: "ai"
            }

            setMessages(prev => [...prev, aiMsg])



        } catch (error) {
            console.log(error);

            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 2,
                    text: "Something went wrong. Please try again.",
                    sender: 'ai'
                }
            ])
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            // e.preventDefault();
            handleSendMessage();
        }
    };

    const handelChatHistory = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/task/ai/chats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            if (res.data.success && res.data.data.length > 0) {
                const history = res.data.data[0].chats;
                const formattedHistory = history.map((msg, index) => ({
                    id: msg._id || index,
                    text: msg.content,
                    sender: msg.role === 'user' ? 'user' : 'ai'
                }));
                setMessages(formattedHistory);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handelChatHistory()
    }, [token])

    return (
        <Layout className='scrollbar-hide' hideFooter={true} isScrollable={false}>
            <div className="flex flex-col h-[calc(100vh-64px)] lg:h-[calc(100vh)] w-full max-w-5xl mx-auto">
                {/* Header */}
                <header className="flex-none flex items-center justify-between px-4 lg:px-6 py-4 border-b border-white/5 bg-zinc-900/50 backdrop-blur-sm z-10 sticky top-0">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
                    </div>
                    {messages.length > 0 && (
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            disabled={isClearing}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium border border-red-500/20 disabled:opacity-50"
                        >
                            {isClearing ? (
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Trash2 className="w-4 h-4" />
                            )}
                            Clear Chat
                        </button>
                    )}
                </header>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto px-4 pb-0 pt-6 scrollbar-hide">
                    <div className="max-w-3xl mx-auto space-y-6">

                        {/* Empty State / Welcome Screen */}
                        {messages.length === 0 && (
                            <div className="fade-in-up mt-10 space-y-10">
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-purple-500/20">
                                        <Sparkles className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <h1 className="text-3xl font-bold text-white">Hey {info?.name} can I help you ?</h1>
                                </div>

                                {/* Insights Cards as "Starters" */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {insights.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSendMessage(`Tell me more about: ${item.title}`)}
                                            className={`p-4 rounded-xl bg-zinc-900 border ${item.border} hover:bg-zinc-800 transition-all text-left group`}
                                        >
                                            <item.icon className={`w-5 h-5 ${item.color} mb-3`} />
                                            <h3 className="font-medium text-zinc-200 text-sm mb-1">{item.title}</h3>
                                            <p className="text-xs text-zinc-500 line-clamp-2">{item.description}</p>
                                        </button>
                                    ))}
                                </div>

                                {/* Quick Prompts */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {suggestions.map((suggestion, i) => (
                                        <div
                                            key={i}
                                            className="p-3 text-sm text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded-lg text-left truncate"
                                        >
                                            {suggestion}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Message History */}
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-zinc-700' : 'bg-purple-500/20'}`}>
                                    {msg.sender === 'user' ? (
                                        <img
                                            src={info?.profilePic || `https://api.dicebear.com/7.x/initials/svg?seed=${info?.name || 'User'}`}
                                            alt="User"
                                            className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                                        />
                                    ) : (
                                        <Sparkles className="w-4 h-4 text-purple-400" />
                                    )}
                                </div>
                                <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${msg.sender === 'user'
                                    ? 'bg-zinc-800 text-white rounded-tr-sm'
                                    : 'bg-transparent text-zinc-100 border border-zinc-800 rounded-tl-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                                </div>
                                <div className="flex items-center gap-1 h-10">
                                    <div className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area (Sticky Bottom) */}
                <div className="flex-none bg-transparent p-4 pb-4 lg:pb-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden focus-within:ring-1 focus-within:ring-purple-500/50 transition-all">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Send a message..."
                                className="w-full bg-transparent text-white px-4 py-4 pr-12 max-h-48 resize-none focus:outline-none text-sm scrollbar-hide"
                                rows={1}
                                style={{ minHeight: '56px' }}
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim() || isTyping}
                                className="absolute right-2 bottom-2 p-2 bg-white text-black rounded-lg hover:bg-zinc-200 disabled:opacity-50 disabled:hover:bg-purple-600 transition-colors"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-center text-xs text-zinc-400 mt-2">
                            AI can make mistakes. Consider checking important information.
                        </p>
                    </div>
                </div>

            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleClearChat}
                title="Clear Chat History"
                message="Are you sure you want to clear your entire chat history? This action cannot be undone."
            />
        </Layout>
    );
};

export default AiInsightsPage;
