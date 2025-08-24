import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, MapPin, Users, Clock, Plus, Search, Filter } from 'lucide-react';

const PlaydatesPage = () => {
  const { playdates, joinPlaydate, addPlaydate } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaydate, setNewPlaydate] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '',
    ageRange: '',
    needs: '',
    description: ''
  });

  const filteredPlaydates = playdates.filter(playdate =>
    playdate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playdate.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playdate.needs.some(need => need.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleJoinPlaydate = (playdateId, playdateTitle) => {
    joinPlaydate(playdateId);
    toast({
      title: "Joined playdate!",
      description: `You've successfully joined "${playdateTitle}".`,
    });
  };

  const handleCreatePlaydate = (e) => {
    e.preventDefault();
    const playdateData = {
      ...newPlaydate,
      maxParticipants: parseInt(newPlaydate.maxParticipants),
      needs: newPlaydate.needs.split(',').map(need => need.trim()),
      organizer: 'You'
    };
    
    addPlaydate(playdateData);
    setShowCreateForm(false);
    setNewPlaydate({
      title: '',
      date: '',
      time: '',
      location: '',
      maxParticipants: '',
      ageRange: '',
      needs: '',
      description: ''
    });
    
    toast({
      title: "Playdate created!",
      description: "Your playdate has been posted to the community.",
    });
  };

  const upcomingPlaydates = filteredPlaydates.filter(p => new Date(p.date) >= new Date());
  const pastPlaydates = filteredPlaydates.filter(p => new Date(p.date) < new Date());

  return (
    <div className="min-h-screen pb-20">
      <Helmet>
        <title>Playdates - The Village: App</title>
        <meta name="description" content="Find and organize playdates with other special needs families. Connect your children with understanding peers in safe, supportive environments." />
        <meta property="og:title" content="Playdates - The Village: App" />
        <meta property="og:description" content="Find and organize playdates with other special needs families. Connect your children with understanding peers in safe, supportive environments." />
      </Helmet>

      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Playdates</h1>
            <p className="text-white/70">Find perfect matches for your child</p>
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            placeholder="Search playdates by title, location, or needs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </motion.div>
      </div>

      {/* Create Playdate Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 mb-6"
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Create New Playdate</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePlaydate} className="space-y-4">
                <Input
                  placeholder="Playdate title"
                  value={newPlaydate.title}
                  onChange={(e) => setNewPlaydate({ ...newPlaydate, title: e.target.value })}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="date"
                    value={newPlaydate.date}
                    onChange={(e) => setNewPlaydate({ ...newPlaydate, date: e.target.value })}
                    required
                  />
                  <Input
                    type="time"
                    value={newPlaydate.time}
                    onChange={(e) => setNewPlaydate({ ...newPlaydate, time: e.target.value })}
                    required
                  />
                </div>
                
                <Input
                  placeholder="Location"
                  value={newPlaydate.location}
                  onChange={(e) => setNewPlaydate({ ...newPlaydate, location: e.target.value })}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Max participants"
                    value={newPlaydate.maxParticipants}
                    onChange={(e) => setNewPlaydate({ ...newPlaydate, maxParticipants: e.target.value })}
                    required
                    min="2"
                    max="20"
                  />
                  <Input
                    placeholder="Age range (e.g., 5-8)"
                    value={newPlaydate.ageRange}
                    onChange={(e) => setNewPlaydate({ ...newPlaydate, ageRange: e.target.value })}
                    required
                  />
                </div>
                
                <Input
                  placeholder="Special needs (comma-separated)"
                  value={newPlaydate.needs}
                  onChange={(e) => setNewPlaydate({ ...newPlaydate, needs: e.target.value })}
                  required
                />
                
                <Input
                  placeholder="Description"
                  value={newPlaydate.description}
                  onChange={(e) => setNewPlaydate({ ...newPlaydate, description: e.target.value })}
                  required
                />
                
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                    Create Playdate
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    variant="outline"
                    className="flex-1 border-white/30 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Playdates Tabs */}
      <div className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass-effect border-white/20">
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-purple-600">
                Upcoming ({upcomingPlaydates.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-purple-600">
                Past ({pastPlaydates.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-6 space-y-4">
              {upcomingPlaydates.map((playdate, index) => (
                <motion.div
                  key={playdate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20 card-hover">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-white text-lg">{playdate.title}</h3>
                        <Badge variant="secondary">{playdate.ageRange} years</Badge>
                      </div>
                      
                      <p className="text-white/80 mb-4">{playdate.description}</p>
                      
                      <div className="space-y-2 text-sm text-white/70 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {playdate.date} at {playdate.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {playdate.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {playdate.participants}/{playdate.maxParticipants} participants
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Organized by {playdate.organizer}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {playdate.needs.map((need, needIndex) => (
                          <Badge key={needIndex} variant="outline" className="text-xs">
                            {need}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button
                        onClick={() => handleJoinPlaydate(playdate.id, playdate.title)}
                        disabled={playdate.participants >= playdate.maxParticipants}
                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                      >
                        {playdate.participants >= playdate.maxParticipants ? 'Full' : 'Join Playdate'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {upcomingPlaydates.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No upcoming playdates</h3>
                  <p className="text-white/70 mb-4">
                    Be the first to create a playdate for your community!
                  </p>
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Playdate
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-6 space-y-4">
              {pastPlaydates.map((playdate, index) => (
                <motion.div
                  key={playdate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20 opacity-75">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-white">{playdate.title}</h3>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-white/70">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {playdate.date} at {playdate.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {playdate.location}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {pastPlaydates.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No past playdates</h3>
                  <p className="text-white/70">
                    Your playdate history will appear here.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
};

export default PlaydatesPage;