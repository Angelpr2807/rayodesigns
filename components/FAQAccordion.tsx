'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 smooth-transition"
        >
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 smooth-transition"
          >
            <h3 className="font-semibold text-foreground pr-4">{item.question}</h3>
            <ChevronDown
              size={20}
              className={`text-primary flex-shrink-0 smooth-transition ${
                openId === item.id ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openId === item.id && (
            <div className="px-4 pb-4 pt-0 border-t border-border/50 text-muted-foreground animate-in fade-in-50 slide-in-from-top-2">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
