'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  type: 'sent' | 'received' | 'system';
  content: string;
  timestamp: string;
  sender?: string;
  avatar?: string;
  hasPhoto?: boolean;
  isVoice?: boolean;
  isLocation?: boolean;
}

export default function Chat() {
  const [currentTime, setCurrentTime] = useState('');
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'received',
      sender: '工務店',
      content: 'お疲れさまです。A区画の基礎工事の進捗はいかがでしょうか？',
      timestamp: '09:15',
      avatar: 'K'
    },
    {
      id: 2,
      type: 'sent',
      content: '基礎配筋が完了しました。配筋検査のスケジュール調整をお願いします。',
      timestamp: '09:18',
      hasPhoto: true
    },
    {
      id: 3,
      type: 'received',
      sender: '工務店',
      content: '配筋写真を確認しました。明日14:00から検査予定です。よろしくお願いします。',
      timestamp: '09:25',
      avatar: 'K'
    },
    {
      id: 4,
      type: 'system',
      content: '図面「A区画基礎工事図面 v2.1」が共有されました',
      timestamp: '09:30'
    }
  ]);
  const [selectedContact, setSelectedContact] = useState('工務店');
  const [showContacts, setShowContacts] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contacts = [
    { id: 1, name: '工務店', avatar: 'K', status: 'online', lastSeen: 'オンライン', unread: 0 },
    { id: 2, name: '現場監督', avatar: '監', status: 'online', lastSeen: 'オンライン', unread: 2 },
    { id: 3, name: '設計事務所', avatar: '設', status: 'offline', lastSeen: '2時間前', unread: 0 },
    { id: 4, name: '施主', avatar: '施', status: 'offline', lastSeen: '昨日', unread: 1 }
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'sent',
        content: message,
        timestamp: currentTime,
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // 自動返信をシミュレート
      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          type: 'received',
          sender: selectedContact,
          content: '承知いたしました。確認して返信します。',
          timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
          avatar: selectedContact === '工務店' ? 'K' : '監'
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      // 音声メッセージを送信
      const voiceMessage = {
        id: messages.length + 1,
        type: 'sent',
        content: '音声メッセージを送信しました',
        timestamp: currentTime,
        isVoice: true
      };
      setMessages([...messages, voiceMessage]);
    } else {
      setIsRecording(true);
    }
  };

  const sendPhoto = () => {
    const photoMessage = {
      id: messages.length + 1,
      type: 'sent',
      content: '現場写真を送信しました',
      timestamp: currentTime,
      hasPhoto: true
    };
    setMessages([...messages, photoMessage]);
  };

  const sendLocation = () => {
    const locationMessage = {
      id: messages.length + 1,
      type: 'sent',
      content: '現在地を共有しました',
      timestamp: currentTime,
      isLocation: true
    };
    setMessages([...messages, locationMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* ヘッダー */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
        <div className="flex items-center">
          <Link href="/">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl transition-all cursor-pointer mr-3">
              <i className="ri-arrow-left-line text-gray-600"></i>
            </div>
          </Link>
          <button
            onClick={() => setShowContacts(!showContacts)}
            className="flex items-center"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">
                {contacts.find(c => c.name === selectedContact)?.avatar}
              </span>
            </div>
            <div>
              <div className="font-bold text-gray-800 text-left">{selectedContact}</div>
              <div className="text-xs text-green-600">オンライン</div>
            </div>
            <i className="ri-arrow-down-s-line text-gray-400 ml-2"></i>
          </button>
        </div>
        <div className="text-sm font-medium text-blue-600" suppressHydrationWarning={true}>{currentTime}</div>
      </div>

      {/* 連絡先選択 */}
      {showContacts && (
        <div className="bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact.name);
                  setShowContacts(false);
                }}
                className="w-full flex items-center p-3 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-white font-bold">{contact.avatar}</span>
                  </div>
                  {contact.status === 'online' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-800">{contact.name}</div>
                  <div className="text-xs text-gray-500">{contact.lastSeen}</div>
                </div>
                {contact.unread > 0 && (
                  <div className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {contact.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* メッセージ一覧 */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.type === 'system' ? (
                <div className="text-center">
                  <div className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {msg.content}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{msg.timestamp}</div>
                </div>
              ) : (
                <div className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md ${msg.type === 'sent' ? 'order-2' : 'order-1'}`}>
                    {msg.type === 'received' && (
                      <div className="flex items-center mb-1">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-bold">{msg.avatar}</span>
                        </div>
                        <span className="text-xs text-gray-600">{msg.sender}</span>
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl shadow-sm ${
                      msg.type === 'sent'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-4'
                        : 'bg-white/80 backdrop-blur-lg border border-white/20 text-gray-800 mr-4'
                    }`}>
                      <div className="text-sm">{msg.content}</div>
                      
                      {msg.hasPhoto && (
                        <div className="mt-2 p-3 bg-white/20 rounded-xl">
                          <div className="flex items-center text-xs">
                            <i className="ri-image-line mr-2"></i>
                            <span>写真: 現場状況.jpg</span>
                          </div>
                        </div>
                      )}
                      
                      {msg.isVoice && (
                        <div className="mt-2 flex items-center p-2 bg-white/20 rounded-xl">
                          <button className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mr-2">
                            <i className="ri-play-fill text-sm"></i>
                          </button>
                          <div className="flex-1 h-1 bg-white/30 rounded-full">
                            <div className="w-1/3 h-full bg-white rounded-full"></div>
                          </div>
                          <span className="text-xs ml-2">0:15</span>
                        </div>
                      )}
                      
                      {msg.isLocation && (
                        <div className="mt-2 p-3 bg-white/20 rounded-xl">
                          <div className="flex items-center text-xs mb-2">
                            <i className="ri-map-pin-line mr-2"></i>
                            <span>現在地</span>
                          </div>
                          <div className="text-xs opacity-80">
                            緯度: 35.6762, 経度: 139.6503
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 入力エリア */}
      <div className="p-4 bg-white/80 backdrop-blur-lg border-t border-white/20">
        <div className="max-w-2xl mx-auto">
          {isRecording && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl">
              <div className="flex items-center text-red-600">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm font-medium">録音中... タップで停止</span>
              </div>
            </div>
          )}
          
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="メッセージを入力..."
                rows={1}
                maxLength={500}
                className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <div className="text-xs text-gray-500 mt-1 text-right">{message.length}/500</div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={sendPhoto}
                className="w-12 h-12 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-2xl transition-all cursor-pointer"
              >
                <i className="ri-camera-line text-xl"></i>
              </button>
              
              <button
                onClick={handleVoiceRecord}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
              >
                <i className={isRecording ? "ri-stop-fill text-xl" : "ri-mic-line text-xl"}></i>
              </button>
              
              <button
                onClick={sendLocation}
                className="w-12 h-12 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-2xl transition-all cursor-pointer"
              >
                <i className="ri-map-pin-line text-xl"></i>
              </button>
              
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${
                  message.trim()
                    ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <i className="ri-send-plane-fill text-xl"></i>
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-3 space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <i className="ri-camera-line mr-1"></i>
              <span>写真</span>
            </div>
            <div className="flex items-center">
              <i className="ri-mic-line mr-1"></i>
              <span>音声</span>
            </div>
            <div className="flex items-center">
              <i className="ri-map-pin-line mr-1"></i>
              <span>位置</span>
            </div>
            <Link href="/blueprints">
              <div className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer">
                <i className="ri-file-paper-line mr-1"></i>
                <span>図面</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}