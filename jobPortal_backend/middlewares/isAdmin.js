export const RoleCheck = (req, res, next) => {
    
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "user kaha hai",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "pehle admin ban phir ye karna",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Authorization error",
      error: error.message,
    });
  }
};