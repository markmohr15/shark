export default {
  name: 'Shark Sports Betting',
  description: 'Monitors line movement',
  slug: 'shark-sb',
  backgroundColor: '#000000',
  primaryColor: '#000000',
  platforms: [
    "ios",
    "android",
    "web"
  ],
  version: "0.4.0",
  android: {
    package: "com.sharksb.app",
    versionCode: 40,
    useNextNotificationsApi: true,
    googleServicesFile: "./google-services.json",
    permissions: ["READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE",
                  "WRITE_SETTINGS", "VIBRATE", "READ_PHONE_STATE",
                  "com.anddoes.launcher.permission.UPDATE_COUNT",
                  "com.android.launcher.permission.INSTALL_SHORTCUT",
                  "com.google.android.c2dm.permission.RECEIVE",
                  "com.google.android.gms.permission.ACTIVITY_RECOGNITION",
                  "com.htc.launcher.permission.READ_SETTINGS",
                  "com.htc.launcher.permission.UPDATE_SHORTCUT",
                  "com.majeur.launcher.permission.UPDATE_BADGE",
                  "com.sec.android.provider.badge.permission.READ",
                  "com.sec.android.provider.badge.permission.WRITE",
                  "com.sonyericsson.home.permission.BROADCAST_BADGE"]
  },
  orientation: "portrait",
  icon: "./assets/shark.png",
  splash: {
    image: "./assets/shark.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  plugins: [
    [
      "expo-notifications",
      {
        icon: "./assets/small-shark-grayscale.png",
        color: "#000000",
        
      }
    ]
  ],
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "assets/images/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.sharksb.app'
  },
  extra: {
    apiUrl: process.env.API_URL || 'https://6350-72-198-216-227.ngrok-free.app/graphql',
    bugsnag: {
      apiKey: "ecdce1b1d55d8a6340d4982dce3c6930"
    },
    eas: {
      projectId: "a40840b7-747e-49bf-be7c-9bdf42068776"
    }
  },
  hooks: {
    postPublish: [
      {
        file: "@bugsnag/expo/hooks/post-publish.js",
        config: {}
      }
    ]
  }
}
