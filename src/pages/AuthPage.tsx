import React from 'react';
import { motion } from 'framer-motion';
import { SignIn, useClerk } from '@clerk/clerk-react';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const { setActive } = useClerk();

  return (
    <div className="min-h-screen bg-jewelry-cream dark:bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl overflow-hidden"
        >
          <div className="relative h-32 bg-purple-gradient">
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-purple-gradient flex items-center justify-center ring-8 ring-white dark:ring-dark-card">
              <span className="text-white font-serif text-2xl">Z</span>
            </div>
          </div>

          <div className="px-6 pt-16 pb-8">
            <h2 className="text-2xl font-serif text-center text-jewelry-dark dark:text-dark-text mb-2">
              Welcome to Zaavg
            </h2>
            <p className="text-gray-600 dark:text-dark-muted text-center mb-8">
              Sign in to continue
            </p>

            <SignIn 
              afterSignInUrl="/"
              afterSignUpUrl="/"
              routing="hash"
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-purple-gradient hover:opacity-90 transition-opacity",
                  card: "bg-transparent shadow-none",
                  headerTitle: "text-2xl font-serif text-center text-jewelry-dark dark:text-dark-text",
                  headerSubtitle: "text-gray-600 dark:text-dark-muted text-center",
                  dividerLine: "bg-gray-200 dark:bg-dark-accent",
                  dividerText: "text-gray-500 dark:text-dark-muted",
                  socialButtonsBlockButton: 
                    "border-gray-200 dark:border-dark-accent hover:bg-gray-50 dark:hover:bg-dark-accent/70",
                  socialButtonsBlockButtonText: 
                    "text-jewelry-dark dark:text-dark-text",
                  formFieldInput: 
                    "bg-gray-50 dark:bg-dark-accent border-gray-200 dark:border-dark-accent rounded-xl",
                  footerActionLink: 
                    "text-purple-500 dark:text-purple-400 hover:underline",
                }
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;