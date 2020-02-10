import http from 'http';
import app from './app';
import chalk from 'chalk';

//declare the port
const port = process.env.PORT || 5000;

//create the server
const server = http.createServer(app);
server.listen(port, () => {
    console.log(chalk.green.inverse(`Server is running on port ${port}\nVisit http://localhost:${port}`));
});

export {server};
