using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class ModeratorsController : ControllerBase
{
    private readonly YourDbContext _context;

    public ModeratorsController(YourDbContext context)
    {
        _context = context;
    }

    // GET: api/Moderators
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Moderators>>> GetModerators()
    {
        return await _context.Moderators.ToListAsync();
    }

    // GET: api/Moderators/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Moderators>> GetModerator(int id)
    {
        var moderator = await _context.Moderators.FindAsync(id);

        if (moderator == null)
        {
            return NotFound();
        }

        return moderator;
    }

    // POST: api/Moderators
    [HttpPost]
    public async Task<ActionResult<Moderators>> PostModerator(Moderators moderator)
    {
        _context.Moderators.Add(moderator);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetModerator), new { id = moderator.ModeratorID }, moderator);
    }

    // PUT: api/Moderators/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutModerator(int id, Moderators moderator)
    {
        if (id != moderator.ModeratorID)
        {
            return BadRequest();
        }

        _context.Entry(moderator).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ModeratorExists(id))
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

    // DELETE: api/Moderators/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteModerator(int id)
    {
        var moderator = await _context.Moderators.FindAsync(id);
        if (moderator == null)
        {
            return NotFound();
        }

        _context.Moderators.Remove(moderator);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ModeratorExists(int id)
    {
        return _context.Moderators.Any(e => e.ModeratorID == id);
    }
}