import mongoose from 'mongoose'
import app from './app'
import logger from './util/logger'
import { MONGODB_URI } from './util/secrets'

const mongoUrl = MONGODB_URI

//const mongoUrl = "mongodb+srv://poonkodi:mongoJan27@cluster0.zzisr.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

// Start Express server
app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})
