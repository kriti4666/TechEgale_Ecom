exports.authorizeManager = (req, res, next) => {
    try {
      const { role } = req.user;
  
      if (role !== 'Manager') {
        return res.status(403).json({ message: 'Forbidden - Not a manager' });
      }
  
      next();
    } catch (error) {
      console.error('Error authorizing manager:', error);
      res.status(403).json({ message: 'Forbidden' });
    }
  };
  