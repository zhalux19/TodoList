using CleanArchitectureTodoList.Domain.Entities;

namespace CleanArchitectureTodoList.Application.TodoItems.Queries.GetTodoItemsWithPagination;

public class TodoItemBriefDto
{
    public int Id { get; init; }

    public string? Title { get; init; }

    public bool Done { get; init; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<TodoItem, TodoItemBriefDto>();
        }
    }
}
