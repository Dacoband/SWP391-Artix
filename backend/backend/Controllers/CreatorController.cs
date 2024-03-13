using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;


[ApiController]
[Route("api/[controller]")]
public class CreatorController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CreatorController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Creator
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Creator>>> GetCreators()
    {
        var creators = await _context.Creators
            .Select(c => new Creator
            {
                CreatorID = c.CreatorID,
                PaypalAccount = c.PaypalAccount,
                UserName = c.UserName,
                FollowerID = c.FollowerID, 
                ProfilePicture = c.ProfilePicture, 
                FirstName = c.FirstName,
                LastName = c.LastName,
                Address = c.Address,
                Phone = c.Phone,
                LastLogDate = c.LastLogDate,
                AllowCommission = c.AllowCommission,
                Biography =c.Biography,
                
            })
            .ToListAsync();

        return creators;
    }






    // GET: api/Creator/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Creator>> GetCreator(int id)
    {
        var creator = await _context.Creators.FindAsync(id);

        if (creator == null)
        {
            return NotFound();
        }

        return creator;
    }


    // POST: api/Creator
    [HttpPost]
    public async Task<IActionResult> CreateCreator([FromBody] Creator creatorModel)
    {
        if (creatorModel == null)
        {
            return BadRequest("Invalid data. Creator object is null.");
        }

        // Kiểm tra xem tệp hình ảnh có giá trị không
        if (!string.IsNullOrEmpty(creatorModel.ProfilePicture))
        {
            try
            {
                // Thực hiện xử lý kiểm tra và chuyển đổi dữ liệu Base64 nếu cần
                byte[] imageBytes = Convert.FromBase64String(creatorModel.ProfilePicture);
                // Lưu imageBytes vào cơ sở dữ liệu hoặc thực hiện các bước xử lý khác tùy thuộc vào yêu cầu của bạn
            }
            catch (FormatException)
            {
                return BadRequest("Định dạng hình ảnh không hợp lệ");
            }
        }

        _context.Creators.Add(creatorModel);
        await _context.SaveChangesAsync();

        // Trả về đối tượng đã được tạo
        return Ok(creatorModel);
    }


    // PUT: api/Creator/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCreator(int id, Creator creator)
    {
        if (id != creator.CreatorID)
        {
            return BadRequest();
        }

        _context.Entry(creator).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CreatorExists(id))
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

    // DELETE: api/Creator/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCreator(int id)
    {
        var creator = await _context.Creators.FindAsync(id);
        if (creator == null)
        {
            return NotFound();
        }

        _context.Creators.Remove(creator);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CreatorExists(int id)
    {
        return _context.Creators.Any(e => e.CreatorID == id);
    }
}
