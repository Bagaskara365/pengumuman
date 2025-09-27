// Utility functions for timezone handling
import moment from 'moment-timezone';
import { DEV_CONFIG } from '@/config/devConfig';

// Get current time in Jakarta timezone (Semarang is in the same timezone)
export const getCurrentJakartaTime = (): Date => {
  return moment.tz('Asia/Jakarta').toDate();
};

// Check if current time is after the allowed login time
export const isLoginTimeAllowed = (): boolean => {
  // Allow login immediately in development mode
  if (DEV_CONFIG.bypassTimeRestriction) {
    return true;
  }
  
  const jakartaTime = getCurrentJakartaTime();
  const allowedLoginTime = moment.tz('2025-09-28 15:00:00', 'Asia/Jakarta').toDate();
  
  return jakartaTime >= allowedLoginTime;
};

// Get formatted current time for display
export const getFormattedJakartaTime = (): string => {
  return moment.tz('Asia/Jakarta').format('DD MMMM YYYY, HH:mm:ss');
};

// Get countdown breakdown for display
export const getCountdownBreakdown = () => {
  // In development mode, return zeros
  if (DEV_CONFIG.bypassTimeRestriction) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const jakartaTime = getCurrentJakartaTime();
  const allowedLoginTime = moment.tz('2025-09-28 15:00:00', 'Asia/Jakarta').toDate();
  
  if (jakartaTime >= allowedLoginTime) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const duration = moment.duration(allowedLoginTime.getTime() - jakartaTime.getTime());
  
  return {
    days: Math.floor(duration.asDays()),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds()
  };
};

// Get time until login is allowed
export const getTimeUntilLoginAllowed = (): string => {
  // In development mode, login is always allowed
  if (DEV_CONFIG.bypassTimeRestriction) {
    return 'Mode Development - Login Diperbolehkan';
  }
  
  const jakartaTime = getCurrentJakartaTime();
  const allowedLoginTime = moment.tz('2025-09-28 15:00:00', 'Asia/Jakarta').toDate();
  
  if (jakartaTime >= allowedLoginTime) {
    return 'Login sudah diperbolehkan';
  }
  
  const duration = moment.duration(allowedLoginTime.getTime() - jakartaTime.getTime());
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  
  if (days > 0) {
    return `${days} hari, ${hours} jam, ${minutes} menit lagi`;
  } else if (hours > 0) {
    return `${hours} jam, ${minutes} menit lagi`;
  } else {
    return `${minutes} menit lagi`;
  }
};