using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class ViewReportController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ViewReportController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/ViewReport
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ViewReport>>> GetViewReports()
    {
        return await _context.ViewReports.ToListAsync();
    }

    // GET: api/ViewReport/5
    [HttpGet("{moderatorId}/{reportId}")]
    public async Task<ActionResult<ViewReport>> GetViewReport(int moderatorId, int reportId)
    {
        var viewReport = await _context.ViewReports.FindAsync(moderatorId, reportId);

        if (viewReport == null)
        {
            return NotFound();
        }

        return viewReport;
    }

    // POST: api/ViewReport
    [HttpPost]
    public async Task<ActionResult<ViewReport>> PostViewReport(ViewReport viewReport)
    {
        _context.ViewReports.Add(viewReport);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetViewReport), new { moderatorId = viewReport.ModeratorID, reportId = viewReport.ReportID }, viewReport);
    }

    // DELETE: api/ViewReport/5
    [HttpDelete("{moderatorId}/{reportId}")]
    public async Task<IActionResult> DeleteViewReport(int moderatorId, int reportId)
    {
        var viewReport = await _context.ViewReports.FindAsync(moderatorId, reportId);
        if (viewReport == null)
        {
            return NotFound();
        }

        _context.ViewReports.Remove(viewReport);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
