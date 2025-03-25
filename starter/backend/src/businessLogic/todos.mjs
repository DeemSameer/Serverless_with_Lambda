import { createItemDB } from '../dataLayer/todosAccess.mjs'
import { getItemDB } from '../dataLayer/todosAccess.mjs'
import { deleteItemDB } from '../dataLayer/todosAccess.mjs'
import { getItems } from '../dataLayer/todosAccess.mjs'
import { updateItemDB } from '../dataLayer/todosAccess.mjs'
import { getItemById } from '../dataLayer/todosAccess.mjs'
import { v4 as uuidv4 } from 'uuid'; // or import uuid from 'uuid';


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
  return await createItemDB(newItem);
}

export async function deleteItem(id, userId) {
  //check if item exisits 
  const item = await getItemDB(id);
  //authorize user 
  if (item.userId === userId) {
    if (item)
      //delete item
      await deleteItemDB(id);
  } else
    console.log('Un-authorized access.');

}

export async function getUserItems(userId) {
  return await getItems(userId);
}



export async function idExists(todoId) {
  const result = await getItemById(todoId);

  console.log('Get todo: ', result);
  // return !!result.Item
  return !!result?.Item;
}

export async function updateItem(todoItem, todoId, userId) {
    const item = await getItemDB(todoId);
    if (!item) {
      console.log('Item not found.');
    }
    if (item.userId !== userId) {
      console.log('Unauthorized access.');
    }
    await updateItemDB(todoItem, todoId);
 
}
