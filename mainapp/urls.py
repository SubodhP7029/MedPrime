from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static  # new

urlpatterns = [
    path("", views.home, name="homepage"),
    path("register/", views.Register, name="Registeruser"),
    path("registercustomer/", views.CustomerRegister, name="Registercustomer"),
    path("viewdealers/", views.vieweditdealer, name="vieweditdealer"),
    path("viewcustomers/", views.vieweditcustomer, name="vieweditcustomer"),
    path("vieweditproducts/", views.vieweditproducts, name="vieweditproducts"),
    path(
        "updatingdealer/submitupdatedealer/",
        views.submitupdatedealer,
        name="submitupdatedealer",
    ),
    path("deletedealer/", views.deletedealer, name="deletedealer"),
    path("deletingdealer/<int:id>", views.deletingdealer, name="deletingdealer"),
    path("updatingdealer/<int:id>", views.updatingdealer, name="updatingdealer"),
    path("cloninginvoice/<int:id>", views.cloninginvoice, name="cloninginvoice",),
    path("editinginvoice/<int:id>", views.editinginvoice, name="editinginvoice",),
    path("updatingproduct/<int:id>", views.updatingproduct, name="updatingproduct"),
    path("invoicegetallprod/", views.invoicegetallprod, name="invoicegetallprod"),
    path("vieweinvoices/", views.vieweinvoices, name="vieweinvoices"),
    path("viewequotations/", views.viewequotations, name="viewequotations"),
    path(
        "getdetailofselectedcustmor/",
        views.getdetailofselectedcustmor,
        name="getdetailofselectedcustmors",
    ),
    path("removeinvoices/", views.removeinvoices, name="removeinvoicess",),
    path("editinvoices/", views.editinvoices, name="editinvoices/"),
    path("addtoinvoicedb/", views.addtoinvoicedb, name="addtoinvoicedbs",),
    path(
        "invoice/gettaxdetailofstate/",
        views.gettaxdetailofstate,
        name="gettaxdetailofstate",
    ),
    path(
        "vieweinvoices/gettaxdetailofstate/",
        views.gettaxdetailofstate,
        name="vieweinvoices-gettaxdetailofstate",
    ),
    path(
        "invoicegetallprodcol/",
        views.invoicegetallprodcol,
        name="invoicegetallprodcol",
    ),
    path("invoice/", views.invoice, name="invoice"),
    path("deliverychallan/", views.deliverychallan, name="deliverychallan"),
    path("InstallationReport/", views.InstallationReport, name="InstallationReport"),
    path("contractorbill/", views.contractorbill, name="contractorbill"),
    path("quotation/", views.quotation, name="quotation"),
    path("proformainvoice/", views.proformainvoice, name="proformainvoice"),
    path("addproduct/", views.addproduct, name="addproduct"),
    path("checkUserName/", views.checkUserName, name="checkUserName"),
    path("profile/", views.dealerProfile, name="UserProfile"),
    path(
        "login/", auth_views.LoginView.as_view(template_name="login.html"), name="login"
    ),
    path(
        "logout/",
        auth_views.LogoutView.as_view(template_name="logout.html"),
        name="logout",
    ),
]
if settings.DEBUG:  # new
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
