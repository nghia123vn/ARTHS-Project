using ARTHS_API.Configurations.Middleware;
using ARTHS_Data.Models.Requests.Filters;
using ARTHS_Data.Models.Requests.Get;
using ARTHS_Data.Models.Requests.Post;
using ARTHS_Data.Models.Requests.Put;
using ARTHS_Data.Models.Views;
using ARTHS_Service.Interfaces;
using ARTHS_Utility.Constants;
using ARTHS_Utility.Helpers;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace ARTHS_API.Controllers
{
    [Route("api/discounts")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly IDiscountService _discountService;
        public DiscountController(IDiscountService discountService)
        {
            _discountService = discountService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(BasicDiscountViewModel), StatusCodes.Status200OK)]
        [SwaggerOperation(Summary = "Get all discounts.")]
        public async Task<ActionResult<ListViewModel<BasicDiscountViewModel>>> GetDiscounts([FromQuery] DiscountFilterModel filter, [FromQuery] PaginationRequestModel pagination)
        {
            return await _discountService.GetDiscounts(filter, pagination);
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(typeof(DiscountViewModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [SwaggerOperation(Summary = "Get discount by id.")]
        public async Task<ActionResult<DiscountViewModel>> GetDiscount([FromRoute] Guid id)
        {
            return await _discountService.GetDiscount(id);
        }

        [HttpPost]
        [Authorize(UserRole.Owner)]
        [ProducesResponseType(typeof(DiscountViewModel), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
        [SwaggerOperation(Summary = "Create discount.")]
        public async Task<ActionResult<DiscountViewModel>> CreateDiscount([FromForm][Required] CreateDiscountModel model)
        {
            var Discount = await _discountService.CreateDiscount(model);
            //chuẩn REST
            return CreatedAtAction(nameof(GetDiscount), new { id = Discount.Id }, Discount);
        }

        [HttpPut]
        [Authorize(UserRole.Owner)]
        [Route("{id}")]
        [ProducesResponseType(typeof(DiscountViewModel), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
        [SwaggerOperation(Summary = "Update discount.")]
        public async Task<ActionResult<DiscountViewModel>> UpdateDiscount([FromRoute] Guid id, [FromForm] UpdateDiscountModel model)
        {
            var Discount = await _discountService.UpdateDiscount(id, model);
            return CreatedAtAction(nameof(GetDiscount), new { id = Discount.Id }, Discount);
        }

        [HttpPut]
        [Authorize(UserRole.Owner)]
        [Route("discontinued/{id}")]
        [ProducesResponseType(typeof(DiscountViewModel), StatusCodes.Status201Created)]
        [SwaggerOperation(Summary = "Discontinued discounts.")]
        public async Task<ActionResult<DiscountViewModel>> DiscontinuedDiscount([FromRoute] Guid id)
        {
            var Discount = await _discountService.DiscontinuedDiscount(id);
            return CreatedAtAction(nameof(GetDiscount), new { id = Discount.Id }, Discount);
        }

    }
}
