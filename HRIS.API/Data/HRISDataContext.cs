﻿using HRIS.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HRIS.API.Data
{
    public class HRISDataContext : DbContext
    {
        public HRISDataContext(DbContextOptions<HRISDataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserGroup>().HasKey(ug => new { ug.UserID, ug.GroupID });

            modelBuilder.Entity<UserGroup>()
                .HasOne<User>(x => x.User)
                .WithMany(x => x.UsersGroups)
                .HasForeignKey(x => x.UserID);

            modelBuilder.Entity<UserGroup>()
                .HasOne<Group>(x => x.Group)
                .WithMany(x => x.UsersGroups)
                .HasForeignKey(x => x.GroupID);
        }


        public DbSet<User> HRISUsers { get; set; }
        public DbSet<UserList> UserList { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<UserGroup> UsersGroups { get; set; }
        public DbSet<RC> RC { get; set; }

    }
}