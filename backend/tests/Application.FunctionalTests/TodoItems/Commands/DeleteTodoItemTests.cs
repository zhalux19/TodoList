using CleanArchitectureTodoList.Application.TodoItems.Commands.CreateTodoItem;
using CleanArchitectureTodoList.Application.TodoItems.Commands.DeleteTodoItem;
using CleanArchitectureTodoList.Domain.Entities;

namespace CleanArchitectureTodoList.Application.FunctionalTests.TodoItems.Commands;

using static Testing;

public class DeleteTodoItemTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireValidTodoItemId()
    {
        var command = new DeleteTodoItemCommand(99);

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<NotFoundException>();
    }

    [Test]
    public async Task ShouldDeleteTodoItem()
    {
        var itemId = await SendAsync(new CreateTodoItemCommand
        {
            Title = "New Item"
        });

        await SendAsync(new DeleteTodoItemCommand(itemId));

        var item = await FindAsync<TodoItem>(itemId);

        item.Should().BeNull();
    }
}
