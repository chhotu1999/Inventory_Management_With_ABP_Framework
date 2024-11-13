using InvManagement.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvManagement.StockSummary
{
    public class CreateStockSummaryDto
    {
        public int ProductId { get; set; }
        public UnitType Unit { get; set; }
        public decimal StockQuantity { get; set; }
    }
}
