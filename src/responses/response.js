const succesCode = (res, data, message) => {
  return res.status(200).json({
    message,
    data: data,
  });
};

const failCode = (res, message) => {
  return res.status(400).json({
    message,
  });
};

const errorCode = (res, message) => {
  return res.status(500).json({
    message,
  });
};

module.exports = { succesCode, failCode, errorCode };
