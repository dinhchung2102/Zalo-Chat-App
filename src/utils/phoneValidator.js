export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegexWith0 = /^(03|05|07|08|09)\d{8}$/;
  const phoneRegexWithout0 = /^[1-9]\d{8}$/;
  return phoneRegexWith0.test(phoneNumber) || phoneRegexWithout0.test(phoneNumber);
};
