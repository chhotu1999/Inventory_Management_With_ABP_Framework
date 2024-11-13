using InvManagement.SharedModel;
using InvManagement.StockSummary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvManagement.InvSales
{
    public interface IInvSalesService
    {

        Task<ResponseResult<SalesDto>> GetSalesSummaryPagedAsync(int pageNumber, int pageSize);

        Task<SalesDto> CreateSaleAsync(CreateSaleDto input);
    }
}
