# Toy Project

## Run the application

1. Install dependencies - `npm install`
2. Run the server - `npm start`
3. Launch http://localhost:3000/
 

## API Reference

API - https://api.openai.com/v1/completions

`curl --location 'https://api.openai.com/v1/completions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer xxx \
--data '{
    "model": "text-davinci-002",
    "prompt": "write javascript code on canvas to produce duck in water",
    "temperature": 0.5,
    "max_tokens": 1024,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
  }'`


Response 

"model": "text-davinci-003"

`{
    "id": "cmpl-71rKgdZBuWCaJmi7oX3dmzYnbtrZ4",
    "object": "text_completion",
    "created": 1680677694,
    "model": "text-davinci-003",
    "choices": [
        {
            "text": "\n\n// Create a canvas\nlet canvas = document.createElement('canvas');\ncanvas.width = 500;\ncanvas.height = 500;\ndocument.body.appendChild(canvas);\nlet ctx = canvas.getContext('2d');\n\n// Create a duck\nctx.beginPath();\nctx.fillStyle = '#FF0000';\nctx.arc(250, 250, 40, 0, Math.PI * 2);\nctx.fill();\n\n// Create the eyes\nctx.fillStyle = '#000000';\nctx.beginPath();\nctx.arc(240, 245, 5, 0, Math.PI * 2);\nctx.fill();\nctx.beginPath();\nctx.arc(260, 245, 5, 0, Math.PI * 2);\nctx.fill();\n\n// Create the beak\nctx.fillStyle = '#FFA500';\nctx.beginPath();\nctx.moveTo(250, 250);\nctx.lineTo(235, 260);\nctx.lineTo(265, 260);\nctx.fill();\n\n// Create the water\nctx.fillStyle = '#0000FF';\nctx.fillRect(0, 400, 500, 100);",
            "index": 0,
            "logprobs": null,
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 10,
        "completion_tokens": 272,
        "total_tokens": 282
    }
}`


"model": "text-davinci-002"

`{
    "id": "cmpl-71rD9OcFk6H22AZ1zGzhYAWhOLliN",
    "object": "text_completion",
    "created": 1680677227,
    "model": "text-davinci-002",
    "choices": [
        {
            "text": "\n\nvar canvas = document.getElementById(\"canvas\");\nvar ctx = canvas.getContext(\"2d\");\n\nvar duck = {\n  x: 100,\n  y: 100,\n  width: 40,\n  height: 40\n};\n\nvar water = {\n  x: 0,\n  y: canvas.height - 20,\n  width: canvas.width,\n  height: 20\n};\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n\n  ctx.fillStyle = \"blue\";\n  ctx.fillRect(water.x, water.y, water.width, water.height);\n\n  ctx.fillStyle = \"yellow\";\n  ctx.fillRect(duck.x, duck.y, duck.width, duck.height);\n\n  duck.x += 2;\n}\n\nanimate();",
            "index": 0,
            "logprobs": null,
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 10,
        "completion_tokens": 214,
        "total_tokens": 224
    }
}`


### API - https://api.openai.com/v1/chat/completions

`curl --location 'https://api.openai.com/v1/chat/completions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer xxx' \
--data '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "write javascript code on canvas to produce duck in water"}]
  }'`

Response 

`{
    "id": "chatcmpl-71rIABqEKbESrpkNlQwt1PYchQn9e",
    "object": "chat.completion",
    "created": 1680677538,
    "model": "gpt-3.5-turbo-0301",
    "usage": {
        "prompt_tokens": 18,
        "completion_tokens": 422,
        "total_tokens": 440
    },
    "choices": [
        {
            "message": {
                "role": "assistant",
                "content": "As an AI language model, I cannot create a visual display, but I can provide the code that would produce a duck in water on a canvas using JavaScript.\n\nHere is an example code that can be used to produce a duck on water on a canvas:\n\n```\nconst canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('2d');\n\n// Water\nctx.fillStyle = '#0099ff';\nctx.fillRect(0, 0, canvas.width, canvas.height);\n\n// Duck\nctx.beginPath();\nctx.fillStyle = 'brown';\nctx.arc(250, 200, 50, 0, Math.PI * 2);\nctx.fill();\n\n// Beak\nctx.beginPath();\nctx.fillStyle = 'orange';\nctx.moveTo(225, 195);\nctx.lineTo(210, 215);\nctx.lineTo(225, 215);\nctx.fill();\n\n// Eye\nctx.beginPath();\nctx.fillStyle = 'black';\nctx.arc(265, 190, 5, 0, Math.PI * 2);\nctx.fill();\n\n// Waves\nctx.beginPath();\nctx.strokeStyle = 'white';\nctx.lineWidth = 5;\nctx.moveTo(0, 300);\nctx.lineTo(50, 320);\nctx.lineTo(100, 300);\nctx.lineTo(150, 320);\nctx.lineTo(200, 300);\nctx.lineTo(250, 320);\nctx.lineTo(300, 300);\nctx.stroke();\n\nctx.beginPath();\nctx.strokeStyle = 'white';\nctx.lineWidth = 5;\nctx.moveTo(50, 320);\nctx.lineTo(100, 340);\nctx.lineTo(150, 320);\nctx.lineTo(200, 340);\nctx.lineTo(250, 320);\nctx.lineTo(300, 340);\nctx.stroke();\n```\n\nThis code will create a canvas element in HTML with id 'myCanvas' which will have a duck floating visibly on top of a blue background of water. The duck will have a distinctly colored beak and black eyes, and there will be white lined waves visible in the water. It could, of course, be customized further based on one's preference."
            },
            "finish_reason": "stop",
            "index": 0
        }
    ]
}`


