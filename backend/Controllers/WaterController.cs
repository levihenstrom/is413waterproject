using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers;

[Route("[controller]")]
[ApiController]
public class WaterController(WaterDbContext context) : ControllerBase
{
    [HttpGet("allprojects")]
    public IActionResult GetProjects(int pageHowMany = 10, int pageNum = 1)
    {
        if (pageHowMany <= 0 || pageNum <= 0)
        {
            return BadRequest("pageHowMany and pageNum must be greater than zero.");
        }

        var totalNumProjects = context.Projects.Count();

        var projects = context.Projects
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

    [HttpGet("functionalprojects")]
    public IActionResult GetFunctionalProjects()
    {
        var projects = context.Projects
            .Where(p => p.ProjectFunctionalityStatus == "Functional")
            .OrderBy(p => p.ProjectId)
            .ToList();

        return Ok(projects);
    }
}
