export const formatPhoneNumber = (inputValue: string): string => {
    const numericValue = inputValue.replace(/\D/g, '');

    if (numericValue.length > 0) {
        return `0${numericValue.substring(1, 10)}`;
    }

    return '';
};