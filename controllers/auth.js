const axios = require('axios');

const blockchainAuthToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTAyNzU1NjMsInVzZXJuYW1lIjoic2h1aGFuIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE1NTAyMzk1NjN9.b_kD8_Y68tl47pswrKitmzRSKoymJ558u1bz0q3Uj18';
const endpoint = 'http://103.84.159.230:6000/channels/mychannel/chaincodes/mycc';

exports.registerUser = async (req, res, next) => {
    const headers = {
        authorization: blockchainAuthToken,
        'Content-Type': 'application/json'
    };

    const { nid, username, password } = req.body;
    console.log(nid, username, password);

    const bodyData = {
        peers: ['peer0.org1.example.com', 'peer0.org2.example.com'],
        fcn: 'createUser',
        args: [nid, username, password]
    };

    try {
        const data = await axios.post(
            endpoint,
            bodyData,
            { headers }
        );
        console.log(data.data);
        
        return res.send({
            reply: true,
            transactionId: data.data
        });
    } catch (e) {
        console.log('error occured', e);
        return res.status(404).send({
            reply: false,
            error: e
        });
    }
};

exports.loginUser = async (req, res, next) => {
    const { nid, password } = req.query;
    const params = {
        peer: 'peer0.org1.example.com',
        fcn: 'queryUser',
        args: `["USER${nid}"]`
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: blockchainAuthToken
    }

    const config = {
        headers,
        params
    }

    try {
        console.log('executing query');
        const response = await axios.get(endpoint, config);
        const data = JSON.parse(response.data.split('=>')[1]);
        console.log(data);
        
        if (password === data.password) {
            return res.send({
                reply: true,
                id: data.id,
                username: data.name,
                message: 'User Authenticated',
            });
        } else {
            return res.status(404).send({
                reply: false,
                message: 'Username or password doesn\'t match'
            })
        }
        
    } catch (e) {
        console.log('error in login', e);
        return res.status(404).send({
            reply: false,
            message: 'User not found'
        });
    }
};
