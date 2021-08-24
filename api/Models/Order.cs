using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations; 
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text.Json.Serialization;


namespace meli.Models
{
    [Table("order")]
    public class Order
    {
        [Column("ID")]
        // [Key]
        // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID {get;set;}

        public int UserId {get;set;}

        public int BookId {get;set;}
        
        [JsonIgnore]
        public virtual User user {get;set;}
        [JsonIgnore]
        public virtual Book book {get;set;}
    }
}