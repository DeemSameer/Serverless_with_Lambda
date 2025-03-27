//return all TODOs for a current user. A user id can be extracted from a JWT token that is sent by the frontend.
import { getUserItems } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'
import {createLogger } from '../../utils/logger.mjs'

const logger = createLogger('httpLayer')

export async function handler(event) {
  // TODO: Get all TODO items for a current user
  logger.info("getTodo"); 
  console.log("getTodo");
  const userId = getUserId(event)
  console.log("userId: "+userId);
if(userId){
  const result = await getUserItems(userId); 
  console.log("result"+result);
  const items = result.Items;
  console.log("items"+items);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ items }),
    };
  } else {
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ message: 'Invalid or missing token' }),
    };
  
  }
}

// export const handler = middy()
//   .use(httpErrorHandler())
//   .use(
//     cors({
//       credentials: true
//     })
//   )
//   .handler(async (event) => {
//     // TODO: Get all TODO items for a current user
//     console.log("getTodo");

//   const userId = await getUserId(event)
//   console.log(userId);
// if(userId){
//   const result = await getUserItems(userId); 
//   const items = result.Items;
//   console.log(result);
//   console.log(items);

//     return {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true
//       },
//       body: JSON.stringify({ items }),
//     };
//   } else {
//     return {
//       statusCode: 401,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true
//       },
//       body: JSON.stringify({ message: 'Invalid or missing token' }),
//     };
  
//   }
//   })