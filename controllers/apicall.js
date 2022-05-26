import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '9c4a4d2617b2445f9040903065599f8c'
});
const makeApiCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json("unable to reach the api"))
}
export  default makeApiCall;