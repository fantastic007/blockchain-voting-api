exports.registerUser = (req, res, next) => {
    console.log(req.body);
    const response = {
        status: 'OK',
        result: [{
            reply: true,
            nid: '10111'
        }]
    };
    res.send(response);
};