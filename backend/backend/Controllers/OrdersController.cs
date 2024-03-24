using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OrdersController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Orders
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        return await _context.Orders.ToListAsync();
    }

    // GET: api/Orders/5
    [HttpGet("creator/{creatorID}")]
    public ActionResult<IEnumerable<Order>> GetOrdersByCreatorID(int creatorID)
    {
        var orders = _context.Orders.Where(o => o.CreatorID == creatorID).ToList();
        if (orders.Count > 0)
        {
            return Ok(orders);
        }
        return NotFound();
    }
    // POST: api/Orders
    [HttpPost]
    public ActionResult<Order> PostOrder([FromBody] Order order)
    {
        
            // Kiểm tra xem CreatorID có tồn tại trong bảng Creators không
            var creatorExists = _context.Creators.Any(c => c.CreatorID == order.CreatorID);
            if (!creatorExists)
            {
                return NotFound("CreatorID không tồn tại trong bảng Creators.");
            }

            _context.Orders.Add(order);
            _context.SaveChanges();

            return Ok(order);
        }
        
    

    // DELETE: api/Orders/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
        {
            return NotFound();
        }

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
