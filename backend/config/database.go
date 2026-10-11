package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func ConnectDB() *mongo.Client {
	MONGODB_URI := os.Getenv("MONGODB_URI")
	if MONGODB_URI == "" {
		MONGODB_URI = "mongodb://localhost:27017/golang_db"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(MONGODB_URI))
	if err != nil {
		log.Fatal("Failed to create MongoDB client: ", err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Failed to connect to MongoDB Atlas: ", err)
	}

	fmt.Println("Connected successfully to MongoDB Atlas!")

	DB = client
	return client
}

func GetCollection(collectionName string) *mongo.Collection {
	return DB.Database("golang_db").Collection(collectionName)
}
