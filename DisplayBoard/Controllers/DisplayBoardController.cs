using System.Web.Mvc;

namespace DisplayBoard.Controllers
{
    public class DisplayBoardController : Controller
    {
        public ActionResult Display(string name)
        {
            return View();
        }

    }
}
