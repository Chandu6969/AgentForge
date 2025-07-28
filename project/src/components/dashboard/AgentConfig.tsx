import React, { useState } from 'react';
import { Check, Info } from 'lucide-react';
import Button from '../ui/Button';
import { AgentRole, AgentTone, AgentPersonality, Document } from '../../utils/types';
import { AGENT_ROLES, AGENT_TONES, AGENT_PERSONALITIES } from '../../utils/constants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { formatFileSize } from '../../utils/helpers';

interface AgentConfigProps {
  documents: Document[];
  onCreateAgent: (name: string, role: AgentRole, tone: AgentTone, personality: AgentPersonality[], documentIds: string[]) => Promise<void>;
  isCreating: boolean;
}

const AgentConfig: React.FC<AgentConfigProps> = ({ 
  documents, 
  onCreateAgent,
  isCreating
}) => {
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<AgentRole>('hr');
  const [selectedTone, setSelectedTone] = useState<AgentTone>('friendly');
  const [selectedPersonality, setSelectedPersonality] = useState<AgentPersonality[]>(['helpful']);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const handlePersonalityToggle = (personality: AgentPersonality) => {
    setSelectedPersonality(prev => 
      prev.includes(personality)
        ? prev.filter(p => p !== personality)
        : [...prev, personality]
    );
  };

  const handleDocumentToggle = (documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId)
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return name.trim().length > 0;
      case 2:
        return selectedRole !== undefined;
      case 3:
        return selectedTone !== undefined;
      case 4:
        return selectedPersonality.length > 0;
      case 5:
        return selectedDocuments.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCreateAgent();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateAgent = async () => {
    await onCreateAgent(
      name,
      selectedRole,
      selectedTone,
      selectedPersonality,
      selectedDocuments
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((step) => (
            <React.Fragment key={step}>
              <div 
                className={`flex flex-col items-center ${
                  step < currentStep ? 'text-primary-600' : step === currentStep ? 'text-primary-800' : 'text-neutral-400'
                }`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step < currentStep 
                      ? 'bg-primary-600 text-white' 
                      : step === currentStep 
                      ? 'bg-primary-100 text-primary-800 border-2 border-primary-600' 
                      : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                  {step < currentStep ? <Check size={16} /> : step}
                </div>
                <span className="text-xs mt-1">
                  {step === 1 && 'Name'}
                  {step === 2 && 'Role'}
                  {step === 3 && 'Tone'}
                  {step === 4 && 'Personality'}
                  {step === 5 && 'Documents'}
                </span>
              </div>
              
              {step < 5 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step < currentStep ? 'bg-primary-600' : 'bg-neutral-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && 'Name Your AI Agent'}
            {currentStep === 2 && 'Select Agent Role'}
            {currentStep === 3 && 'Choose Communication Tone'}
            {currentStep === 4 && 'Set Agent Personality'}
            {currentStep === 5 && 'Select Knowledge Documents'}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && 'Give your AI agent a descriptive name'}
            {currentStep === 2 && 'Select the primary role for your agent'}
            {currentStep === 3 && 'How should your agent communicate?'}
            {currentStep === 4 && 'Select up to 3 personality traits for your agent'}
            {currentStep === 5 && 'Choose documents to train your agent'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Step 1: Name */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., HR Assistant, Support Bot, Sales Helper"
                className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <div className="flex items-center text-sm text-neutral-500">
                <Info size={16} className="mr-2" />
                <p>Choose a clear, descriptive name that reflects the agent's purpose</p>
              </div>
            </div>
          )}
          
          {/* Step 2: Role */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AGENT_ROLES.map((role) => (
                <div 
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as AgentRole)}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-colors ${
                    selectedRole === role.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-neutral-200 hover:border-primary-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-md ${
                      selectedRole === role.id ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {/* Placeholder for icon */}
                      <span className="block w-5 h-5"></span>
                    </div>
                    <div className="ml-3">
                      <h3 className={`font-medium ${
                        selectedRole === role.id ? 'text-primary-800' : 'text-neutral-800'
                      }`}>
                        {role.name}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-1">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Step 3: Tone */}
          {currentStep === 3 && (
            <div className="space-y-4">
              {AGENT_TONES.map((tone) => (
                <div 
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id as AgentTone)}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-colors ${
                    selectedTone === tone.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-neutral-200 hover:border-primary-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-medium ${
                        selectedTone === tone.id ? 'text-primary-800' : 'text-neutral-800'
                      }`}>
                        {tone.name}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-1">
                        {tone.description}
                      </p>
                    </div>
                    {selectedTone === tone.id && (
                      <div className="h-5 w-5 bg-primary-500 rounded-full flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Step 4: Personality */}
          {currentStep === 4 && (
            <div>
              <div className="grid grid-cols-2 gap-3">
                {AGENT_PERSONALITIES.map((personality) => (
                  <div 
                    key={personality.id}
                    onClick={() => handlePersonalityToggle(personality.id as AgentPersonality)}
                    className={`cursor-pointer p-3 rounded-lg border transition-colors ${
                      selectedPersonality.includes(personality.id as AgentPersonality)
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-neutral-200 hover:border-primary-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`h-4 w-4 rounded-sm mr-2 border flex items-center justify-center ${
                        selectedPersonality.includes(personality.id as AgentPersonality)
                          ? 'bg-primary-500 border-primary-500' 
                          : 'border-neutral-300'
                      }`}>
                        {selectedPersonality.includes(personality.id as AgentPersonality) && (
                          <Check size={10} className="text-white" />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${
                          selectedPersonality.includes(personality.id as AgentPersonality)
                            ? 'text-primary-800' 
                            : 'text-neutral-800'
                        }`}>
                          {personality.name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {personality.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-neutral-500 flex items-center">
                <Info size={16} className="mr-2" />
                <p>Select up to 3 personality traits. Traits will influence how your agent responds.</p>
              </div>
            </div>
          )}
          
          {/* Step 5: Documents */}
          {currentStep === 5 && (
            <div className="space-y-4">
              {documents.length > 0 ? (
                <div className="border rounded-lg divide-y">
                  {documents.map((doc) => (
                    <div 
                      key={doc.id}
                      onClick={() => handleDocumentToggle(doc.id)}
                      className={`cursor-pointer p-3 flex items-center transition-colors ${
                        selectedDocuments.includes(doc.id)
                          ? 'bg-primary-50' 
                          : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center mr-3 ${
                        selectedDocuments.includes(doc.id)
                          ? 'bg-primary-500 border-primary-500' 
                          : 'border-neutral-300'
                      }`}>
                        {selectedDocuments.includes(doc.id) && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          selectedDocuments.includes(doc.id) ? 'text-primary-800' : 'text-neutral-800'
                        }`}>
                          {doc.name}
                        </p>
                        <div className="flex items-center text-xs text-neutral-500 mt-1">
                          <span>{doc.type.toUpperCase()}</span>
                          <span className="mx-1">•</span>
                          <span>{formatFileSize(doc.size)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg bg-neutral-50">
                  <p className="text-neutral-500">No documents available</p>
                  <p className="text-sm text-neutral-400 mt-1">
                    Please upload documents in the previous step
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!isStepValid() || isCreating}
            isLoading={currentStep === 5 && isCreating}
          >
            {currentStep < 5 ? 'Continue' : 'Create Agent'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AgentConfig;