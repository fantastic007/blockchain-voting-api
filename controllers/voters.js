const axios = require('axios');

const blockchainAuthToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTAyNzU1NjMsInVzZXJuYW1lIjoic2h1aGFuIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE1NTAyMzk1NjN9.b_kD8_Y68tl47pswrKitmzRSKoymJ558u1bz0q3Uj18';
const endpoint = 'http://103.84.159.230:6000/channels/mychannel/chaincodes/mycc';

const parseNominations = (data) => {
    let list = {};
    data.forEach((item) => {
        list = {
            ...list,
            [item.Record.position]: [
                ...list[item.Record.position] || [],
                item.Record.idto,
            ],
        }
    });

    // remove duplicates
    for (let key in list) {
        list[key] = Array.from(new Set(list[key]));
    }
    return list;
}

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
        const response = await axios.get(endpoint, config);
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

exports.getNominations = async (req, res, next) => {
    const params = {
        peer: 'peer0.org1.example.com',
        fcn: 'getNominationList',
        args: `["0"]`
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
        const response = await axios.get(endpoint, config);
        const data = JSON.parse(response.data.split('=>')[1]);
        const list = parseNominations(data);
        res.send({
            data: list
        });
    } catch (e) {
        console.log(e);
        res.status(404).send('error');
    }  
};

exports.getUser = async (req, res, next) => {
    const { nid } = req.query;
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
        const response = await axios.get(endpoint, config);
        const data = JSON.parse(response.data.split('=>')[1]);
        console.log(data);
        
        return res.send({
            id: data.id,
            username: data.name,
            message: 'Success',
        });
        
    } catch (e) {
        console.log('error in login', e);
        return res.status(404).send({
            reply: false,
            message: 'User not found'
        });
    }
};

// handles both nomination and voting
exports.nominate = async (req, res, next) => {
    const { from , to , pos, type } = req.body;
    const bodyData = {
        peers: ['peer0.org1.example.com', 'peer0.org2.example.com'],
        fcn: 'nominate',
        args: [`"${from}"`, `"${to}"`, `"${pos}"`, `"${type}"`] // 0 -> nominate
    };

    const headers = {
        'Content-Type': 'application/json',
        authorization: blockchainAuthToken
    };

    try {
        const response = await axios.post(endpoint, bodyData, { headers });
        console.log(response.data);
        res.send({
            message: 'Success',
            id: response.data
        });
    } catch (e) {
        console.log(e);
        res.status(404).send('error');
    }
};