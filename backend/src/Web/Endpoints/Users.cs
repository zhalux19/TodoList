﻿using CleanArchitectureTodoList.Infrastructure.Identity;

namespace CleanArchitectureTodoList.Web.Endpoints;

public class Users : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapIdentityApi<ApplicationUser>();
    }
}
