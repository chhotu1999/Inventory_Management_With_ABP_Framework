using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace InvManagement.Products
{
    public class ProductDto : AuditedEntityDto<int>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public decimal Price { get; set; }

        public UnitType Unit { get; set; }

        public CategoryType Category { get; set; }
        public string Description { get; set; }

        public decimal StockLevel { get; set; }
    }
}
