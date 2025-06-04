@@ -1,7 +1,7 @@
 import React from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 import { format } from 'date-fns';
-import { User, ShoppingBag, Heart, Mail, Calendar, Crown, ArrowRight, Loader } from 'lucide-react';
+import { User, ShoppingBag, Heart, Mail, Calendar, Crown, ArrowRight, Loader, LogOut } from 'lucide-react';
 import { userData, purchaseData, wishlistData } from '../data/mockData';
 import { supabase } from '../lib/supabase';
 import type { Profile } from '../types';