using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class FollowsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FollowsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Follows
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Follow>>> GetFollows()
    {
        return await _context.Follows.ToListAsync();
    }

    // GET: api/Follows/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Follow>> GetFollow(int id)
    {
        var follow = await _context.Follows.FindAsync(id);

        if (follow == null)
        {
            return NotFound();
        }

        return follow;
    }

    // POST: api/Follows
    [HttpPost]
    public async Task<ActionResult<Follow>> PostFollow(Follow follow)
    {
        _context.Follows.Add(follow);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetFollow), new { id = follow.FollowId }, follow);
    }

    // PUT: api/Follows/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutFollow(int id, Follow follow)
    {
        if (id != follow.FollowId)
        {
            return BadRequest();
        }

        _context.Entry(follow).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!FollowExists(id))
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

    // DELETE: api/Follows/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFollow(int id)
    {
        var follow = await _context.Follows.FindAsync(id);
        if (follow == null)
        {
            return NotFound();
        }

        _context.Follows.Remove(follow);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool FollowExists(int id)
    {
        return _context.Follows.Any(e => e.FollowId == id);
    }
}
