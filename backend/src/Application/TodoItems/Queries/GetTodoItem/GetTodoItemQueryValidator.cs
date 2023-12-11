namespace CleanArchitectureTodoList.Application.TodoItems.Queries.GetTodoItem;

public class GetTodoItemQueryValidator: AbstractValidator<GetTodoItemQuery>
{
    public GetTodoItemQueryValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThanOrEqualTo(1).WithMessage("Id at least greater than or equal to 1.");
    }
}
