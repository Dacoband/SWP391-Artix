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

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);

        if (order == null)
        {
            return NotFound();
        }

        return order;
    }



    // GET: api/Orders/CreatorID/5
    [HttpGet("CreatorID/{CreatorID}")]
    public ActionResult<IEnumerable<Order>> GetOrdersByCreatorID(int CreatorID)
    {
        // Tìm các đơn hàng dựa trên CreatorID
        var orders = _context.Orders.Where(o => o.SellerID == CreatorID).ToList();

        if (orders.Count > 0)
        {
            return Ok(orders);
        }

        return NotFound("Không tìm thấy đơn hàng cho CreatorID này.");
    }


    // GET: api/Orders/5

    [HttpGet("AccountID/{AccountID}")]
    public ActionResult<IEnumerable<Order>> GetOrdersByAccountID(int AccountID)
    {
        // Tìm creator dựa trên AccountID
        var creator = _context.Creators.FirstOrDefault(c => c.AccountID == AccountID);

        if (creator != null)
        {
            // Lấy danh sách các đơn hàng dựa trên CreatorID
            var orders = _context.Orders.Where(o => o.SellerID == creator.CreatorID).ToList();

            if (orders.Count > 0)
            {
                return Ok(orders);
            }
            return NotFound("Không tìm thấy đơn hàng cho AccountID này.");
        }
        return NotFound("Không tìm thấy Creator cho AccountID này.");
    }

    [HttpGet("HaveAccount/{orderID}")]
    public async Task<ActionResult<OrderWithAccountIDDTO>> GetOrderHaveAccountID(int orderID)
    {
        // Lấy thông tin đơn đặt hàng
        var order = await _context.Orders.FindAsync(orderID);

        if (order == null)
        {
            return NotFound();
        }

        // Lấy thông tin accountID từ bảng Creator dựa vào CreatorID của đơn đặt hàng
        var creator = await _context.Creators
            .Where(c => c.CreatorID == order.SellerID)
            .FirstOrDefaultAsync();

        if (creator == null)
        {
            return NotFound();
        }

        // Tạo DTO chứa thông tin của đơn đặt hàng và accountID từ bảng Creator
        var orderWithAccountIDDTO = new OrderWithAccountIDDTO
        {
            OrderID = order.OrderID,
            SellerID = order.SellerID,
            Confirmation = order.Confirmation,
            AccountID = creator.AccountID ,
            BuyerID =order.BuyerID// Thêm thông tin accountID vào DTO

        };

        return orderWithAccountIDDTO;
    }



// POST: api/Orders
       [HttpPost]
    public ActionResult<Order> PostOrder([FromBody] Order order)
    {
        
            // Kiểm tra xem CreatorID có tồn tại trong bảng Creators không
            var creatorExists = _context.Creators.Any(c => c.CreatorID == order.SellerID);
            if (!creatorExists)
            {
                return NotFound("CreatorID không tồn tại trong bảng Creators.");
            }

            _context.Orders.Add(order);
            _context.SaveChanges();

            return Ok(order);
    }



    // PUT: api/Orders/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutOrder(int id, [FromBody] Order order)
    {
        if (id != order.OrderID)
        {
            return BadRequest("Invalid ID");
        }

        var existingOrder = await _context.Orders.FindAsync(id);

        if (existingOrder == null)
        {
            return NotFound();
        }

        // Cập nhật các trường của đơn hàng từ dữ liệu đầu vào
        existingOrder.SellerID = order.SellerID;
        existingOrder.Confirmation = order.Confirmation;
        existingOrder.BuyerID = order.BuyerID;

        _context.Entry(existingOrder).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!OrderExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return Ok("Order updated successfully");
    }

    // Phương thức kiểm tra xem một đơn hàng có tồn tại trong DB không
    private bool OrderExists(int id)
    {
        return _context.Orders.Any(e => e.OrderID == id);
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
public class OrderWithAccountIDDTO
{
    public int OrderID { get; set; }
    public int? SellerID { get; set; }
    public bool Confirmation { get; set; }
    public int? AccountID { get; set; }

    public int? BuyerID { get; set; }
}