export const validateInput = (input, type) => {
    if (type === 'string') {
        return input.trim();
    }
    throw new Error('Invalid input type');
};