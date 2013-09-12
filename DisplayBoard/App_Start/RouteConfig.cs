using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace DisplayBoard
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Homepage",
                url: "",
                defaults: new { controller = "DisplayBoard", action = "Index" }
            );

            routes.MapRoute(
                name: "Create",
                url: "Create",
                defaults: new { controller = "DisplayBoard", Action = "Create" }
            );

            routes.MapRoute(
                name: "Utilities",
                url: "Utilities/{action}",
                defaults: new { controller = "Utilities"}
            );

            routes.MapRoute(
                name: "Actions",
                url: "{name}/{Action}",
                defaults: new { controller = "DisplayBoard", Action = "Display"},
                constraints:new {Action = "(Create|Edit|Display|Data)"}
            );
        }
    }
}