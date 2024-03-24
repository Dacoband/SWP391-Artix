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

    [HttpGet("All")]
    public async Task<ActionResult<IEnumerable<OrderDetail>>> GetAllOrderDetails()
    {
        var orderDetails = await _context.OrderDetail
    .Join(
        _context.Orders, // Bảng Order
        od => od.OrderID, // Khóa ngoại của OrderDetail
        o => o.OrderID, // Khóa chính của Order
        (od, o) => new { OrderDetail = od, Order = o }) // Select vào một anonymous object
    .Join(
        _context.Creators, // Bảng Creator
        join => join.Order.CreatorID, // Khóa ngoại của Order
        c => c.CreatorID, // Khóa chính của Creator
        (join, c) => new { OrderDetail = join.OrderDetail, Creator = c }) // Select vào một anonymous object
    .Join(
        _context.Artworks, // Bảng Artwork
        join => join.OrderDetail.ArtWorkID, // Khóa ngoại của OrderDetail
        a => a.ArtworkID, // Khóa chính của Artwork
        (join, a) => new { join.OrderDetail, join.Creator, Artwork = a }) // Select vào một anonymous object
    .Select(join => new OrderDetailDTO
    {
        OrderDetailID = join.OrderDetail.OrderDetailID,
        OrderID = join.OrderDetail.OrderID,
        CreatorUsername = join.Creator.UserName,
        CreatorFirstName = join.Creator.FirstName,
        ArtworkName = join.Artwork.ArtworkName,
        ArtWorkID = join.Artwork.ArtworkID,
        DateOfPurchase = join.OrderDetail.DateOfPurchase,
        Price = join.OrderDetail.Price,
        
        // Các thông tin khác từ OrderDetail
    })
    .ToListAsync();

        return Ok(orderDetails);

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





public class OrderDetailDTO
{
    public int OrderDetailID { get; set; }
    public int OrderID { get; set; }
    public string CreatorUsername { get; set; } // Thêm thuộc tính này
    public string CreatorFirstName { get; set; } // Đảm bảo rằng bạn đã có thuộc tính này trong lớp OrderDetailDTO
    public string ArtworkName { get; set; }

    public int ArtWorkID { get; set; }
    public DateTime DateOfPurchase { get; set; }
    public double Price { get; set; }
    
}
