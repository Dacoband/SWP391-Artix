using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class TagController : ControllerBase
{
    private readonly YourDbContext _context;

    public TagController(YourDbContext context)
    {
        _context = context;
    }

    // GET: api/Tag
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tags>>> GetTags()
    {
        return await _context.Tags.ToListAsync();
    }

    // GET: api/Tag/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Tags>> GetTag(int id)
    {
        var tag = await _context.Tags.FindAsync(id);

        if (tag == null)
        {
            return NotFound();
        }

        return tag;
    }

    // POST: api/Tag
    [HttpPost]
    public async Task<ActionResult<Tags>> PostTag(Tags tag)
    {
        _context.Tags.Add(tag);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTag), new { id = tag.TagID }, tag);
    }

    // PUT: api/Tag/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTag(int id, Tags tag)
    {
        if (id != tag.TagID)
        {
            return BadRequest();
        }

        _context.Entry(tag).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TagExists(id))
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

    // DELETE: api/Tag/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTag(int id)
    {
        var tag = await _context.Tags.FindAsync(id);
        if (tag == null)
        {
            return NotFound();
        }

        _context.Tags.Remove(tag);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TagExists(int id)
    {
        return _context.Tags.Any(e => e.TagID == id);
    }
}
