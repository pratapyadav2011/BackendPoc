// This file contains all the errors that might occur in the application at any point
const createHttpError = require("http-errors");
const CONFLICT_ERROR = (msg) => {
  return createHttpError.Conflict({ statusCode: 409, error: msg });
};

const UNAUTHORIZED_ERROR = (msg) => {
  return createHttpError.Unauthorized({ statusCode: 401, error: msg });
};

const NOT_FOUND_ERROR = (msg) => {
  return createHttpError.NotFound({ statusCode: 404, error: msg });
};

const ErrorMessage = {
  API_NOT_FOUND: "API not found",
  INVALID_CREDENTIALS: "Invalid Credentials",
  JSON_TOKEN_ERROR: "JsonWebTokenError",
  UNAUTHORIZED_ERROR: "unauthorized",
  USER_DOES_NOT_EXISTS: "user does not exists",
};

module.exports = {
  ErrorMessage,
  CONFLICT_ERROR,
  UNAUTHORIZED_ERROR,
  NOT_FOUND_ERROR,
};

/* ERROR STATUS
Code    Error Message

400    BadRequest
401    Unauthorized
402    PaymentRequired
403    Forbidden
404    NotFound
405    MethodNotAllowed
406    NotAcceptable
407    ProxyAuthenticationRequired
408    RequestTimeout
409    Conflict
410    Gone
411    LengthRequired
412    PreconditionFailed
413    PayloadTooLarge
414    URITooLong
415    UnsupportedMediaType
416    RangeNotSatisfiable
417    ExpectationFailed
418    ImATeapot
421    MisdirectedRequest
422    UnprocessableEntity
423    Locked
424    FailedDependency
425    UnorderedCollection
426    UpgradeRequired
428    PreconditionRequired
429    TooManyRequests
431    RequestHeaderFieldsTooLarge
451    UnavailableForLegalReasons
500    InternalServerError
501    NotImplemented
502    BadGateway
503    ServiceUnavailable
504    GatewayTimeout
505    HTTPVersionNotSupported
506    VariantAlsoNegotiates
507    InsufficientStorage
508    LoopDetected
509    BandwidthLimitExceeded
510    NotExtended
511    NetworkAuthenticationRequired
*/
