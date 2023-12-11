using CleanArchitectureTodoList.Application.Common.Interfaces;
using CleanArchitectureTodoList.Application.TodoItems.Queries.GetTodoItemsWithPagination;

namespace CleanArchitectureTodoList.Application.TodoItems.Queries.GetTodoItem;

public record  GetTodoItemQuery : IRequest<TodoItemBriefDto>
{
    public int Id { get; init; }
}
public class GetTodoItemQueryHandler : IRequestHandler<GetTodoItemQuery, TodoItemBriefDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetTodoItemQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<TodoItemBriefDto> Handle(GetTodoItemQuery request, CancellationToken cancellationToken)
    {
        var entity = await _context.TodoItems
            .FindAsync(new object[] { request.Id }, cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        return _mapper.Map<TodoItemBriefDto>(entity);
    }
}

