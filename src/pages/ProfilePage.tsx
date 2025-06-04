import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { User, ShoppingBag, Heart, Mail, Calendar, Crown, ArrowRight, Loader } from 'lucide-react';
import { userData, purchaseData, wishlistData } from '../data/mockData';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types';

const ProfilePage: React.FC<{ setActiveTab: (tab: 'purchases' | 'wishlist' | 'catalog') => void }> = ({ setActiveTab }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');

  React.useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
      setName(data.name || '');
      setAddress(data.address || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const updates = {
        id: user.id,
        name,
        address,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;
      setProfile(prev => ({ ...prev!, ...updates }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-300 dark:ring-purple-500">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt={profile?.name || 'Profile'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-dark-accent border border-gray-200 dark:border-dark-accent rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1">Address</label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-dark-accent border border-gray-200 dark:border-dark-accent rounded-xl"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-200 dark:border-dark-accent rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={updateProfile}
                        disabled={loading}
                        className="px-4 py-2 bg-purple-gradient rounded-lg text-white flex items-center gap-2"
                      >
                        {loading ? <Loader className="animate-spin" size={16} /> : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                      <h1 className="text-2xl font-serif text-jewelry-dark dark:text-dark-text">
                        {profile?.name || 'Add your name'}
                      </h1>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-lg text-gray-500 dark:text-dark-muted"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-dark-muted mb-2">
                      {profile?.address || 'Add your address'}
                    </p>
                  </>
                )}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-gray-600 dark:text-dark-muted">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Joined {format(new Date(userData.joinedDate), 'MMMM yyyy')}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center sm:justify-start">
                  <div className="px-4 py-1.5 bg-purple-gradient rounded-full flex items-center gap-2">
                    <Crown size={16} className="text-white" />
                    <span className="text-sm text-white font-medium">Premium Member</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Windows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Purchases Window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <ShoppingBag size={20} className="text-purple-500 dark:text-purple-300" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif text-jewelry-dark dark:text-dark-text">Recent Purchases</h2>
                    <p className="text-sm text-gray-500 dark:text-dark-muted">{purchaseData.length} items</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('purchases')}
                  className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-full transition-colors"
                >
                  <ArrowRight size={20} className="text-purple-500 dark:text-purple-300" />
                </button>
              </div>
              <div className="space-y-4">
                {purchaseData.slice(0, 3).map(purchase => (
                  <div key={purchase.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src={purchase.imageUrl}
                        alt={purchase.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-jewelry-dark dark:text-dark-text line-clamp-1">
                        {purchase.name}
                      </h3>
                      <p className="text-sm text-purple-500 dark:text-purple-300">
                        ${purchase.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-dark-muted">
                        {format(new Date(purchase.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Wishlist Window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Heart size={20} className="text-purple-500 dark:text-purple-300" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif text-jewelry-dark dark:text-dark-text">Wishlist</h2>
                    <p className="text-sm text-gray-500 dark:text-dark-muted">{wishlistData.length} items</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-full transition-colors"
                >
                  <ArrowRight size={20} className="text-purple-500 dark:text-purple-300" />
                </button>
              </div>
              <div className="space-y-4">
                {wishlistData.slice(0, 3).map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-jewelry-dark dark:text-dark-text line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-purple-500 dark:text-purple-300">
                        ${item.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-dark-muted line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-6"
        >
          <h2 className="text-lg font-serif text-jewelry-dark dark:text-dark-text mb-6">Account Statistics</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-dark-muted">Member Status</span>
                <span className="text-sm font-medium text-purple-500 dark:text-purple-300">Premium</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-dark-accent rounded-full overflow-hidden">
                <div className="h-full w-full bg-purple-gradient rounded-full" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-dark-muted">Purchase History</span>
                <span className="text-sm font-medium text-purple-500 dark:text-purple-300">
                  {purchaseData.length} items
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-dark-accent rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-gradient rounded-full"
                  style={{ width: `${Math.min((purchaseData.length / 10) * 100, 100)}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-dark-muted">Wishlist Items</span>
                <span className="text-sm font-medium text-purple-500 dark:text-purple-300">
                  {wishlistData.length} items
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-dark-accent rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-gradient rounded-full"
                  style={{ width: `${Math.min((wishlistData.length / 10) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-dark-accent">
              <h3 className="text-sm font-medium text-jewelry-dark dark:text-dark-text mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <ShoppingBag size={14} className="text-purple-500 dark:text-purple-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-jewelry-dark dark:text-dark-text">
                      Purchased {purchaseData[0].name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-dark-muted">
                      {format(new Date(purchaseData[0].date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Heart size={14} className="text-purple-500 dark:text-purple-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-jewelry-dark dark:text-dark-text">
                      Added {wishlistData[0].name} to wishlist
                    </p>
                    <p className="text-xs text-gray-500 dark:text-dark-muted">Recently</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-100 dark:border-dark-accent">
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-500 dark:text-dark-muted hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;