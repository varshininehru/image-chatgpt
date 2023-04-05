const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');

app.use(express.json());

const authToken = 'xxx'

const configuration = new Configuration({
    apiKey: authToken,
});
const openai = new OpenAIApi(configuration);

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('You are in express app');
});

// Following utilizes openai package
app.post('/getCodeWithPackage', async (req, res) => {
    const parameters = {
        "model": "text-davinci-002",
        "prompt": req.body.data,
        "temperature": 0.5,
        "max_tokens": 1024,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
    }

    const completion = await openai.createCompletion(parameters);
    const code = completion.data.choices[0].text;
    res.send(code);

});

// Following utilizes https://api.openai.com/v1/completions API
app.post('/getCodeWithAPI', async (req, res) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
    }

    const data = {
        model: 'text-davinci-003',
        max_tokens: 4000,
        temperature: 0.5,
        prompt: req.body.data
    }

    axios.post('https://api.openai.com/v1/completions', data, {
        headers: headers
    }).then((response) => {
        if (response.status === 200) {
            const responseText = response.data.choices[0].text;
            const result = responseText.replace(/\n/g, "\n");

            res.send(result);
        }

    }).catch((error) => {
        console.log(error)
    });

});


// Following utilizes https://api.openai.com/v1/chat/completions API
app.post('/getCodeWithChatAPI', async (req, res) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
    }

    const data = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: req.body.data }]
    }

    axios.post('https://api.openai.com/v1/chat/completions', data, {
        headers: headers
    }).then((response) => {
        if (response.status === 200) {
            const responseText = response.data.choices[0].message.content;
            let result = '';
            
            const regex = /```([\s\S]*?)```/g;
            let match;

            while ((match = regex.exec(responseText)) !== null) {
                result += match[1];
            }
            res.send(result);
        }
    }).catch((error) => {
        console.log(error)
    });

});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});