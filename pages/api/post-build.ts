import type { NextApiHandler } from 'next'
import { getPage } from '../../data/contentful'
import { pushToTwitter } from '../../data/twitter/push-to-twitter'

const handler: NextApiHandler = async (req, res) => {
    const authToken = req.headers['authorization']?.split(' ')[1]?.trim()
    if (!authToken || authToken !== process.env.POST_BUILD_API_KEY) {
        res.status(401).end()
        return
    }

    const entries = await getPage()
    await pushToTwitter(entries)

    res.json({ entries })
}

export default handler
