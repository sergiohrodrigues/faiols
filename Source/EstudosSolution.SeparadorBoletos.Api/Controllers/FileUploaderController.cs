using EstudosSolution.SeparadorBoletos.Api.Swagger;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace EstudosSolution.SeparadorBoletos.Api.Controllers;


[ApiController]
public class FileUploaderController : ControllerBase
{
    public FileUploaderController()
    {
    }

    [HttpGet("/api/upload-boletos")]
    [SwaggerOperation(Tags = [SwaggerAnotations.TAG_UPLOAD_BOLETOS], Description = SwaggerAnotations.DESC_UPLOAD_BOLETOS)]
    public string UploadFile()
    {
        return "Teste Controller";
    }
}