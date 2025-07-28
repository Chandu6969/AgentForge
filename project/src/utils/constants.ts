// App
export const APP_NAME = 'AgentForge';
export const APP_DESCRIPTION = 'Build Your Own AI Agent in Minutes';
export const APP_TAGLINE = 'Custom AI Agents for Your Business';

// Auth
export const AUTH_ERROR_MESSAGES = {
  'auth/email-already-in-use': 'This email is already in use.',
  'auth/invalid-email': 'The email address is not valid.',
  'auth/weak-password': 'The password is too weak.',
  'auth/user-not-found': 'No user found with this email.',
  'auth/wrong-password': 'Incorrect password.',
};

// Agent Roles
export const AGENT_ROLES = [
  { 
    id: 'hr', 
    name: 'HR Assistant', 
    description: 'Helps with recruiting, onboarding, and employee relations.',
    icon: 'users',
  },
  { 
    id: 'support', 
    name: 'Support Bot', 
    description: 'Answers customer questions and troubleshoots issues.',
    icon: 'help-circle',
  },
  { 
    id: 'sales', 
    name: 'Sales Assistant', 
    description: 'Qualifies leads and assists with the sales process.',
    icon: 'trending-up',
  },
  { 
    id: 'custom', 
    name: 'Custom Agent', 
    description: 'Create a specialized agent for your unique needs.',
    icon: 'settings',
  },
];

// Agent Tones
export const AGENT_TONES = [
  { id: 'friendly', name: 'Friendly', description: 'Warm and approachable' },
  { id: 'formal', name: 'Formal', description: 'Professional and business-like' },
  { id: 'technical', name: 'Technical', description: 'Detailed and precise' },
  { id: 'playful', name: 'Playful', description: 'Fun and engaging' },
];

// Agent Personalities
export const AGENT_PERSONALITIES = [
  { id: 'helpful', name: 'Helpful', description: 'Goes the extra mile' },
  { id: 'concise', name: 'Concise', description: 'Brief and to the point' },
  { id: 'witty', name: 'Witty', description: 'Clever and humorous' },
  { id: 'empathetic', name: 'Empathetic', description: 'Understanding and compassionate' },
  { id: 'knowledgeable', name: 'Knowledgeable', description: 'Well-informed and educational' },
  { id: 'creative', name: 'Creative', description: 'Thinks outside the box' },
  { id: 'logical', name: 'Logical', description: 'Rational and structured' },
];

// Document Types
export const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'text/plain': ['.txt'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

// Pricing
export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      '1 AI Agent',
      '5 Documents (Max 10MB each)',
      '100 Messages per month',
      'Basic customization',
    ],
    isPopular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    features: [
      '3 AI Agents',
      '25 Documents (Max 25MB each)',
      '1,000 Messages per month',
      'Advanced customization',
      'Priority support',
    ],
    isPopular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 99,
    features: [
      'Unlimited AI Agents',
      'Unlimited Documents (Max 50MB each)',
      '10,000 Messages per month',
      'Full customization',
      'Dedicated support',
      'Custom integrations',
    ],
    isPopular: false,
  },
];

// FAQs
export const FAQS = [
  {
    question: 'How does the AI agent builder work?',
    answer: 'Our platform allows you to upload your company documents, choose a role and personality for your AI agent, and deploy it instantly. The agent uses your documents as its knowledge base to provide accurate, contextual responses.',
  },
  {
    question: 'What kinds of documents can I upload?',
    answer: 'Currently, our system supports PDF, DOCX, and TXT files. We\'re working on adding support for more file types in the future.',
  },
  {
    question: 'Do you store or use my documents for training other AI?',
    answer: 'No. Your documents are only used to train your own AI agents and are stored securely. We do not use your data to train our models or share it with third parties.',
  },
  {
    question: 'How accurate are the AI responses?',
    answer: 'The quality of responses depends on the quality and comprehensiveness of the documents you upload. Our AI uses advanced retrieval techniques to find the most relevant information from your documents.',
  },
  {
    question: 'Can I edit my AI agent after creating it?',
    answer: 'Yes, you can modify your agent\'s role, tone, and personality at any time. You can also update its knowledge base by adding or removing documents.',
  },
  {
    question: 'How can I integrate the AI agent with my website?',
    answer: 'We provide a simple embed code that you can add to your website. Alternatively, you can use our API to integrate the agent with your custom applications.',
  },
];