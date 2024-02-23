using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class CreatorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
