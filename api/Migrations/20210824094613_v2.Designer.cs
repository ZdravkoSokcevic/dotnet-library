﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using meli;

namespace meli.Migrations
{
    [DbContext(typeof(DBContext))]
    [Migration("20210824094613_v2")]
    partial class v2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.9");

            modelBuilder.Entity("meli.Models.Author", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<string>("City")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("city");

                    b.Property<string>("FirstName")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("first_name");

                    b.Property<string>("LastName")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("last_name");

                    b.HasKey("ID");

                    b.ToTable("author");
                });

            modelBuilder.Entity("meli.Models.Book", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<int>("AuthorId")
                        .HasColumnType("int");

                    b.Property<int>("LibraryId")
                        .HasColumnType("int");

                    b.Property<int>("NumberPages")
                        .HasColumnType("int")
                        .HasColumnName("number_pages");

                    b.Property<string>("name")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name");

                    b.HasKey("ID");

                    b.HasIndex("AuthorId");

                    b.HasIndex("LibraryId");

                    b.ToTable("book");
                });

            modelBuilder.Entity("meli.Models.Library", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<string>("name")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name");

                    b.HasKey("ID");

                    b.ToTable("library");
                });

            modelBuilder.Entity("meli.Models.Order", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("BookId");

                    b.HasIndex("UserId");

                    b.ToTable("order");
                });

            modelBuilder.Entity("meli.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<string>("Email")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("email");

                    b.Property<string>("FirstName")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("first_name");

                    b.Property<string>("LastName")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("last_name");

                    b.HasKey("ID");

                    b.ToTable("user");
                });

            modelBuilder.Entity("meli.Models.Book", b =>
                {
                    b.HasOne("meli.Models.Author", "author")
                        .WithMany()
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("meli.Models.Library", "library")
                        .WithMany("books")
                        .HasForeignKey("LibraryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("author");

                    b.Navigation("library");
                });

            modelBuilder.Entity("meli.Models.Order", b =>
                {
                    b.HasOne("meli.Models.Book", "book")
                        .WithMany("orders")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("meli.Models.User", "user")
                        .WithMany("orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("book");

                    b.Navigation("user");
                });

            modelBuilder.Entity("meli.Models.Book", b =>
                {
                    b.Navigation("orders");
                });

            modelBuilder.Entity("meli.Models.Library", b =>
                {
                    b.Navigation("books");
                });

            modelBuilder.Entity("meli.Models.User", b =>
                {
                    b.Navigation("orders");
                });
#pragma warning restore 612, 618
        }
    }
}
