using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DisplayBoard.Helpers
{
    public static class Serializer
    {
        public static string ToJson(this object data)
        {
            var settings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                Formatting = Formatting.None
            };
            var result = JsonConvert.SerializeObject(data, settings);

            return result;
        }
    }
}