export const errorHandler = (err, req, res, next) => {
  console.error('Global Error:', err.message);

  const status = err.statusCode || err.status || 500;

  return res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};