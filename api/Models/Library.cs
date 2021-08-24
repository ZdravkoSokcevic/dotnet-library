using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations; 
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace meli.Models
{
    [Table("library")]
    public class Library
    {
        [Column("ID")]
        public int ID {set;get;}

        [Column("name")]
        [MaxLength(255)]
        public string name {get;set;}
        public ICollection<Book> books {get;set;}
    } 
}

