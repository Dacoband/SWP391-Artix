using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/artworks")]
    public class ArtworksController : ControllerBase
    {
        private readonly ApplicationDbContext _context; // Replace YourDbContext with your actual database context

        public ArtworksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/artworks
        [HttpGet]
        public async Task<IActionResult> GetArtworks()
        {
            var artworks = await _context.Artworks
                .Include(a => a.ArtworkTag)
                .Select(a => new Artworks
                {
                    ArtworkID = a.ArtworkID,
                    CreatorID = a.CreatorID,
                    ArtworkName = a.ArtworkName,
                    Description = a.Description,
                    DateCreated = a.DateCreated,
                    Likes = a.Likes,
                    Purchasable = a.Purchasable,
                    Price = a.Price,
                    ImageFile = a.ImageFile,
                    ArtworkTag = a.ArtworkTag
                })
                .ToListAsync();

            return Ok(artworks);
        }

        // GET: api/artworks/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtwork(int id)
        {
            var artwork = await _context.Artworks
                .Include(a => a.ArtworkTag)
                .Select(a => new Artworks
                {
                    ArtworkID = a.ArtworkID,
                    CreatorID = a.CreatorID,
                    ArtworkName = a.ArtworkName,
                    Description = a.Description,
                    DateCreated = a.DateCreated,
                    Likes = a.Likes,
                    Purchasable = a.Purchasable,
                    Price = a.Price,
                    ImageFile = a.ImageFile,
                    ArtworkTag = a.ArtworkTag
                })
                .FirstOrDefaultAsync(a => a.ArtworkID == id);

            if (artwork == null)
            {
                return NotFound();
            }

            return Ok(artwork);
        }

        // POST: api/artworks
        [HttpPost]
        public async Task<IActionResult> CreateArtwork([FromBody] Artworks artwork)
        {
            try
            {
                // Kiểm tra xem CreatorID có tồn tại không
                if (!_context.Creators.Any(c => c.CreatorID == artwork.CreatorID))
                {
                    return BadRequest("CreatorID không tồn tại");
                }

                // Kiểm tra xem TagID có tồn tại không
                if (artwork.ArtworkTag != null && artwork.ArtworkTag.Any())
                {
                    var invalidTagIds = artwork.ArtworkTag
                        .Where(at => !_context.Tags.Any(t => t.TagID == at.TagID))
                        .Select(at => at.TagID)
                        .ToList();

                    if (invalidTagIds.Any())
                    {
                        return BadRequest($"TagID không tồn tại: {string.Join(", ", invalidTagIds)}");
                    }
                }

                // Thêm artwork vào cơ sở dữ liệu
                _context.Artworks.Add(artwork);
                await _context.SaveChangesAsync();

                // Thêm ArtworkTag vào cơ sở dữ liệu
                foreach (var artworkTag in artwork.ArtworkTag)
                {
                    // Không cần thiết lập ArtworkID vì nó sẽ tự động tăng
                    _context.ArtworkTag.Add(artworkTag);
                }

                await _context.SaveChangesAsync();

                return Ok("Artwork created successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }

                return BadRequest("An error occurred while saving the entity changes. See the inner exception for details.");
            }
        }

        // PUT: api/artworks/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtwork(int id, [FromBody] Artworks artworkRequest)
        {
            if (id != artworkRequest.ArtworkID)
            {
                return BadRequest("Invalid ID");
            }

            var existingArtwork = await _context.Artworks
                .Include(a => a.ArtworkTag)
                .FirstOrDefaultAsync(a => a.ArtworkID == id);

            if (existingArtwork == null)
            {
                return NotFound();
            }

            existingArtwork.CreatorID = artworkRequest.CreatorID;
            existingArtwork.ArtworkName = artworkRequest.ArtworkName;
            existingArtwork.Description = artworkRequest.Description;
            existingArtwork.DateCreated = artworkRequest.DateCreated;
            existingArtwork.Likes = artworkRequest.Likes;
            existingArtwork.Purchasable = artworkRequest.Purchasable;
            existingArtwork.Price = artworkRequest.Price;
            existingArtwork.ImageFile = artworkRequest.ImageFile;

            // Update tags
            existingArtwork.ArtworkTag.Clear();
            existingArtwork.ArtworkTag = artworkRequest.ArtworkTag.Select(tag => new ArtworkTag
            {
                TagID = tag.TagID
            }).ToList();

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

            return Ok("Artwork updated successfully");
        }

        private bool ArtworkExists(int id)
        {
            return _context.Artworks.Any(e => e.ArtworkID == id);
        }
    }
}