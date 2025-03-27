import { parseUserId } from '../auth/utils.mjs'
// import jwt from 'jsonwebtoken';

// const jwt = require('jsonwebtoken');

export function getUserId(event) {
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  return parseUserId(jwtToken)
}
