'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/features/language/store/useLanguageStore';
import { translations } from '@/features/language/translations';

interface Model {
  name: string;
  size: number;
  modified_at: string;
}

interface CompactModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export default function CompactModelSelector({ selectedModel, onModelChange }: CompactModelSelectorProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguageStore();
  const t = translations[language];

  useEffect(() => {
    setMounted(true);
    fetch('/api/models')
      .then(res => res.json())
      .then(data => setModels(data.models || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredModels = models.filter(model => 
    model.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleModelSelect = (modelName: string) => {
    onModelChange(modelName);
    setIsOpen(false);
    setSearch('');
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-[#0d0e21] border border-white/10 rounded-2xl text-white/80">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="text-sm max-w-32 truncate">...</span>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-[#0d0e21] border border-white/10 rounded-2xl text-white/80 hover:bg-midnight-700/50 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="text-sm max-w-32 truncate md:block hidden">{selectedModel}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`${language === "en" ? 'md:left-0' : 'md:right-0'} absolute z-50 bottom-full mb-2 w-80 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 bg-[#080813] border border-white/10 rounded-3xl shadow-xl backdrop-blur`}>
          <div className="p-3 border-b border-white/10">
            <input
              type="text"
              placeholder={t.searchModel}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 bg-midnight-800/50 border border-white/10 rounded-xl text-white placeholder-white/50 text-sm focus:outline-none focus:border-midnight-400"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredModels.map((model) => (
              <button
                key={model.name}
                onClick={() => handleModelSelect(model.name)}
                className={`w-full px-3 py-2 text-left hover:bg-midnight-700/50 transition-colors ${
                  selectedModel === model.name ? 'bg-midnight-600/50 text-midnight-200' : 'text-white/80'
                }`}
              >
                <div className="text-sm font-medium">{model.name}</div>
                <div className="text-xs text-white/50">
                  {(model.size / (1024 * 1024 * 1024)).toFixed(1)} GB
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}