export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { password } = req.body || {};
    const hubPassword = process.env.HUB_PASSWORD;

    if (!hubPassword) {
        return res.status(500).json({ error: 'Server misconfigured' });
    }

    if (password === hubPassword) {
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json({ ok: true });
    }

    return res.status(401).json({ ok: false });
}
