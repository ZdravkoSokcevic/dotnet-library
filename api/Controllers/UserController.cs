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
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly DBContext context;
        public UserController(DBContext _context)
        {
            this.context = _context;
        }

        [Route("insert")]
        [HttpPost]
        public IActionResult insert([FromForm] User data)
        {
            User newRow = new User();
            newRow.FirstName = data.FirstName;
            newRow.LastName = data.LastName;
            newRow.Email = data.Email;
            context.user.Add(newRow);
            context.SaveChanges();
            return Ok(context.user.Where(u => u.ID == context.user.Max(x => x.ID)).First());
        }

        [Route("all")]
        [HttpGet]
        public List<User> all()
        {
            return this.context.user.Include(u => u.orders).ToList();
        }
    }
}