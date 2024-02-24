using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class CommentsController : ControllerBase
{
    private readonly  _context;

    public CommentsController(YourDbContext context)
    {
        _context = context;
    }

    // GET: api/Comments
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Comments>>> GetComments()
    {
        return await _context.Comments.ToListAsync();
    }

    // GET: api/Comments/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Comments>> GetComment(int id)
    {
        var comment = await _context.Comments.FindAsync(id);

        if (comment == null)
        {
            return NotFound();
        }

        return comment;
    }

    // POST: api/Comments
    [HttpPost]
    public async Task<ActionResult<Comments>> PostComment(Comments comment)
    {
        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetComment), new { id = comment.CommentID }, comment);
    }

    // PUT: api/Comments/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutComment(int id, Comments comment)
    {
        if (id != comment.CommentID)
        {
            return BadRequest();
        }

        _context.Entry(comment).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CommentExists(id))
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

    // DELETE: api/Comments/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComment(int id)
    {
        var comment = await _context.Comments.FindAsync(id);
        if (comment == null)
        {
            return NotFound();
        }

        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CommentExists(int id)
    {
        return _context.Comments.Any(e => e.CommentID == id);
    }
}
