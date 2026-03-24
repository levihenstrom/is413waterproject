using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data;

public class WaterDbContext(DbContextOptions<WaterDbContext> options) : DbContext(options)
{
    public DbSet<Project> Projects => Set<Project>();
}
