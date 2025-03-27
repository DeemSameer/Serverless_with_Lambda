import { createItem } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'
import {createLogger } from '../../utils/logger.mjs'


export async function handler(event) {
  const newTodo = JSON.parse(event.body)
  console.log('Processing event: ', event)
  const userId = getUserId(event)
const logger = createLogger('http'); 
  const todo = await createItem(newTodo, userId);
  logger.info('newItem item', {
    todo
  });
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      "item":{
      "todoId":todo.todoId,
      "userId":todo.userId,
      "attachmentUrl":null,
      "dueDate":todo.dueDate,
      "createdAt":todo.createdAt,
      "name":todo.name,
      "done":todo.done
      }
      
    })
  }
}

