const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => {
    return prev.likes > current.likes
      ? prev
      : current
  }

  const blog = blogs.reduce(reducer, {likes: -1})

  return blog.likes !== -1 ? blog : undefined
}

const mostBlogs = (blogs) => {
  const writers = _.countBy(blogs, 'author')
  let mostBlogs = {author: '', blogs: 0}
  for (let writer in writers) {

    mostBlogs = mostBlogs.blogs < writers[writer] ? {author: writer, blogs: writers[writer]} : mostBlogs
  }
  return mostBlogs
}

const mostLikes = (blogs) => {
  const group = _.groupBy(blogs, 'author')
  let mostLikes = {author: '', likes: -1}
  const reducer = (acc, curr) => acc + curr.likes
  for (let writer in group) {
    const likes = group[writer].reduce(reducer, 0)
    mostLikes = mostLikes.likes < likes ? {author: writer, likes: likes} : mostLikes
  }
  
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}