
using InvManagement.SharedModel;
using System.Threading.Tasks;

namespace InvManagement.StockSummary
{
    public interface IStockTransSummaryService
    {
        Task<StockTransSummaryDto> AddStockSummaryAsync(CreateStockSummaryDto css);
        Task<ResponseResult<StockTransSummaryDto>> GetStockSummaryPagedAsync(int pageNumber, int pageSize);

    }
}
