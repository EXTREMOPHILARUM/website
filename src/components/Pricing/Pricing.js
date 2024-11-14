import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { PRICING_DATA } from '../../config/settings';

const Pricing = () => {
  const handleEmailClick = (subject, body) => {
    const mailtoUrl = `mailto:me@saurabhn.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="pricing" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Services & Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_DATA.map((plan, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full"
                onClick={() => handleEmailClick(plan.emailSubject, plan.emailBody)}
              >
                Contact for {plan.title}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
