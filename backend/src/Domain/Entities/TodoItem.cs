namespace CleanArchitectureTodoList.Domain.Entities;

public class TodoItem : BaseAuditableEntity
{
    public string? Title { get; set; }

    private bool _done;
    public bool Done
    {
        get => _done;
        set
        {
            if (value && !_done)
            {
                AddDomainEvent(new TodoItemCompletedEvent(this));
            }

            _done = value;
        }
    }
}
