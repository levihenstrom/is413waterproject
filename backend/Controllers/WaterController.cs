using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers;

[Route("[controller]")]
[ApiController]
public class WaterController(WaterDbContext context) : ControllerBase
{

    [HttpGet("allprojects")]
    public IActionResult GetProjects(int pageHowMany = 10, int pageNum = 1, [FromQuery] List<string>? projectTypes = null)
    {

        var query = context.Projects.AsQueryable();

        if (pageHowMany <= 0 || pageNum <= 0)
        {
            return BadRequest("pageHowMany and pageNum must be greater than zero.");
        }

        if (projectTypes is { Count: > 0 })
        {
            query = query.Where(p => p.ProjectType != null && projectTypes.Contains(p.ProjectType));
        }

        var totalNumProjects = query.Count();

        var projects = query
            .OrderBy(p => p.ProjectId)
            .Skip((pageNum - 1) * pageHowMany)
            .Take(pageHowMany)
            .ToList();

        return Ok(new
        {
            projects,
            totalNumProjects
        });
    }

    [HttpGet("GetProjectsTypes")]
    public IActionResult GetProjectsTypes()
    {
        var projectTypes = context.Projects
            .Select(p => p.ProjectType)
            .Distinct()
            .ToList();

        return Ok(projectTypes);

    }
}
