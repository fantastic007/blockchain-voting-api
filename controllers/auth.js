const axios = require('axios');

exports.registerUser = async (req, res, next) => {
    const headers = {
        authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTAyNjIwNzQsInVzZXJuYW1lIjoic2h1aGFuIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE1NTAyMjYwNzR9.6BlmA0-98fZY3ZJrhaC2D075CbnDcvSQULwO5bYPJv0',
        'Content-Type': 'application/json'
    };

    const bodyData = {
        peers: ['peer0.org1.example.com', 'peer0.org2.example.com'],
        fcn: 'createUser',
        args: ['8978', 'jenaai', 'jeni1234']
    };

    try {
        const transactionId = await axios.post(
            'http://103.84.159.230:6000/channels/mychannel/chaincodes/mycc',
            bodyData,
            { headers }
        );
        res.send(transactionId.data);
    } catch (e) {
        res.status(404).send(e);
    }
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
