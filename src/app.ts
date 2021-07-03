import express, { Application } from 'express';

import config from './config/config';
import routes from './routes';
import db from './config/postgres';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() => console.log('Database Connected...'));

app.use('/api', routes);

app.listen(config.PORT, () => {
    console.log(`Server running on PORT ${config.PORT}`);
})