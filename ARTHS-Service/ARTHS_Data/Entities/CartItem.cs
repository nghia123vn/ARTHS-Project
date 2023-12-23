using System;
using System.Collections.Generic;

namespace ARTHS_Data.Entities
{
    public partial class CartItem
    {
        public Guid CartId { get; set; }
        public Guid MotobikeProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime CreateAt { get; set; }

        public virtual Cart Cart { get; set; } = null!;
        public virtual MotobikeProduct MotobikeProduct { get; set; } = null!;
    }
}
