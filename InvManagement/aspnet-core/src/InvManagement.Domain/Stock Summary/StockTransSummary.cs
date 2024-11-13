using InvManagement.Products;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace InvManagement.Stock_Summary
{
    public class StockTransSummary : AuditedAggregateRoot<int>
    {
        public int ProductId { get; set; }

        public StockType StockMode { get; set; }

        public decimal StockQuantity { get; set; }

        public decimal BalanceQuantity { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
