(function () {
    const LOGIN_PATHS = ["/login", "/login/", "/", ""];

    function isLoginPage() {
        return LOGIN_PATHS.includes(window.location.pathname) || window.location.hash === "#login";
    }

    function ready(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    function call(method) {
        return fetch(`/api/method/${method}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: "{}",
        })
            .then((response) => response.json())
            .then((data) => data.message || {});
    }

    function getLanguage() {
        const lang = (document.documentElement.lang || navigator.language || "ar").toLowerCase();
        const dir = document.documentElement.dir || document.body.dir || "";
        return dir === "rtl" || lang.startsWith("ar") ? "ar" : "en";
    }

    function t(lang) {
        if (lang === "en") {
            return {
                product: "ERPNext System",
                badge: "Business operations platform",
                headline: "A calmer way to run your business",
                description: "Sales, inventory, finance, and compliance in one secure workspace.",
                signIn: "Sign in",
                signInHint: "Access your ERPNext workspace",
                email: "Username or email",
                password: "Password",
                forgot: "Forgot password?",
                show: "Show",
                emailLink: "Login with Email Link",
                powered: "Powered by High Speed IT",
                address: "Qassim - Buraydah - Al Ufuq District",
                contact: "Contact",
                features: ["Sales", "Inventory", "Finance", "ZATCA"],
            };
        }

        return {
            product: "نظام ERPNext",
            badge: "منصة إدارة الأعمال",
            headline: "إدارة هادئة وواضحة لأعمالك",
            description: "المبيعات والمخزون والحسابات والامتثال في مساحة عمل واحدة وآمنة.",
            signIn: "تسجيل الدخول",
            signInHint: "الوصول إلى مساحة عمل ERPNext",
            email: "اسم المستخدم أو البريد الإلكتروني",
            password: "كلمة المرور",
            forgot: "هل نسيت كلمة المرور؟",
            show: "إظهار",
            emailLink: "الدخول برابط البريد",
            powered: "بدعم من مؤسسة السرعة العالية",
            address: "القصيم - بريدة - حي الافق",
            contact: "للتواصل",
            features: ["المبيعات", "المخزون", "الحسابات", "الزكاة والضريبة"],
        };
    }

    function icon(name) {
        const icons = {
            spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>',
            lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V8a4 4 0 0 1 8 0v2"/>',
            arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
            arrowLeft: '<path d="M19 12H5m6-6-6 6 6 6"/>',
        };
        return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
    }

    function featurePills(items) {
        return items.map((item) => `<span class="hsl-pill">${item}</span>`).join("");
    }

    function escapeHtml(value) {
        return String(value || "").replace(/[&<>"']/g, (character) => {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            }[character];
        });
    }

    function applyFormText(root, lang) {
        const text = t(lang);

        root.querySelectorAll(".page-card-head h4").forEach((title) => {
            title.textContent = text.signIn;
            title.setAttribute("data-subtitle", text.signInHint);
        });

        const email = root.querySelector("#login_email");
        if (email) email.placeholder = text.email;

        const password = root.querySelector("#login_password");
        if (password) password.placeholder = text.password;

        const loginButton = root.querySelector(".btn-login");
        if (loginButton) {
            loginButton.innerHTML = `${text.signIn} <span class="hsl-button-icon">${icon(lang === "ar" ? "arrowLeft" : "arrowRight")}</span>`;
        }

        root.querySelectorAll(".forgot-password-message a").forEach((link) => {
            link.textContent = text.forgot;
        });

        root.querySelectorAll(".toggle-password").forEach((toggle) => {
            toggle.textContent = text.show;
        });

        root.querySelectorAll(".btn-login-with-email-link").forEach((link) => {
            link.textContent = text.emailLink;
        });
    }

    function watchFrappeText(root, lang) {
        applyFormText(root, lang);
        const observer = new MutationObserver(() => applyFormText(root, lang));
        observer.observe(root, { childList: true, subtree: true, characterData: true });
        setTimeout(() => observer.disconnect(), 8000);
    }

    function render(context) {
        if (document.body.classList.contains("hsl-login-ready")) return;
        if (document.querySelector(".hsl-server-rendered")) return;

        let sections = Array.from(
            document.querySelectorAll(
                "section.for-login, section.for-email-login, section.for-signup, section.for-forgot, section.for-login-with-email-link"
            )
        );
        if (!sections.length && window.location.pathname === "/" && window.location.hash !== "#login") {
            return;
        }
        if (!sections.length) return;

        const loginSection = document.querySelector("section.for-login");
        if (loginSection) {
            loginSection.classList.remove("hide");
        }

        const lang = getLanguage();
        const text = t(lang);
        const companyName = escapeHtml(context.company_name || text.product);
        document.body.classList.add("hsl-login-ready", lang === "ar" ? "hsl-rtl" : "hsl-ltr");

        const host = document.querySelector("main") || document.body;
        const shell = document.createElement("div");
        shell.className = "hsl-login-shell";
        shell.innerHTML = `
            <div class="hsl-ambient hsl-ambient-one"></div>
            <div class="hsl-ambient hsl-ambient-two"></div>
            <section class="hsl-auth-card">
                <div class="hsl-story">
                    <div class="hsl-mark">${icon("spark")}</div>
                    <p class="hsl-badge">${text.badge}</p>
                    <h1>${text.product}</h1>
                    <div class="hsl-company-name" aria-label="${lang === "ar" ? "اسم الشركة" : "Company name"}">
                        ${companyName}
                    </div>
                    <p class="hsl-description">${text.description}</p>
                    <div class="hsl-pills">${featurePills(text.features)}</div>
                    <div class="hsl-support">
                        <strong>${text.powered}</strong>
                        <span>${context.support_address || text.address}</span>
                        <span>${text.contact}: ${context.support_phone}</span>
                    </div>
                </div>
                <div class="hsl-form-side">
                    <div class="hsl-form-top">
                        <div class="hsl-form-icon">${icon("lock")}</div>
                        <div>
                            <div class="hsl-form-kicker">${text.product}</div>
                            <div class="hsl-form-subtitle">${text.signInHint}</div>
                        </div>
                    </div>
                    <div class="hsl-form-wrap"></div>
                </div>
            </section>
        `;

        const formWrap = shell.querySelector(".hsl-form-wrap");
        sections.forEach((section) => formWrap.appendChild(section));

        host.innerHTML = "";
        host.appendChild(shell);
        watchFrappeText(formWrap, lang);
    }

    ready(function () {
        if (!isLoginPage()) return;

        if (window.location.pathname === "/" && window.location.hash !== "#login") {
            window.history.replaceState(null, "", "/#login");
        }

        call("high_speed_login.login_branding.get_context")
            .then(render)
            .catch(() =>
                render({
                    company_name: "ERPNext",
                    support_address: "القصيم - بريدة - حي الافق",
                    support_phone: "0555179010 - 0553231199",
                })
            );
    });
})();
