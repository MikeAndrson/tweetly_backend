const mongoose = require('mongoose');
const tweet_images = require('../config/tweet_images');

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        if (!(id)) {
            return res.status(400).send("All input is required");
        }

        // open pfp image stream
        const readStream = tweet_images.openDownloadStream(mongoose.Types.ObjectId(id));
        var didFail = false;

        readStream.on('error', (err) => {
            console.log(err);
            res.status(400).send("Couldn't get image");
            didFail = true;
        });

        // if it succeeded, pipe the stream to response
        if (!didFail) {
            readStream.pipe(res);
        }

    } catch (err) {
        console.log(err);
        res.status(400).send("Couldn't get image");
    }
};