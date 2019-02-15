exports.registerUser = (req, res, next) => {
    console.log(req.body);
    const response = {
        status: 'Registration Successful',
        reply: true,
        nid: req.body.nid
    };
    res.send(response);
};

exports.loginUser = (req, res, next) => {
    console.log(req.body);
    const { nid, password } = req.body;
    const response = {};
    if (nid === '1234' && password === 'abcdefg') {
        response.reply = true;
        response.message = 'User Authenticated';
        res.send(response);
    } else {
        response.reply = false;
        response.message = 'Authentication failed';
        res.status(400).send(response);
    }  
};

