var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer(); // Obrigatorio para Swagger
builder.Services.AddSwaggerGen(p =>
    {
        p.EnableAnnotations(); // Permite configurar o SwaggerOperation
    }
); // Obrigatorio para Swagger
builder.Services.AddControllers(); // Obrigatorio para Controllers

var app = builder.Build();

app.UseSwagger(); // Obrigatorio para Swagger
app.UseSwaggerUI(); // Obrigatorio para Swagger
app.MapControllers(); // Obrigatorio para Controllers

app.Run();