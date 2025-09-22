import { useState, useEffect } from 'react';

interface HomeContent {
  id: string;
  section: string;
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  button2Text?: string;
  button2Link?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useHomeContent() {
  const [content, setContent] = useState<HomeContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      console.log('Fetching home content...');
      const response = await fetch('/api/home-content');
      const data = await response.json();
      
      console.log('Home content response:', { response: response.ok, data });
      
      if (response.ok) {
        setContent(data);
      } else {
        setError(data.error || 'Failed to fetch content');
      }
    } catch (err) {
      console.error('Error fetching home content:', err);
      setError('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Add refresh function
  const refreshContent = () => {
    setLoading(true);
    fetchContent();
  };

  const getContentBySection = (section: string) => {
    return content.find(c => c.section === section);
  };

  return {
    content,
    loading,
    error,
    getContentBySection,
    refreshContent
  };
}
