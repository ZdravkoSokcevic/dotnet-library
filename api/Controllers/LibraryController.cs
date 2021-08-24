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
    [Route("library")]
    public class LibraryController : ControllerBase
    {
        private readonly DBContext _context;

        public LibraryController(DBContext context)
        {
            _context = context;
        }

        [Route("all")]
        [HttpGet]
        public List<Library> Get()
        {
            var set = _context.library;
            return set.ToList();
        }

        [Route("insert")]
        [HttpPost]
        public IActionResult insert([FromForm]Library library)
        {
            // return Ok(book);
                Library newRow = new Library();
                newRow.name = library.name;
                _context.library.Add(newRow);
                _context.SaveChanges();
                return Ok(_context.library.Where(l => l.ID ==_context.library.Max(x => x.ID)).First());
            }
        }
}