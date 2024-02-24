using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class PayPalAccountController : ControllerBase
{
    private readonly YourDbContext _context;

    public PayPalAccountController(YourDbContext context)
    {
        _context = context;
    }

    // GET: api/PayPalAccount
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PaypalAccount>>> GetPayPalAccounts()
    {
        return await _context.PayPalAccounts.ToListAsync();
    }

    // GET: api/PayPalAccount/5
    [HttpGet("{id}")]
    public async Task<ActionResult<PaypalAccount>> GetPayPalAccount(int id)
    {
        var payPalAccount = await _context.PayPalAccounts.FindAsync(id);

        if (payPalAccount == null)
        {
            return NotFound();
        }

        return payPalAccount;
    }

    // POST: api/PayPalAccount
    [HttpPost]
    public async Task<ActionResult<PaypalAccount>> PostPayPalAccount(PaypalAccount payPalAccount)
    {
        _context.PayPalAccounts.Add(payPalAccount);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPayPalAccount), new { id = payPalAccount.PayPalAccountID }, payPalAccount);
    }

    // PUT: api/PayPalAccount/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPayPalAccount(int id, PaypalAccount payPalAccount)
    {
        if (id != payPalAccount.PayPalAccountID)
        {
            return BadRequest();
        }

        _context.Entry(payPalAccount).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PayPalAccountExists(id))
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

    // DELETE: api/PayPalAccount/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePayPalAccount(int id)
    {
        var payPalAccount = await _context.PayPalAccounts.FindAsync(id);
        if (payPalAccount == null)
        {
            return NotFound();
        }

        _context.PayPalAccounts.Remove(payPalAccount);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PayPalAccountExists(int id)
    {
        return _context.PayPalAccounts.Any(e => e.PayPalAccountID == id);
    }
}