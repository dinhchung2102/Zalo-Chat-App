import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    if (name === 'HomeMessage') {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeMessage', params }],
        })
      );
    } else {
      navigationRef.navigate(name, params);
    }
  }
}

// ✅ Hàm xác định màn hình hiện tại
export function getCurrentRouteName() {
  if (navigationRef.isReady()) {
    const route = navigationRef.getCurrentRoute();
    return route?.name ?? null;
  }
  return null;
}
