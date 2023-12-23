import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { app } from '@/firebaseConfig';
import { axiosPrivate } from '@/api/axios';
import { Notifications } from '@/types/actions/notification';
import { FaBell, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';

type Props = {
  handleNotification: () => void,
}

const Notification = ({ handleNotification }: Props) => {

  const navigate = useNavigate();
  const [listNotification, setListNotifications] = useState<Notifications<string, number> | null | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const getDeviceToken = async () => {
    const messaging = getMessaging(app);

    // Yêu cầu bật thông báo từ trình duyệt
    window.Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        // Tiếp tục lấy FCM token
        getToken(messaging, {
          vapidKey: 'BAvc5vNDfpLtKJshitmRxcvSPt8zAIqtrDq-IP19pTgYS4uxwfpUVJGnNlC9oFEIHXZMEMJM3uh0b-dJDBvjSvY'
        })
          .then((token) => {
            handleSaveDeviceToken(token);
            console.log('Current device token:', token);
          })
          .catch((error) => {
            console.error('An error occurred while retrieving token. ', error);
          });

      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  };

  const handleSaveDeviceToken = async (token: string) => {
    try {
      const data = {
        deviceToken: token
      }
      const response = await axiosPrivate.post('device-tokens', data);
      console.log(response.data);
    } catch (error) {
      console.error('Lỗi dòi', error);
    }
  }

  const handleCallApiNotification = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get('notifications');
      setListNotifications(response.data);
    } catch (error) {
      console.error('Lỗi', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleNotificationClick = async (notificationId: string, isRead: boolean, link: string) => {
    if (!isRead) {
      try {
        const response = await axiosPrivate.put(`notifications/${notificationId}`, { isRead: true });
        if (response.status === 201) {
          //console.log(link);
        }
        // setListNotifications(prevState => {
        //   if (!prevState) return undefined;
        //   const updatedState = { ...prevState };
        //   updatedState.data = updatedState.data.map(notification => {
        //     if (notification.id === notificationId) {
        //       notification.data.isRead = true;
        //     }
        //     return notification;
        //   });
        //   return updatedState;
        // });
      } catch (error) {
        console.error('Error updating notification status:', error);
      }
    }
    navigate(`/manage-order/${link}`);
    handleNotification();
  };



  useEffect(() => {
    getDeviceToken();
    handleCallApiNotification();
  }, [location.search]);


  return (
    <div className="absolute z-10 right-0 top-[-10px] pr-[240px] p-4">
      <div className="bg-[#E5E5E5] w-[500px] h-[500px] rounded-[10px] overflow-y-auto p-4">
        {isLoading ? (
          <LoadingPage/>
        ) : (
          listNotification?.data?.map((notification, index) => (
            <div key={index}
              className="flex justify-between bg-white hover:bg-mainB items-center rounded-md px-4 py-2 mb-2"
              onClick={() => handleNotificationClick(notification.id, notification.data.isRead, notification.data.link)}>
              <div className="flex flex-row items-center space-x-2">
                <FaBell className="text-blue-500" />
                <div className="flex flex-col">
                  <p className="text-base font-bold text-gray-800">{notification.title}</p>
                  <p className="text-sm font-normal text-gray-600 mt-2">Mã đơn hàng: {notification.data.link}</p>
                  <p className="text-sm font-normal text-gray-600 mt-2">{notification.body}</p>
                  <p className="text-xs font-normal text-gray-500">{new Date(notification.data.createAt).toLocaleString('vi-VN')}</p>
                </div>
              </div>
              <div className={`flex justify-center items-center ${notification.data.isRead ? "bg-green-600 rounded-full w-3 h-3" : "bg-blue-600 rounded-full w-3 h-3"}`}>
                {notification.data.isRead && <FaCheckCircle className="text-white" />}
              </div>
            </div>
          ))
        )}
      </div>


    </div>
  );
}

export default Notification;