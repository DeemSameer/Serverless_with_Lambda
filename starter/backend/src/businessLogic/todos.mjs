import { createItemDB, getItemDB, deleteItemDB, getItems, updateItemDB } from '../dataLayer/todosAccess.mjs'
import { v4 as uuidv4 } from 'uuid'; // or import uuid from 'uuid';

const logger = createLogger('todos'); 


export async function createItem(newTodo, userId) {
  const itemId = uuidv4();
  const newItem = {
    id: itemId,
    ...newTodo,
    done: false,
    createdAt: new Date().toISOString(),
    userId: userId,
    attachmentUrl: '',
  };
  logger.info('Adding todo item', {
    newItem
  });
  return await createItemDB(newItem);
}

export async function deleteItem(todoId, userId) {
  //check if item exisits 
  const item = await getItemDB(todoId, userId);
  //authorize user 
  if (item.userId === userId) {
    if (item)
      //delete item
      await deleteItemDB(todoId, userId);
      logger.info('delete item with id: '+id);
  } else
  logger.warn('Un-authorized access.');
}

export async function getUserItems(userId) {
  return await getItems(userId);
}


export async function updateItem(todoItem, todoId, userId) {
    const item = await getItemDB(todoId, userId);
    if (!item) {
      logger.warn('Item not found.');
    }
    if (item.userId !== userId) {
      logger.warn('Unauthorized access.');
    }
    await updateItemDB(todoItem, todoId, userId);
 
}
