import React from 'react';
import { X } from 'lucide-react';

interface PolicyPageProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-linen z-[200] overflow-y-auto py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-onyx hover:text-champagne transition-colors"
        >
          <X size={16} /> Close
        </button>
        <h1 className="text-4xl md:text-5xl font-serif text-onyx mb-12">{title}</h1>
        <div className="prose prose-stone prose-lg max-w-none text-slate font-light leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};
