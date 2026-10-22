package controllers

import (
	"context"

	"go-api-app/config"
	"go-api-app/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetTasks(c *fiber.Ctx) error {
	collection := config.GetCollection("tasks")

	var tasks []models.Task

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var task models.Task
		if err := cursor.Decode(&task); err != nil {
			return err
		}
		tasks = append(tasks, task)
	}
	return c.JSON(tasks)
}

func CreateTask(c *fiber.Ctx) error {
	collection := config.GetCollection("tasks")

	task := new(models.Task)

	if err := c.BodyParser(task); err != nil {
		return err
	}

	if task.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Task Body cannot be empty"})
	}

	insertResult, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		return err
	}

	task.ID = insertResult.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(task)

}

func UpdateTask(c *fiber.Ctx) error {
	collection := config.GetCollection("tasks")

	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid task ID"})
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"completed": true}}

	_, err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}

func DeleteTask(c *fiber.Ctx) error {
	collection := config.GetCollection("tasks")

	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid task ID"})
	}

	filter := bson.M{"_id": objectID}

	_, err = collection.DeleteOne(context.Background(), filter)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}
