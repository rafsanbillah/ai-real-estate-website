export function errorMiddleware(error, req, res, next) {
  console.error(error.message);
  const status = error.name === 'ValidationError' ? 400 : 500;
  res.status(status).json({ message: status === 500 ? 'Server error' : error.message });
}
