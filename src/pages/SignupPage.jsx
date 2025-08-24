import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    childName: '',
    childAge: '',
    childNeeds: '',
    childInterests: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        location: formData.location,
        children: [{
          name: formData.childName,
          age: parseInt(formData.childAge),
          needs: formData.childNeeds.split(',').map(need => need.trim()),
          interests: formData.childInterests.split(',').map(interest => interest.trim())
        }]
      };

      await signup(userData);
      toast({
        title: "Welcome to The Village!",
        description: "Your account has been created successfully.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Helmet>
        <title>Join The Village - Create Your Account</title>
        <meta name="description" content="Join The Village community and connect with families who understand your journey raising special needs children." />
        <meta property="og:title" content="Join The Village - Create Your Account" />
        <meta property="og:description" content="Join The Village community and connect with families who understand your journey raising special needs children." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="glass-effect border-white/20">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              <img  
                className="w-16 h-16 mx-auto rounded-xl shadow-lg" 
                alt="The Village App Logo"
               src="https://images.unsplash.com/photo-1670781814367-be54195d19ff" />
            </motion.div>
            <CardTitle className="text-2xl font-bold gradient-text">
              Join The Village
            </CardTitle>
            <p className="text-white/70 mt-2">
              {step === 1 ? 'Create your account' : 'Tell us about your child'}
            </p>
            
            {/* Progress Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-purple-400' : 'bg-white/20'}`} />
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-purple-400' : 'bg-white/20'}`} />
            </div>
          </CardHeader>

          <CardContent>
            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium text-white">
                    Location
                  </label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-white">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-12 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="h-12 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg"
                >
                  Continue
                </Button>
              </form>
            ) : (
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="childName" className="text-sm font-medium text-white">
                    Child's Name
                  </label>
                  <Input
                    id="childName"
                    name="childName"
                    type="text"
                    placeholder="Your child's name"
                    value={formData.childName}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="childAge" className="text-sm font-medium text-white">
                    Child's Age
                  </label>
                  <Input
                    id="childAge"
                    name="childAge"
                    type="number"
                    placeholder="Age in years"
                    value={formData.childAge}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="18"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="childNeeds" className="text-sm font-medium text-white">
                    Special Needs (comma-separated)
                  </label>
                  <Input
                    id="childNeeds"
                    name="childNeeds"
                    type="text"
                    placeholder="e.g., Autism, ADHD, Sensory Processing"
                    value={formData.childNeeds}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="childInterests" className="text-sm font-medium text-white">
                    Child's Interests (comma-separated)
                  </label>
                  <Input
                    id="childInterests"
                    name="childInterests"
                    type="text"
                    placeholder="e.g., Art, Music, Animals, Sports"
                    value={formData.childInterests}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 h-12 border-white/30 text-white hover:bg-white/10"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg"
                  >
                    {loading ? 'Creating Account...' : 'Join The Village'}
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignupPage;