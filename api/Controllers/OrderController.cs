using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using meli.Models;
using meli;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Dynamic;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.IO;

namespace meli.Controllers
{
    [ApiController]
    [Route("order")]
    public class OrderController : ControllerBase
    {
        private readonly DBContext _context;

        public OrderController(DBContext context)
        {
            _context = context;
        }

        [Route("all")]
        [HttpGet]
        public List<Order> Get()
        {
            var set = _context.order.Include("user");
            // Console.WriteLine("Here");
            // var set = _context.order.Include("user");
            return set.ToList();
        }

        [Route("insert")]
        [HttpPost]
        public IActionResult insert([FromForm]Order data)
        {
            var user = _context.user.Find(data.UserId);
            var book = _context.book.Find(data.BookId);
            if(user == null) {
                return Ok("User not found");
            }else if(book == null) {
                return Ok("Book not found");
            } else {
                Order newRow = new Order();
                newRow.UserId = data.UserId;
                newRow.BookId = data.BookId;
                _context.order.Add(newRow);
                _context.SaveChanges();
                return Ok(_context.order.Where(o => o.ID ==_context.order.Max(x => x.ID)).First());
            }
        }

        [Route("book/{BookId}/info")]
        [HttpGet]
        public Dictionary<string,Object> getUserOrder([FromRoute] int BookId)
        {
            var orders = _context.order.Where(o => o.BookId == BookId).ToList();
            Dictionary<string, Object> data = new Dictionary<string, Object>();
            List<User> users = new List<User>();
            foreach(Order o in orders) {
                users.Add(_context.user.Find(o.UserId));
            }
            data.Add("users", users);
            data.Add("book", _context.book.Find(BookId));
            return data;
        }

        [Route("test")]
        [HttpGet]
        public string test()
        {
            return _context.user.ToArray().ToString();
        }
    }
}