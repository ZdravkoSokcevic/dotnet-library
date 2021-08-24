using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations; 
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace meli.Models
{
    [Table("book")]
    public class Book
    {
        [Column("ID")]
        public int ID {set;get;}

        [Column("name")]
        [MaxLength(255)]
        public string name {get;set;}

        [Column("number_pages")]
        public int NumberPages {get;set;}

        public int AuthorId {get;set;}

        public Author author {get;set;}

        public int LibraryId {get;set;}

        public virtual Library library {get;set;}
        public ICollection<Order> orders {get;set;}
    } 
}

