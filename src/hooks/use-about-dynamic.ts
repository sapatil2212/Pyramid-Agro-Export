import { useState, useEffect } from 'react';

export interface AboutContent {
  id: string;
  section: string;
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AboutFeature {
  id: string;
  section: string;
  title: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useAboutDynamic() {
  const [content, setContent] = useState<AboutContent[]>([]);
  const [features, setFeatures] = useState<AboutFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [contentResponse, featuresResponse] = await Promise.all([
        fetch('/api/about-content'),
        fetch('/api/about-features?active=true')
      ]);
      
      const [contentData, featuresData] = await Promise.all([
        contentResponse.json(),
        featuresResponse.json()
      ]);
      
      if (contentResponse.ok && featuresResponse.ok) {
        setContent(contentData);
        setFeatures(featuresData);
      } else {
        throw new Error('Failed to fetch about data');
      }
    } catch (err) {
      console.error('Error fetching about data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch about data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    content,
    features,
    loading,
    error,
    refetch: fetchData
  };
}
