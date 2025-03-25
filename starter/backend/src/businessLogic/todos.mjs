import { createItemDB } from '../dataLayer/todosAccess.mjs'



export class TodosLogic{

    async createItem(newTodo){
        const itemId = uuidv4()
       
         const newItem = {
           id: itemId,
           ...newTodo
         }
   
         return await createItemDB(newItem);
   }

}


