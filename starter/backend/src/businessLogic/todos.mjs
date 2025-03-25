import { createItemDB } from '../dataLayer/todosAccess.mjs'
import { getItemDB } from '../dataLayer/todosAccess.mjs'
import { deleteItemDB } from '../dataLayer/todosAccess.mjs'
import { getItems } from '../dataLayer/todosAccess.mjs'
import { updateItemDB } from '../dataLayer/todosAccess.mjs'

const jwt = require('jsonwebtoken');


// export class TodosLogic{
    // jwt = require('jsonwebtoken');
    

    export async function createItem(newTodo){
        //attache it to user id + add today date and done = false 
        const itemId = uuidv4()
       
         const newItem = {
           id: itemId,
           ...newTodo
         }
   
         return await createItemDB(newItem);
   }

   export async function  deleteItem(id){
    //check if item exisits 
    const item = await getItemDB(id);
    if(item)
    //delete item
        await deleteItemDB(id)
   }

   export async function  getUserItems(userId){
        return await getItems(userId);
   }

   
  
  export async function  idExists(todoId) {
    const result = await dynamoDbDocument.get({
      TableName: groupsTable,//TODO  
      Key: {
        id: todoId
      }
    })
  
    console.log('Get group: ', result)
    return !!result.Item
  }
  
  export async function  updateItem(todoItem, todoId, userId) {
    //userId for unauthrized access 
    //done=true and date change?
    return await updateItemDB(todoItem);
  }

  export function validateToken(authorizationHeader){
    const split = authorizationHeader.split(' ')
    const jwtToken = split[1]
  
    const decodedJwt = jsonwebtoken.decode(jwtToken)
    return decodedJwt.sub
  }

// }

