class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

class BadRequest extends CustomError {
  constructor(message = "Invalid Request") {
    super(message, 400);
  }
}

class UnAuthorized extends CustomError {
  constructor(message = "Invalid Email or password") {
    super(message, 401);
  }
}

class Forbidden extends CustomError {
  constructor(message = "You don't have permission to do this") {
    super(message, 403);
  }
}

class NotFound extends CustomError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class Conflict extends CustomError {
  constructor(message = "Resource already exists") {
    super(message, 409);
  }
}

class RateError extends CustomError {
  constructor(message = "Too many requests, try again later") {
    super(message, 429);
  }
}

module.exports = {
  CustomError,
  BadRequest,
  UnAuthorized,
  Forbidden,
  NotFound,
  Conflict,
  RateError,
};
