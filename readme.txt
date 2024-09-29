eas build
npx expo prebuild
npx expo run:android
eas build -p android --profile preview
eas build -p android --profile production
eas submit --platform android 

adb tcpip 5555
adb connect <ip_address>:5555
adb logcat
adb logcat '*:W'.
adb logcat '*:W'. | grep '<appname>'
adb devices