using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Routing;
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

        public ActionResult Create(string name, string secret)
        {
            var path = ConfigurationPath(name);
            if (System.IO.File.Exists(path))
            {
                //TODO: throw better exception
                throw new Exception("Display Board already exists.");
            }

            var model = new DisplayBoardConfigurationModel
            {
                Secret = secret,
                Slides = new List<SlideConfigurationModel>()
            };

            SaveConfiguration(name, model);

            return RedirectToAction("Edit", new {name});
        }

        [HttpGet]
        public ActionResult Edit(string name)
        {
            var model = GetConfiguration(name);
            model.Secret = string.Empty;

            return View(model);
        }

        [HttpPost]
        public ActionResult Edit(string name, DisplayBoardConfigurationModel model)
        {
            var savedModel = GetConfiguration(name);

            if (!String.Equals(savedModel.Secret??string.Empty, model.Secret??string.Empty))
            {
                throw new Exception("Shut up!");
            }

            SaveConfiguration(name, model);

            return RedirectToAction("Display", new {name});
        }

        public ActionResult Display(string name)
        {
            var model = GetConfiguration(name);
            model.Secret = null;

            return View(model);
        }

        public ActionResult Data(string name)
        {
            var model = GetConfiguration(name);
            model.Secret = null;

            return Content(model.ToJson(), "application/json");
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
