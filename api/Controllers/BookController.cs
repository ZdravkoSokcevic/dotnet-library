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
    [Route("book")]
    public class BookController : ControllerBase
    {
        private readonly DBContext _context;

        public BookController(DBContext context)
        {
            _context = context;
        }

        [Route("all")]
        [HttpGet]
        public List<Book> Get()
        {
            Console.WriteLine(_context.book.First().ToString());
            var set = _context.book.Include("author");
            if(set == null) {
                return new List<Book>();
            }
            return set.ToList();
        }

        [Route("insert")]
        [HttpPost]
        public IActionResult insert([FromForm]Book book)
        {
            // return Ok(book);
            Console.WriteLine(new{authorid=book.AuthorId,name=book.name, NumberPages=book.NumberPages});
            var author = _context.author.Find(book.AuthorId);
            // Console.WriteLine(new{user_id=data.UserId,book_id=data.BookId});
            if(author == null) {
                return Ok("Author not found");
            }else {
                Book newRow = new Book();
                newRow.name = book.name;
                newRow.AuthorId = book.AuthorId;
                newRow.NumberPages = book.NumberPages;
                newRow.LibraryId = book.LibraryId;
                _context.book.Add(newRow);
                _context.SaveChanges();
                return Ok(_context.book.Where(b => b.ID ==_context.book.Max(x => x.ID)).First());
            }
        }

        [Route("edit/{BookId}")]
        [HttpPost]
        public async Task<IActionResult> edit([FromRoute] int BookId,[FromForm]Book b)
        {
            // try {
                var book =  _context.book.Find(BookId);
                if(book != null) {
                    Console.WriteLine("BookID " + BookId);
                     Console.WriteLine("Bookname " + b.name);
                      Console.WriteLine("Book pages " + b.NumberPages);
                       Console.WriteLine("Book author " + b.AuthorId);
                    book.name = b.name;
                    book.NumberPages = b.NumberPages;
                    book.AuthorId = b.AuthorId;
                    _context.Update<Book>(book);
                    await _context.SaveChangesAsync();
                    return Ok(b);
                }else {
                    Console.WriteLine("BookID " + BookId);
                }
                return StatusCode(200);
            // }catch(Exception e) {
            //     Console.WriteLine(e);
            //     return StatusCode(500);
            // }
        }

        [Route("delete/{BookId}")]
        [HttpDelete]
        public async Task<IActionResult> delete([FromRoute] int BookId)
        {
            try {
                var book = _context.book.Where(p => p.ID == BookId).ToList().Last();
                if(book == null)
                    return StatusCode(404);
                _context.Remove(book);
                await _context.SaveChangesAsync();
                return StatusCode(200);
            }catch(Exception e) {
                Console.WriteLine(e);
                return StatusCode(500);
            }
        
        }
    }
}