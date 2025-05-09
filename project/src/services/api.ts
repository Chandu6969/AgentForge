import { AgentRole, AgentTone, AgentPersonality, Message } from '../utils/types';

// Base API URL - would be replaced with your actual backend API
const API_BASE_URL = 'https://api.youragentforge.com';

// Mock flag for development
const USE_MOCK_DATA = true;

// Generic fetch wrapper with error handling
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  // Get auth token from localStorage or similar
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Mock functions for development
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Document API
export const documentApi = {
  uploadDocument: async (file: File, userId: string) => {
    if (USE_MOCK_DATA) {
      await delay(1500); // Simulate upload time
      return {
        id: Math.random().toString(36).substring(2, 15),
        name: file.name,
        type: file.name.split('.').pop()?.toLowerCase() as 'pdf' | 'txt' | 'docx',
        size: file.size,
        uploadedAt: new Date(),
        url: URL.createObjectURL(file),
        userId,
      };
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    
    return fetchWithAuth('/documents/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Don't set Content-Type for multipart/form-data
    });
  },
  
  getDocuments: async (userId: string) => {
    if (USE_MOCK_DATA) {
      await delay(500);
      return Array(5).fill(null).map((_, i) => ({
        id: `doc-${i}`,
        name: `Sample Document ${i + 1}.pdf`,
        type: 'pdf' as const,
        size: Math.floor(Math.random() * 5000000),
        uploadedAt: new Date(Date.now() - Math.random() * 10000000000),
        url: '#',
        userId,
      }));
    }
    
    return fetchWithAuth(`/documents?userId=${userId}`);
  },
  
  deleteDocument: async (documentId: string) => {
    if (USE_MOCK_DATA) {
      await delay(500);
      return { success: true };
    }
    
    return fetchWithAuth(`/documents/${documentId}`, {
      method: 'DELETE',
    });
  },
};

// Agent API
export const agentApi = {
  createAgent: async (
    name: string,
    role: AgentRole,
    tone: AgentTone,
    personality: AgentPersonality[],
    userId: string,
    documentIds: string[]
  ) => {
    if (USE_MOCK_DATA) {
      await delay(1000);
      return {
        id: Math.random().toString(36).substring(2, 15),
        name,
        role,
        tone,
        personality,
        createdAt: new Date(),
        userId,
        documentIds,
        isActive: true,
      };
    }
    
    return fetchWithAuth('/agents', {
      method: 'POST',
      body: JSON.stringify({
        name,
        role,
        tone,
        personality,
        userId,
        documentIds,
      }),
    });
  },
  
  getAgents: async (userId: string) => {
    if (USE_MOCK_DATA) {
      await delay(500);
      return Array(3).fill(null).map((_, i) => ({
        id: `agent-${i}`,
        name: `Demo Agent ${i + 1}`,
        role: ['hr', 'support', 'sales'][i % 3] as AgentRole,
        tone: ['friendly', 'formal', 'technical'][i % 3] as AgentTone,
        personality: ['helpful', 'concise', 'witty'] as AgentPersonality[],
        createdAt: new Date(Date.now() - Math.random() * 10000000000),
        userId,
        documentIds: [`doc-${i}`, `doc-${i + 1}`],
        isActive: true,
      }));
    }
    
    return fetchWithAuth(`/agents?userId=${userId}`);
  },
  
  updateAgent: async (
    agentId: string,
    updates: {
      name?: string;
      role?: AgentRole;
      tone?: AgentTone;
      personality?: AgentPersonality[];
      documentIds?: string[];
      isActive?: boolean;
    }
  ) => {
    if (USE_MOCK_DATA) {
      await delay(500);
      return { ...updates, id: agentId };
    }
    
    return fetchWithAuth(`/agents/${agentId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  },
  
  deleteAgent: async (agentId: string) => {
    if (USE_MOCK_DATA) {
      await delay(500);
      return { success: true };
    }
    
    return fetchWithAuth(`/agents/${agentId}`, {
      method: 'DELETE',
    });
  },
};

// Chat API
export const chatApi = {
  getConversations: async (userId: string) => {
    if (USE_MOCK_DATA) {
      await delay(500);
      return Array(5).fill(null).map((_, i) => ({
        id: `conv-${i}`,
        title: `Conversation ${i + 1}`,
        messages: [],
        agentId: `agent-${i % 3}`,
        userId,
        createdAt: new Date(Date.now() - Math.random() * 10000000000),
        updatedAt: new Date(Date.now() - Math.random() * 1000000000),
      }));
    }
    
    return fetchWithAuth(`/conversations?userId=${userId}`);
  },
  
  getMessages: async (conversationId: string) => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const messages: Message[] = [];
      // Generate 10 messages alternating between user and assistant
      for (let i = 0; i < 10; i++) {
        messages.push({
          id: `msg-${conversationId}-${i}`,
          content: i % 2 === 0 
            ? `This is a user message ${i + 1}. Asking about something.`
            : `This is an assistant response ${i + 1}. Providing a helpful answer based on the documents.`,
          role: i % 2 === 0 ? 'user' : 'assistant',
          timestamp: new Date(Date.now() - (10 - i) * 1000000),
          agentId: conversationId.replace('conv-', 'agent-'),
        });
      }
      return messages;
    }
    
    return fetchWithAuth(`/conversations/${conversationId}/messages`);
  },
  
  sendMessage: async (conversationId: string, content: string, agentId: string) => {
    if (USE_MOCK_DATA) {
      await delay(1000);
      const userMessage: Message = {
        id: `msg-${Math.random().toString(36).substring(2, 9)}`,
        content,
        role: 'user',
        timestamp: new Date(),
        agentId,
      };
      
      await delay(2000); // Simulate AI thinking time
      
      const assistantMessage: Message = {
        id: `msg-${Math.random().toString(36).substring(2, 9)}`,
        content: `This is a simulated response to: "${content}". In a real implementation, this would be generated by the AI based on the knowledge from your uploaded documents.`,
        role: 'assistant',
        timestamp: new Date(),
        agentId,
      };
      
      return {
        userMessage,
        assistantMessage,
      };
    }
    
    return fetchWithAuth(`/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        content,
        agentId,
      }),
    });
  },
  
  createConversation: async (title: string, agentId: string, userId: string) => {
    if (USE_MOCK_DATA) {
      await delay(500);
      return {
        id: `conv-${Math.random().toString(36).substring(2, 9)}`,
        title,
        messages: [],
        agentId,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    
    return fetchWithAuth('/conversations', {
      method: 'POST',
      body: JSON.stringify({
        title,
        agentId,
        userId,
      }),
    });
  },
};

// Analytics API
export const analyticsApi = {
  getStats: async (userId: string) => {
    if (USE_MOCK_DATA) {
      await delay(800);
      
      // Generate random dates for the last 30 days
      const messagesPerDay = Array(30).fill(null).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
          date: date.toISOString().split('T')[0],
          count: Math.floor(Math.random() * 50) + 10,
        };
      });
      
      return {
        totalUsers: 1,
        totalAgents: 3,
        totalDocuments: 12,
        totalConversations: 25,
        messagesPerDay,
      };
    }
    
    return fetchWithAuth(`/analytics/stats?userId=${userId}`);
  },
};