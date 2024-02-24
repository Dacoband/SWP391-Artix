using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CommissionFormController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CommissionFormController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/CommissionForm
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CommissionForm>>> GetCommissionForms()
    {
        return await _context.CommissionForms.ToListAsync();
    }

    // GET: api/CommissionForm/5
    [HttpGet("{commissionId}")]
    public async Task<ActionResult<CommissionForm>> GetCommissionForm(int commissionId)
    {
        var commissionForm = await _context.CommissionForms.FindAsync(commissionId);

        if (commissionForm == null)
        {
            return NotFound();
        }

        return commissionForm;
    }

    // POST: api/CommissionForm
    [HttpPost]
    public async Task<ActionResult<CommissionForm>> PostCommissionForm(CommissionForm commissionForm)
    {
        _context.CommissionForms.Add(commissionForm);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCommissionForm), new { commissionId = commissionForm.CommissionID }, commissionForm);
    }

    // PUT: api/CommissionForm/5
    [HttpPut("{commissionId}")]
    public async Task<IActionResult> PutCommissionForm(int commissionId, CommissionForm commissionForm)
    {
        if (commissionId != commissionForm.CommissionID)
        {
            return BadRequest();
        }

        _context.Entry(commissionForm).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CommissionFormExists(commissionId))
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

    // DELETE: api/CommissionForm/5
    [HttpDelete("{commissionId}")]
    public async Task<IActionResult> DeleteCommissionForm(int commissionId)
    {
        var commissionForm = await _context.CommissionForms.FindAsync(commissionId);
        if (commissionForm == null)
        {
            return NotFound();
        }

        _context.CommissionForms.Remove(commissionForm);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CommissionFormExists(int commissionId)
    {
        return _context.CommissionForms.Any(e => e.CommissionID == commissionId);
    }
}
