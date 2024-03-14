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


    [HttpGet]
    [Route("api/Followers/{creatorId}")]
    public async Task<ActionResult<List<Creator>>> GetFollowers(int creatorId)
    {
        var followers = await _context.Follows
            .Where(f => f.CreatorID== creatorId)
            .Select(f => f.FollowerID)
            .ToListAsync();

        return Ok(followers);
    }



    // POST: api/Follows
    [HttpPost]
    public async Task<ActionResult> FollowCreator(int followerId, int creatorId)
    {
        var follow = new Follow
        {
            FollowerID = followerId,
            CreatorID = creatorId,
            
        };

        _context.Follows.Add(follow);
        await _context.SaveChangesAsync();

        var creator = await _context.Creators.FindAsync(creatorId);
        creator.FollowCounts++;


        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete]
    public async Task<ActionResult> UnfollowCreator(int followerId, int creatorId)
    {
        var follow = await _context.Follows.FirstOrDefaultAsync(f => f.FollowerID == followerId && f.CreatorID == creatorId);

        if (follow == null)
        {
            return NotFound();
        }

        _context.Follows.Remove(follow);
        await _context.SaveChangesAsync();

        var creator = await _context.Creators.FindAsync(creatorId);
        creator.FollowCounts--;


        await _context.SaveChangesAsync();

        return Ok();
    }
    
    private bool FollowExists(int id)
    {
        return _context.Follows.Any(e => e.FollowerID == id);
    }
}
