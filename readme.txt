eas build
npx expo run:android
eas build -p android --profile preview
eas build -p android --profile production

adb tcpip 5555
adb connect <ip_address>:5555
adb logcat
adb logcat '*:W'.
adb logcat '*:W'. | grep '<appname>'
adb devices