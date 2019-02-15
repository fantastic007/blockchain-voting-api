const axios = require('axios');

const blockchainAuthToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTAyNzEwMTcsInVzZXJuYW1lIjoic2h1aGFuIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE1NTAyMzUwMTd9.8TKKPgIFV_akPhQhKAUipBYyKByG69VXmX5EfTCCeJ8';

exports.getAllVoters = async (req, res, next) => {
    const params = {
        peer: 'peer0.org1.example.com',
        fcn: 'queryAllUsers',
        args: `[""]`
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: blockchainAuthToken
    };

    const config = {
        headers,
        params
    };

    try {
        const response = await axios.get('http://103.84.159.230:6000/channels/mychannel/chaincodes/mycc', config);
        const data = JSON.parse(response.data.split('=>')[1]);
        console.log(data);
        res.send({
            data
        });
    } catch (e) {
        res.status(404).send({
            message: 'Error occured'
        })
    }
    
}