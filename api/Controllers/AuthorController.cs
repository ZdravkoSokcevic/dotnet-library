using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using meli.Models;
using meli;
using Microsoft.EntityFrameworkCore;

namespace meli.Controllers 
{
    [ApiController]
    [Route("author")]
    public class AuthorController : ControllerBase
    {
        private readonly DBContext context;
        public AuthorController(DBContext _context)
        {
            this.context = _context;
        }

        [Route("all")]
        [HttpGet]
        public List<Author> all()
        {
            return this.context.author.ToList();
        }


        [Route("insert")]
        [HttpPost]
        public IActionResult insert([FromForm] Author data)
        {
            Author newRow = new Author();
            newRow.FirstName = data.FirstName;
            newRow.LastName = data.LastName;
            newRow.City = data.City;
            context.author.Add(newRow);
            context.SaveChanges();
            return Ok(context.author.Where(a => a.ID == context.author.Max(x => x.ID)).First());
        }
    }
}