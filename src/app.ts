import express, { Application } from 'express';

import config from './config/config';
import routes from './routes';

const app: Application = express();

app.use(routes);

app.listen(config.PORT, () => {
    console.log(`Server running on PORT ${config.PORT}`);
})