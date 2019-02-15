const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
  Blog
  .find({})
  .then(blogs => {
    response.json(blogs.map(blog => blog.toJSON()))
  })
  .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  if (!blog.likes) blog.likes = 0

  blog
    .save()
    .then(savedBlog => {
      response.status(201).json(savedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter