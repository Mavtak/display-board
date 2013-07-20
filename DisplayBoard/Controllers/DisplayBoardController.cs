using System.Collections.Generic;
using System.Web.Mvc;
using DisplayBoard.Models;

namespace DisplayBoard.Controllers
{
    public class DisplayBoardController : Controller
    {
        public ActionResult Display(string name)
        {
            var model = new DisplayBoardConfigurationModel
            {
                Slides = new List<SlideConfigurationModel>
                {
                    new SlideConfigurationModel
                    {
                        Url = "/examples/1.html",
                        Title = "Slide 1"
                    },
                    new SlideConfigurationModel
                    {
                        Url = "/examples/2.html",
                        Title = "Slide 2"
                    },
                    new SlideConfigurationModel
                    {
                        Url = "/examples/3.html",
                        Title = "Slide 3"
                    },
                    new SlideConfigurationModel
                    {
                        Url = "/examples/4.html",
                        Title = "Slide 4"
                    }
                }
            };

            return View(model);
        }

    }
}
