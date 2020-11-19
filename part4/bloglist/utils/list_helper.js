/* eslint-disable no-unused-vars */
const _ = require('lodash')
// dummy test case
const dummy = (blogs) => {
    return 1
}

// total likes test case
const totalLikes = (blogs) => {
    const reducer = (sum, { likes } ) => {
        return sum + likes
    }
    return blogs.reduce(reducer, 0)
}

// favorite blog test case
const favoriteBlog = (blogs) => {
    const reducer = (blogA, blogB) => {
        return blogA.likes > blogB.likes
            ? { title: blogA.title, author: blogA.author, likes: blogA.likes }
            : { title: blogB.title, author: blogB.author, likes: blogB.likes }
    }
    return blogs.reduce(reducer, 0)
}

// most blog for author who has the largest amount of blogs
const mostBlog = (blogs) => {
    const authorBlog = _.chain(_.countBy(blogs, 'author'))
        .toPairs()
        .maxBy(_.last)
        .value()
    return { author: authorBlog[0], blogs: authorBlog[1] }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog
}