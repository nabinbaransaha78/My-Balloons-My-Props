import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WhatsAppSupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "919876543210"; // Replace with actual business number
  const businessName = "MY Balloons MY Prop's";

  const quickMessages = [
    {
      title: "🎈 Ask about Products",
      message: `Hi ${businessName}! I want to ask about a prop before I buy!`
    },
    {
      title: "📦 Track My Order", 
      message: `Hi ${businessName}! I want to track my order status.`
    },
    {
      title: "🎉 Custom Decoration",
      message: `Hi ${businessName}! I need help with custom decoration for my event.`
    },
    {
      title: "💰 Bulk Order Discount",
      message: `Hi ${businessName}! I'm interested in bulk order discounts.`
    }
  ];

  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-4 right-4 z-50">
        {isOpen && (
          <Card className="mb-4 w-80 shadow-xl border-0 bg-white">
            <CardHeader className="bg-green-500 text-white pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Quick Support
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-green-100">
                Chat with us on WhatsApp for instant help!
              </p>
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              {quickMessages.map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full h-auto p-3 text-left flex flex-col items-start hover:bg-green-50 hover:border-green-300"
                  onClick={() => openWhatsApp(item.message)}
                >
                  <span className="font-medium text-sm">{item.title}</span>
                  <span className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {item.message}
                  </span>
                </Button>
              ))}
              
              <div className="pt-2 border-t">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => openWhatsApp(`Hi ${businessName}! I need help with something.`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Custom Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          size="lg"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </div>
    </>
  );
};

export default WhatsAppSupport;