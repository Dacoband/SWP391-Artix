using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class ArtworksController : ControllerBase
{
    private readonly YourDbContext _context;

    public ArtworksController(YourDbContext context)
    {
        _context = context;
    }

    // GET: api/Artworks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Artworks>>> GetArtworks()
    {
        return await _context.Artworks.ToListAsync();
    }

    // GET: api/Artworks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Artworks>> GetArtwork(int id)
    {
        var artwork = await _context.Artworks.FindAsync(id);

        if (artwork == null)
        {
            return NotFound();
        }

        return artwork;
    }

    // POST: api/Artworks
    [HttpPost]
    public async Task<ActionResult<Artworks>> PostArtwork(Artworks artwork)
    {
        _context.Artworks.Add(artwork);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetArtwork), new { id = artwork.ArtworkID }, artwork);
    }

    // PUT: api/Artworks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutArtwork(int id, Artworks artwork)
    {
        if (id != artwork.ArtworkID)
        {
            return BadRequest();
        }

        _context.Entry(artwork).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ArtworkExists(id))
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

    // DELETE: api/Artworks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteArtwork(int id)
    {
        var artwork = await _context.Artworks.FindAsync(id);
        if (artwork == null)
        {
            return NotFound();
        }

        _context.Artworks.Remove(artwork);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ArtworkExists(int id)
    {
        return _context.Artworks.Any(e => e.ArtworkID == id);
    }
}
