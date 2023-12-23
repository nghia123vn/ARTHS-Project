using Microsoft.AspNetCore.Http;

namespace ARTHS_Data.Models.Requests.Put
{
    public class UpdateImageModel
    {
        public List<IFormFile> Images { get; set; } = new List<IFormFile>();
    }
}
