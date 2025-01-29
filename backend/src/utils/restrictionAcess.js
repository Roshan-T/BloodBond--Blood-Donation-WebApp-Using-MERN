export const restrictTo = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(400).json({ message: "Unauthorized request" });
    }
    next();
  };
};
