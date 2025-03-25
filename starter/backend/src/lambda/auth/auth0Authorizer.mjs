import Axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('auth')

const jwksUrl = 'https://test-endpoint.auth0.com/.well-known/jwks.json'

export async function handler(event) {
  try {
    const jwtToken = await verifyToken(event.authorizationToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

  // TODO: Implement token verification
async function verifyToken(authHeader) {
  try{
    const token = getToken(authHeader)
    const jwt = jsonwebtoken.decode(token, { complete: true })
    const certificate = 'MIIDHTCCAgWgAwIBAgIJUS4SR3RY053GMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNVBAMTIWRldi1seGZyc2xxczV5d3VjaGZvLnVzLmF1dGgwLmNvbTAeFw0yNTAzMTgwODQ4NDBaFw0zODExMjUwODQ4NDBaMCwxKjAoBgNVBAMTIWRldi1seGZyc2xxczV5d3VjaGZvLnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK1kqYLn3I2HGEQJ7Byt6VQ5/nFCbGrfNMGeUJSUk0ycO6QJyfAnU8M5iuaLibBqzkNRWpxtJ1XRtUtk0j8Zjt08NH6e5sfMsfuza+Bvq5OqoD2Sv96SvVRTbg5RSR1PKQSr6/LMHs+ocpPf7rtbLnGSPqsjxP6nfDNZggoTNp/EeUhGUAdz3j27sgWHTigX9eSjQHUFSaQ3iM++nQspWeiq4EjqSlTrFOXe8ewVd+B8NqMIoiJRZDql47HxhdzD1D/y1DH2/j8FT68Audes+FEIkxdz6RN1SLwK9CI860NcVpb48uc+Nqg2ZQo1qznQhd97TvoKEtUMB0bc/6RQH0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUpbIh5ovUHbK93IbSs6DRyTBuFwwwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQAy8CNqmR2whlatBJToVHPVgmMvBB3zxgQjP+VjETN+yl9T3wrdTur83FYRSYlsLcghCXD8flhPU2ipgeMdivC79gFTSOyxJCCWGO05pNejn4YQ/eninWQf84nUrs/d6gFGn56PqAWQy1DQccMzCyaNeoe0l2v7lqgXmvbAmFzg1ExRjfQ11lOcaUIXPbciN2ozWjHAhg0C/NYafiO4Vp4Qef8XLP/fhBht6rRpwEaAZkET7yj+PtVEfGvutTqjsHysi735PTCvZxj51VwsJMiR36PnfzAcQUXCrA4d1OeRAGFVRLzE+SuuHa8sftd+I/0J/RRcC3s2qWOtTOSj0jNq'
    return jsonwebotoken.verify(jwt, certificate, { algorithms: ['RS256'] })
  }catch{
    logger.error('Token verification error', { error: error.message });
    return null;
  }
}

function getToken(authHeader) {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
