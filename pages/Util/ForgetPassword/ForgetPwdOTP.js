import { View, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleHeader from '@components/shared/SimpleHeader';
import { BASE_UNIT } from '@styles/constants/screen';
import { textMediumPlus, textMediumSize } from '@styles/constants/fontSize';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Colors } from '@styles/Colors';
import LargeButton from '@components/shared/LargeButton';
import LinkButton from '@components/shared/LinkButton';
import { useNavigation } from '@react-navigation/native';
import { phoneNumberRegister } from '@state/RegisterState';
import { MaterialIcons } from '@expo/vector-icons';
import { ICON_MEDIUM } from '@styles/constants/iconSize';
import OTPInPut from '@components/screens/SignUp/textInputs/OTPInPut';
import { useTextLanguage } from '@hooks/useTextLanguage';
import HeaderText from '@components/others/texts//HeaderText';
import HeaderDesText from '@components/others/texts//HeaderDesText';
import OtpErrorModal from '@components/screens/SignUp/modals/OtpErrorModal';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';
import { verifyOTPForPasswordReset } from '@api/auth/forgetPassword';
import { tempTokenState } from '@state/RegisterState';
import { resetTokenState } from '@state/RegisterState';

export default function ForgetPwdOTP() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberRegister);
  const setResetToken = useSetRecoilState(resetTokenState);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const isOtpValid = otp.join('').length === 6;
  const tempToken = useRecoilValue(tempTokenState);

  const handleVerifyOTP = async (phoneNumber, otp) => {
    try {
      const response = await verifyOTPForPasswordReset(
        formatPhoneNumber(phoneNumber),
        otp,
        tempToken
      );
      console.log('DEBUG: Response in auth OTP', response);
      setPhoneNumber(formatPhoneNumber(phoneNumber));

      if (response && response.resetToken) {
        // await saveTempToken(response.resetToken);
        setResetToken(response.resetToken);

        return true;
      } else {
        console.log('OTP verification failed.');
        return false;
      }
    } catch (error) {
      console.log('Error verifying OTP:', error);
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SimpleHeader
          iconColor={'black'}
          backgroundColor={'white'}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>

      <View style={{ paddingTop: BASE_UNIT * 0.04 }}>
        <HeaderText
          text={useTextLanguage({
            vietnamese: 'Nhập mã xác thực',
            english: 'Enter your phone number',
          })}
        />
      </View>

      <View style={{ paddingTop: BASE_UNIT * 0.025 }}>
        <HeaderDesText
          text={useTextLanguage({
            vietnamese: 'Nhập dãy 6 số được gửi đến điện thoại',
            english: 'Enter the 6 digit sequence sent to the phone number',
          })}
          color={Colors.grey}
        />
      </View>

      <Text
        style={{
          fontSize: textMediumPlus,
          fontWeight: '500',
          textAlign: 'center',
        }}
      >
        {formatPhoneNumber(phoneNumber)}
      </Text>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          paddingTop: BASE_UNIT * 0.05,
        }}
      >
        <OTPInPut otp={otp} setOtp={setOtp} />
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: BASE_UNIT * 0.1,
        }}
      >
        <LargeButton
          text={useTextLanguage({ vietnamese: 'Tiếp tục', english: 'Next' })}
          color={Colors.primary}
          textColor={'white'}
          onPress={async () => {
            const success = await handleVerifyOTP(phoneNumber, otp.join(''));
            if (success) {
              navigation.navigate('NewPassword');
            } else {
              setSuccessModalVisible(true);
              console.log('OTP verification failed here.');
            }
          }}
          disabled={isOtpValid ? false : true}
        />
      </View>

      <View
        style={{
          margin: BASE_UNIT * 0.05,
          backgroundColor: '#f2f7fb',
          paddingHorizontal: BASE_UNIT * 0.03,
          paddingTop: BASE_UNIT * 0.05,
          borderRadius: '3%',
        }}
      >
        <Text style={{ fontSize: textMediumSize, marginBottom: BASE_UNIT * 0.05 }}>
          {useTextLanguage({
            vietnamese: 'Để lấy mã xác thực, bạn cần: ',
            english: 'To receive the verification code, you need to: ',
          })}
        </Text>
        <Text style={{ fontSize: textMediumSize }}>
          {useTextLanguage({
            vietnamese: (
              <>
                Soạn <Text style={{ fontWeight: 'bold' }}>ZALO</Text> gửi{' '}
                <Text style={{ fontWeight: 'bold' }}>6020</Text> (1000đ/tin nhắn) hoặc gọi đến tổng
                đài <Text style={{ fontWeight: 'bold' }}>19001223</Text>(1000đ/phút) và làm theo
                hướng dẫn
              </>
            ),
            english: (
              <>
                Text <Text style={{ fontWeight: 'bold' }}>ZALO</Text> to{' '}
                <Text style={{ fontWeight: 'bold' }}>6020</Text> (1000đ/SMS) or call hotline{' '}
                <Text style={{ fontWeight: 'bold' }}>19001223</Text>(1000đ/min) and follow the
                instructions
              </>
            ),
          })}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderTopWidth: 1,
            borderTopColor: Colors.lightGrey,
            paddingBottom: BASE_UNIT * 0.03,
            marginTop: BASE_UNIT * 0.05,
            paddingTop: BASE_UNIT * 0.03,
          }}
        >
          <LinkButton
            text={useTextLanguage({
              vietnamese: 'Gửi tin nhắn',
              english: 'Send SMS',
            })}
            textColor={Colors.primary}
          />
          <LinkButton
            text={useTextLanguage({
              vietnamese: 'Gọi tổng đài',
              english: 'Call hotline',
            })}
            textColor={Colors.primary}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
          position: 'absolute',
          bottom: BASE_UNIT * 0.02,
        }}
      >
        <MaterialIcons name="help" size={ICON_MEDIUM} color={Colors.primary} />
        <LinkButton
          text={useTextLanguage({
            english: 'I still need help with verification codes',
            vietnamese: 'Tôi cần hỗ trợ thêm về mã xác thực',
          })}
          textColor={Colors.primary}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      <OtpErrorModal
        visible={successModalVisible}
        onClose={() => {
          setSuccessModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
