using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using Microsoft.EntityFrameworkCore;
using System.Net;

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
        return await _context.CommissionForm.ToListAsync();
    }

    // GET: api/CommissionForm/5
    [HttpGet("{commissionId}")]
    public async Task<ActionResult<CommissionForm>> GetCommissionForm(int commissionId)
    {
        var commissionForm = await _context.CommissionForm.FindAsync(commissionId);

        if (commissionForm == null)
        {
            return NotFound();
        }

        return commissionForm;
    }
    [HttpGet("ByReceiverId/{receiverId}")]
    public async Task<ActionResult<IEnumerable<CommissionForm>>> GetCommissionFormsByReceiverId(int receiverId)
    {
        var commissionForms = await _context.CommissionForm
            .Where(cf => cf.ReceiverID == receiverId)
            .ToListAsync();

        if (commissionForms == null || commissionForms.Count == 0)
        {
            return NotFound();
        }

        return commissionForms;
    }

    [HttpGet("ByRequestorId/{requestorId}")]
    public async Task<ActionResult<IEnumerable<CommissionForm>>> GetCommissionFormsByRequestorId(int requestorId)
    {
        var commissionForms = await _context.CommissionForm
            .Where(cf => cf.RequestorID == requestorId)
            .ToListAsync();

        if (commissionForms == null || commissionForms.Count == 0)
        {
            return NotFound();
        }

        return commissionForms;
    }


    // POST: api/CommissionForm
    [HttpPost]
    public async Task<ActionResult<CommissionForm>> PostCommissionForm(CommissionForm commissionForm)
    {
        _context.CommissionForm.Add(commissionForm);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCommissionForm), new { commissionId = commissionForm.CommissionID }, commissionForm);
    }

    // PUT: api/CommissionForm/5
    [HttpPut("{commissionId}")]
    public async Task<IActionResult> PutCommissionForm(int commissionId, CommissionForm commissionForm)
    {
        if (commissionId != commissionForm.CommissionFormID
            )
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


    [HttpGet("total-commission/{creatorId}")]
    public async Task<ActionResult<double>> GetTotalCommissionByCreatorId(int creatorId)
    {
        try
        {
            // Tính tổng lượng nhận commission theo CreatorID
            var totalCommission = await _context.CommissionForm
                .Where(cf => cf.ReceiverID == creatorId)
                .SumAsync(cf => cf.CommissionFormID); 

            return totalCommission;
        }
        catch (Exception ex)
        {
            // Xử lý lỗi nếu có
            return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred while processing your request.");
        }
    }

    [HttpGet("total-sent-commission/{creatorId}")]
    public async Task<ActionResult<double>> GetTotalSentCommissionByCreatorId(int creatorId)
    {
        try
        {
            // Tính tổng lượng gửi commission theo CreatorID
            var totalSentCommission = await _context.CommissionForm
                .Where(cf => cf.RequestorID == creatorId)
                .SumAsync(cf => cf.CommissionFormID); 

            return totalSentCommission;
        }
        catch (Exception ex)
        {
            // Xử lý lỗi nếu có
            return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred while processing your request.");
        }
    }



    // DELETE: api/CommissionForm/5
    [HttpDelete("{commissionId}")]
    public async Task<IActionResult> DeleteCommissionForm(int commissionId)
    {
        var commissionForm = await _context.CommissionForm.FindAsync(commissionId);
        if (commissionForm == null)
        {
            return NotFound();
        }

        _context.CommissionForm.Remove(commissionForm);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CommissionFormExists(int commissionId)
    {
        return _context.CommissionForm.Any(e => e.CommissionID == commissionId);
    }
}
