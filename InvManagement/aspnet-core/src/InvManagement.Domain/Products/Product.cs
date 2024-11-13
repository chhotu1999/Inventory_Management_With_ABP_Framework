using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace InvManagement.Products
{
    public class Product : AuditedAggregateRoot<int>
    {
        public string Name { get; set; }
        public string Code { get; set; }
      
        public UnitType Unit { get; set; }
        public decimal UnitPrice { get; set; }
        public CategoryType Category { get; set; }
        public string Description { get; set; }

        public decimal StockLevel { get; set; }
    }
}
