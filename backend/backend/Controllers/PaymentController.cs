using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PaymentController(ApplicationDbContext context)
    {
        _context = context;
    }

    
    [HttpGet("admin-qr")]
    public ActionResult<string> GetAdminQrCode()
    {
        var adminRole = _context.Roles.FirstOrDefault(r => r.RoleID == 1);
        if (adminRole != null)
        {
            var adminAccount = _context.Account.FirstOrDefault(a => a.RoleID == adminRole.RoleID);
            if (adminAccount != null)
            {
                var payment = _context.Payment.FirstOrDefault(p => p.AccountID == adminAccount.AccountID);
                if (payment != null)
                {
                    return Ok(payment.QrCode);
                }
            }
        }
        return NotFound();
    }

    // GET: api/PayPalAccount/5
    [HttpGet("account-qr/{accountID}")]
    public ActionResult<string> GetAccountQrCode(int accountID)
    {
        var payment = _context.Payment.FirstOrDefault(p => p.AccountID == accountID);
        if (payment != null)
        {
            return Ok(payment.QrCode);
        }
        return NotFound();
    }

    // POST: api/PayPalAccount

    [HttpPost]
    public ActionResult<string> PostQrCode([FromBody] Payment  qrCodeDTO)
    {
        try
        {
            var account = _context.Account.FirstOrDefault(a => a.AccountID == qrCodeDTO.AccountID);
            if (account != null)
            {
                var payment = new Payment
                {
                    QrCode = qrCodeDTO.QrCode,
                    AccountID = qrCodeDTO.AccountID
                };
                _context.Payment.Add(payment);
                _context.SaveChanges();
                return Ok(payment.QrCode);
            }
            return NotFound();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }



    // PUT: api/PayPalAccount/5
    //[HttpPut("{id}")]
    //public async Task<IActionResult> PutPayPalAccount(int id, Payment payPalAccount)
    //{
    //    if (id != payPalAccount.PayPalAccountID)
    //    {
    //        return BadRequest();
    //    }

    //    _context.Entry(payPalAccount).State = EntityState.Modified;

    //    try
    //    {
    //        await _context.SaveChangesAsync();
    //    }
    //    catch (DbUpdateConcurrencyException)
    //    {
    //        if (!PayPalAccountExists(id))
    //        {
    //            return NotFound();
    //        }
    //        else
    //        {
    //            throw;
    //        }
    //    }

    //    return NoContent();
    //}

    // DELETE: api/PayPalAccount/5
    //[HttpDelete("{id}")]
    //public async Task<IActionResult> DeletePayPalAccount(int id)
    //{
    //    var payPalAccount = await _context.PayPalAccount.FindAsync(id);
    //    if (payPalAccount == null)
    //    {
    //        return NotFound();
    //    }

    //    _context.PayPalAccount.Remove(payPalAccount);
    //    await _context.SaveChangesAsync();

    //    return NoContent();
    //}

    //private bool PayPalAccountExists(int id)
    //{
    //    return _context.PayPalAccount.Any(e => e.PayPalAccountID == id);
    //}
}