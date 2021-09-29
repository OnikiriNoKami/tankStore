export const isRequired = (title) => {
    const error = new Error(`${title} is required`);
    error.type = "requiredParam";
    throw error;
};
