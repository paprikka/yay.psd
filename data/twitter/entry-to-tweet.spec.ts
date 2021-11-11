import { entryToTweet } from './entry-to-tweet'
it('should return status update text based on an entry', () => {
    expect(
        entryToTweet({
            description: 'description goes here',
            title: 'title goes here',
            id: 'POST_ID',
        })
    ).toMatchInlineSnapshot(`
"title goes here

description goes here

https://potato.horse/p/POST_ID"
`)
})

it('should truncate description if the tweet is too long', () => {
    const result = entryToTweet({
        description:
            'description goes here really really really really really really really really really really really really really really really really really really really really longreally really really really really really really really really really really really really really really really really really really really long',
        title: 'title goes here',
        id: 'POST_ID',
    })
    expect(result).toMatchInlineSnapshot(`
"title goes here

description goes here really really really really really really really really really really really really really really really really really really really really longreally really really really really really really really r[...]

https://potato.horse/p/POST_ID"
`)

    expect(result.length < 280).toBe(true)
})

it('should return posts without descriptions', () => {
    expect(
        entryToTweet({
            description: null,
            id: 'POST_ID',
            title: 'Post title',
        })
    ).toMatchInlineSnapshot(`
"Post title

https://potato.horse/p/POST_ID"
`)
})

it('should truncate tweets if I went mad and added an essay in the title', () => {
    const result = entryToTweet({
        description: null,
        title: Array(1000).fill('a').join('') + '!',
        id: 'POST_ID',
    })
    expect(result).toMatchInlineSnapshot(`
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa[...]

https://potato.horse/p/POST_ID"
`)
    expect(result.length < 280).toBe(true)
})
