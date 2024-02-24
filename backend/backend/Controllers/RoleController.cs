using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class RoleController : ControllerBase
{
    private readonly YourDbContext _context;

    public RoleController(YourDbContext context)
    {
        _context = context;
    }

    // GET: api/Role
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Roles>>> GetRoles()
    {
        return await _context.Roles.ToListAsync();
    }

    // GET: api/Role/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Roles>> GetRole(int id)
    {
        var role = await _context.Roles.FindAsync(id);

        if (role == null)
        {
            return NotFound();
        }

        return role;
    }

    // POST: api/Role
    [HttpPost]
    public async Task<ActionResult<Roles>> PostRole(Roles role)
    {
        _context.Roles.Add(role);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetRole), new { id = role.RoleID }, role);
    }

    // PUT: api/Role/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutRole(int id, Roles role)
    {
        if (id != role.RoleID)
        {
            return BadRequest();
        }

        _context.Entry(role).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RoleExists(id))
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

    // DELETE: api/Role/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRole(int id)
    {
        var role = await _context.Roles.FindAsync(id);
        if (role == null)
        {
            return NotFound();
        }

        _context.Roles.Remove(role);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool RoleExists(int id)
    {
        return _context.Roles.Any(e => e.RoleID == id);
    }
}