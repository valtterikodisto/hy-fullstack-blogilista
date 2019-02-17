const jwt = require('jsonwebtoken')

const setToken = (request, response, next) => {
  const authorization = request.get('authorization')
  console.log(authorization)
  request.token = authorization && authorization.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  setToken,
  unknownEndpoint,
  errorHandler
}