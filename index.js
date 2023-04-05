const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();

app.use(express.json());

const authToken = process.env.AUTH_TOKEN

const configuration = new Configuration({
    apiKey: authToken,
});
const openai = new OpenAIApi(configuration);

const PORT = 3000;

const html = `<!DOCTYPE html>
            <html>
            <head>
                <title></title>
            </head>
            <body>
                <script>
                    #replaceScript
                </script>
            </body>
            </html>`

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// Following utilizes openai package
app.post('/getImageWithPackage', async (req, res) => {
    const parameters = {
        "model": "text-davinci-003",
        "prompt": req.body.data,
        "temperature": 0,
        "max_tokens": 1024,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
    }

    const completion = await openai.createCompletion(parameters);
    const result = completion.data.choices[0].text;
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    //Replacing for easy check in browser
    const responseHTML = html.replace('#replaceScript', result)
    res.send(responseHTML);

});

// Following utilizes https://api.openai.com/v1/completions API
app.post('/getImageWithAPI', async (req, res) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
    }

    const data = {
        model: 'text-davinci-003',
        max_tokens: 4000,
        temperature: 0,
        prompt: req.body.data
    }

    axios.post('https://api.openai.com/v1/completions', data, {
        headers: headers
    }).then((response) => {
        if (response.status === 200) {
            const responseText = response.data.choices[0].text;
            const result = responseText.replace(/\n/g, "\n");

            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;

            //Replacing for easy check in browser
            const responseHTML = html.replace('#replaceScript', result)
            res.send(responseHTML);
        }

    }).catch((error) => {
        res.status(error.response.status).send('Error');
    });

});


// Following utilizes https://api.openai.com/v1/chat/completions API
app.post('/getImageWithChatAPI', async (req, res) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
    }

    const data = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: req.body.data }],
        temperature: 0,
    }

    axios.post('https://api.openai.com/v1/chat/completions', data, {
        headers: headers
    }).then((response) => {
        if (response.status === 200) {
            const responseText = response.data.choices[0].message.content;
            let result = '';

            //Extract code
            const regex = /```([\s\S]*?)```/g;
            let match;

            while ((match = regex.exec(responseText)) !== null) {
                result += match[1];
            }

            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;

            //Replacing for easy check in browser
            const responseHTML = html.replace('#replaceScript', result).replace('javascript', '');
            res.send(responseHTML);
        }
    }).catch((error) => {
        console.log(error.response)
        res.status(error.response.status).send('Error');
    });

});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});