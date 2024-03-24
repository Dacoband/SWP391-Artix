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
    private readonly ApplicationDbContext _context;

    public OrderDetailController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/OrderDetail
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDetail>>> GetOrderDetails()
    {
        return await _context.OrderDetail.ToListAsync();
    }

    // GET: api/OrderDetail/5
    [HttpGet("{orderId}/{artworkId}")]
    public async Task<ActionResult<OrderDetail>> GetOrderDetail(int orderId, int artworkId)
    {
        var orderDetail = await _context.OrderDetail.FindAsync(orderId, artworkId);

        if (orderDetail == null)
        {
            return NotFound();
        }

        return orderDetail;
    }
    [HttpGet("GetNotImage")]
    public async Task<ActionResult<IEnumerable<OrderDetail>>> GetOrderDetailsNotImage()
    {
        var orderDetails = await _context.OrderDetail
            .Select(o => new OrderDetail
            {
                OrderDetailID = o.OrderDetailID,
                OrderID = o.OrderID,
                ArtWorkID = o.ArtWorkID,
                DateOfPurchase = o.DateOfPurchase,
                Price = o.Price
            })
            .ToListAsync();

        return Ok(orderDetails);
    }
    [HttpGet("PurchaseConfirmationImage/{OrderDetailID}")]
    public async Task<ActionResult<string>> GetPurchaseConfirmationImage(int OrderDetailID)
    {
        var orderDetail = await _context.OrderDetail.FindAsync(OrderDetailID);

        if (orderDetail == null)
        {
            return NotFound();
        }

        return Ok(orderDetail.PurchaseConfirmationImage);
    }
    // POST: api/OrderDetail
    [HttpPost]
    public async Task<ActionResult<OrderDetail>> PostOrderDetail(OrderDetail orderDetail)
    {
        _context.OrderDetail.Add(orderDetail);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrderDetail), new { orderId = orderDetail.OrderID, artworkId = orderDetail.ArtWorkID }, orderDetail);
    }

    // DELETE: api/OrderDetail/5
    [HttpDelete("{orderId}/{artworkId}")]
    public async Task<IActionResult> DeleteOrderDetail(int orderId, int artworkId)
    {
        var orderDetail = await _context.OrderDetail.FindAsync(orderId, artworkId);
        if (orderDetail == null)
        {
            return NotFound();
        }

        _context.OrderDetail.Remove(orderDetail);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}