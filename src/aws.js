const fs = require('fs');
const AWS = require("aws-sdk");

const credentials = new AWS.SharedIniFileCredentials({profile: 'lalala'});
AWS.config.credentials = credentials;

const s3 = new AWS.S3();

const upload = (basePath, fileName) => {
    const fileContent = fs.readFileSync(basePath + fileName);

    const options = {
        Bucket: 'demo-nodejs',
        Key: fileName,
        Body: fileContent,
    };

    s3.putObject(options, (err, res) => {
        if(err) throw err;
        console.log('File uploaded successfully.');
        console.log(res);
    });
}

const listFiles = () => {
    const options = {
        Bucket: 'nodejs-poc',
    };

    s3.listObjects(options, (err, data) => {
        if(err) throw err;
        console.log('Files:');
        console.log(data);
    });
};

module.exports = {
    upload,
    listFiles
}
