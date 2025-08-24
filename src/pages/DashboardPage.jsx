import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Calendar, Users, Heart, BookOpen, MapPin, Clock, Star } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const { playdates, careRequests, communityMembers } = useData();

  const upcomingPlaydates = playdates.slice(0, 2);
  const recentCareRequests = careRequests.slice(0, 2);
  const featuredMembers = communityMembers.slice(0, 3);

  const stats = [
    { label: 'Active Playdates', value: playdates.length, icon: Calendar, color: 'from-purple-500 to-pink-500' },
    { label: 'Community Members', value: communityMembers.length, icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Care Requests', value: careRequests.length, icon: Heart, color: 'from-green-500 to-emerald-500' },
    { label: 'Resources Shared', value: 24, icon: BookOpen, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="min-h-screen pb-20">
      <Helmet>
        <title>Dashboard - The Village: App</title>
        <meta name="description" content="Your personal dashboard to manage playdates, connect with community members, and access resources for your special needs family." />
        <meta property="og:title" content="Dashboard - The Village: App" />
        <meta property="og:description" content="Your personal dashboard to manage playdates, connect with community members, and access resources for your special needs family." />
      </Helmet>

      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name?.split(' ')[0]}!</h1>
              <p className="text-white/70">Ready to connect with your village?</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20 card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-sm text-white/70">{stat.label}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button asChild className="h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Link to="/playdates" className="flex flex-col items-center">
                <Calendar className="h-6 w-6 mb-1" />
                <span className="text-sm">Find Playdates</span>
              </Link>
            </Button>
            <Button asChild className="h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Link to="/care-pool" className="flex flex-col items-center">
                <Heart className="h-6 w-6 mb-1" />
                <span className="text-sm">Request Care</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Playdates */}
      <div className="px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Upcoming Playdates</h2>
            <Link to="/playdates" className="text-purple-400 hover:text-purple-300 text-sm">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {upcomingPlaydates.map((playdate) => (
              <Card key={playdate.id} className="glass-effect border-white/20 card-hover">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-white">{playdate.title}</h3>
                    <Badge variant="secondary">{playdate.ageRange} years</Badge>
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
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {playdate.participants}/{playdate.maxParticipants} participants
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {playdate.needs.map((need, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Featured Community Members */}
      <div className="px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Featured Members</h2>
            <Link to="/community" className="text-purple-400 hover:text-purple-300 text-sm">
              View All
            </Link>
          </div>
          
          <div className="grid gap-4">
            {featuredMembers.map((member) => (
              <Card key={member.id} className="glass-effect border-white/20 card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-white">{member.name}</h3>
                        {member.verified && (
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-white/70 mb-2">{member.location}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {member.children} {member.children === 1 ? 'child' : 'children'}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-400" />
                          {member.rating}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {member.specialties.slice(0, 2).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
};

export default DashboardPage;