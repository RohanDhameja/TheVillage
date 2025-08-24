import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [playdates, setPlaydates] = useState([]);
  const [careRequests, setCareRequests] = useState([]);
  const [communityMembers, setCommunityMembers] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Load mock data
    const mockPlaydates = [
      {
        id: '1',
        title: 'Sensory-Friendly Park Playdate',
        date: '2024-01-25',
        time: '10:00 AM',
        location: 'Golden Gate Park',
        organizer: 'Maria Rodriguez',
        participants: 4,
        maxParticipants: 6,
        ageRange: '5-8',
        needs: ['Autism', 'ADHD'],
        description: 'A quiet morning playdate at the sensory garden area.'
      },
      {
        id: '2',
        title: 'Art Therapy Session',
        date: '2024-01-27',
        time: '2:00 PM',
        location: 'Community Center',
        organizer: 'Jennifer Kim',
        participants: 3,
        maxParticipants: 5,
        ageRange: '6-10',
        needs: ['Autism', 'Anxiety'],
        description: 'Creative expression through art with understanding parents.'
      }
    ];

    const mockCareRequests = [
      {
        id: '1',
        type: 'babysitting',
        requester: 'Sarah Johnson',
        date: '2024-01-26',
        time: '6:00 PM - 9:00 PM',
        children: 1,
        needs: ['Autism', 'Sensory Processing'],
        description: 'Need trusted care for date night. Emma loves puzzles and quiet activities.',
        status: 'open'
      },
      {
        id: '2',
        type: 'playdate-swap',
        requester: 'Mike Chen',
        date: '2024-01-28',
        time: '1:00 PM - 4:00 PM',
        children: 2,
        needs: ['ADHD', 'Learning Disabilities'],
        description: 'Looking to swap childcare with another family this weekend.',
        status: 'matched'
      }
    ];

    const mockMembers = [
      {
        id: '1',
        name: 'Maria Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        location: 'San Francisco, CA',
        children: 2,
        specialties: ['Autism', 'Speech Therapy'],
        rating: 4.9,
        verified: true
      },
      {
        id: '2',
        name: 'Jennifer Kim',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        location: 'Oakland, CA',
        children: 1,
        specialties: ['Art Therapy', 'Sensory Processing'],
        rating: 4.8,
        verified: true
      },
      {
        id: '3',
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        location: 'Berkeley, CA',
        children: 2,
        specialties: ['ADHD', 'Learning Support'],
        rating: 4.7,
        verified: true
      }
    ];

    const mockResources = [
      {
        id: '1',
        title: 'Sensory-Friendly Activities Guide',
        type: 'guide',
        category: 'Activities',
        author: 'Dr. Lisa Thompson',
        description: 'Comprehensive guide to sensory-friendly activities for children with autism.',
        url: '#',
        rating: 4.9,
        downloads: 1250
      },
      {
        id: '2',
        title: 'Local Special Needs Services Directory',
        type: 'directory',
        category: 'Services',
        author: 'Bay Area Special Needs Network',
        description: 'Complete directory of local therapists, specialists, and support services.',
        url: '#',
        rating: 4.8,
        downloads: 890
      }
    ];

    setPlaydates(mockPlaydates);
    setCareRequests(mockCareRequests);
    setCommunityMembers(mockMembers);
    setResources(mockResources);
  }, []);

  const addPlaydate = (playdate) => {
    const newPlaydate = {
      ...playdate,
      id: Date.now().toString(),
      participants: 1
    };
    setPlaydates(prev => [...prev, newPlaydate]);
  };

  const joinPlaydate = (playdateId) => {
    setPlaydates(prev => prev.map(p => 
      p.id === playdateId 
        ? { ...p, participants: p.participants + 1 }
        : p
    ));
  };

  const addCareRequest = (request) => {
    const newRequest = {
      ...request,
      id: Date.now().toString(),
      status: 'open'
    };
    setCareRequests(prev => [...prev, newRequest]);
  };

  const value = {
    playdates,
    careRequests,
    communityMembers,
    resources,
    addPlaydate,
    joinPlaydate,
    addCareRequest
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};