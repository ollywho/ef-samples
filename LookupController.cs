namespace EFTours.Atlas.Donuts.ApplicationService.Controllers
{

    public class LookupController : ApiController
    {
        public LookupController(ILookupRepository argLookupRepository)
        {
            _lookupRepository = argLookupRepository;
        }

        private readonly ILookupRepository _lookupRepository;

        [HttpGet]
        [Route("lookups")]
        public HttpResponseMessage GetLookups([FromUri] GetLookupsRequest argGetLookupsRequest)
        {
            try
            {
                argGetLookupsRequest.Validate();
            }
            catch (Exception ex)
            {
                HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
                if (ex is ArgumentException)
                {
                    statusCode = HttpStatusCode.BadRequest;
                }
                return Request.CreateErrorResponse(statusCode, ex);
            }

            try
            {
                var result = new Dictionary<string, IEnumerable<object>>();

                foreach (string name in argGetLookupsRequest.LookupNames)
                {
                    string trimmedName = name.Trim();
                    IEnumerable<object> lookup = _lookupRepository.GetLookup(trimmedName);
                    result[trimmedName] = lookup;
                }

                HttpResponseMessage httpResponse = Request.CreateResponse(result);
                return httpResponse;
            }
            catch (Exception ex)
            {
                ExceptionManager.Publish(ex);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
