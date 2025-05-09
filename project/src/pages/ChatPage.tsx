import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Users, Info } from 'lucide-react';
import Header from '../components/layout/Header';
import ChatInterface from '../components/chat/ChatInterface';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { agentApi, chatApi, documentApi } from '../services/api';
import { Agent, Document, Conversation } from '../utils/types';

const ChatPage: React.FC = () => {
  const { agentId, conversationId } = useParams<{ agentId: string; conversationId?: string }>();
  const { user } = useAuth();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!user || !agentId) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch agent details
        const agents = await agentApi.getAgents(user.id);
        const currentAgent = agents.find(a => a.id === agentId) || null;
        setAgent(currentAgent);

        if (currentAgent) {
          // Fetch documents used by this agent
          const allDocs = await documentApi.getDocuments(user.id);
          const agentDocs = allDocs.filter(doc => 
            currentAgent.documentIds.includes(doc.id)
          );
          setDocuments(agentDocs);

          // Fetch conversations for this agent
          const allConversations = await chatApi.getConversations(user.id);
          const agentConversations = allConversations.filter(
            conv => conv.agentId === agentId
          );
          setConversations(agentConversations);
        }
      } catch (error) {
        console.error('Error fetching chat data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, agentId]);

  const handleCreateNewChat = async () => {
    if (!user || !agent) return;
    
    try {
      const newConversation = await chatApi.createConversation(
        `New Conversation ${conversations.length + 1}`,
        agent.id,
        user.id
      );
      
      setConversations(prev => [newConversation, ...prev]);
      
      // Redirect to the new conversation
      window.location.href = `/chat/${agent.id}/${newConversation.id}`;
    } catch (error) {
      console.error('Failed to create new conversation:', error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-50">
        <p>Please sign in to access the chat.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link
            to="/dashboard"
            className="flex items-center text-neutral-600 hover:text-neutral-900 mr-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Dashboard</span>
          </Link>
          
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-neutral-600 hover:text-neutral-900 ml-auto md:hidden"
          >
            {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          {isSidebarOpen && (
            <div className="w-full md:w-80 space-y-6">
              {/* Agent Info */}
              <Card>
                <CardContent className="p-4">
                  {isLoading ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-6 bg-neutral-200 rounded"></div>
                      <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                    </div>
                  ) : agent ? (
                    <div>
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                          agent.role === 'hr' ? 'bg-blue-100 text-blue-600' :
                          agent.role === 'support' ? 'bg-green-100 text-green-600' :
                          agent.role === 'sales' ? 'bg-amber-100 text-amber-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          <span className="text-lg font-bold">
                            {agent.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h2 className="font-semibold text-lg text-neutral-900">
                            {agent.name}
                          </h2>
                          <p className="text-sm text-neutral-500 capitalize">
                            {agent.role} • {agent.tone}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm">
                        <div className="flex items-start mb-2">
                          <FileText size={16} className="text-neutral-500 mt-0.5 mr-2 shrink-0" />
                          <div>
                            <p className="font-medium text-neutral-700">Trained on {documents.length} documents</p>
                            <ul className="mt-1 space-y-1 text-neutral-500">
                              {documents.slice(0, 3).map(doc => (
                                <li key={doc.id} className="truncate">• {doc.name}</li>
                              ))}
                              {documents.length > 3 && (
                                <li>• And {documents.length - 3} more...</li>
                              )}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Users size={16} className="text-neutral-500 mt-0.5 mr-2 shrink-0" />
                          <div>
                            <p className="font-medium text-neutral-700">Personality Traits</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {agent.personality.map(trait => (
                                <span 
                                  key={trait}
                                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700"
                                >
                                  {trait}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex">
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Info size={14} />}
                          as={Link}
                          to={`/agents/${agent.id}`}
                          className="text-xs"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-neutral-500">Agent not found</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Conversations List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-neutral-900">Conversations</h3>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Plus size={14} />}
                    onClick={handleCreateNewChat}
                    className="text-xs"
                  >
                    New Chat
                  </Button>
                </div>
                
                {isLoading ? (
                  <div className="space-y-2 animate-pulse">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="h-12 bg-neutral-200 rounded"></div>
                    ))}
                  </div>
                ) : conversations.length > 0 ? (
                  <div className="space-y-2">
                    {conversations.map(conversation => (
                      <Link
                        key={conversation.id}
                        to={`/chat/${agent?.id}/${conversation.id}`}
                        className={`block p-3 rounded-lg border ${
                          conversationId === conversation.id
                            ? 'bg-primary-50 border-primary-200'
                            : 'bg-white border-neutral-200 hover:border-primary-200'
                        }`}
                      >
                        <p className="font-medium text-sm text-neutral-900 truncate">
                          {conversation.title}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {new Date(conversation.updatedAt).toLocaleDateString()}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    No conversations yet
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Chat Area */}
          <div className="flex-1">
            {isLoading ? (
              <div className="animate-pulse h-[600px] bg-neutral-200 rounded-lg"></div>
            ) : agent ? (
              <ChatInterface 
                agentId={agent.id} 
                conversationId={conversationId}
                onCreateNewChat={handleCreateNewChat}
              />
            ) : (
              <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center">
                <p className="text-neutral-600">
                  This agent doesn't exist or you don't have access to it.
                </p>
                <Button
                  as={Link}
                  to="/dashboard"
                  className="mt-4"
                >
                  Back to Dashboard
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;