export default function login(req, res) {
    const { username } = req.body;
    if (username === 'admin') {
        res.status(200)
    }else{
        res.status(401)
    }
}

//0783