using InvManagement.Products;
using InvManagement.Stock_Summary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvManagement.StockSummary
{
    public class StockTransSummaryDto
    {
        public int StockSumamryId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }

        public StockType StockMode { get; set; }

        public decimal StockQuantity { get; set; }

        public UnitType Unit { get; set; }

        public decimal BalanceQuantity { get; set; }

    }
}
