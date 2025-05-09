import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import DocumentUpload from '../components/dashboard/DocumentUpload';
import AgentConfig from '../components/dashboard/AgentConfig';
import { useAuth } from '../hooks/useAuth';
import { documentApi, agentApi } from '../services/api';
import { Document, AgentRole, AgentTone, AgentPersonality } from '../utils/types';

const CreateAgentPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upload' | 'configure'>('upload');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        const fetchedDocuments = await documentApi.getDocuments(user.id);
        setDocuments(fetchedDocuments);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [user]);

  const handleDocumentUploaded = (document: Document) => {
    setDocuments(prev => [...prev, document]);
  };

  const handleCreateAgent = async (
    name: string,
    role: AgentRole,
    tone: AgentTone,
    personality: AgentPersonality[],
    documentIds: string[]
  ) => {
    if (!user) return;
    
    setIsCreating(true);
    try {
      const agent = await agentApi.createAgent(
        name,
        role,
        tone,
        personality,
        user.id,
        documentIds
      );
      
      navigate(`/chat/${agent.id}`);
    } catch (error) {
      console.error('Error creating agent:', error);
      alert('Failed to create agent. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-50">
        <p>Please sign in to create an agent.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-neutral-600 hover:text-neutral-900 mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back</span>
          </button>
          
          <h1 className="text-2xl font-bold text-neutral-900">
            Create Your AI Agent
          </h1>
          <p className="text-neutral-500">
            Upload documents and configure your AI assistant
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-neutral-200 mb-8">
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'upload'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            <Upload size={16} className="inline mr-2" />
            Upload Documents
          </button>
          
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'configure'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
            onClick={() => setActiveTab('configure')}
            disabled={isLoading}
          >
            Configure Agent
          </button>
        </div>
        
        {/* Tab content */}
        <div className="mb-12">
          {activeTab === 'upload' ? (
            <div>
              <DocumentUpload onDocumentUploaded={handleDocumentUploaded} />
              
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setActiveTab('configure')}
                  disabled={isLoading}
                >
                  Continue to Configuration
                </Button>
              </div>
            </div>
          ) : (
            <AgentConfig
              documents={documents}
              onCreateAgent={handleCreateAgent}
              isCreating={isCreating}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateAgentPage;