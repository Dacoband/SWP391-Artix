using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly YourDbContext _context;

    public ReportsController(YourDbContext context)
    {
        _context = context;
    }

    // GET: api/Reports
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Report>>> GetReports()
    {
        return await _context.Reports.ToListAsync();
    }

    // GET: api/Reports/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Report>> GetReport(int id)
    {
        var report = await _context.Reports.FindAsync(id);

        if (report == null)
        {
            return NotFound();
        }

        return report;
    }

    // POST: api/Reports
    [HttpPost]
    public async Task<ActionResult<Report>> PostReport(Report report)
    {
        _context.Reports.Add(report);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetReport), new { id = report.ReportID }, report);
    }

    // PUT: api/Reports/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutReport(int id, Report report)
    {
        if (id != report.ReportID)
        {
            return BadRequest();
        }

        _context.Entry(report).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ReportExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Reports/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReport(int id)
    {
        var report = await _context.Reports.FindAsync(id);
        if (report == null)
        {
            return NotFound();
        }

        _context.Reports.Remove(report);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ReportExists(int id)
    {
        return _context.Reports.Any(e => e.ReportID == id);
    }
}
