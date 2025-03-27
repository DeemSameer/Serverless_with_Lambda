import { createItemDB, getItemDB, deleteItemDB, getItems, updateItemDB, addImageDB } from '../dataLayer/todosAccess.mjs'
import { v4 as uuidv4 } from 'uuid'; // or import uuid from 'uuid';
import {createLogger } from '../utils/logger.mjs'

const logger = createLogger('todos'); 


export async function createItem(newTodo, userId) {
  const itemId = uuidv4();
  const todo = {
    todoId: itemId,
    ...newTodo,
    done: false,
    createdAt: new Date().toISOString(),
    userId: userId,
    attachmentUrl: '',
  };
  logger.info('Adding todo item', {
    todo
  });
  return await createItemDB(todo);
}

export async function deleteItem(todoId, userId) {
  //check if item exisits 
  const item = await getItemDB(todoId, userId);
  //authorize user 
  // if (item.userId === userId) {
    if (item)
      //delete item
      await deleteItemDB(todoId, userId);
     
  // } else
  // logger.warn('Un-authorized access.');
}

export async function getUserItems(userId) {
  return await getItems(userId);
}


export async function updateItem(todoItem, todoId, userId) {
    const item = await getItemDB(todoId, userId);
    if (!item) {
      logger.warn('Item not found.');
    }
    // if (item.userId !== userId) {
    //   logger.warn('Unauthorized access.');
    // }
    await updateItemDB(todoItem, todoId, userId);
 
}


export async function setPreSignedUrl(userId, todoId, url){
  await addImageDB(userId, todoId,url);
 
}