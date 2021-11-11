import type { NextApiHandler } from 'next'
import { getDB } from './db'

const collectionName = 'newsletter'

const handler: NextApiHandler = async (req, res) => {
    if (/^localhost/gi.test(req.headers.host || '')) {
        res.status(200).send('k thx')
        return
    }

    if (typeof req?.body !== 'string') {
        res.status(400).json({ error: 'missing or invalid email' })
        return
    }

    const db = await getDB()
    const coll = db.collection(collectionName)
    const alreadyExists = await coll
        .findOne({ email: req.body })
        .then((val) => !!val)
        .catch((error) => {
            console.error(error)
            return false
        })

    if (!alreadyExists) {
        coll.insertOne({
            at: new Date(),
            host: req.headers.host ?? 'unknown',
            ua: req.headers['user-agent'] ?? 'unknown',
            email: req.body,
        }).catch((error) => console.error(error))
    }

    res.status(200).send('oh thanks mark')
}

export default handler
