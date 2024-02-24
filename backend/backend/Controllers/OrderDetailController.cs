using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class OrderDetailController : ControllerBase
{
    private readonly YourDbContext _context;

    public OrderDetailController(YourDbContext context)
    {
        _context = context;
    }

    // GET: api/OrderDetail
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDetail>>> GetOrderDetails()
    {
        return await _context.OrderDetails.ToListAsync();
    }

    // GET: api/OrderDetail/5
    [HttpGet("{orderId}/{artworkId}")]
    public async Task<ActionResult<OrderDetail>> GetOrderDetail(int orderId, int artworkId)
    {
        var orderDetail = await _context.OrderDetails.FindAsync(orderId, artworkId);

        if (orderDetail == null)
        {
            return NotFound();
        }

        return orderDetail;
    }

    // POST: api/OrderDetail
    [HttpPost]
    public async Task<ActionResult<OrderDetail>> PostOrderDetail(OrderDetail orderDetail)
    {
        _context.OrderDetails.Add(orderDetail);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrderDetail), new { orderId = orderDetail.OrderID, artworkId = orderDetail.ArtworkID }, orderDetail);
    }

    // DELETE: api/OrderDetail/5
    [HttpDelete("{orderId}/{artworkId}")]
    public async Task<IActionResult> DeleteOrderDetail(int orderId, int artworkId)
    {
        var orderDetail = await _context.OrderDetails.FindAsync(orderId, artworkId);
        if (orderDetail == null)
        {
            return NotFound();
        }

        _context.OrderDetails.Remove(orderDetail);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}