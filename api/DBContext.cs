using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.Configuration;
// using System.Configuration;
using MySql.Data.MySqlClient;
using meli.Models;
using System.Linq;

namespace meli
{
    public class DBContext:DbContext
    {
        protected string DbPath {get;set;}
        
        public DBContext(DbContextOptions<DBContext> options):base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // options.LogTo(Console.WriteLine);
        }

        public DbSet<User> user {get; set;}
        public DbSet<Book> book {get; set;}
        public DbSet<Author> author {get; set;}
        public DbSet<Order> order {get; set;}

        public DbSet<Library> library {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .Property<int>(o => o.ID)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Order>()
                .HasOne<Book>(o => o.book)
                .WithMany(b => b.orders)
                .HasForeignKey(p => p.BookId);
            
            modelBuilder.Entity<Order>()
                .HasOne<User>(o => o.user)
                .WithMany(u => u.orders)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<User>()
                .Property<int>(u => u.ID)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Author>()
                .Property<int>(a => a.ID)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Book>()
                .Property<int>(b => b.ID)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Library>()
                .Property<int>(b => b.ID)
                .ValueGeneratedOnAdd();
            // modelBuilder.Entity<Book>()
            //     .HasOne<Author>()
            //     .WithMany()
            //     .HasForeignKey(b => b.AuthorId);
        }
    }
}