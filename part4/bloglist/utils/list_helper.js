/* eslint-disable no-unused-vars */
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

module.exports = {
    dummy,
    totalLikes
}