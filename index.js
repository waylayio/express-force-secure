'use strict'

var httpError = require('http-errors')

/**
 * req.secure does not work for proxies, they will include the x-forwarded-proto
 * header with the original protocol.
 *
 * Enable proxy trust to make this work as intended.
 *
 * app.enable('trust proxy');
 *
 * Do NOT check for the x-forwarded-proto header manually without setting proxy trust,
 * the headers are easy to spoof!
 *
 */
function secure (req, res, next) {
  if (!req.secure) return next(httpError(426))
  return next()
}

module.exports = function (options) {
  return secure
}
