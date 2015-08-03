using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab8_WebAPI.Models
{
    class BookDetailDTO
    {
         public int ID {get; set;}
         public string Title {get; set;}
         public int Year {get; set;}
         public decimal Price {get; set;}
         public string AuthorName {get; set;}
         public string Genre { get; set; }
    }
}
