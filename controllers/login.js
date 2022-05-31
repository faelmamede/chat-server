const { exec }  = require('child_process')

const { server } = require('../models/Server');
const { userInstance } = require('../models/User');

const login = ({ nickname, port }) => {
    return new Promise((resolve, reject) => {
        exec("docker service create " +
            `--name ${nickname} --publish ${port}:${port} `+
            `--env REACT_APP_NICKNAME=${nickname} --env PORT=${port} --env REACT_APP_SERVER_ENDPOINT=http://192.168.100.10:3000 --env REACT_APP_REFRESH_TIME=5000 ` +
            "192.168.100.10:5000/chat:latest",
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
            const response = `http://${server.getEndpoint()}:${port}`;
            return resolve(response);
        });
    })
}

exports.login = login;