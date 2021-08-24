using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations; 
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace meli.Models
{
    [Table("user")]
    public class User
    {
        [Column("ID")]
        public int ID {set;get;}

        [Column("first_name")]
        [MaxLength(255)]
        public string FirstName {get;set;}

        [Column("last_name")]
        [MaxLength(255)]
        public string LastName {get;set;}


        [Column("email")]
        [MaxLength(255)]

        public string Email {get;set;}
        [JsonIgnore]
        public ICollection<Order> orders {get;set;}

    }
}