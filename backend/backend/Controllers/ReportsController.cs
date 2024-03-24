using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public ReportsController(ApplicationDbContext context)
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
    [HttpGet("GetAllReportJoinUserName")]
    public IActionResult GetAllReport()
    {
        var AllReport = _context.Reports
            .Select(cf => new
            {
                cf.ReportID,
                cf.ReporterID,
                cf.ReportedCreatorID,
                cf.Description,
  
                UserNameReproted = _context.Creators
                    .Where(c => c.CreatorID == cf.ReportedCreatorID)
                    .Select(c => c.UserName)
                    .FirstOrDefault(), // Lấy email của người tạo yêu cầu
            })
            .ToList();

        if (AllReport == null)
        {
            return NotFound();
        }

        return Ok(AllReport);
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

        var existingReport = await _context.Reports.FindAsync(id);

        if (existingReport == null)
        {
            return NotFound();
        }

        existingReport.ReporterID = report.ReporterID;
        existingReport.ReportedCreatorID = report.ReportedCreatorID;
        existingReport.Description = report.Description;

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
