using System;

namespace Api.Services
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CustomerCountry Country { get; set; }
        public string Company { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public int Activity { get; set; }
        public CustomerRepresentative Representative { get; set; }
    }

    public class CustomerCountry
    {
        public string Name { get; set; }
        public string Code { get; set; }
    }

    public class CustomerRepresentative
    {
        public string Name { get; set; }
        public string Image { get; set; }
    }

    public class CustomerStatus
    {
        public string Label { get; set; }
        public string Value { get; set; }
    }
}