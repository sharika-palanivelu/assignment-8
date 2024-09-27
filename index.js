const express = require('express');
const app = express();
const port = 3000;

// Route to display messages in the browser
app.get('/', (req, res) => {
    const message = `
        <h1>This is my first message</h1>
        <h2>Welcome to KCT Learning</h2>
    `;
    res.send(message);

    // Log the messages in the console
    console.log('This is my first message');
    console.log('Welcome to KCT Learning');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
