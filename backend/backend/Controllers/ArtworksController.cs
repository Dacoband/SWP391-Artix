using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Authorization;
using System.Net;
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
            .OrderBy(a => a.DateCreated) // Sắp xếp theo ngày tạo
            .Include(a => a.ArtworkTag) // Kèm theo thông tin tag của artwork
            .Select(a => new Artworks // Tạo đối tượng DTO để chứa thông tin cần thiết
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

        if (artworks == null || artworks.Count == 0)
        {
            return NotFound();
        }

        return Ok(artworks);
    }



    [HttpGet("recent-artworks")]
    public async Task<ActionResult<IEnumerable<Artworks>>> GetRecentArtworks()
    {
        var recentArtworks = await _context.Artworks
            .OrderByDescending(a => a.ArtworkID) // Sử dụng ID nếu cần
            .Take(2)
            .Include(a => a.ArtworkTag) // Kèm theo thông tin tag của artwork
        .Select(a => new Artworks // Tạo đối tượng DTO để chứa thông tin cần thiết
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

        return recentArtworks;
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
        using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
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



            // Lưu trữ ArtworkID đã được tạo tự động
            var artworkId = artwork.ArtworkID;


            // Thêm ArtworkTag vào cơ sở dữ liệu
            foreach (var artworkTag in artwork.ArtworkTag)
            {
                // Thiết lập ArtworkID với giá trị đã được tạo tự động
                artworkTag.ArtworkID = artworkId;

                _context.ArtworkTag.Add(artworkTag);
            }

            await _context.SaveChangesAsync();
            scope.Complete();
            return Ok(artwork);
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

        _context.Entry(existingArtwork).State = EntityState.Detached;

        existingArtwork.ArtworkName = artworkRequest.ArtworkName;
        existingArtwork.Description = artworkRequest.Description;
        existingArtwork.Likes = artworkRequest.Likes;
        existingArtwork.Purchasable = artworkRequest.Purchasable;
        existingArtwork.Price = artworkRequest.Price;

        // Update tags
        existingArtwork.ArtworkTag = artworkRequest.ArtworkTag.Select(tag => new ArtworkTag
        {
            TagID = tag.TagID
        }).ToList();

        _context.Entry(existingArtwork).State = EntityState.Modified;

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



    //GET: API/artwork/{Top10Liked}
    [HttpGet("Top10Liked")]
    public async Task<ActionResult<IEnumerable<Artworks>>> GetTopLikedArtworks()
    {
        var topLikedArtworks = await _context.Artworks
            .OrderByDescending(a => a.Likes)
            .Take(10)
            .ToListAsync();

        if (topLikedArtworks == null || topLikedArtworks.Count == 0)
        {
            return NotFound();
        }

        return topLikedArtworks;
    }

    // GET: api/artworks/random11
    [HttpGet("random10")]
    public async Task<IActionResult> GetRandom11Artworks()
    {
        // Lấy danh sách tất cả các artworks từ cơ sở dữ liệu
        var allArtworks = await _context.Artworks.ToListAsync();

        // Kiểm tra xem có artworks nào không
        if (allArtworks.Count == 0)
        {
            return NotFound("Không có artworks nào trong cơ sở dữ liệu.");
        }

        // Lấy 11 artworks ngẫu nhiên từ danh sách tất cả các artworks
        var randomArtworks = GetRandomElements(allArtworks, 10);

        return Ok(randomArtworks);
    }

    // Hàm chọn ngẫu nhiên các phần tử từ danh sách
    private List<Artworks> GetRandomElements(List<Artworks> list, int count)
    {
        var random = new Random();
        var randomArtworks = new List<Artworks>();

        while (randomArtworks.Count < count)
        {
            var index = random.Next(0, list.Count);
            var artwork = list[index];

            // Kiểm tra xem artwork đã được chọn trước đó chưa
            if (!randomArtworks.Contains(artwork))
            {
                randomArtworks.Add(artwork);
            }
        }

        return randomArtworks;
    }




    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReport(int id)
    {
        try
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
            {
                return NotFound();
            }

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            //_logger.LogError(ex, "An error occurred while deleting the report.");
            return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred while processing your request.");
        }
    }





}