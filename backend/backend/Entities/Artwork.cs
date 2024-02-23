using Microsoft.AspNetCore.Mvc;

namespace backend.Entities
{
    public class Artwork : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
