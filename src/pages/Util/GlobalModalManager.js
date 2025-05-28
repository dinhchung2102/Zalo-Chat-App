import React from 'react';
import { useRecoilState } from 'recoil';
import GlobalModal from '@components/shared/GlobalModal';
import { globalModalState } from '@state/PrimaryState';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function GlobalModalManager() {
  const [modal, setModal] = useRecoilState(globalModalState);
  const navigation = useNavigation();

  return (
    <GlobalModal
      visible={modal.visible}
      message={modal.message}
      onClose={() => {
        setModal({ visible: false, message: '' });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      }}
    />
  );
}
