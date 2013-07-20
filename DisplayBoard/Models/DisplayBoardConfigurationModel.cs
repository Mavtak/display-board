using System.Collections.Generic;

namespace DisplayBoard.Models
{
    public class DisplayBoardConfigurationModel
    {
        public string Secret { get; set; }
        public List<SlideConfigurationModel> Slides { get; set; }
    }
}