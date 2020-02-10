import express from 'express';
import bodyParser from 'body-parser';
import route from './routes';
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

route(app);

export default app;
