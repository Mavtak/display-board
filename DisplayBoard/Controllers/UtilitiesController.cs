using System.Web.Mvc;

namespace DisplayBoard.Controllers
{
    public class UtilitiesController : Controller
    {
        public ActionResult DisplayImage(string url)
        {
            return View((object)url);
        }

    }
}
