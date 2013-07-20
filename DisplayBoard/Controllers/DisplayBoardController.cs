using System;
using System.Collections.Generic;
using System.Web.Mvc;
using DisplayBoard.Helpers;
using DisplayBoard.Models;

namespace DisplayBoard.Controllers
{
    public class DisplayBoardController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create(string name)
        {
            var path = ConfigurationPath(name);
            if (System.IO.File.Exists(path))
            {
                //TODO: throw better exception
                throw new Exception("Display Board already exists.");
            }

            var model = new DisplayBoardConfigurationModel
            {
                Slides = new List<SlideConfigurationModel>()
            };

            SaveConfiguration(name, model);

            return RedirectToAction("Edit");
        }

        public ActionResult Edit(string name)
        {
            throw new NotImplementedException();
        }

        public ActionResult Display(string name)
        {
            var model = GetConfiguration(name);

            return View(model);
        }

        private string ConfigurationPath(string name)
        {
            var result = Request.MapPath(Constants.DisplayBoardConfigurationPath) + "/" + name + ".js";
            return result;
        }

        private DisplayBoardConfigurationModel GetConfiguration(string name)
        {
            var path = ConfigurationPath(name);
            if (!System.IO.File.Exists(path))
            {
                return null;
            }

            var configurationContent = System.IO.File.ReadAllText(path);

            var result = configurationContent.FromJson<DisplayBoardConfigurationModel>();

            return result;
        }

        private void SaveConfiguration(string name, DisplayBoardConfigurationModel configuration)
        {
            var path = ConfigurationPath(name);
            var data = configuration.ToJson();
            System.IO.File.WriteAllText(path, data);
        }
    }
}
