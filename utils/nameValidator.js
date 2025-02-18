export const validateUsernameLength = (username) => {
    const pattern = /^.{2,40}$/; 
    return pattern.test(username);
}

export const validateUsernameNotNumber = (username) => {
    const pattern = /^[A-Za-z\s]{2,40}$/;
    return pattern.test(username);
}
