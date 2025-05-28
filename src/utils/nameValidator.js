export const validateUsernameLength = (username) => {
  const pattern = /^.{2,40}$/;
  return pattern.test(username);
};

export const validateUsernameNotNumber = (username) => {
  const pattern = /^[A-Za-zÀ-ẪĐ-ỹ\s]{2,40}$/;
  return pattern.test(username);
};
