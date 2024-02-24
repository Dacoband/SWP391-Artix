using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class CommissionController : ControllerBase
{
    private readonly YourDbContext _context;

    public CommissionController(YourDbContext context)
    {
        _context = context;
    }

    // GET: api/Commission
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Commission>>> GetCommissions()
    {
        return await _context.Commissions.ToListAsync();
    }

    // GET: api/Commission/5
    [HttpGet("{commissionId}")]
    public async Task<ActionResult<Commission>> GetCommission(int commissionId)
    {
        var commission = await _context.Commissions.FindAsync(commissionId);

        if (commission == null)
        {
            return NotFound();
        }

        return commission;
    }

    // POST: api/Commission
    [HttpPost]
    public async Task<ActionResult<Commission>> PostCommission(Commission commission)
    {
        _context.Commissions.Add(commission);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCommission), new { commissionId = commission.CommissionID }, commission);
    }

    // PUT: api/Commission/5
    [HttpPut("{commissionId}")]
    public async Task<IActionResult> PutCommission(int commissionId, Commission commission)
    {
        if (commissionId != commission.CommissionID)
        {
            return BadRequest();
        }

        _context.Entry(commission).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CommissionExists(commissionId))
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

    // DELETE: api/Commission/5
    [HttpDelete("{commissionId}")]
    public async Task<IActionResult> DeleteCommission(int commissionId)
    {
        var commission = await _context.Commissions.FindAsync(commissionId);
        if (commission == null)
        {
            return NotFound();
        }

        _context.Commissions.Remove(commission);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CommissionExists(int commissionId)
    {
        return _context.Commissions.Any(e => e.CommissionID == commissionId);
    }
}
