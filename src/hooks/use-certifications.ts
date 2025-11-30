import { useState, useEffect } from 'react';

interface Certification {
  id: string;
  name: string;
  fullName: string;
  issuer: string;
  validUntil?: string;
  description?: string;
  icon?: string;
  color?: string;
  features?: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useCertifications(activeOnly: boolean = true) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCertifications();
  }, [activeOnly]);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = activeOnly ? '/api/certifications?active=true' : '/api/certifications';
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setCertifications(data);
      } else {
        setError(data.error || 'Failed to fetch certifications');
        setCertifications([]);
      }
    } catch (err) {
      console.error('Error fetching certifications:', err);
      setError('Failed to fetch certifications');
      setCertifications([]);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchCertifications();
  };

  return {
    certifications,
    loading,
    error,
    refetch
  };
}
