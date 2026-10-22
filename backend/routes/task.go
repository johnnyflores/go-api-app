package routes

import (
	"go-api-app/controllers"

	"github.com/gofiber/fiber/v2"
)

func TaskRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("/tasks", controllers.GetTasks)
	api.Post("/tasks", controllers.CreateTask)
	api.Patch("/tasks/:id", controllers.UpdateTask)
	api.Delete("/tasks/:id", controllers.DeleteTask)
}
