// User Types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
}

// Auth Types
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Document Types
export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'txt' | 'docx';
  size: number;
  uploadedAt: Date;
  url: string;
  userId: string;
}

// Agent Types
export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  tone: AgentTone;
  personality: AgentPersonality[];
  createdAt: Date;
  userId: string;
  documentIds: string[];
  isActive: boolean;
}

export type AgentRole = 'hr' | 'support' | 'sales' | 'custom';

export type AgentTone = 'friendly' | 'formal' | 'technical' | 'playful';

export type AgentPersonality = 
  | 'helpful' 
  | 'concise' 
  | 'witty' 
  | 'empathetic' 
  | 'knowledgeable' 
  | 'creative' 
  | 'logical';

// Chat Types
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  agentId: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  agentId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Admin Types
export interface UsageStats {
  totalUsers: number;
  totalAgents: number;
  totalDocuments: number;
  totalConversations: number;
  messagesPerDay: { date: string; count: number }[];
}