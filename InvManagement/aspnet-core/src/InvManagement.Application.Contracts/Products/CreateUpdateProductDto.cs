using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvManagement.Products
{
    public class CreateUpdateProductDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string Code { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public UnitType Unit { get; set; }
        [Required]
        public CategoryType Category { get; set; }
        public string Description { get; set; }
        public decimal StockLevel { get; set; }
    }
}
