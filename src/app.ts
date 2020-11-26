import express, { Application, Request, Response } from 'express';
import { Server } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));

app.use('/', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
