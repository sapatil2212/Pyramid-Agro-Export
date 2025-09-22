import { useState, useEffect } from 'react';

export interface AboutContent {
  id: string;
  section: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function useAboutContent() {
  const [content, setContent] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/home-content');
      const data = await response.json();
      
      if (response.ok) {
        setContent(data);
      } else {
        throw new Error(data.error || 'Failed to fetch content');
      }
    } catch (err) {
      console.error('Error fetching about content:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    error,
    refetch: fetchContent
  };
}
