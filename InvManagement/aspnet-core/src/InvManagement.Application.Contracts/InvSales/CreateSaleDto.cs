using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvManagement.InvSales
{
    public class CreateSaleDto
    {
        public int CustomerId { get; set; }
        public List<SalesDetailDto> SalesDetails { get; set; }
        public decimal NetAmount { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Remarks { get; set; }
    }
}
