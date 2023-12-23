import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { getToken } from "@/utils/loginHandle";
import axios from "axios";
import { BASE_URL } from "@/global";
import SimpleToast from "react-native-simple-toast";

export const requestUserPermission = async () => {
  if (Platform.OS === "ios") {
    messaging()
      .requestPermission()
      .then((authorizationStatus) => {
      })
      .catch((error) => {
      });
  }
};

export const getFcmToken = async () => {
  // let fcmtoken = await AsyncStorage.getItem("fcmToken");
  // if (!fcmtoken) {
  try {
    await messaging().registerDeviceForRemoteMessages();
    let fcmtoken = await messaging().getToken();
    if (fcmtoken) {
      await AsyncStorage.setItem("fcmToken", fcmtoken);
    }
  } catch (e) {
    console.error(e, "error in fcm token");
  }
  let fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log("new fcmToken", fcmToken);
    await syncDeviceToken({ deviceToken: fcmToken });
  } else {
    SimpleToast.show("Không thể lấy được token thiết bị");
  }
  // }
};

export const NotificationHandler = async () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(async (remoteMessage) => {
      if (remoteMessage && remoteMessage.notification) {
        const _notfication = remoteMessage.notification;
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
        // Display a notification
        // await notifee.displayNotification({
        //   title: _notfication.title,
        //   body: _notfication.body,
        //   android: {
        //     channelId,
        //     importance: AndroidImportance.HIGH,
        //     // pressAction is needed if you want the notification to open the app when pressed
        //     pressAction: {
        //       id: 'default',
        //     },
        //   },
        // });
      }
    });

  messaging().onMessage(async (remoteMessage) => {
    console.log("Received foreground message:", remoteMessage);
    if (remoteMessage && remoteMessage.notification) {
      // Create a channel (required for Android)
      try {
        const channelId = await notifee.createChannel({
          id: "default",
          name: "Default Channel",
          importance: AndroidImportance.HIGH
        });
        const _notfication = remoteMessage.notification;
        await notifee.displayNotification({
          title: _notfication.title,
          body: _notfication.body,
          android: {
            channelId,
            pressAction: {
              id: "default"
            }
          }
        });
      } catch (error) {
        console.error(error, "error in notification");
      }
    }
  });

};


const syncDeviceToken = async (params: {
  deviceToken: string,
}) => {
  const accessToken = await getToken();
  try {
    const { data } = await axios.post<string>(`https://${BASE_URL}/api/device-tokens`, params, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    if (data) return data;
  } catch (error) {
    console.error("Error sending request:", error);
  }
};
