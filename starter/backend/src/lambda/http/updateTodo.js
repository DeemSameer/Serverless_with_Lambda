/*

It should update a TODO item created by a current user. The shape of data send by a client application to this function can be found in the /backend/src/requests/UpdateTodoRequest.js file. It receives an object that contains three fields that can be updated in a TODO item:
{
    "name": "Buy bread",
    "dueDate": "2022-12-12",
    "done": true
}
The ID of an item that should be updated is passed as a URL parameter. It should return an empty body.

*/
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)
  
  const validId = await idExists(todoId)


  if (!validId) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Group does not exist'
      })
    }
  }

  const todo = await updateTodo(todoId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: todo
    })
  }

}

async function idExists(todoId) {
  const result = await dynamoDbDocument.get({
    TableName: groupsTable,//TODO  
    Key: {
      id: todoId
    }
  })

  console.log('Get group: ', result)
  return !!result.Item
}

async function updateTodo(todoId) {
  const result = await dynamoDbDocument.query({
    TableName: imagesTable,//TODO change 
    KeyConditionExpression: 'todoId = :todoId',
    ExpressionAttributeValues: {
      ':todoId': todoId
    },
    ScanIndexForward: false
  })

  return result.Items
}