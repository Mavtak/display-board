using System.IO;
using System.Net;
using System.Net.Cache;
using System.Web.Mvc;

namespace DisplayBoard.Controllers
{
    public class UtilitiesController : Controller
    {
        public ActionResult DisplayImage(string url)
        {
            return View((object)url);
        }

        public ActionResult GetContentType(string url)
        {
            var request = WebRequest.Create(url) as HttpWebRequest;

            // hehehe so sneaky
            request.UserAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36";

            using (var response = request.GetResponse())
            {
                var contentType = response.ContentType??string.Empty;

                return Content(contentType);
            }
        }
    }
}
