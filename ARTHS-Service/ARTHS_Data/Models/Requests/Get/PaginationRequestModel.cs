﻿namespace ARTHS_Data.Models.Requests.Get
{
    public class PaginationRequestModel
    {
        const int MaxPageSize = 1000;
        public int PageNumber { get; set; } = 0;
        private int _pageSize = 12;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = value > MaxPageSize ? MaxPageSize : value;
            }
        }
    }
}
