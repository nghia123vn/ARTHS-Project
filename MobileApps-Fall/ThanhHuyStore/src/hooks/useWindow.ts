import {Dimensions} from 'react-native';
import {useState, useEffect, useMemo} from 'react';

export const useWindow = () => {
  const [window, setWindow] = useState(Dimensions.get('window'));

  useEffect(() => {
    const windowScale = Dimensions.addEventListener('change', ({window}) => {
      setWindow(window);
    });

    return () => {
      windowScale.remove();
    };
  }, []);

  return useMemo(
    () => ({
      ...window,
      height: window.height,
      isLandscape: window.width > window.height,
    }),
    [window.width],
  );
};
