using CleanArchitectureTodoList.Application.Common.Models;
using CleanArchitectureTodoList.Application.TodoItems.Commands.CreateTodoItem;
using CleanArchitectureTodoList.Application.TodoItems.Commands.DeleteTodoItem;
using CleanArchitectureTodoList.Application.TodoItems.Commands.UpdateTodoItem;
using CleanArchitectureTodoList.Application.TodoItems.Queries.GetTodoItem;
using CleanArchitectureTodoList.Application.TodoItems.Queries.GetTodoItemsWithPagination;

namespace CleanArchitectureTodoList.Web.Endpoints;

public class TodoItems : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetTodoItem, "{id}")
            .MapGet(GetTodoItemsWithPagination)
            .MapPost(CreateTodoItem)
            .MapPut(UpdateTodoItem, "{id}")
            .MapDelete(DeleteTodoItem, "{id}");
    }

    public async Task<PaginatedList<TodoItemBriefDto>> GetTodoItemsWithPagination(ISender sender, [AsParameters] GetTodoItemsWithPaginationQuery query)
    {
        return await sender.Send(query);
    }

    public async Task<TodoItemBriefDto> GetTodoItem(ISender sender, [AsParameters] GetTodoItemQuery query)
    {
        return await sender.Send(query);
    }

    public async Task<int> CreateTodoItem(ISender sender, CreateTodoItemCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<IResult> UpdateTodoItem(ISender sender, int id, UpdateTodoItemCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<IResult> DeleteTodoItem(ISender sender, int id)
    {
        await sender.Send(new DeleteTodoItemCommand(id));
        return Results.NoContent();
    }
}
