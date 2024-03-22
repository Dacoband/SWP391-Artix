using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using System.Net;
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
    public async Task<ActionResult<IEnumerable<Account>>> GetAccount()
    {
        var account = await _context.Account
     .Select(ac => new Account
     {
         // Assuming Id is the problematic Int32 property, handle NULL with null-conditional operator
         AccountID = ac.AccountID,
         RoleID = ac.RoleID,
         Password = ac.Password,
         Email = ac.Email,
         BanAccount= ac.BanAccount,
     })
     .ToListAsync();

        return account;
    }


    [HttpGet("id/{id}")]
    public async Task<ActionResult<Account>> GetAccountById(int id)
    {
        var account = await _context.Account.FindAsync(id);

        if (account == null)
        {
            return NotFound(); // Trả về 404 Not Found nếu không tìm thấy tài khoản với ID cụ thể
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
                RoleID = ac.RoleID,
                Password = ac.Password,
                Email = ac.Email,

                BanAccount = ac.BanAccount,
            })
            .FirstOrDefaultAsync();

        if (account == null)
        {
            return NotFound(); // Return a 404 Not Found if the account with the specified Email is not found
        }

        return account;
    }
    [HttpPost("CreateAccount")]
    public async Task<IActionResult> CheckAccount([FromBody] Account accountToCheck)
    {
        try
        {
            // Kiểm tra xem tài khoản đã tồn tại trong cơ sở dữ liệu chưa
            var existingAccount = await _context.Account.FirstOrDefaultAsync(ac => ac.Email == accountToCheck.Email);

            if (existingAccount != null)
            {
                // Nếu tài khoản đã tồn tại, trả về lỗi BadRequest
                return BadRequest("Account already exists.");
            }

            // Nếu tài khoản chưa tồn tại, thêm tài khoản mới vào cơ sở dữ liệu
            _context.Account.Add(accountToCheck);
            await _context.SaveChangesAsync();

            // Trả về tài khoản đã tạo thành công
            return CreatedAtAction(nameof(GetAccountById), new { id = accountToCheck.AccountID }, accountToCheck);
        }
        catch (Exception ex)
        {
            // Xử lý lỗi nếu có
            return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred while processing your request.");
        }
    }




    [HttpPut("{id}")]
    public async Task<IActionResult> PutAccount(int id, Account account)
    {
        if (id != account.AccountID)
        {
            return BadRequest(); // Trả về BadRequest nếu ID không khớp với ID của tài khoản được gửi
        }

        var existingAccount = await _context.Account.FindAsync(id);
        if (existingAccount == null)
        {
            return NotFound(); // Trả về 404 Not Found nếu không tìm thấy tài khoản với ID cụ thể
        }

        // Cập nhật thông tin của tài khoản hiện có từ yêu cầu
        existingAccount.RoleID = account.RoleID;
        existingAccount.Password = account.Password;
        existingAccount.Email = account.Email;

        try
        {
            await _context.SaveChangesAsync(); // Lưu thay đổi vào cơ sở dữ liệu
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AccountExists(id))
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAccount(int id)
    {
        var account = await _context.Account.FindAsync(id);
        if (account == null)
        {
            return NotFound();
        }

        _context.Account.Remove(account);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AccountExists(int id)
    {
        return _context.Account.Any(a => a.AccountID == id);
    }

    [HttpPost("login")]
    public async Task<ActionResult<Account>> Login(string email, string password)
    {
        // Tìm tài khoản trong cơ sở dữ liệu dựa trên email
        var account = await _context.Account
            .FirstOrDefaultAsync(ac => ac.Email == email);

        // Nếu không tìm thấy tài khoản với email cung cấp, trả về Unauthorized
        if (account == null)
        {
            return Unauthorized(); // 401 Unauthorized
        }

        // Kiểm tra mật khẩu
        if (password != account.Password)
        {
            return Unauthorized(); // 401 Unauthorized
        }

        // Nếu email và mật khẩu đều khớp, trả về tài khoản
        return account;
    }





}
