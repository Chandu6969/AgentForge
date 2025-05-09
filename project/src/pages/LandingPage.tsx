import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Bot, 
  FileText, 
  Zap, 
  Settings, 
  CheckCircle, 
  ChevronDown,
  ChevronUp,
  Brain,
  Users,
  MessageSquare,
  Shield
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { 
  APP_NAME, 
  APP_DESCRIPTION, 
  APP_TAGLINE,
  PRICING_PLANS,
  FAQS
} from '../utils/constants';
import { AGENT_ROLES } from '../utils/constants';

const LandingPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-24 overflow-hidden bg-gradient-to-b from-white to-neutral-50">
          <div className="absolute inset-0 bg-grid-neutral-100/50 bg-[length:30px_30px] [mask-image:radial-gradient(white,transparent_85%)]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-8">
                <div className="inline-block px-3 py-1 text-sm font-medium text-primary-800 bg-primary-100 rounded-full mb-4">
                  Now in beta • Limited free access
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
                  {APP_DESCRIPTION}
                </h1>
                <p className="mt-6 text-xl text-neutral-600 max-w-2xl">
                  Transform your business knowledge into intelligent AI assistants. 
                  Upload your documents and create specialized agents for HR, sales, 
                  or customer support in minutes—no coding required.
                </p>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    as={Link}
                    to="/signup"
                    rightIcon={<ArrowRight size={16} />}
                    className="font-medium"
                  >
                    Start Building for Free
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    as={Link}
                    to="/#how-it-works"
                    className="font-medium"
                  >
                    See How It Works
                  </Button>
                </div>
                
                <div className="mt-8 flex items-center text-sm text-neutral-500">
                  <CheckCircle size={16} className="text-success-500 mr-2" />
                  <span>No credit card required</span>
                  <span className="mx-2">•</span>
                  <CheckCircle size={16} className="text-success-500 mr-2" />
                  <span>Free plan available</span>
                  <span className="mx-2">•</span>
                  <CheckCircle size={16} className="text-success-500 mr-2" />
                  <span>Cancel anytime</span>
                </div>
              </div>
              
              <div className="lg:w-1/2 mt-10 lg:mt-0">
                <div className="shadow-2xl rounded-xl bg-white p-2 border border-neutral-200 max-w-lg mx-auto">
                  <div className="bg-neutral-800 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-neutral-500"></div>
                        <div className="w-3 h-3 rounded-full bg-neutral-500"></div>
                        <div className="w-3 h-3 rounded-full bg-neutral-500"></div>
                      </div>
                      <div className="mx-auto text-neutral-400 text-xs">HR Assistant Demo</div>
                    </div>
                    
                    <div className="bg-neutral-900 rounded-md p-4 min-h-[300px] max-h-[400px] overflow-y-auto">
                      <div className="flex mb-4">
                        <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                          <Bot size={16} className="text-primary-700" />
                        </div>
                        <div className="ml-3 bg-neutral-800 rounded-lg p-3 text-neutral-100 text-sm flex-1">
                          Hello! I'm your HR Assistant. How can I help you today?
                        </div>
                      </div>
                      
                      <div className="flex justify-end mb-4">
                        <div className="mr-3 bg-primary-600 rounded-lg p-3 text-white text-sm">
                          What's our company policy on remote work?
                        </div>
                        <div className="w-8 h-8 rounded-full bg-neutral-700 shrink-0"></div>
                      </div>
                      
                      <div className="flex mb-4">
                        <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                          <Bot size={16} className="text-primary-700" />
                        </div>
                        <div className="ml-3 bg-neutral-800 rounded-lg p-3 text-neutral-100 text-sm flex-1">
                          According to our updated policy (effective March 2025), employees can work remotely up to 3 days per week with manager approval. Fully remote options are available for certain roles.
                          <br /><br />
                          Required in-office days are Tuesdays and Thursdays for department meetings and collaboration. If you need special accommodations, please submit a request through the HR portal.
                          <br /><br />
                          Would you like me to send you the complete remote work policy document?
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Social Proof */}
        <section className="py-10 bg-white border-y border-neutral-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-medium text-neutral-500 mb-6">
              TRUSTED BY INNOVATIVE COMPANIES
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
              {/* Logo placeholders */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-6 bg-neutral-200 rounded animate-pulse w-24 md:w-32"></div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Build specialized AI agents for every need
              </h2>
              <p className="text-xl text-neutral-600">
                Empower your business with AI assistants that understand your specific 
                processes, documents, and knowledge.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {AGENT_ROLES.map((role, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    index === 0 ? 'bg-blue-100 text-blue-600' :
                    index === 1 ? 'bg-green-100 text-green-600' :
                    index === 2 ? 'bg-amber-100 text-amber-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {/* Icon placeholder */}
                    <span className="block w-6 h-6"></span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {role.name}
                  </h3>
                  
                  <p className="text-neutral-600 mb-4">
                    {role.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {/* Example use cases */}
                    {index === 0 && (
                      <>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2 shrink-0" />
                          <span className="text-sm text-neutral-600">Answer policy questions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2 shrink-0" />
                          <span className="text-sm text-neutral-600">Explain benefits and PTO</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2 shrink-0" />
                          <span className="text-sm text-neutral-600">Guide through onboarding</span>
                        </li>
                      </>
                    )}
                    
                    {index === 1 && (
                      <>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2 shrink-0" />
                          <span className="text-sm text-neutral-600">Troubleshoot product issues</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2 shrink-0" />
                          <span className="text-sm text-neutral-600">Answer FAQs instantly</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2 shrink-0" />
                          <span className="text-sm text-neutral-600">Guide users through processes</span>
                        </li>
                      </>
                    )}
                    
                    {index === 2 && (
                      <>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2 shrink-0" />
                          <span className="text-sm text-neutral-600">Qualify leads efficiently</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2 shrink-0" />
                          <span className="text-sm text-neutral-600">Answer product questions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2 shrink-0" />
                          <span className="text-sm text-neutral-600">Follow-up with prospects</span>
                        </li>
                      </>
                    )}
                    
                    {index === 3 && (
                      <>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2 shrink-0" />
                          <span className="text-sm text-neutral-600">Build a specialized assistant</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2 shrink-0" />
                          <span className="text-sm text-neutral-600">Tailor to your specific needs</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2 shrink-0" />
                          <span className="text-sm text-neutral-600">Full customizability</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Build your AI agent in three simple steps
              </h2>
              <p className="text-xl text-neutral-600">
                No coding required. Just upload your documents, configure your agent,
                and deploy it instantly.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md relative z-10 border border-neutral-200 h-full">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    Upload Knowledge
                  </h3>
                  <p className="text-neutral-600">
                    Upload your internal documents like policies, manuals, FAQs, 
                    or product information. We'll transform them into a knowledge base.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-primary-600">
                    <FileText size={16} className="mr-2" />
                    <span>PDF, DOCX, and TXT supported</span>
                  </div>
                </div>
                {/* Connecting line */}
                <div className="hidden md:block absolute top-1/2 right-0 w-1/2 h-px bg-neutral-300 z-0"></div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md relative z-10 border border-neutral-200 h-full">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    Configure Your Agent
                  </h3>
                  <p className="text-neutral-600">
                    Choose a role, tone, and personality for your AI assistant.
                    Customize it to match your brand and specific requirements.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-primary-600">
                    <Settings size={16} className="mr-2" />
                    <span>Simple, no-code configuration</span>
                  </div>
                </div>
                {/* Connecting lines */}
                <div className="hidden md:block absolute top-1/2 left-0 w-1/2 h-px bg-neutral-300 z-0"></div>
                <div className="hidden md:block absolute top-1/2 right-0 w-1/2 h-px bg-neutral-300 z-0"></div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md relative z-10 border border-neutral-200 h-full">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    Deploy Instantly
                  </h3>
                  <p className="text-neutral-600">
                    Your AI agent is ready to use immediately. Embed it on your 
                    website, share it with your team, or integrate via API.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-primary-600">
                    <Zap size={16} className="mr-2" />
                    <span>Live in seconds, not weeks</span>
                  </div>
                </div>
                {/* Connecting line */}
                <div className="hidden md:block absolute top-1/2 left-0 w-1/2 h-px bg-neutral-300 z-0"></div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button
                size="lg"
                as={Link}
                to="/signup"
                rightIcon={<ArrowRight size={16} />}
              >
                Start Building Your Agent
              </Button>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Why businesses choose {APP_NAME}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="bg-primary-100 p-2 rounded-lg mr-4 shrink-0">
                      <Brain size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-neutral-900 mb-2">
                        Leverages Your Business Knowledge
                      </h3>
                      <p className="text-neutral-600">
                        Convert your internal documentation into an intelligent assistant 
                        that provides accurate, contextual answers based on your data.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-primary-100 p-2 rounded-lg mr-4 shrink-0">
                      <Zap size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-neutral-900 mb-2">
                        Deploy in Minutes, Not Months
                      </h3>
                      <p className="text-neutral-600">
                        No technical expertise required. Our no-code platform lets you 
                        build and deploy AI agents in minutes, not months of development.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-primary-100 p-2 rounded-lg mr-4 shrink-0">
                      <Users size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-neutral-900 mb-2">
                        Improve Team Productivity
                      </h3>
                      <p className="text-neutral-600">
                        Free up your employees' time by automating repetitive support 
                        tasks, letting them focus on higher-value activities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-primary-100 p-2 rounded-lg mr-4 shrink-0">
                      <MessageSquare size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-neutral-900 mb-2">
                        24/7 Instant Responses
                      </h3>
                      <p className="text-neutral-600">
                        Provide instant answers to customers and employees around the 
                        clock, improving satisfaction and engagement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-primary-100 p-2 rounded-lg mr-4 shrink-0">
                      <Shield size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-neutral-900 mb-2">
                        Secure and Private
                      </h3>
                      <p className="text-neutral-600">
                        Your documents and data remain private. We don't use your content 
                        to train our models or share it with third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 shadow-xl">
                  <img 
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Team using AI agent builder" 
                    className="rounded-lg shadow-md" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing */}
        <section id="pricing" className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-xl text-neutral-600">
                Start for free and upgrade as your needs grow. No hidden fees or surprises.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {PRICING_PLANS.map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl ${
                    plan.isPopular ? 'ring-2 ring-primary-500 shadow-xl transform -translate-y-4' : 'shadow-md'
                  } overflow-hidden`}
                >
                  {plan.isPopular && (
                    <div className="bg-primary-500 text-white text-center py-1 font-medium text-sm">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {plan.name}
                    </h3>
                    
                    <div className="flex items-baseline mt-4 mb-6">
                      <span className="text-4xl font-bold text-neutral-900">${plan.price}</span>
                      <span className="text-neutral-500 ml-2">/month</span>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex">
                          <CheckCircle size={16} className="text-success-500 mt-0.5 mr-2 shrink-0" />
                          <span className="text-neutral-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      variant={plan.isPopular ? 'primary' : 'outline'}
                      className="w-full"
                      as={Link}
                      to="/signup"
                    >
                      {plan.price === 0 ? 'Get Started' : 'Choose Plan'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-neutral-500 mb-2">Need a custom solution?</p>
              <Button
                variant="link"
                as={Link}
                to="/contact"
              >
                Contact us for Enterprise pricing
              </Button>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section id="faq" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-neutral-600">
                Have questions? We've got answers.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto divide-y divide-neutral-200">
              {FAQS.map((faq, index) => (
                <div key={index} className="py-5">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-lg font-medium text-neutral-900">
                      {faq.question}
                    </h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="text-neutral-500 h-5 w-5" />
                    ) : (
                      <ChevronDown className="text-neutral-500 h-5 w-5" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="mt-2 text-neutral-600">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 bg-primary-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to build your first AI agent?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of businesses using {APP_NAME} to create intelligent AI agents.
              Get started for free today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-primary-700 hover:bg-neutral-100"
                as={Link}
                to="/signup"
              >
                Start for Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-primary-600"
                as={Link}
                to="/contact"
              >
                Request a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;