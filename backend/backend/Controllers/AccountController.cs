using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
[ApiController]
[Route("api/[controller]")]

 public class AccountController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AccountController(ApplicationDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Account>>> GetArtworks()
    {
        var account = await _context.Account
     .Select(ac => new Account
     {
         // Assuming Id is the problematic Int32 property, handle NULL with null-conditional operator
        AccountID = ac.AccountID,
        RoleID = ac.RoleID,
        Username = ac.Username,
        Password = ac.Password,
        Email = ac.Email,
     })
     .ToListAsync();

        return account;
    }


    [HttpGet("id/{id}")]
    public async Task<ActionResult<Account>> GetAccountById(int id)
    {
        var account = await _context.Account
            .Where(ac => ac.AccountID == id) // Filter by the specified AccountID
            .Select(ac => new Account
            {
                AccountID = ac.AccountID,
                // Other properties...
            })
            .FirstOrDefaultAsync();

        if (account == null)
        {
            return NotFound(); // Return a 404 Not Found if the account with the specified ID is not found
        }

        return account;
    }

    [HttpGet("email/{email}")]
    public async Task<ActionResult<Account>> GetAccountByEmail(string email)
    {
        var account = await _context.Account
            .Where(ac => ac.Email == email) // Filter by the specified Email
            .Select(ac => new Account
            {
                AccountID = ac.AccountID,
                RoleID=ac.RoleID,
                Username=ac.Username,
                Password = ac.Password,
                Email = ac.Email
                // Other properties...
            })
            .FirstOrDefaultAsync();

        if (account == null)
        {
            return NotFound(); // Return a 404 Not Found if the account with the specified Email is not found
        }

        return account;
    }

}
