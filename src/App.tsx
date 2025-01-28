import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Scale, BookOpen, AlertCircle } from 'lucide-react';

interface Message {
  content: string;
  type: 'user' | 'bot';
  references?: string[];
  documents?: { title: string; url: string }[];
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated bot response - replace with actual LLM integration
  const generateResponse = (query: string): Message => {
    return {
      type: 'bot',
      content: `Based on your query about "${query}", here's a preliminary legal analysis...`,
      references: [
        'Section 123 of Civil Code',
        'Case Law: Smith v. Jones (2020)'
      ],
      documents: [
        {
          title: 'Legal Guidelines PDF',
          url: 'https://example.com/guidelines.pdf'
        }
      ]
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = generateResponse(input);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center gap-3">
          <Scale className="text-orange-500 w-8 h-8" />
          <h1 className="text-2xl font-bold">LegalAssist AI</h1>
        </div>
      </header>

      <div className="container mx-auto flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-80 bg-gray-800 p-6 hidden md:block">
          <h2 className="text-xl font-semibold mb-4 text-orange-500">About</h2>
          <p className="text-gray-300 mb-6">
            LegalAssist AI provides preliminary legal information and guidance. 
            This is not a substitute for professional legal advice.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-300">
              <MessageSquare className="w-5 h-5 text-red-500" />
              <span>Ask legal questions</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <BookOpen className="w-5 h-5 text-red-500" />
              <span>Get relevant references</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span>Access documentation</span>
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-gray-900">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-6 ${
                  message.type === 'user' ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'
                }`}
              >
                <div
                  className={`rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  <p>{message.content}</p>
                  {message.references && (
                    <div className="mt-3 text-sm">
                      <h4 className="font-semibold text-orange-300">References:</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        {message.references.map((ref, i) => (
                          <li key={i}>{ref}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {message.documents && (
                    <div className="mt-3 text-sm">
                      <h4 className="font-semibold text-orange-300">Related Documents:</h4>
                      <ul className="space-y-1">
                        {message.documents.map((doc, i) => (
                          <li key={i}>
                            <a
                              href={doc.url}
                              className="text-red-400 hover:text-red-300 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {doc.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="container mx-auto flex gap-4">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your legal question here..."
                className="flex-1 bg-gray-900 text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg px-6 py-2 flex items-center gap-2 transition-colors"
                disabled={!input.trim()}
              >
                <Send className="w-5 h-5" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default App;