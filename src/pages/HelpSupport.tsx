
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, HelpCircle, MessageCircle, Phone, Mail, ChevronRight, Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const HelpSupport = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: ''
  });

  const handleContactSubmit = () => {
    if (!contactForm.subject || !contactForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully. We'll get back to you soon.",
    });
    setContactForm({ subject: '', message: '' });
  };

  const faqItems = [
    {
      question: "How can I track my order?",
      answer: "You can track your order in the 'My Orders' section or using the tracking link sent to your email."
    },
    {
      question: "What is your return policy?",
      answer: "We offer 30-day returns for most items. Items must be in original condition."
    },
    {
      question: "How do I change my delivery address?",
      answer: "You can update your delivery address in the 'Saved Addresses' section of your profile."
    },
    {
      question: "How do I cancel my order?",
      answer: "Orders can be cancelled within 1 hour of placement from the 'My Orders' section."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept UPI, credit/debit cards, net banking, and cash on delivery."
    }
  ];

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: MessageCircle,
      action: () => toast({ title: "Live Chat", description: "Connecting you to our support team..." })
    },
    {
      title: 'Call Support',
      description: '+91 1800-123-4567',
      icon: Phone,
      action: () => window.open('tel:+911800123456')
    },
    {
      title: 'Email Support',
      description: 'support@easybuy.com',
      icon: Mail,
      action: () => window.open('mailto:support@easybuy.com')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mr-3"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Help & Support</h1>
        </div>
        <HelpCircle className="h-5 w-5 text-orange-600" />
      </div>

      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Contact Options */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Contact Us</h3>
            </div>
            
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.title}
                  onClick={option.action}
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <div className="text-left">
                      <h4 className="font-medium">{option.title}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Frequently Asked Questions</h3>
            </div>
            
            {filteredFAQ.map((faq, index) => (
              <div key={index} className="p-4 border-b last:border-b-0">
                <h4 className="font-medium mb-2">{faq.question}</h4>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
            
            {filteredFAQ.length === 0 && searchQuery && (
              <div className="p-4 text-center text-gray-500">
                No results found for "{searchQuery}"
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Send us a Message</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <Input
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Describe your issue or question..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                />
              </div>
              <Button onClick={handleContactSubmit} className="w-full">
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HelpSupport;
