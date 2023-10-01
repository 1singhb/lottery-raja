
exports.generateReferenceCode = () => {
  return Math.random().toString(36).substring(3, 12).toUpperCase();
};
