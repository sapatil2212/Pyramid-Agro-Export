import { useState, useEffect } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  expertise?: string;
  email?: string;
  linkedin?: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/team-members?active=true');
      const data = await response.json();
      
      if (response.ok) {
        setMembers(data);
      } else {
        throw new Error(data.error || 'Failed to fetch team members');
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return {
    members,
    loading,
    error,
    refetch: fetchMembers
  };
}
