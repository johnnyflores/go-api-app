package routes

import (
	"go-api-app/controllers"

	"github.com/gofiber/fiber/v2"
)

func TodoRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("/todos", controllers.GetTodos)
	api.Post("/todos", controllers.CreateTodo)
	api.Patch("/todos/:id", controllers.UpdateTodo)
	api.Delete("/todos/:id", controllers.DeleteTodo)
}
