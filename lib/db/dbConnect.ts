import mongoose from "mongoose";

const connection: { isConnected: mongoose.Connection["readyState"] } = { isConnected: 0 };

async function dbConnect() {
  /* check if we have connection to our databse */
  if (connection.isConnected) {
    return;
  }
  console.log(`process.env.DB_HOST`, process.env.DB_HOST);
  /* connecting to our database */
  const db = await mongoose.connect(
    "mongodb://mongodb:27017/NoSQL_t1",
    // process.env.DB_HOST!,
    // const db = await mongoose.connect("mongodb://localhost:27017/NoSQL_t1",
    // const db = await mongoose.connect(process.env.DB_HOST!,
    /*  {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    } */
  );

  // db.on('error', console.error.bind(console, 'MongoDB connection error:'))

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
