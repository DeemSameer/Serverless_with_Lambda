import { updateItem } from '../../businessLogic/todos.mjs'
import { idExists } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'


export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)
  const userId = getUserId(event)
  
  const validId = await idExists(todoId)


  if (!validId) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
        ,'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        error: 'todo id does not exist'
      })
    }
  }

  const todo = await updateItem(updatedTodo, todoId,userId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: todo
    })
  }

}


