from frappe.www.login import get_context as get_frappe_login_context

from high_speed_login.login_branding import get_context as get_brand_context


no_cache = True


def get_context(context):
    get_frappe_login_context(context)
    context.no_header = True
    context.no_cache = 1
    context.title = "ERPNext Login"
    context.high_speed = get_brand_context()
    return context
