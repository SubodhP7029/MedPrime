from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static  # new

urlpatterns = [
    # home path's
    path("", views.home, name="homepage"),
    path("register/", views.Register, name="Registeruser"),
    path("registercustomer/", views.CustomerRegister, name="Registercustomer"),
    path("invoice/", views.invoice, name="invoice"),
    path("proformatoinvoice/<int:id>", views.proforma_to_invoice, name="proformatoinvoice",),
    path("deliverychallan/", views.deliverychallan, name="deliverychallan"),
    path("installationReport/", views.installation_Report, name="installationReport"),
    path("contractorbill/", views.contractorbill, name="contractorbill"),
    path("createquotation/", views.createQuotation, name="createquotation"),
    path("proformainvoice/", views.proformainvoice, name="proformainvoice"),
    path("addproduct/", views.addproduct, name="addproduct"),
    path("checkUserName/", views.checkUserName, name="checkUserName"),
    path("profile/", views.dealerProfile, name="UserProfile"),
    

    # view Path's
    path("viewcustomers/", views.vieweditcustomer, name="vieweditcustomer"),
    path("viewdealer/", views.viewdealer, name="viewdealer"),
    path("vieweditproducts/", views.vieweditproducts, name="vieweditproducts"),
    path("vieweinvoices/", views.vieweinvoices, name="vieweinvoices"),
    path("viewproinvoices/",views.viewproinvoices, name="viewproinvoices"),
    path("viewequotations/", views.viewequotations, name="viewequotations"),
    path("viewinstallationreport/", views.view_installation_report, name="viewinstallationreport"),
    path("vieweditdealer/",views.vieweditdealer,name="vieweditdealer",),
    path("viewdeliverychallan/", views.viewdeliverychallan, name="viewdeliverychallan"),
    

    # edit path's
    path("editingdealer/<int:id>", views.editingdealer, name="editingdealer"),
    path("editingproduct/<int:hsn>", views.editingproduct, name="editingproduct"),
    path("editinginvoice/<int:id>", views.editinginvoice, name="editinginvoice",),
    path("editingproformainvoice/<int:id>", views.editing_proforma_invoice, name="editingproformainvoice",),
    path("editingcustomer/<int:id>", views.editingcustomer, name="editingcustomer",),
    path("editinvoices/", views.editinvoices, name="editinvoices/"),


    # delete path's
    path("deletedealer/", views.deletedealer, name="deletedealer"),
    path("deletingdealer/<int:id>", views.deletingdealer, name="deletingdealer"),
    path("deleteproduct/<int:hsn>", views.deleteproduct, name="deleteproduct"),

    # cloning path's
    path("cloninginvoice/<int:id>", views.cloninginvoice, name="cloninginvoice",),
    path("cloningproformainvoice/<int:id>", views.cloning_proforma_invoice, name="cloningproformainvoice",),
    
    # update path's
    path("updatingproduct/<int:id>", views.updatingproduct, name="updatingproduct"),
    path("updatingdealer/<int:id>", views.updatingdealer, name="updatingdealer"), 

    # remove path's
    path("removecustomer/", views.removecustomer, name="removecustomer",),
    path("removeinvoices/", views.removeinvoices, name="removeinvoicess",),
    path("removingdealer/<int:id>", views.removingdealer, name="removingdealer"),
    path("removingcustomer/<int:id>", views.removingcustomer, name="removingcustomer"),
    
    # database path's
    path("addtoinvoicedb/", views.addtoinvoicedb, name="addtoinvoicedbs"),
    path("invoicegetallprod/", views.invoicegetallprod, name="invoicegetallprod"),
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
        "createquotation/gettaxdetailofstate/",
        views.gettaxdetailofstate,
        name="createquotation-gettaxdetailofstate",
    ),
    path(
        "deliverychallan/gettaxdetailofstate/",
        views.gettaxdetailofstate,
        name="createquotation-gettaxdetailofstate",
    ),
    path(
        "viewproinvoices/gettaxdetailofstate/",
        views.gettaxdetailofstate,
        name="viewproinvoices-gettaxdetailofstate",
    ),
    path(
        "invoicegetallprodcol/",
        views.invoicegetallprodcol,
        name="invoicegetallprodcol",
    ),
    path(
        "getdetailofselectedcustmor/",
        views.getdetailofselectedcustmor,
        name="getdetailofselectedcustmors",
    ),
    path(
        "updatingdealer/submitupdatedealer/",
        views.submitupdatedealer,
        name="submitupdatedealer",
    ),
    
   
    #Login and logout path's
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

