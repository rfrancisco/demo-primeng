using System;
using System.Collections.Generic;

namespace Api.Services
{
    public class Filters : Dictionary<string, string>
    {
    }

    public class PagedResults<M>
    {
        public int Page { get; set; }
        public int TotalPages { get; set; }
        public int TotalRecords { get; set; }
        public bool HasPreviousPage => Page > 1;
        public bool HasNextPage => Page < TotalPages;
        public List<M> Records { get; set; }

        public PagedResults()
        {
        }

        public PagedResults(List<M> items, int count, int pageIndex, int pageSize)
        {
            Page = pageIndex;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            Records = items;
            TotalRecords = count;
        }

    }

}
