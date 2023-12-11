using AutoFixture;
using AutoFixture.AutoMoq;
using CleanArchitectureTodoList.Application.Common.Interfaces;
using CleanArchitectureTodoList.Application.TodoItems.Commands.CreateTodoItem;
using CleanArchitectureTodoList.Domain.Entities;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;

namespace CleanArchitectureTodoList.Application.UnitTests.TodoItems.Commands;
public class CreateTodoItemTests
{
    private Mock<IApplicationDbContext> _context = null!;
    private CreateTodoItemCommandHandler _sut = null!;
    private IFixture _fixture = null!;

    [SetUp]
    public void Setup()
    {
        _fixture = new Fixture().Customize(new AutoMoqCustomization());
        _context = _fixture.Freeze<Mock<IApplicationDbContext>>();
        _sut = _fixture.Create<CreateTodoItemCommandHandler>();
    }

    [Test]
    public async Task Handle_GivenValidRequest_ShouldPersistTodoItem()
    {        
        // Arrange
        var todos = _fixture.CreateMany<TodoItem>()
                           .AsQueryable()
                           .BuildMockDbSet();

        _context.Setup(m => m.TodoItems).Returns(() => todos.Object);

        var request = _fixture.Create<CreateTodoItemCommand>();

        // Act
        var result = await _sut.Handle(request, new CancellationToken());

        // Assert
        _context.Verify(c => c.TodoItems.Add(It.Is<TodoItem>(t => t.Title == request.Title)), Times.Once);
        _context.Verify(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }
}
