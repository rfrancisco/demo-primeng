# PrimeNG examples

The project contains a .net core webapi and an angular application with the primeng examples.
In order to run the example you need dotnet core 3.1 and nodejs installed in your machine.

## Verions used
- primeng 10.0.0-rc3
- angular 10

## Examples

The application has 4 examples:
- A basic table with scrolling or paginator where the sorting, filtering, paging are done on the client side.
- A basic table with scrolling or paginator where the sorting, filtering, paging are done on the server side (lazy load + virtual scroll).

- A table with inline editing, with scrolling or paginator where the sorting, filtering, paging are done on the client side.

- A table with inline editing, with scrolling or paginator where the sorting, filtering, paging are done on the server side (lazy load + virtual scroll).

The examples work in chrome, firefox and safari.

## How to run

To run the sample app open 2 terminals and run the following commands:

~~~sh
./start-api.sh
./start-app.sh
~~~