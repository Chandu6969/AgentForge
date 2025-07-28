import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Bot, 
  File, 
  BarChart2, 
  Clock, 
  MoreHorizontal,
  Search,
  Filter
} from 'lucide-react';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { agentApi, documentApi, analyticsApi } from '../services/api';
import { Agent, Document, UsageStats } from '../utils/types';
import { formatDate, formatRelativeTime } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [fetchedAgents, fetchedDocuments, fetchedStats] = await Promise.all([
          agentApi.getAgents(user.id),
          documentApi.getDocuments(user.id),
          analyticsApi.getStats(user.id)
        ]);

        setAgents(fetchedAgents);
        setDocuments(fetchedDocuments);
        setStats(fetchedStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-50">
        <p>Please sign in to access your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Dashboard
            </h1>
            <p className="text-neutral-500">
              Manage your AI agents, documents, and analytics
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <Button
              as={Link}
              to="/create-agent"
              leftIcon={<Plus size={16} />}
            >
              Create Agent
            </Button>
            
            <Button
              as={Link}
              to="/upload-documents"
              variant="outline"
              leftIcon={<File size={16} />}
            >
              Upload Documents
            </Button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-primary-100 text-primary-600 mr-4">
                  <Bot size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">
                    Active Agents
                  </p>
                  <h3 className="text-3xl font-bold text-neutral-900">
                    {isLoading ? '...' : agents.filter(a => a.isActive).length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-secondary-100 text-secondary-600 mr-4">
                  <File size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">
                    Documents
                  </p>
                  <h3 className="text-3xl font-bold text-neutral-900">
                    {isLoading ? '...' : documents.length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-accent-100 text-accent-600 mr-4">
                  <BarChart2 size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">
                    Total Conversations
                  </p>
                  <h3 className="text-3xl font-bold text-neutral-900">
                    {isLoading ? '...' : stats?.totalConversations || 0}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Agents Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              Your AI Agents
            </h2>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  className="pl-9 pr-4 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Filter size={16} />}
              >
                Filter
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, i) => (
                <div 
                  key={i} 
                  className="h-48 bg-white rounded-lg border border-neutral-200 animate-pulse shadow-sm"
                />
              ))}
            </div>
          ) : agents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <Card key={agent.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        agent.role === 'hr' ? 'bg-blue-100 text-blue-600' :
                        agent.role === 'support' ? 'bg-green-100 text-green-600' :
                        agent.role === 'sales' ? 'bg-amber-100 text-amber-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        <Bot size={24} />
                      </div>
                      
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          agent.isActive 
                            ? 'bg-success-100 text-success-800' 
                            : 'bg-neutral-100 text-neutral-800'
                        }`}>
                          {agent.isActive ? 'Active' : 'Inactive'}
                        </span>
                        
                        <button className="ml-2 text-neutral-400 hover:text-neutral-600">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="mt-4 font-semibold text-lg text-neutral-900">
                      {agent.name}
                    </h3>
                    
                    <div className="mt-2 flex items-center text-sm text-neutral-500">
                      <Clock size={14} className="mr-1" />
                      <span>Created {formatRelativeTime(agent.createdAt)}</span>
                    </div>
                    
                    <div className="mt-2 text-sm text-neutral-600">
                      <div className="flex items-center">
                        <span className="font-medium">Role:</span>
                        <span className="ml-2 capitalize">{agent.role}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="font-medium">Tone:</span>
                        <span className="ml-2 capitalize">{agent.tone}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="font-medium">Documents:</span>
                        <span className="ml-2">{agent.documentIds.length}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        as={Link}
                        to={`/agents/${agent.id}/edit`}
                      >
                        Edit
                      </Button>
                      
                      <Button
                        size="sm"
                        as={Link}
                        to={`/chat/${agent.id}`}
                      >
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Create Agent Card */}
              <Card className="border-2 border-dashed border-neutral-300 bg-transparent hover:bg-neutral-50 transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <Plus size={24} className="text-primary-600" />
                  </div>
                  <h3 className="font-medium text-neutral-900 mb-2">
                    Create a New Agent
                  </h3>
                  <p className="text-sm text-neutral-500 mb-4">
                    Build a custom AI assistant for your business needs
                  </p>
                  <Button
                    as={Link}
                    to="/create-agent"
                    variant="outline"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <Bot size={32} className="text-primary-600" />
                </div>
                <h3 className="font-medium text-xl text-neutral-900 mb-2">
                  No AI Agents Yet
                </h3>
                <p className="text-neutral-500 max-w-md mb-6">
                  Create your first AI agent by uploading documents and configuring its role and personality.
                </p>
                <Button
                  as={Link}
                  to="/create-agent"
                  leftIcon={<Plus size={16} />}
                >
                  Create Your First Agent
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
        
        {/* Recent Documents */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              Recent Documents
            </h2>
            
            <Button
              variant="link"
              as={Link}
              to="/documents"
              className="text-sm"
            >
              View All
            </Button>
          </div>
          
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-neutral-200 rounded mb-4"></div>
              <div className="h-10 bg-neutral-200 rounded mb-4"></div>
              <div className="h-10 bg-neutral-200 rounded"></div>
            </div>
          ) : documents.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Uploaded
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {documents.slice(0, 5).map((doc) => (
                        <tr key={doc.id} className="hover:bg-neutral-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                            {doc.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 uppercase">
                            {doc.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            {(doc.size / 1024).toFixed(1)} KB
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            {formatDate(doc.uploadedAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            <button className="text-primary-600 hover:text-primary-800 mr-3">
                              View
                            </button>
                            <button className="text-error-600 hover:text-error-800">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                  <File size={32} className="text-secondary-600" />
                </div>
                <h3 className="font-medium text-xl text-neutral-900 mb-2">
                  No Documents Yet
                </h3>
                <p className="text-neutral-500 max-w-md mb-6">
                  Upload documents to train your AI agents. Supported formats include PDF, DOCX, and TXT.
                </p>
                <Button
                  as={Link}
                  to="/upload-documents"
                  leftIcon={<File size={16} />}
                >
                  Upload Documents
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;