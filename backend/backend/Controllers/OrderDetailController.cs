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

    [HttpGet("ByBuyer/{buyerId}")]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByBuyerId(int buyerId)
    {
        var orders = await _context.Orders
            .Where(o => o.BuyerID == buyerId)
            .ToListAsync();

        if (orders == null)
        {
            return NotFound();
        }

        return orders;
    }
    [HttpGet("BySeller/{sellerId}")]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrdersBySellerId(int sellerId)
    {
        var orders = await _context.Orders
            .Where(o => o.SellerID == sellerId)
            .ToListAsync();

        if (orders == null)
        {
            return NotFound();
        }

        return orders;
    }


    [HttpGet("All")]
    public async Task<ActionResult<IEnumerable<OrderDetailDTO>>> GetAllOrderDetails()
    {
        var orderDetails = await _context.OrderDetail
    .Join(
        _context.Orders,
        od => od.OrderID,
        o => o.OrderID,
        (od, o) => new { OrderDetail = od, Order = o })
    .Join(
        _context.Creators, // Bảng Creators đầu tiên, liên quan đến Seller
        join => join.Order.SellerID,
        seller => seller.CreatorID, // Đổi tên bí danh của bảng Creators này thành seller
        (join, seller) => new { join.OrderDetail, join.Order, Seller = seller })
    .Join(
        _context.Creators, // Bảng Creators thứ hai, liên quan đến Buyer
        join => join.Order.BuyerID,
        buyer => buyer.CreatorID, // Đổi tên bí danh của bảng Creators này thành buyer
        (join, buyer) => new { join.OrderDetail, join.Seller, Buyer = buyer })
    .Join(
        _context.Artworks,
        join => join.OrderDetail.ArtWorkID,
        a => a.ArtworkID,
        (join, a) => new { join.OrderDetail, join.Seller, join.Buyer, Artwork = a })
    .Select(join => new OrderDetailDTO
    {
        OrderDetailID = join.OrderDetail.OrderDetailID,
        OrderID = join.OrderDetail.OrderID,
        ArtWorkID = join.OrderDetail.ArtWorkID,
        BuyerName = join.Buyer.UserName,
        SellerName = join.Seller.UserName,
        DateOfPurchase = join.OrderDetail.DateOfPurchase,
        Price = join.OrderDetail.Price,
        PurchaseConfirmationImage = join.OrderDetail.PurchaseConfirmationImage
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
    public int ArtWorkID { get; set; }
    public string BuyerName { get; set; }
    public string SellerName { get; set; }
    public DateTime  DateOfPurchase { get; set; }
    public double Price { get; set; }
    public string PurchaseConfirmationImage { get; set; }
}
