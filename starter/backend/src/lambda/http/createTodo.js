import { createItem } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'


export async function handler(event) {
  const newTodo = JSON.parse(event.body)
  console.log('Processing event: ', event)
  const userId = getUserId(event)

  const newItem = await createItem(newTodo, userId);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      newItem
    })
  }
}

