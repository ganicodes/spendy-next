import { connect, connection } from "mongoose";

// to connect with mongodb
export async function connectToDb() {
  try {
    connect(process.env.MONGO_DB);
    connection.on("disconnected", () => {
      console.log("DB is disconnected");
    });

    connection.on("connected", () => {
      console.log("Connected to DB");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    throw error;
  }
}
