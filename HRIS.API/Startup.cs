using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace HRIS.API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;

            EmailManager.SmtpServer = _config["SMTPServer"];
            EmailManager.From = _config["LogEmail:Sender"];
            EmailManager.SendTo = _config["LogEmail:Receiver"];

            ReportManager.Url = _config["Report:Url"].ToString().Replace('@', '/');
            ReportManager.Path = _config["Report:Path"];
            ReportManager.UserName = _config["Report:UserName"];
            ReportManager.Password = _config["Report:Password"];
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //********AutoMapper
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            //********AutoMapper - end

            //********Repository DI
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IGroupRepository, GroupRepository>();
            services.AddScoped<IRCRepository, RCRepository>();
            services.AddScoped<IDPRepository, DPRepository>();
            services.AddScoped<IEcardRepository, EcardRepository>();
            services.AddScoped<IAnnouncementRepository, AnnouncementRepository>();
            //********Repository DI - end

            services.AddTransient<UserActionFilter>();

            //********add windows authentication for http option request
            services.AddAuthentication(IISDefaults.AuthenticationScheme);
            //services.Configure<IISOptions>(options => options.AutomaticAuthentication = true);
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Latest);
            services.AddMvc(config =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                config.Filters.Add(new AuthorizeFilter(policy));
                //config.Filters.Add(new ServiceFilterAttribute(typeof(UserActionFilter)));
            });

            //********add windows authentication for http option request - end

            //********Configure_DBContext
            services.AddDbContext<HRISDataContext>(options =>
            {
                options.UseSqlServer(_config.GetConnectionString("HRISConnection"));
            });

            services.AddDbContext<GDSDataContext>(options =>
            {
                options.UseSqlServer(_config.GetConnectionString("GDSConnection"));
            });
            //********Configure_DBContext - end

            services.AddControllers();

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    context.Response.StatusCode = 500;
                    context.Response.ContentType = "application/json";

                    var exceptionHandlerPathFeature =
                        context.Features.Get<IExceptionHandlerPathFeature>();

                    EmailManager.SendEmail("Error catched in " + env.ApplicationName + " " + env.EnvironmentName, 
                        exceptionHandlerPathFeature.Error.Message);

                    var error = new { exceptionHandlerPathFeature.Error.Message};

                    await context.Response.WriteAsync(Newtonsoft.Json.JsonConvert.SerializeObject(error)); //(exceptionHandlerPathFeature.Error.Message);
                });
            });

            app.UseHttpsRedirection();

            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200","https://webd16dssap01/HRISv2").AllowCredentials());

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
