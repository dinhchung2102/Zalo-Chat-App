import { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Colors } from '@styles/Colors';

export const useBirthdayPicker = ({ minimumAge, dateValue, setDateValue, language }) => {
  const [borderColor, setBorderColor] = useState(Colors.grey);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateValue;
    setDateValue(currentDate);

    if (currentDate.getFullYear() < new Date().getFullYear()) {
      setBorderColor(Colors.primary);
    } else {
      setBorderColor(Colors.grey);
    }
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: dateValue,
      mode: 'date',
      display: 'default',
      onChange: handleDateChange,
      minimumDate: new Date().setFullYear(new Date().getFullYear() - 100),
      maximumDate: new Date().setFullYear(new Date().getFullYear() - minimumAge),
    });
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const handleDateString = (date) => {
    if (language === 'vie') return formatDate(date);
    if (language === 'eng') return date.toLocaleDateString();
    return formatDate(date);
  };

  return {
    showDatePicker,
    handleDateString,
    borderColor,
  };
};
