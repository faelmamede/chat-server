const { exec }  = require('child_process')

const { server } = require('../models/Server');
const { userInstance } = require('../models/User');

const login = ({ nickname, port }) => {
    return new Promise((resolve, reject) => {
        exec(`docker run --name ${nickname}-${port} -d -p ${port}:80 nginx`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return reject(error);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            console.log(`<CONTAINER CREATED> ID: ${stdout}`);
            server.incrementConnectedPorts();
            userInstance({ nickname: nickname, port: port });
            const response = `${server.getEndpoint()}:${port}`;
            return resolve(response);
        });
    })
}

exports.login = login;