import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mvt.dealerApp',
  appName: 'qr-scanner',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
};

export default config;
