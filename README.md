A todo list app using React for the frontend and .net core for the backend

Frontend stack\
Redux Toolkit for state management\
Redux Saga for middleware\
MUI for UI styling\
React hook form for form interaction\
yup schema for form validation\
MSW to mock api behaviour\
vite-template-redux\
React router dom for routing

Frontend features\
View todos\
Mark item as done\
Delete todo item\
Create todo\
Pagination with deep linking instead of state when viewing todos (better user experience)\
Responsive page for both desktop and mobile divices\
State shape is normalised to help with item lookup. Leave room for relational data in the future\
UI is handling various api status e.g. Loading, error and pending 

Tests\
Created test for add todo form\
It covers the test for the initial rendering of the form\
It tests interaction with the form by submitting the form and get confirmation message\
It tests the API failer use case and confirm errors message is showing when api call fails\
Created test for todosSlice just covering fetch todo to showcase the approach\
Test coverage for the whole slice can be boosted using the same approach

How to run frontend\
yarn dev should start the application on your local\
yarn test to run test\
Please note that atm the frontend can run without the .net core app\
To connect to the backend just go to the env file and comment out line 2\
VITE_API_URL="/api"\
Then uncomment line 4 (Assuming your .net core app is running on the same url as configured in the backend)\
VITE_API_URL="https://localhost:5001/api"

Backend stack\
ASP.NET Core 8.0\
Entity Framework Core 8\
Clean architecture \
CQRS and MediatR\
AutoMapper\
FluentValidation\
Moq \
AutoFixture \
FluentAssertions

Backend features\
Create todo\
Update todo\
Delete todo\
View todos\
Pagination for todos as a complex query to ease the load on both frontend and backend (Avoid querying/rendering huge amount of data)\
Manages users, passwords, profile data, roles, claims, tokens, email confirmation etc using ASP.NET Core Identity

How to run backend\
Set web project as the startup project and just run F5\
Migration scripts will kickin automoatically to create db in SQL server



