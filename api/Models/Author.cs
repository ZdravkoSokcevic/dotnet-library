using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations; 
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace meli.Models
{
    [Table("author")]
    public class Author
    {
        [Column("ID")]
        public int ID {set;get;}

        [Column("first_name")]
        [MaxLength(255)]
        
        public string FirstName {get;set;}

        [Column("last_name")]
        [MaxLength(255)]
        public string LastName {get;set;}


        [Column("city")]
        [MaxLength(255)]
        public string City {get;set;}
        
        public ICollection<Book> books;

    }
}