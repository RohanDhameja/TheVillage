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
import { Heart, Clock, Users, MapPin, Plus, Search, Calendar } from 'lucide-react';

const CarePoolPage = () => {
  const { careRequests, addCareRequest } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: 'babysitting',
    date: '',
    time: '',
    children: '',
    needs: '',
    description: ''
  });

  const filteredRequests = careRequests.filter(request =>
    request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.needs.some(need => need.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const requestData = {
      ...newRequest,
      children: parseInt(newRequest.children),
      needs: newRequest.needs.split(',').map(need => need.trim()),
      requester: 'You'
    };
    
    addCareRequest(requestData);
    setShowCreateForm(false);
    setNewRequest({
      type: 'babysitting',
      date: '',
      time: '',
      children: '',
      needs: '',
      description: ''
    });
    
    toast({
      title: "Care request posted!",
      description: "Your request has been shared with the community.",
    });
  };

  const handleOfferHelp = (requestId, requesterName) => {
    toast({
      title: "Help offered!",
      description: `Your offer to help ${requesterName} has been sent.`,
    });
  };

  const openRequests = filteredRequests.filter(r => r.status === 'open');
  const matchedRequests = filteredRequests.filter(r => r.status === 'matched');

  const careTypes = [
    { value: 'babysitting', label: 'Babysitting' },
    { value: 'playdate-swap', label: 'Playdate Swap' },
    { value: 'emergency-care', label: 'Emergency Care' },
    { value: 'respite-care', label: 'Respite Care' }
  ];

  return (
    <div className="min-h-screen pb-20">
      <Helmet>
        <title>Care Pool - The Village: App</title>
        <meta name="description" content="Access trusted childcare through community support. Request care, offer help, and build mutual aid relationships with understanding families." />
        <meta property="og:title" content="Care Pool - The Village: App" />
        <meta property="og:description" content="Access trusted childcare through community support. Request care, offer help, and build mutual aid relationships with understanding families." />
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
            <h1 className="text-2xl font-bold text-white mb-2">Care Pool</h1>
            <p className="text-white/70">Community-supported childcare</p>
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Request Care
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
            placeholder="Search care requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </motion.div>
      </div>

      {/* Create Care Request Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 mb-6"
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Request Care</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateRequest} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Care Type</label>
                  <select
                    value={newRequest.type}
                    onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                    className="w-full h-12 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white"
                    required
                  >
                    {careTypes.map(type => (
                      <option key={type.value} value={type.value} className="bg-gray-800">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="date"
                    value={newRequest.date}
                    onChange={(e) => setNewRequest({ ...newRequest, date: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Time (e.g., 6:00 PM - 9:00 PM)"
                    value={newRequest.time}
                    onChange={(e) => setNewRequest({ ...newRequest, time: e.target.value })}
                    required
                  />
                </div>
                
                <Input
                  type="number"
                  placeholder="Number of children"
                  value={newRequest.children}
                  onChange={(e) => setNewRequest({ ...newRequest, children: e.target.value })}
                  required
                  min="1"
                  max="10"
                />
                
                <Input
                  placeholder="Special needs (comma-separated)"
                  value={newRequest.needs}
                  onChange={(e) => setNewRequest({ ...newRequest, needs: e.target.value })}
                  required
                />
                
                <Input
                  placeholder="Description and special instructions"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  required
                />
                
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                    Post Request
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

      {/* Care Requests Tabs */}
      <div className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="open" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass-effect border-white/20">
              <TabsTrigger value="open" className="data-[state=active]:bg-green-600">
                Open Requests ({openRequests.length})
              </TabsTrigger>
              <TabsTrigger value="matched" className="data-[state=active]:bg-green-600">
                Matched ({matchedRequests.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="open" className="mt-6 space-y-4">
              {openRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20 card-hover">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                          <Heart className="h-5 w-5 text-green-400" />
                          <h3 className="font-semibold text-white capitalize">
                            {request.type.replace('-', ' ')}
                          </h3>
                        </div>
                        <Badge className="bg-green-500/20 text-green-200">
                          {request.status}
                        </Badge>
                      </div>
                      
                      <p className="text-white/80 mb-4">{request.description}</p>
                      
                      <div className="space-y-2 text-sm text-white/70 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {request.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {request.time}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {request.children} {request.children === 1 ? 'child' : 'children'}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          Requested by {request.requester}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {request.needs.map((need, needIndex) => (
                          <Badge key={needIndex} variant="outline" className="text-xs">
                            {need}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button
                        onClick={() => handleOfferHelp(request.id, request.requester)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Offer Help
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {openRequests.length === 0 && (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No open requests</h3>
                  <p className="text-white/70 mb-4">
                    Be the first to request care from your community!
                  </p>
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Request Care
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="matched" className="mt-6 space-y-4">
              {matchedRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                          <Heart className="h-5 w-5 text-blue-400" />
                          <h3 className="font-semibold text-white capitalize">
                            {request.type.replace('-', ' ')}
                          </h3>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-200">
                          {request.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-white/70">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {request.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {request.time}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {matchedRequests.length === 0 && (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No matched requests</h3>
                  <p className="text-white/70">
                    Your matched care arrangements will appear here.
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

export default CarePoolPage;