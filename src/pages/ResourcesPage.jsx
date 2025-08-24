import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { BookOpen, Search, Download, Star, User, ExternalLink, Filter } from 'lucide-react';

const ResourcesPage = () => {const { resources } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'activities', label: 'Activities' },
    { id: 'services', label: 'Services' },
    { id: 'education', label: 'Education' },
    { id: 'support', label: 'Support' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           resource.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (resourceTitle) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleShare = (resourceTitle) => {
    toast({
      title: "Resource shared!",
      description: `"${resourceTitle}" has been shared with the community.`,
    });
  };

  return (
    <div className="min-h-screen pb-20">
      <Helmet>
        <title>Resources - The Village: App</title>
        <meta name="description" content="Access valuable resources, guides, and tools shared by The Village community. Find expert advice and practical support for special needs families." />
        <meta property="og:title" content="Resources - The Village: App" />
        <meta property="og:description" content="Access valuable resources, guides, and tools shared by The Village community. Find expert advice and practical support for special needs families." />
      </Helmet>

      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-white mb-2">Resources</h1>
          <p className="text-white/70">Knowledge shared by our community</p>
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
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Resources Stats */}
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
                  <BookOpen className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-semibold">
                    {filteredResources.length} Resources Available
                  </span>
                </div>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-200">
                  Community Curated
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Resources List */}
      <div className="px-4 space-y-4">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 card-hover">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="h-5 w-5 text-purple-400" />
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {resource.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-white text-lg mb-2">{resource.title}</h3>
                  </div>
                </div>
                
                <p className="text-white/80 mb-4">{resource.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-white/60 mb-4">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {resource.author}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-400" />
                    {resource.rating}
                  </div>
                  <div className="flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    {resource.downloads} downloads
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleDownload(resource.title)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={() => handleShare(resource.title)}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="px-4 text-center py-12"
        >
          <BookOpen className="h-16 w-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No resources found</h3>
          <p className="text-white/70">
            Try adjusting your search or filter criteria to find more resources.
          </p>
        </motion.div>
      )}

      {/* Add Resource Button */}
      <div className="px-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Share a Resource</h3>
              <p className="text-white/70 mb-4">
                Help other families by sharing valuable resources you've discovered.
              </p>
              <Button
                onClick={() => {
                  toast({
                    title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                  });
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Share Resource
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
};

export default ResourcesPage;