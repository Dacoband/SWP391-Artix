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
    [HttpPut("{id}")]
    public IActionResult PutCommissionForm(int id, CommissionForm commissionForm)
    {
        if (id != commissionForm.CommissionFormID)
        {
            return BadRequest();
        }

        var existingCommissionForm = _context.CommissionForm.Find(id);

        if (existingCommissionForm == null)
        {
            return NotFound();
        }

        // Update the properties of existingCommissionForm with the values from commissionForm
        existingCommissionForm.CommissionID = commissionForm.CommissionID;
        existingCommissionForm.ReceiverID = commissionForm.ReceiverID;
        existingCommissionForm.RequestorID = commissionForm.RequestorID;
        existingCommissionForm.Description = commissionForm.Description;
        existingCommissionForm.Accept = commissionForm.Accept;
        existingCommissionForm.Progress = commissionForm.Progress;

        _context.CommissionForm.Update(existingCommissionForm);

        try
        {
            _context.SaveChanges();
        }
        catch (Exception)
        {
            return BadRequest();
        }

        return NoContent();
    }



[HttpGet("total-commission/{creatorId}")]
    public async Task<ActionResult<int>> GetTotalCommissionByCreatorId(int creatorId)
    {
        try
        {
            // Đếm số lượng commissionFormID theo CreatorID
            var totalCommissionCount = await _context.CommissionForm
                .Where(cf => cf.ReceiverID == creatorId)
                .CountAsync();

            return totalCommissionCount;
        }
        catch (Exception ex)
        {
            // Xử lý lỗi nếu có
            return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred while processing your request.");
        }
    }





    [HttpGet("ByReceiverIDAddEmailAndPhone/{receiverID}")]
    public IActionResult GetCommissionFormsByReceiverID(int receiverID)
    {
        var commissionForms = _context.CommissionForm
            .Where(cf => cf.ReceiverID == receiverID)
            .Select(cf => new
            {
                cf.CommissionFormID,
                cf.CommissionID,
                cf.ReceiverID,
                cf.RequestorID,
                cf.Description,
                cf.Accept,
                cf.Progress,
                RequestorEmail = _context.Creators
                    .Where(c => c.CreatorID == cf.RequestorID)
                    .Select(c => c.Email)
                    .FirstOrDefault(), // Lấy email của người tạo yêu cầu
                RequestorPhone = _context.Creators
                    .Where(c => c.CreatorID == cf.RequestorID)
                    .Select(c => c.Phone)
                    .FirstOrDefault() // Lấy số điện thoại của người tạo yêu cầu
            })
            .ToList();

        if (commissionForms == null)
        {
            return NotFound();
        }

        return Ok(commissionForms);
    }


    [HttpGet("ByRequestorIDAddEmailAndPhone/{requesterid}")]
    public IActionResult GetCommissionFormsByRequesterID(int requesterid)
    {
        var commissionForms = _context.CommissionForm
            .Where(cf => cf.RequestorID == requesterid)
            .Select(cf => new
            {
                cf.CommissionFormID,
                cf.CommissionID,
                cf.ReceiverID,
                cf.RequestorID,
                cf.Description,
                cf.Accept,
                cf.Progress,
                RequestorEmail = _context.Creators
                    .Where(c => c.CreatorID == cf.ReceiverID)
                    .Select(c => c.Email)
                    .FirstOrDefault(), // Lấy email của người tạo yêu cầu
                RequestorPhone = _context.Creators
                    .Where(c => c.CreatorID == cf.ReceiverID)
                    .Select(c => c.Phone)
                    .FirstOrDefault() // Lấy số điện thoại của người tạo yêu cầu
            })
            .ToList();

        if (commissionForms == null)
        {
            return NotFound();
        }

        return Ok(commissionForms);
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
