﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace InvManagement.Customers
{
    public class Customer : AuditedAggregateRoot<int>
    {
        public string Name { get; set; }
        public GenderType Gender { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Address { get; set; }
    }
}
