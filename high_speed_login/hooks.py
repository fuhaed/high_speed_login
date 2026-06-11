app_name = "high_speed_login"
app_title = "High Speed Login"
app_publisher = "High Speed IT"
app_description = "Custom ERPNext login page branding"
app_email = "support@highspeed.local"
app_license = "MIT"

web_include_css = ["/assets/high_speed_login/css/login_branding.css"]
web_include_js = ["/assets/high_speed_login/js/login_branding.js"]

website_route_rules = [
    {"from_route": "/login", "to_route": "high_speed_login"},
    {"from_route": "/", "to_route": "high_speed_login"},
]
