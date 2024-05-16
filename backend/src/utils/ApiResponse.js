class ApiResponse {
  constructor(statusCode, data, message) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  // method to send reponse
  send(res) {
    res.statusCode(this.statusCode).json({
      statusCode: this.statusCode,
      data: this.data,
      message: this.message,
      success: this.success,
    });
  }
}

export default ApiResponse;