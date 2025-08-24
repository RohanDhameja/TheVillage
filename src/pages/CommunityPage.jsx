import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Navigation from '@/components/Navigation';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { Search, Filter, Users, Star, MapPin, MessageCircle } from 'lucide-react';

const CommunityPage = () => {
  const { communityMembers } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Members' },
    { id: 'autism', label: 'Autism' },
    { id: 'adhd', label: 'ADHD' },
    { id: 'sensory', label: 'Sensory Processing' },
    { id: 'learning', label: 'Learning Support' }
  ];

  const filteredMembers = communityMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         member.specialties.some(specialty => 
                           specialty.toLowerCase().includes(selectedFilter.toLowerCase())
                         );
    
    return matchesSearch && matchesFilter;
  });

  const handleConnect = (memberName) => {
    toast({
      title: "Connection request sent!",
      description: `Your request to connect with ${memberName} has been sent.`,
    });
  };

  const handleMessage = (memberName) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="min-h-screen pb-20">
      <Helmet>
        <title>Community - The Village: App</title>
        <meta name="description" content="Connect with other families in The Village community. Find parents who understand your journey and build meaningful relationships." />
        <meta property="og:title" content="Community - The Village: App" />
        <meta property="og:description" content="Connect with other families in The Village community. Find parents who understand your journey and build meaningful relationships." />
      </Helmet>

      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-white mb-2">Community</h1>
          <p className="text-white/70">Connect with families who understand</p>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            <Input
              placeholder="Search members by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedFilter === filter.id
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Community Stats */}
      <div className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-semibold">
                    {filteredMembers.length} Members Found
                  </span>
                </div>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-200">
                  Active Community
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Members List */}
      <div className="px-4 space-y-4">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 card-hover">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-lg">{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-white text-lg">{member.name}</h3>
                      {member.verified && (
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center text-white/70 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{member.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-white/60 mb-3">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {member.children} {member.children === 1 ? 'child' : 'children'}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-400" />
                        {member.rating} rating
                      </div>
                    </div>
                    
                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.specialties.map((specialty, specialtyIndex) => (
                        <Badge key={specialtyIndex} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleConnect(member.name)}
                        size="sm"
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        Connect
                      </Button>
                      <Button
                        onClick={() => handleMessage(member.name)}
                        size="sm"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="px-4 text-center py-12"
        >
          <Users className="h-16 w-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No members found</h3>
          <p className="text-white/70">
            Try adjusting your search or filter criteria to find more community members.
          </p>
        </motion.div>
      )}

      <Navigation />
    </div>
  );
};

export default CommunityPage;