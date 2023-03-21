import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models from './models';
import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    req.context = {
      models,
      me: models.users[1],
    };
    next();
});

// * Routes * //

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/', routes.user);
app.use('/test', function(req, res) {
 // send json resopnse
  res.json({ message: 'Hello World!' });
});


// * Start * //

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
