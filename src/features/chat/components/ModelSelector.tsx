'use client';

import { useState, useEffect } from 'react';

interface Model {
  name: string;
  size: number;
  modified_at: string;
}

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/models')
      .then(res => res.json())
      .then(data => {
        setModels(data.models || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm text-gray-400">بارگیری مدلها...</div>;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        انتخاب مدل:
      </label>
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
      >
        {models.map((model) => (
          <option key={model.name} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}