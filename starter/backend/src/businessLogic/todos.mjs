import { createItemDB } from '../dataLayer/todosAccess.mjs'
import { getItemDB } from '../dataLayer/todosAccess.mjs'
import { deleteItemDB } from '../dataLayer/todosAccess.mjs'
import { getItems } from '../dataLayer/todosAccess.mjs'
import { updateItemDB } from '../dataLayer/todosAccess.mjs'
import { getItemById } from '../dataLayer/todosAccess.mjs'


    export async function createItem(newTodo, userId){
        //attache it to user id + add today date and done = false 
        const itemId = uuidv4()
        newTodo.done=false 
        newTodo.createdAt = new Date().toISOString()
        newTodo.userId = userId
        newTodo.attachmentUrl = '' 

         const newItem = {
           id: itemId,
           ...newTodo
         }
   
         return await createItemDB(newItem);
   }

   export async function  deleteItem(id, userId){
    //check if item exisits 
    const item = await getItemDB(id);
    //authorize user 
    if(item.userId === userId){
      if(item)
        //delete item
            await deleteItemDB(id)
    }else 
      console.log('Un-authorized access.')
    
   }

   export async function  getUserItems(userId){
        return await getItems(userId);
   }

   
  
  export async function  idExists(todoId) {
    const result = await getItemById(todoId)
  
    console.log('Get todo: ', result)
    return !!result.Item
  }
  
  export async function  updateItem(todoItem, todoId, userId) {

    //check if item exisits 
    const item = await getItemDB(todoId);
    //authorize user 
    if(item.userId === userId){
      if(item)
        //delete item
            await updateItemDB(todoItem)
    }else 
      console.log('Un-authorized access.')
  }
