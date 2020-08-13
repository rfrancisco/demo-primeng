using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("customers")]
    public class CustomersController : ControllerBase
    {
        private readonly CustomersService _svc;

        public CustomersController(CustomersService svc) => _svc = svc;

        [HttpGet("")]
        public async Task<PagedResults<Customer>> GetCustomers(
            [FromQuery] int page,
            [FromQuery] int pageSize,
            [FromQuery] string sortField = "",
            [FromQuery] string sortDirection = "ASC",
            [FromQuery] string searchTerm = "",
            [FromQuery] Filters filters = null,
            [FromQuery] int delayInMilliseconds = 0)
        {
            // Example: 
            //   - https://localhost:5001/customers?page=1&pageSize=10&sortField=Id&sortDirection=DESC&searchTerm=Port&filters[id]=1000&filters[name]=asd
            await Task.Delay(delayInMilliseconds);
            return _svc.GetCustomers(page, pageSize, sortField, sortDirection, searchTerm, filters);
        }

        [HttpGet("representatives")]
        public async Task<IEnumerable<CustomerRepresentative>> GetCustomersRepresentatives(
            [FromQuery] int delayInMilliseconds = 0)
        {
            // Example: 
            //   - https://localhost:5001/customers/representatives
            await Task.Delay(delayInMilliseconds);
            return _svc.GetCustomersRepresentatives();
        }

        [HttpGet("countries")]
        public async Task<IEnumerable<CustomerCountry>> GetCustomersCountries(
            [FromQuery] int delayInMilliseconds = 0)
        {
            // Example: 
            //   - https://localhost:5001/customers/countries
            await Task.Delay(delayInMilliseconds);
            return _svc.GetCustomersCountries();
        }

        [HttpGet("statuses")]
        public async Task<IEnumerable<CustomerStatus>> GetCustomersStatuses(
            [FromQuery] int delayInMilliseconds = 0)
        {
            // Example: 
            //   - https://localhost:5001/customers/statuses
            await Task.Delay(delayInMilliseconds);
            return _svc.GetCustomersStatuses();
        }
    }
}
