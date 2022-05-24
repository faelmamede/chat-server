const { exec }  = require('child_process')

const { server } = require('../models/Server');
const { userInstance } = require('../models/User');

const login = ({ nickname, port }) => {
    return new Promise((resolve, reject) => {
        exec("docker run " +
            `--name ${nickname} -d -p ${port}:${port} `+
            `--env REACT_APP_NICKNAME=${nickname} --env PORT=${port} --env REACT_APP_SERVER_ENDPOINT=http://localhost:3000 --env REACT_APP_REFRESH_TIME=5000 ` +
            "192.168.100.10:5000/chat",
        (error, stdout, stderr) => {
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