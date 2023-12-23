﻿using ARTHS_Data.Models.Requests.Filters;
using ARTHS_Data.Models.Requests.Get;
using ARTHS_Data.Models.Views;
using ARTHS_Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ARTHS_API.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ListViewModel<AccountViewModel>), StatusCodes.Status200OK)]
        [SwaggerOperation(Summary = "Get all accounts.")]
        public async Task<ActionResult<ListViewModel<AccountViewModel>>> GetAccounts([FromQuery] AccountFilterModel filter, [FromQuery] PaginationRequestModel pagination)
        {
            var accounts = await _accountService.GetAccounts(filter, pagination);
            return Ok(accounts);
        }
    }
}
