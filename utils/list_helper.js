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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}