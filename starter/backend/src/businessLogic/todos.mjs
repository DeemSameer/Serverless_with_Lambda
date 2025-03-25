import { createItemDB } from '../dataLayer/todosAccess.mjs'
import { getItemDB } from '../dataLayer/todosAccess.mjs'
import { deleteItemDB } from '../dataLayer/todosAccess.mjs'
import { getItems } from '../dataLayer/todosAccess.mjs'
import { updateItemDB } from '../dataLayer/todosAccess.mjs'

// const jwt = require('jsonwebtoken');


export class TodosLogic{
    jwt = require('jsonwebtoken');
    

    async createItem(newTodo){
        //attache it to user id + add today date and done = false 
        const itemId = uuidv4()
       
         const newItem = {
           id: itemId,
           ...newTodo
         }
   
         return await createItemDB(newItem);
   }

   async deleteItem(id){
    //check if item exisits 
    const item = await getItemDB(id);
    if(item)
    //delete item
        await deleteItemDB(id)
   }

   async getUserItems(userId){
        return await getItems(userId);
   }

   
  
  async idExists(todoId) {
    const result = await dynamoDbDocument.get({
      TableName: groupsTable,//TODO  
      Key: {
        id: todoId
      }
    })
  
    console.log('Get group: ', result)
    return !!result.Item
  }
  
  async updateItem(todoItem) {
    //done=true and date change?
    return await updateItemDB(todoItem);
  }

  validateToken(authorizationHeader){
    const split = authorizationHeader.split(' ')
    const jwtToken = split[1]
  
    const decodedJwt = jsonwebtoken.decode(jwtToken)
    return decodedJwt.sub
  }

}

