// Development Mode Configuration
// Set this to 1 for development mode (bypass time restrictions)
// Set this to 0 for production mode (use actual time restrictions)

export const DEVELOPMENT_MODE = 0;

// Development mode settings
export const DEV_CONFIG = {
  // Bypass time restrictions when DEVELOPMENT_MODE = 1
  bypassTimeRestriction: DEVELOPMENT_MODE === 1,
  
  // Show development indicator in UI
  showDevIndicator: DEVELOPMENT_MODE === 1,
  
  // Development time settings (if needed for testing)
  devLoginTime: '2025-09-23 00:00:00', // Allow login immediately in dev mode
};

// Instructions:
// DEVELOPMENT_MODE = 1: Can login anytime (for development/editing)
// DEVELOPMENT_MODE = 0: Must wait until 24 September 2025 10:00 WIB (for production)