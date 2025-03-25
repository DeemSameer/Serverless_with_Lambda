//return all TODOs for a current user. A user id can be extracted from a JWT token that is sent by the frontend.
import { getUserItems } from '../../businessLogic/todos.mjs'
import { validateToken } from '../../businessLogic/todos.mjs'

export async function handler(event) {
  // TODO: Get all TODO items for a current user
  // const userId = extractUserId(event);
  const authorization = event.headers.Authorization
  const userId = await validateToken(authorization)

if(userId){
  const result = await getUserItems(userId); 
  const items = result.Items;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ items }),
    };
  } else {
    return {
      statusCode: 401, // Unauthorized
      body: JSON.stringify({ message: 'Invalid or missing token' }),
    };
  
  }
}



///////2
// export function getUserId(authorizationHeader) {

//   const split = authorizationHeader.split(' ')
//   const jwtToken = split[1]

//   const decodedJwt = jsonwebtoken.decode(jwtToken)
//   return decodedJwt.sub
// }


// export async function handler(event) {
//   console.log('Processing event: ', event)
//   // const itemId = uuidv4()

//   const parsedBody = JSON.parse(event.body)

//   // Extracting user ID using "getUserId"
//   const authorization = event.headers.Authorization
//   await 
// }