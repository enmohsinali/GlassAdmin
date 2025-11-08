import { useState, useRef, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { GlassCard, Input, Button, Badge, Avatar } from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  Image as ImageIcon,
  Check,
  CheckCheck,
} from 'lucide-react';

const MessengerPage = () => {
  const { isDark } = useTheme();
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';
  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const hoverBg = isDark ? 'hover:bg-[rgba(113,119,144,0.08)]' : 'hover:bg-[rgba(113,119,144,0.06)]';
  const borderColor = isDark ? 'border-[rgba(249,250,251,0.1)]' : 'border-[rgba(0,0,0,0.1)]';

  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: 'Hey! How are you doing today?',
      timestamp: '2 min ago',
      unreadCount: 3,
      isOnline: true,
      isTyping: false,
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      lastMessage: 'Thanks for the update! Let me check and get back to you.',
      timestamp: '15 min ago',
      unreadCount: 0,
      isOnline: true,
      isTyping: false,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: 'Can we schedule a meeting for next week?',
      timestamp: '1 hour ago',
      unreadCount: 1,
      isOnline: false,
      isTyping: false,
    },
    {
      id: 4,
      name: 'David Kumar',
      avatar: 'https://i.pravatar.cc/150?img=12',
      lastMessage: 'Perfect! See you tomorrow.',
      timestamp: '3 hours ago',
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
    },
    {
      id: 5,
      name: 'Jessica Williams',
      avatar: 'https://i.pravatar.cc/150?img=9',
      lastMessage: 'The presentation looks great!',
      timestamp: '1 day ago',
      unreadCount: 0,
      isOnline: true,
      isTyping: false,
    },
    {
      id: 6,
      name: 'Alex Thompson',
      avatar: 'https://i.pravatar.cc/150?img=14',
      lastMessage: 'I sent you the files via email.',
      timestamp: '2 days ago',
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
    },
    {
      id: 7,
      name: 'Lisa Anderson',
      avatar: 'https://i.pravatar.cc/150?img=32',
      lastMessage: 'Great job on the project! 🎉',
      timestamp: '3 days ago',
      unreadCount: 0,
      isOnline: true,
      isTyping: false,
    },
  ]);

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        senderId: 1,
        text: 'Hi there! How is the project coming along?',
        timestamp: '10:30 AM',
        isRead: true,
      },
      {
        id: 2,
        senderId: 'me',
        text: 'Hey Sarah! Going really well. Just finished the initial design phase.',
        timestamp: '10:32 AM',
        isRead: true,
      },
      {
        id: 3,
        senderId: 1,
        text: 'That\'s awesome! Can you send me a preview?',
        timestamp: '10:33 AM',
        isRead: true,
      },
      {
        id: 4,
        senderId: 'me',
        text: 'Sure! Let me grab the screenshots.',
        timestamp: '10:35 AM',
        isRead: true,
      },
      {
        id: 5,
        senderId: 1,
        text: 'Perfect! Also, wanted to check if you\'re available for a quick call tomorrow?',
        timestamp: '10:36 AM',
        isRead: true,
      },
      {
        id: 6,
        senderId: 1,
        text: 'We need to discuss the upcoming features.',
        timestamp: '10:37 AM',
        isRead: false,
      },
      {
        id: 7,
        senderId: 1,
        text: 'Hey! How are you doing today?',
        timestamp: '10:38 AM',
        isRead: false,
      },
    ],
    2: [
      {
        id: 1,
        senderId: 2,
        text: 'Good morning! Just wanted to follow up on our last conversation.',
        timestamp: '9:15 AM',
        isRead: true,
      },
      {
        id: 2,
        senderId: 'me',
        text: 'Morning Michael! Yes, I was just about to send you an update.',
        timestamp: '9:20 AM',
        isRead: true,
      },
      {
        id: 3,
        senderId: 'me',
        text: 'Everything is on track for the deadline.',
        timestamp: '9:20 AM',
        isRead: true,
      },
      {
        id: 4,
        senderId: 2,
        text: 'Thanks for the update! Let me check and get back to you.',
        timestamp: '9:25 AM',
        isRead: true,
      },
    ],
    3: [
      {
        id: 1,
        senderId: 3,
        text: 'Hi! Hope you\'re doing well.',
        timestamp: 'Yesterday',
        isRead: true,
      },
      {
        id: 2,
        senderId: 'me',
        text: 'Hey Emily! Yes, all good here. What\'s up?',
        timestamp: 'Yesterday',
        isRead: true,
      },
      {
        id: 3,
        senderId: 3,
        text: 'Can we schedule a meeting for next week?',
        timestamp: 'Yesterday',
        isRead: false,
      },
    ],
    4: [
      {
        id: 1,
        senderId: 'me',
        text: 'Looking forward to our meeting tomorrow!',
        timestamp: 'Yesterday',
        isRead: true,
      },
      {
        id: 2,
        senderId: 4,
        text: 'Perfect! See you tomorrow.',
        timestamp: 'Yesterday',
        isRead: true,
      },
    ],
    5: [
      {
        id: 1,
        senderId: 5,
        text: 'Just reviewed your presentation deck.',
        timestamp: '2 days ago',
        isRead: true,
      },
      {
        id: 2,
        senderId: 5,
        text: 'The presentation looks great!',
        timestamp: '2 days ago',
        isRead: true,
      },
      {
        id: 3,
        senderId: 'me',
        text: 'Thank you Jessica! Glad you liked it.',
        timestamp: '2 days ago',
        isRead: true,
      },
    ],
  });

  const selectedChatData = chats.find((chat) => chat.id === selectedChat);
  const selectedMessages = messages[selectedChat] || [];

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: (selectedMessages.length + 1),
        senderId: 'me',
        text: messageInput,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
        isRead: false,
      };

      setMessages({
        ...messages,
        [selectedChat]: [...selectedMessages, newMessage],
      });

      // Update last message in chat list
      setChats(
        chats.map((chat) =>
          chat.id === selectedChat
            ? { ...chat, lastMessage: messageInput, timestamp: 'Just now' }
            : chat
        )
      );

      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <PageWrapper title="Messenger">
      <div className="h-[calc(100vh-140px)] p-6">
        <GlassCard className="h-full p-0 overflow-hidden">
          <div className="flex h-full">
            {/* Left Sidebar - Chat List */}
            <div className={cn('w-[350px] border-r', borderColor, 'flex flex-col')}>
              {/* Header */}
              <div className="p-4 border-b border-[rgba(249,250,251,0.1)]">
                <h2 className={cn('text-[20px] font-semibold mb-3', textColor)}>Messages</h2>
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                  className="w-full"
                />
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={cn(
                      'flex items-center gap-3 p-4 cursor-pointer transition-all border-b',
                      borderColor,
                      selectedChat === chat.id
                        ? 'bg-[rgba(58,109,240,0.1)]'
                        : hoverBg
                    )}
                  >
                    {/* Avatar with online indicator */}
                    <div className="relative">
                      <Avatar src={chat.avatar} alt={chat.name} size="lg" />
                      {chat.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#3bf083] border-2 border-white rounded-full"></div>
                      )}
                    </div>

                    {/* Chat Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={cn('text-[15px] font-semibold truncate', textColor)}>
                          {chat.name}
                        </h3>
                        <span className={cn('text-[12px] flex-shrink-0', mutedColor)}>
                          {chat.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p
                          className={cn(
                            'text-[13px] truncate',
                            chat.unreadCount > 0 ? 'font-medium' : '',
                            chat.unreadCount > 0 ? textColor : mutedColor
                          )}
                        >
                          {chat.isTyping ? (
                            <span className="italic text-[#3a6df0]">Typing...</span>
                          ) : (
                            chat.lastMessage
                          )}
                        </p>
                        {chat.unreadCount > 0 && (
                          <Badge className="bg-[#3a6df0] text-white text-[11px] min-w-[20px] h-[20px] flex items-center justify-center rounded-full">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Messages */}
            <div className="flex-1 flex flex-col">
              {selectedChatData ? (
                <>
                  {/* Chat Header */}
                  <div className={cn('flex items-center justify-between p-4 border-b', borderColor)}>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar src={selectedChatData.avatar} alt={selectedChatData.name} size="md" />
                        {selectedChatData.isOnline && (
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#3bf083] border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className={cn('text-[16px] font-semibold', textColor)}>
                          {selectedChatData.name}
                        </h3>
                        <p className={cn('text-[13px]', mutedColor)}>
                          {selectedChatData.isOnline ? 'Active now' : 'Offline'}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" className="p-2">
                        <Phone className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" className="p-2">
                        <Video className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" className="p-2">
                        <Info className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" className="p-2">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedMessages.map((message) => {
                      const isMe = message.senderId === 'me';
                      return (
                        <div
                          key={message.id}
                          className={cn('flex items-end gap-2', isMe ? 'flex-row-reverse' : 'flex-row')}
                        >
                          {!isMe && (
                            <Avatar
                              src={selectedChatData.avatar}
                              alt={selectedChatData.name}
                              size="sm"
                              className="flex-shrink-0"
                            />
                          )}
                          <div
                            className={cn(
                              'max-w-[70%] rounded-[18px] px-4 py-2.5',
                              isMe
                                ? 'bg-[#3a6df0] text-white'
                                : isDark
                                ? 'bg-[rgba(146,151,179,0.2)]'
                                : 'bg-[rgba(0,0,0,0.05)]'
                            )}
                          >
                            <p className={cn('text-[14px] leading-relaxed', isMe ? 'text-white' : textColor)}>
                              {message.text}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <span
                                className={cn(
                                  'text-[11px]',
                                  isMe ? 'text-[rgba(255,255,255,0.8)]' : mutedColor
                                )}
                              >
                                {message.timestamp}
                              </span>
                              {isMe && (
                                <span className="text-white opacity-80">
                                  {message.isRead ? (
                                    <CheckCheck className="w-3 h-3" />
                                  ) : (
                                    <Check className="w-3 h-3" />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Typing Indicator */}
                  {selectedChatData.isTyping && (
                    <div className="px-4 pb-2">
                      <div className="flex items-center gap-2">
                        <Avatar src={selectedChatData.avatar} alt={selectedChatData.name} size="sm" />
                        <div className={cn('rounded-[18px] px-4 py-3', isDark ? 'bg-[rgba(146,151,179,0.2)]' : 'bg-[rgba(0,0,0,0.05)]')}>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-[#717790] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-[#717790] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-[#717790] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message Input */}
                  <div className={cn('p-4 border-t', borderColor)}>
                    <div className="flex items-end gap-3">
                      <Button variant="ghost" className="p-2 flex-shrink-0">
                        <Paperclip className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" className="p-2 flex-shrink-0">
                        <ImageIcon className="w-5 h-5" />
                      </Button>

                      <div className="flex-1">
                        <textarea
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type a message..."
                          rows={1}
                          className={cn(
                            'w-full px-4 py-3 rounded-[20px] resize-none outline-none transition-all',
                            'backdrop-blur-[20px]',
                            isDark
                              ? 'bg-[rgba(146,151,179,0.13)] border border-[rgba(249,250,251,0.1)] text-[#f9fafb] placeholder:text-[rgba(249,250,251,0.5)]'
                              : 'bg-[rgba(255,255,255,0.7)] border border-[rgba(0,0,0,0.1)] text-[#1a1a1a] placeholder:text-[rgba(0,0,0,0.4)]',
                            'focus:border-[#3a6df0]'
                          )}
                          style={{ minHeight: '44px', maxHeight: '120px' }}
                        />
                      </div>

                      <Button variant="ghost" className="p-2 flex-shrink-0">
                        <Smile className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSendMessage}
                        className="p-3 flex-shrink-0 rounded-full"
                        disabled={!messageInput.trim()}
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className={cn('text-[48px] mb-4', mutedColor)}>💬</div>
                    <h3 className={cn('text-[18px] font-semibold mb-2', textColor)}>
                      Select a conversation
                    </h3>
                    <p className={cn('text-[14px]', mutedColor)}>
                      Choose a chat from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </PageWrapper>
  );
};

export default MessengerPage;
