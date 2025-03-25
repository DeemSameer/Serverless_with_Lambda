import { createItem } from '../../businessLogic/todos.mjs'


export async function handler(event) {
  const newTodo = JSON.parse(event.body)
  console.log('Processing event: ', event)

  const newItem = await createItem(newTodo);

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

