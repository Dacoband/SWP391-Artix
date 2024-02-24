using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class NotificationController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public NotificationController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Notification
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications()
    {
        return await _context.Notifications.ToListAsync();
    }

    // GET: api/Notification/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Notification>> GetNotification(int id)
    {
        var notification = await _context.Notifications.FindAsync(id);

        if (notification == null)
        {
            return NotFound();
        }

        return notification;
    }

    // POST: api/Notification
    [HttpPost]
    public async Task<ActionResult<Notification>> PostNotification(Notification notification)
    {
        _context.Notifications.Add(notification);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetNotification), new { id = notification.ArtWorkID }, notification);
    }

    // PUT: api/Notification/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutNotification(int id, Notification notification)
    {
        if (id != notification.FollowID)
        {
            return BadRequest();
        }

        _context.Entry(notification).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!NotificationExists(id))
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

    // DELETE: api/Notification/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNotification(int id)
    {
        var notification = await _context.Notifications.FindAsync(id);
        if (notification == null)
        {
            return NotFound();
        }

        _context.Notifications.Remove(notification);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool NotificationExists(int id)
    {
        return _context.Notifications.Any(e => e.ArtWorkID == id);
    }
}