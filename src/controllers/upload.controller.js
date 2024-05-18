const handleUploadFile = async (req, res) => {
  const file = req?.file?.path;
  try {
    const response = {};

    if (file) {
      response.errCode = 0;
      response.errMessage = `Upload thanh cong`;
      response.file = { file };
    } else {
      response.errCode = 1;
      response.errMessage = `Thất bại`;
      response.file = { file };
    }

    return res.status(200).json({
      errCode: response.errCode,
      message: response.errMessage,
      data: response.file,
    });
  } catch (e) {
    reject(e);
  }
};

module.exports = {
  handleUploadFile: handleUploadFile,
};
