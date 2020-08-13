using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.Json;

namespace Api.Services
{
    public class CustomersService
    {
        private readonly IEnumerable<Customer> _customers;
        private readonly IEnumerable<CustomerCountry> _countries;
        private readonly IEnumerable<CustomerRepresentative> _representatives;
        private readonly IEnumerable<CustomerStatus> _statuses;

        public CustomersService()
        {
            var json = System.IO.File.ReadAllText("./Data/customers.json");
            _customers = JsonSerializer.Deserialize<IEnumerable<Customer>>(json, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true }).OrderBy(x => x.Id);
            _countries = _customers.Select(x => x.Country).GroupBy(x => x.Code).Select(x => x.First()).OrderBy(x => x.Name); ;
            _representatives = _customers.Select(x => x.Representative).GroupBy(x => x.Name).Select(x => x.First()).OrderBy(x => x.Name); ;
            _statuses = _customers.Select(x => x.Status).Distinct().Select(x => new CustomerStatus() { Label = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(x), Value = x }).OrderBy(x => x.Label); ;
        }

        public IEnumerable<CustomerCountry> GetCustomersCountries() =>
            _countries;

        public IEnumerable<CustomerRepresentative> GetCustomersRepresentatives() =>
             _representatives;

        public IEnumerable<CustomerStatus> GetCustomersStatuses() =>
            _statuses;

        public PagedResults<Customer> GetCustomers(
            int page,
            int pageSize,
            string sortField = "",
            string sortDirection = "ASC",
            string searchTerm = "",
            Filters filters = null)
        {
            sortField = sortField?.ToLower() ?? "";
            sortDirection = sortDirection?.ToLower() ?? "asc";
            searchTerm = searchTerm?.ToLower() ?? "";

            var results = _customers.AsEnumerable();

            // Perform filtering
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                results = results.Where(x =>
                    x.Id.ToString() == searchTerm ||
                    x.Name.ToLower().Contains(searchTerm) ||
                    x.Country.Name.ToLower().Contains(searchTerm) ||
                    x.Representative.Name.ToLower().Contains(searchTerm) ||
                    x.Company.ToLower().Contains(searchTerm) ||
                    x.Date.ToString().ToLower().Contains(searchTerm) ||
                    x.Status.ToLower().Contains(searchTerm) ||
                    x.Activity.ToString().Contains(searchTerm)
                );
            }
            foreach (var field in filters.Keys)
            {
                switch (field)
                {
                    case "id":
                        results = results.Where(x => x.Id == int.Parse(filters[field]));
                        break;
                    case "name":
                        results = results.Where(x => x.Name.ToLower().Contains(filters[field].ToLower()));
                        break;
                    case "country":
                        results = results.Where(x => filters[field].ToLower().Split(',').Contains(x.Country.Code.ToLower()));
                        break;
                    case "representative":
                        results = results.Where(x => filters[field].ToLower().Split(',').Contains(x.Representative.Name.ToLower()));
                        break;
                    case "company":
                        results = results.Where(x => x.Company.ToLower().Contains(filters[field].ToLower()));
                        break;
                    case "date":
                        results = results.Where(x => x.Date == DateTime.Parse(filters[field]));
                        break;
                    case "status":
                        results = results.Where(x => x.Status.ToLower() == filters[field].ToLower());
                        break;
                    case "activity":
                        results = results.Where(x => x.Activity >= int.Parse(filters[field]));
                        break;
                }
            }

            // Perform sorting
            switch (sortField)
            {
                case "id": results = sortDirection == "asc" ? results.OrderBy(x => x.Id) : results.OrderByDescending(x => x.Id); break;
                case "name": results = sortDirection == "asc" ? results.OrderBy(x => x.Name) : results.OrderByDescending(x => x.Name); break;
                case "country": results = sortDirection == "asc" ? results.OrderBy(x => x.Country.Name) : results.OrderByDescending(x => x.Country.Name); break;
                case "representative": results = sortDirection == "asc" ? results.OrderBy(x => x.Representative.Name) : results.OrderByDescending(x => x.Representative.Name); break;
                case "company": results = sortDirection == "asc" ? results.OrderBy(x => x.Company) : results.OrderByDescending(x => x.Company); break;
                case "date": results = sortDirection == "asc" ? results.OrderBy(x => x.Date) : results.OrderByDescending(x => x.Date); break;
                case "status": results = sortDirection == "asc" ? results.OrderBy(x => x.Status) : results.OrderByDescending(x => x.Status); break;
                case "activity": results = sortDirection == "asc" ? results.OrderBy(x => x.Activity) : results.OrderByDescending(x => x.Activity); break;
            }

            // Perform paging
            if (page == 0)
                page = 1;

            if (pageSize == 0)
                pageSize = int.MaxValue;

            var count = results.Count();
            var items = results.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var retVal = new PagedResults<Customer>(items, count, page, pageSize);
            return retVal;
        }
    }
}
