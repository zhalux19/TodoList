using CleanArchitectureTodoList.Domain.Entities;

namespace CleanArchitectureTodoList.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<TodoItem> TodoItems { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
