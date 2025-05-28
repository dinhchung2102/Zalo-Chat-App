import { Text, TouchableOpacity } from 'react-native';
import { BASE_UNIT } from '@styles/constants/screen';
import { textMediumSize } from '@styles/constants/fontSize';
import { MaterialIcons } from '@expo/vector-icons';
import { ICON_MEDIUM_PLUS } from '@styles/constants/iconSize';
import { useRecoilValue } from 'recoil';
import { languageState } from '@state/PrimaryState';
import { useBirthdayPicker } from '@hooks/useBirthdayPicker';

export default function BirthdaySelect({ minimumAge, dateValue, setDateValue }) {
  const language = useRecoilValue(languageState);
  const { showDatePicker, handleDateString, borderColor } = useBirthdayPicker({
    minimumAge,
    dateValue,
    setDateValue,
    language,
  });

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: BASE_UNIT * 0.13,
        borderRadius: BASE_UNIT * 0.015,
        borderWidth: 1,
        borderColor: borderColor,
        paddingHorizontal: BASE_UNIT * 0.04,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onPress={showDatePicker}
    >
      <Text style={{ fontSize: textMediumSize, color: borderColor }}>
        {handleDateString(dateValue)}
      </Text>
      <TouchableOpacity onPress={showDatePicker}>
        <MaterialIcons size={ICON_MEDIUM_PLUS} name="calendar-month" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
