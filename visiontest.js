const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: './env.json'
});

client
    .labelDetection('./images/cereal.jpg')
    .then(results => {
        const labels = results[0].labelAnnotations;

        console.log('Labels:');
        labels.forEach(label => console.log(label));
    })
    .catch(err => {
        console.error('ERROR:', err);
    });

client
    .textDetection('./images/cereal.jpg')
    .then(result => {
        const detections = result[0].textAnnotations;
        console.log('Text:');
        detections.forEach(text => console.log(text));
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
    
app.listen(5000, '127.0.0.1', () => console.log('Server running'));