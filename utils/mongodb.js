import mongoose from 'mongoose';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local',
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = { conn: null, promise: null };
  global.mongo = { conn: null, promise: null };
}

// export async function initDatabase() {
//   await connectToDatabaseWithMongoose()
//   await populateDatabase()
//   return {
//     client: true,
//   }
// }

export async function connectToDatabaseWithMongoose() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connectToDatabaseWithMongoose)
    .once('open', () => console.log('Connected to MONGO DB'));

  return mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DB,
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// async function populateDatabase() {
//   const collections = await mongoose.connection.db.listCollections().toArray()
//   const collectionNames = collections.map(c => c.name);

//   if (!collectionNames.length) {
//     const rawGames = fs.readFileSync('./test-data/games.json')
//     const games = JSON.parse(rawGames)

//     games.map(game => {
//       const temp = new VideoGame(game)
//       temp.save()
//     })
//   }
// }

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }

  return mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DB,
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
