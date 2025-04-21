
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b260067721744a83a1b3fcf1768bf8e1',
  appName: 'basadi-eats-online',
  webDir: 'dist',
  server: {
    url: "https://b2600677-2174-4a83-a1b3-fcf1768bf8e1.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
