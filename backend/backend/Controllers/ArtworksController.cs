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
    private readonly ApplicationDbContext _context;

    public ArtworksController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Artworks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Artworks>>> GetArtworks()
    {
        var artworks = await _context.Artworks
     .Select(a => new Artworks
     {
         // Assuming Id is the problematic Int32 property, handle NULL with null-conditional operator
         ArtworkID = a.ArtworkID,
         CreatorID = a.CreatorID,
         TagID = a.TagID,
         ArtworkName = a.ArtworkName,
         Description = a.Description,
         DateCreated = a.DateCreated,
         Likes = a.Likes,
         Purchasable = a.Purchasable,
         Price = a.Price,
         ImageFile = a.ImageFile != null ? (byte[])a.ImageFile : new byte[0],

     })
     .ToListAsync();

        return artworks;

    }

    // GET: api/Artworks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Artworks>> GetArtwork(int id)
    {
        var artwork = await _context.Artworks
            .Select(a => new Artworks
            {
                ArtworkID = a.ArtworkID,
                CreatorID = a.CreatorID,
                TagID = a.TagID,
                ArtworkName = a.ArtworkName,
                Description = a.Description,
                DateCreated = a.DateCreated,
                Likes = a.Likes,
                Purchasable = a.Purchasable,
                Price = a.Price,
                ImageFile = a.ImageFile != null ? (byte[])a.ImageFile : new byte[0],
            })
            .FirstOrDefaultAsync(a => a.ArtworkID == id);

        if (artwork == null)
        {
            return NotFound();
        }

        return artwork;
    }
    [HttpGet("ByCreator/{Crid}")]
    public async Task<ActionResult<IEnumerable<Artworks>>> GetArtworkByCreatorID(int Crid)
    {
        var artworks = await _context.Artworks
            .Where(a => a.CreatorID == Crid)
            .ToListAsync();

        if (artworks == null || artworks.Count == 0)
        {
            return NotFound();
        }

        return artworks;
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
        using (var transaction = _context.Database.BeginTransaction())
        {

            // Xóa tất cả các bình luận liên quan
            var commentsToDelete = _context.Comments.Where(c => c.ArtWorkID == id).ToList();

            if (commentsToDelete.Any())
            {
                _context.Comments.RemoveRange(commentsToDelete);
                await _context.SaveChangesAsync();
            }

            // Xóa bức tranh
            var artwork = await _context.Artworks.FindAsync(id);
            if (artwork == null)
            {
                transaction.Rollback();
                return NotFound();
            }

            _context.Artworks.Remove(artwork);
            await _context.SaveChangesAsync();

            transaction.Commit();

            return NoContent();

        }
    }




    private bool ArtworkExists(int id)
    {
        return _context.Artworks.Any(e => e.ArtworkID == id);
    }
}