using CleanArchitectureTodoList.Application.Common.Interfaces;
using CleanArchitectureTodoList.Application.Common.Mappings;
using CleanArchitectureTodoList.Application.Common.Models;

namespace CleanArchitectureTodoList.Application.TodoItems.Queries.GetTodoItemsWithPagination;

public record GetTodoItemsWithPaginationQuery : IRequest<PaginatedList<TodoItemBriefDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}

public class GetTodoItemsWithPaginationQueryHandler : IRequestHandler<GetTodoItemsWithPaginationQuery, PaginatedList<TodoItemBriefDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetTodoItemsWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<TodoItemBriefDto>> Handle(GetTodoItemsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return await _context.TodoItems
            .OrderBy(x => x.Id)
            .ProjectTo<TodoItemBriefDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
