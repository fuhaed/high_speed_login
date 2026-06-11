import frappe


@frappe.whitelist(allow_guest=True)
def get_context():
    company_name = frappe.conf.get("high_speed_login_company_name") or _get_default_company()
    language = _get_site_language()

    return {
        "company_name": company_name or "HSPOS",
        "subtitle": frappe.conf.get("high_speed_login_subtitle") or "نظام نقاط البيع وإدارة الأعمال",
        "support_name": frappe.conf.get("high_speed_login_support_name") or "مؤسسة السرعة العالية",
        "support_address": frappe.conf.get("high_speed_login_support_address") or "القصيم - بريدة - حي الافق",
        "support_phone": frappe.conf.get("high_speed_login_support_phone") or "0555179010 - 0553231199",
        "language": language,
    }


def _get_default_company():
    company = frappe.db.get_single_value("Global Defaults", "default_company")
    if company:
        return company

    companies = frappe.get_all("Company", pluck="name", limit=1, ignore_permissions=True)
    return companies[0] if companies else None


def _get_site_language():
    language = frappe.db.get_single_value("System Settings", "language")
    language = language or frappe.db.get_default("lang") or frappe.local.lang or "en"
    return "ar" if str(language).lower().startswith("ar") else "en"
