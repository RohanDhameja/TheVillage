import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Edit3, MapPin, Calendar, Star, Settings, LogOut, Camera } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  const profileStats = [
    { label: 'Playdates Joined', value: 12, icon: Calendar },
    { label: 'Community Rating', value: '4.9', icon: Star },
    { label: 'Connections Made', value: 28, icon: MapPin }
  ];

  return (
    <div className="min-h-screen pb-20">
      <Helmet>
        <title>Profile - The Village: App</title>
        <meta name="description" content="Manage your profile, view your activity, and connect with other families in The Village community." />
        <meta property="og:title" content="Profile - The Village: App" />
        <meta property="og:description" content="Manage your profile, view your activity, and connect with other families in The Village community." />
      </Helmet>

      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-white/70">Manage your account and preferences</p>
        </motion.div>
      </div>

      {/* Profile Card */}
      <div className="px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => {
                      toast({
                        title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                      });
                    }}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  >
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                </div>

                {isEditing ? (
                  <div className="w-full space-y-4">
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      placeholder="Full Name"
                      className="text-center"
                    />
                    <Input
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      placeholder="Location"
                      className="text-center"
                    />
                    <Input
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      className="text-center"
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
                        Save
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-2 mb-2">
                      <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                      {user?.verified && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center text-white/70 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user?.location}
                    </div>
                    
                    <p className="text-white/80 mb-4">
                      {editData.bio || "Parent passionate about building connections and supporting our special needs community."}
                    </p>
                    
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>

              {/* Member Since */}
              <div className="text-center text-sm text-white/60 border-t border-white/10 pt-4">
                Member since {new Date(user?.joinedDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Activity Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            {profileStats.map((stat, index) => (
              <Card key={index} className="glass-effect border-white/20">
                <CardContent className="p-4 text-center">
                  <stat.icon className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/70">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Children Info */}
      <div className="px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">My Children</h3>
          {user?.children?.map((child, index) => (
            <Card key={index} className="glass-effect border-white/20 mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-white">{child.name}</h4>
                  <Badge variant="secondary">{child.age} years old</Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-white/70 mb-2">Special Needs:</p>
                    <div className="flex flex-wrap gap-1">
                      {child.needs?.map((need, needIndex) => (
                        <Badge key={needIndex} variant="outline" className="text-xs">
                          {need}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-white/70 mb-2">Interests:</p>
                    <div className="flex flex-wrap gap-1">
                      {child.interests?.map((interest, interestIndex) => (
                        <Badge key={interestIndex} className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>

      {/* Settings */}
      <div className="px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
          <div className="space-y-3">
            <Button
              onClick={() => {
                toast({
                  title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                });
              }}
              variant="outline"
              className="w-full justify-start border-white/30 text-white hover:bg-white/10"
            >
              <Settings className="h-4 w-4 mr-3" />
              Account Settings
            </Button>
            
            <Button
              onClick={() => {
                toast({
                  title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                });
              }}
              variant="outline"
              className="w-full justify-start border-white/30 text-white hover:bg-white/10"
            >
              <Settings className="h-4 w-4 mr-3" />
              Privacy Settings
            </Button>
            
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
};

export default ProfilePage;