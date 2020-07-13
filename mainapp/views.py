from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import F
from datetime import datetime, timedelta
from django.forms.models import model_to_dict


# from datetime import timedelta

from .forms import (
    UserRegisterForm,
    ProfileForm,
    UserUpdateForm,
    DealerUpdateForm,
    ProfileUpdateForm,
    CustomerProfileForm,
    ProductForm,
    DealerRegisterForm,
    TaxInvoiceForm,
    quotationInvoiceForm,
    ProformaInvoiceForm,
    deliveryChallanForm,
    installationReportForm,
)
from .models import (
    Profile,
    CustomerProfile,
    Product,
    SerialNumbercounter,
    taxInvoice,
    gsttable,
    quotationInvoice,
    AllCounters,
    proformaInvoice,
    deliveryChallan,
    installationReport,

)
from django.contrib.auth.models import User
import json
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from django.db import connection, connections, transaction


# Create your views here.

# Home view - main view people will see after logging in


@login_required
def home(request):
    dealercount = Profile.objects.all().count()
    customercount = CustomerProfile.objects.all().count()
    productcount = Product.objects.all().count()
    taxinvoice = taxInvoice.objects.all().count()
    proformainvoice = proformaInvoice.objects.all().count()
    context = {
        "dealercount":dealercount,
        "customercount":customercount,
        "productcount":productcount,
        "taxinvoice":taxinvoice,
        "proformainvoice":proformainvoice,

    }
    return render(request, "index.html", context)


# New Registration of dealer
@login_required
def Register(request):
    if request.method == "POST":
        form = DealerRegisterForm(request.POST)
        profileform = ProfileForm(request.POST)
        if form.is_valid() and profileform.is_valid():
            user = form.save()
            # user.set_password(user.password)
            if request.POST["userdesign"] == "medprime":
                user.is_superuser = True
            else:
                user.is_superuser = False
            user.save()
            profile = profileform.save(commit=False)
            profile.user = user

            profile.save()

            return redirect("homepage")
    else:
        form = DealerRegisterForm()
        profileform = ProfileForm()
    return render(
        request,
        "distributer/registeruser.html",
        {"form": form, "profileform": profileform},
    )


# View/Edit dealer
@login_required
def vieweditdealer(request):
    alldealer = Profile.objects.all()
    return render(request, "distributer/editdistributer.html", {"alldealer": alldealer})


# view all billing invoices
@login_required
def vieweinvoices(request):
    alltaxInvoice = taxInvoice.objects.all()
    totalInvoices = taxInvoice.objects.all().count()
    startdate = datetime.today()
    enddate = startdate - timedelta(days=14)
    totalthismonthsInvoices = taxInvoice.objects.filter(
        invoicedate__range=[startdate, enddate]
    ).count()
    context = {
        "alltaxInvoice": alltaxInvoice,
        "totalInvoices": totalInvoices,
        "totalthismonthsInvoices": totalthismonthsInvoices,
        "startdate": startdate,
        "enddate": enddate,
    }
    return render(request, "Invoice/TaxInvoice/viewinvoice.html", context)

@login_required
def viewproinvoices(request):
    allProformaInvoice = proformaInvoice.objects.all()
    totalProformaInvoices = proformaInvoice.objects.all().count()
    # invoiceid = id
    # thatInvoice = proformaInvoice.objects.filter(invoiceid=request.invoiceid).first()
    startdate = datetime.today()
    enddate = startdate - timedelta(days=14)
    totalthismonthsInvoices = proformaInvoice.objects.filter(
        invoicedate__range=[startdate, enddate]
    ).count()
    context = {
        "allProformaInvoice": allProformaInvoice,
        "totalProformaInvoices": totalProformaInvoices,
        "totalthismonthsInvoices": totalthismonthsInvoices,
        "startdate": startdate,
        "enddate": enddate,
        # "creatorid": thatInvoice.creatorid,
    }
    return render(request, "Invoice/ProformaInvoice/viewproinvoice.html", context)


# view all Quotation invoices
@login_required
def viewequotations(request):
    allquotationInvoice = quotationInvoice.objects.all()
    totalInvoices = quotationInvoice.objects.all().count()
    startdate = datetime.today()
    enddate = startdate - timedelta(days=14)
    totalthismonthsInvoices = quotationInvoice.objects.filter(
        quotationdate__range=[startdate, enddate]
    ).count()
    context = {
        "allquotationInvoice": allquotationInvoice,
        "totalInvoices": totalInvoices,
        "totalthismonthsInvoices": totalthismonthsInvoices,
        "startdate": startdate,
        "enddate": enddate,
    }
    return render(request, "Invoice/Quotation/viewquotations.html", context)

@login_required
def viewdeliverychallan(request):
    allchallaninvoice = deliveryChallan.objects.all()
    totalInvoices = deliveryChallan.objects.all().count()
    startdate = datetime.today()
    enddate = startdate - timedelta(days=14)
    totalthismonthsInvoices = deliveryChallan.objects.filter(
        challandate__range=[startdate, enddate]
    ).count()
    context = {
        "allchallaninvoice": allchallaninvoice,
        "totalInvoices": totalInvoices,
        "totalthismonthsInvoices": totalthismonthsInvoices,
        "startdate": startdate,
        "enddate": enddate,
    }
    return render(request, "Invoice/DeliveryChallan/viewdeliverychallan.html", context)

def view_installation_report(request):
    allinstallationreport = installationReport.objects.all()
    totalInvoices = installationReport.objects.all().count()
    startdate = datetime.today()
    enddate = startdate - timedelta(days=14)
    totalthismonthsInvoices = installationReport.objects.filter(
        installationDate__range=[startdate, enddate]
    ).count()
    context = {
        "allinstallationreport": allinstallationreport,
        "totalInvoices": totalInvoices,
        "totalthismonthsInvoices": totalthismonthsInvoices,
        "startdate": startdate,
        "enddate": enddate,
    }
    return render(request, "Invoice/InstallationReport/viewinstallationreport.html", context)
  

# Individual Profile
@login_required
def dealerProfile(request):
    if request.method == "POST":
        form = UserUpdateForm(request.POST, instance=request.user)
        profileform = ProfileUpdateForm(
            request.POST, request.FILES, instance=request.user.profile
        )
        if form.is_valid() and profileform.is_valid():
            form.save()
            profileform.save()
            return redirect("UserProfile")
    else:
        form = UserUpdateForm(instance=request.user)
        profileform = ProfileUpdateForm(instance=request.user.profile)

    return render(
        request,
        "distributer/UserProfile.html",
        {"form": form, "profileform": profileform},
    )


# New Registration of customer

@login_required
def CustomerRegister(request):
    Profiledata = {
        "distributer": request.user.username,
    }
    form = UserRegisterForm(request.POST or None, request.FILES or None)
    profileform = CustomerProfileForm(request.POST or None, request.FILES or None)
    alldistributers = Profile.objects.all().order_by("user")
    if request.method == "POST":
        if form.is_valid() and profileform.is_valid():
            try:
                if form.cleaned_data["email"] != '':
                    user = User.objects.get(email=form.cleaned_data["email"])
                    messages.warning(request, "Email already exists!")
                else :
                    user = User.objects.get(email='jkfvjkdsv')
            except User.DoesNotExist:
                user = form.save()
                user.set_unusable_password()
                user.is_active = False
                user.save()
                profile = profileform.save(commit=False)
                profile.user = user
                profile.save()
                profileform = CustomerProfileForm()
                form = UserRegisterForm()
                messages.success(request, "Customer created successfully!")  # <-
        else:
            messages.warning(request, "Please fill form correctly!")
            profileform = CustomerProfileForm(request.POST)
            form = UserRegisterForm(request.POST)
    return render(
        request,
        "customer/registercustomer.html",
        {"form": form, "profileform": profileform, "alldistributers": alldistributers},
    )


# View/Edit dealer
@login_required
def vieweditcustomer(request):
    allcustomer = CustomerProfile.objects.all()#filter(distributer=request.user.username)
    return render(request, "customer/viewcustomer.html", {"allcustomer": allcustomer})

# View/Edit dealer
@login_required
def viewdealer(request):
    alldealer = Profile.objects.all() #filter(distributer=request.user.username)
    return render(request, "distributer/viewdealer.html", {"alldealer": alldealer})


# add new product
@login_required
def addproduct(request):
    if request.method == "POST":
        productform = ProductForm(request.POST)
        if productform.is_valid():
            productform.save()
            productform = ProductForm()
            messages.success(request, "Product added successfully")
            # return redirect("homepage")

    else:
        productform = ProductForm()
    return render(request, "product/addproduct.html", {"productform": productform})


# View/Edit products


@login_required
def vieweditproducts(request):
    allproducts = Product.objects.all()
    return render(request, "product/allproducts.html", {"allproducts": allproducts})


# create invoice
@login_required
def invoice(request):
    # alldealers = Profile.objects.all()
    allcustomers = CustomerProfile.objects.all()#filter(distributer=request.user.username)
    currentUser = Profile.objects.all()#filter(user=request.user).first()
    currentUserName = currentUser.values_list('nameofcontact', flat=True)
    currentcounter = AllCounters.objects.filter(name="taxinvoice").first()
    allproducts = Product.objects.all()
    taxinfform = TaxInvoiceForm(request.POST or None)
    context = {
        "currentUserName": currentUserName,
        "allcustomers": allcustomers,
        "currentcounter": currentcounter.counter,
        "taxinfform": taxinfform,
        "allproducts":allproducts,                                           
    }
    if request.method == "POST":
        if taxinfform.is_valid():
            try:
                invoiceID = taxInvoice.objects.get(
                    invoiceid=taxinfform.cleaned_data["invoiceid"]
                )
                messages.warning(request, "Please fill Invoice form!")
            except taxInvoice.DoesNotExist:
                taxinfform.save()
                taxinfform = TaxInvoiceForm()
                invoiceCounter = AllCounters.objects.filter(name="taxinvoice").first()
                invoiceCounter.counter = F("counter") + 1
                invoiceCounter.save()
                taxinfform = TaxInvoiceForm()
                messages.success(request, "Invoice Generated successfully")
        else:
            messages.warning(request, "Error Generating Invoice!")
            taxinfform = TaxInvoiceForm(request.POST)
    return render(request, "Invoice/TaxInvoice/Invoice.html", context)

@login_required
def proformainvoice(request):
    # alldealers = Profile.objects.all()
    allcustomers = CustomerProfile.objects.all()#filter(distributer=request.user.username)
    currentUserName = request.user
    # currentUserName = currentUser.values_list('nameofcontact', flat=True)
    # print(currentUserName)
    currentcounter = AllCounters.objects.filter(name="proformainvoice").first()
    allproducts = Product.objects.all()
    proformainvoice = ProformaInvoiceForm(request.POST or None)
    context = {
        "currentUserName": currentUserName,
        "allcustomers": allcustomers,
        "currentcounter": currentcounter.counter,
        "proformainvoice": proformainvoice,
        "allproducts":allproducts,
    }
    if request.method == "POST":
        if proformainvoice.is_valid():
            try:
                invoiceID = proformaInvoice.objects.get(
                    invoiceid=proformainvoice.cleaned_data["invoiceid"]
                )
                messages.warning(request, "Please fill Invoice form!")
                
            except proformaInvoice.DoesNotExist:
                proformainvoice.save()
                proformainvoice = ProformaInvoiceForm()
                invoiceCounter = AllCounters.objects.filter(name="proformainvoice").first()
                invoiceCounter.counter = F("counter") + 1
                invoiceCounter.save()
                proformainvoice = ProformaInvoiceForm()
                messages.success(request, "Invoice Generated successfully")
        else:
            messages.warning(request, "Error Generating Invoice!")        
            proformainvoice = ProformaInvoiceForm(request.POST)     

    return render(request, "Invoice/ProformaInvoice/proformainvoice.html", context)

# # create invoice
# @login_required
# def createQuotation(request):
#     # alldealers = Profile.objects.all()
#     allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
#     currentcounter = SerialNumbercounter.objects.filter(id=1).first()
#     taxinfform = quotationInvoiceForm()
#     if request.method == "POST":
#         requestedtaxinfform = quotationInvoiceForm(request.POST)
#         if requestedtaxinfform.is_valid():
#             requestedtaxinfform.save()
#             requestedtaxinfform = quotationInvoiceForm()
#             invoiceCounter = AllCounters.objects.filter(name="quotation").first()
#             invoiceCounter.counter = F("counter") + 1
#             invoiceCounter.save()
#             vieweinvoices(request)
#             allquotationInvoice = quotationInvoice.objects.all()
#             totalInvoices = quotationInvoice.objects.all().count()
#             startdate = datetime.today()
#             enddate = startdate - timedelta(days=14)
#             totalthismonthsInvoices = quotationInvoice.objects.filter(
#                 quotationdate__range=[startdate, enddate]
#             ).count()
#             context = {
#                 "allquotationInvoice": allquotationInvoice,
#                 "totalInvoices": totalInvoices,
#                 "totalthismonthsInvoices": totalthismonthsInvoices,
#                 "startdate": startdate,
#                 "enddate": enddate,
#             }
#             return render(request, "Invoice/Quotation/viewquotations.html", context)
#         else:
#             return render(request, "index.html")
#     else:
#         context = {
#             "allcustomers": allcustomers,
#             "currentcounter": currentcounter,
#             "taxinfform": taxinfform,
#         }
#         return render(request, "Invoice/Quotation/createquotation.html", context)


@login_required
def createQuotation(request):
    # alldealers = Profile.objects.all()
    allcustomers = CustomerProfile.objects.all()#filter(distributer=request.user.username)
    currentUserName = request.user
    # currentUserName = currentUser.values_list('nameofcontact', flat=True)
    # print(currentUserName)
    currentcounter = AllCounters.objects.filter(name="quotation").first()
    allproducts = Product.objects.all()
    #proformainvoice = ProformaInvoiceForm(request.POST or None)
    quotationform = quotationInvoiceForm(request.POST or None)
    #print(quotationform)
    context = {
        "currentUserName": currentUserName,
        "allcustomers": allcustomers,
        "currentcounter": currentcounter.counter,
        "quotationform": quotationform,
        "allproducts":allproducts,
    }
    if request.method == "POST":
        if quotationform.is_valid():
            try:
                quotationID = quotationInvoice.objects.get(
                    quotationid=quotationform.cleaned_data["quotationid"]
                )
                messages.warning(request, "Please fill quotation form!")
                
            except quotationInvoice.DoesNotExist:
                quotationform.save()
                quotationform = quotationInvoiceForm()
                invoiceCounter = AllCounters.objects.filter(name="quotation").first()
                invoiceCounter.counter = F("counter") + 1
                invoiceCounter.save()
                quotationform = quotationInvoiceForm()
                messages.success(request, "Invoice Generated successfully")
        else:
            messages.warning(request, "Error Generating Quotation!")        
            quotationform = quotationInvoiceForm(request.POST)     

    return render(request, "Invoice/Quotation/createquotation.html", context)


            
@login_required
def installation_Report(request):
    allcustomers = CustomerProfile.objects.all()#filter(distributer=request.user.username)
    currentUserName = request.user
    currentcounter = AllCounters.objects.filter(name="installationreport").first()
    allproducts = Product.objects.all()
    installationreportform = installationReportForm(request.POST or None)
    print(installationreportform)
    context = {
        "currentUserName": currentUserName,
        "allcustomers": allcustomers,
        "currentcounter": currentcounter.counter,
        "installationreportform": installationreportform,
        "allproducts":allproducts,
    }
    if request.method == "POST":
        if installationreportform.is_valid():
            try:
                installationId = installationReport.objects.get(
                    installationid=installationreportform.cleaned_data["installationid"]
                )
                messages.warning(request, "Please fill quotation form!")
                
            except installationReport.DoesNotExist:
                installationreportform.save()
                installationreportform = installationReportForm()
                invoiceCounter = AllCounters.objects.filter(name="installationreport").first()
                invoiceCounter.counter = F("counter") + 1
                invoiceCounter.save()
                installationreportform = installationReportForm()
                messages.success(request, "Invoice Generated successfully")
        else:
            messages.warning(request, "Error Generating Quotation!")        
            installationreportform = installationReportForm(request.POST)     

    return render(request, "Invoice/InstallationReport/InstallationReport.html", context)


# create Quotation
# @login_required
# def quotation(request):
#     # alldealers = Profile.objects.all()
#     allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
#     currentcounter = SerialNumbercounter.objects.filter(id=1).first()
#     context = {"allcustomers": allcustomers, "currentcounter": currentcounter}
#     return render(request, "Invoice/Quotation/Quotation.html", context)


# create Delivery Challan
@login_required
def deliverychallan(request):
    # alldealers = Profile.objects.all()
    allcustomers = CustomerProfile.objects.all()#filter(distributer=request.user.username)
    currentUserName = request.user
    # currentUserName = currentUser.values_list('nameofcontact', flat=True)
    # print(currentUserName)
    currentcounter = AllCounters.objects.filter(name="deliverychallan").first()
    allproducts = Product.objects.all()
    #proformainvoice = ProformaInvoiceForm(request.POST or None)
    deliveryform = deliveryChallanForm(request.POST or None)
    context = {
        "currentUserName": currentUserName,
        "allcustomers": allcustomers,
        "currentcounter": currentcounter.counter,
        "deliveryform": deliveryform,
        "allproducts":allproducts,
    }
    if request.method == "POST":
        if deliveryform.is_valid():
            try:
                challanId = deliveryChallan.objects.get(
                    challanid=deliveryform.cleaned_data["challanid"]
                )
                messages.warning(request, "Please fill quotation form!")
                
            except deliveryChallan.DoesNotExist:
                deliveryform.save()
                deliveryform = deliveryChallanForm()
                invoiceCounter = AllCounters.objects.filter(name="deliverychallan").first()
                invoiceCounter.counter = F("counter") + 1
                invoiceCounter.save()
                deliveryform = deliveryChallanForm()
                messages.success(request, "Invoice Generated successfully")
        else:
            messages.warning(request, "Error Generating Quotation!")        
            deliveryform = deliveryChallanForm(request.POST)     

    return render(request, "Invoice/DeliveryChallan/DeliveryChallan.html", context)

# create contractorbill
@login_required
def contractorbill(request):
    # alldealers = Profile.objects.all()
    allcustomers = Profile.objects.all()
    currentcounter = SerialNumbercounter.objects.filter(id=1).first()
    context = {"allcustomers": allcustomers, "currentcounter": currentcounter}
    return render(request, "Invoice/ContractorBill/ContractorBill.html", context)


# raw query to get all product data
@login_required
def invoicegetallprod(request):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM public.mainapp_product")
    rows = cursor.fetchall()

    json_data = []
    for row in rows:
        json_data.append({"data": row})
    return JsonResponse(json_data, safe=False)


# raw query to get all product columns


@login_required
def invoicegetallprodcol(request):

    cursor = connection.cursor()
    cursor.execute(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'mainapp_product'"
    )
    rows = cursor.fetchall()

    json_data = []
    for row in rows:
        json_data.append({"col": row})
    return JsonResponse(json_data, safe=False)


# Get all Info of selected customer to create invoice
@login_required
def getdetailofselectedcustmor(request):
    setParam = request.GET.get("sqlParam", None)
    cursor = connection.cursor()
    cursor.execute(setParam)
    rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)


# Get  Info of GST for that sate
@login_required
def gettaxdetailofstate(request):
    setParam = request.GET.get("sqlParam", None)
    cursor = connection.cursor()
    cursor.execute(setParam)
    rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)


# update individual product
@login_required
def updatingproduct(request, id):
    productHSN = id
    thatProduct = Product.objects.filter(HSN=productHSN).first()
    ProductData = {
        "name": thatProduct.name,
        "description": thatProduct.description,
        "HSN": thatProduct.HSN,
        "price": thatProduct.price,
    }
    productform = ProductForm(initial=ProductData)
    return render(
        request,
        "product/editingproduct.html",
        {"userid": userid, "username": username, "profileform": productform},
    )

@login_required
def removingdealer(request, id):
    try:
        instance = User.objects.filter(id=id)
        instance.delete()
        messages.success(request, "Distributer removed Successfully !")
    except User.DoesNotExist:
        messages.error(request, "Something went Wrong!!")
    alldealer = Profile.objects.all()
    return render(request, "distributer/viewdealer.html",  {"alldealer": alldealer})

@login_required
def removingcustomer(request, id):
    try:
        instance = User.objects.filter(id=id)
        instance.delete()
        messages.success(request, "Customer removed Successfully !")
    except User.DoesNotExist:
        messages.error(request, "Something went Wrong!!")
    allcustomer = CustomerProfile.objects.filter(distributer=request.user.username)
    return render(request, "customer/viewcustomer.html", {"allcustomer": allcustomer})

@login_required
def deleteproduct(request, hsn):
    try:
        instance = Product.objects.filter(HSN=hsn)
        instance.delete()
        messages.success(request, "Product removed Successfully !")
    except User.DoesNotExist:
        messages.error(request, "Something went Wrong!!")
    allproducts = Product.objects.all()
    return render(request, "product/allproducts.html",  {"allproducts": allproducts})


@login_required
def editingdealer(request, id):
    UserbasicData = User.objects.filter(id=id).first()
    DealerProfileData = Profile.objects.filter(user_id=id).first()
    # currentUserName = currentUser.nameofcontact
    usercreationform = UserUpdateForm(instance=UserbasicData)
    profileform = ProfileForm(instance=DealerProfileData)

    if request.method == "POST":
        usercreationform = UserUpdateForm(request.POST,instance=UserbasicData)
        profileform = ProfileForm(request.POST,request.FILES, instance=DealerProfileData)
        if usercreationform.is_valid() and profileform.is_valid():
            usercreationform.save()
            profileform.save()
            messages.success(request, "Edited successfully")
        else :
            messages.warning(request, "Error in Editing!")
    context = {
        "form":usercreationform,
        "profileform":profileform
    }
    return render(request, "distributer/editdealer.html", context)

@login_required
def editingproduct(request, hsn):
    ProductData = Product.objects.filter(HSN=hsn).first()
    # currentUserName = currentUser.nameofcontact
    prodform = ProductForm(instance=ProductData)

    if request.method == "POST":
        prodform = ProductForm(request.POST, instance=ProductData)
        if prodform.is_valid() :
            prodform.save()
            messages.success(request, "Edited successfully")
        else :
            messages.warning(request, "Error in Editing!")
    context = {
        "productform":prodform,
    }
    return render(request, "product/editproduct.html", context)


# editing invoice
@login_required
def editinginvoice(request, id):
    # allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
    # currentUser = Profile.objects.filter(user=request.user).first()
    # currentUserName = currentUser.values_list('nameofcontact', flat=True)
    # currentcounter = AllCounters.objects.filter(name="taxinvoice").first()
    # taxinfform = TaxInvoiceForm(request.POST or None)
    allcustomers = CustomerProfile.objects.all()#filter(distributer=request.user.username)
    currentcounter = AllCounters.objects.filter(name="taxinvoice").first()
    currentUser = Profile.objects.all()#filter(user=request.user).first()
    currentUserName = request.user#currentUser.values_list('nameofcontact', flat=True)
    taxinfform = TaxInvoiceForm(request.POST or None)
    allproducts = Product.objects.all()
    gstvalues = gsttable.objects.all()
    invoiceid = id
    thatInvoice = taxInvoice.objects.filter(invoiceid=invoiceid).first()
    context = {
        "currentUserName": currentUserName,
        "thatInvoice": thatInvoice,
        "invoiceid": invoiceid,
        "allproducts": allproducts,
        "allcustomers": allcustomers,
        "gstvalues": gstvalues,
        "currentcounter": currentcounter.counter,
        "taxinfform": taxinfform,
        "creatorid": thatInvoice.creatorid,
        "customerid": thatInvoice.customerid,
        "invoicedate": thatInvoice.invoicedate,
        "po": thatInvoice.po,
        "items": thatInvoice.items,
        "finalamount": thatInvoice.finalamount,
        "adjustmentamount": thatInvoice.adjustmentamount,
        "signature": thatInvoice.signature,
    }
    if request.method == "POST":
        if taxinfform.is_valid():
            try:
                invoiceID = taxInvoice.objects.get(
                    invoiceid=taxinfform.cleaned_data["invoiceid"]
                )
                messages.warning(request, "Please fill Invoice form!")
            except taxInvoice.DoesNotExist:
                taxinfform.save()
                taxinfform = TaxInvoiceForm()
                invoiceCounter = AllCounters.objects.filter(name="proformainvoice").first()
                invoiceCounter.counter = F("counter") + 1
                invoiceCounter.save()
                taxinfform = TaxInvoiceForm()
                messages.success(request, "Invoice Generated successfully")
        else:
            messages.warning(request, "Error Generating Invoice!")
    return render(request, "Invoice/TaxInvoice/editinginvoice.html", context)

@login_required
def editing_proforma_invoice(request, id):
    # allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
    # currentUser = Profile.objects.filter(user=request.user).first()
    # currentUserName = currentUser.values_list('nameofcontact', flat=True)
    # currentcounter = AllCounters.objects.filter(name="taxinvoice").first()
    # taxinfform = TaxInvoiceForm(request.POST or None)
    allcustomers = CustomerProfile.objects.all()#filter(distributer=request.user.username)
    currentcounter = AllCounters.objects.filter(name="proformainvoice").first()
    currentUser = Profile.objects.all()#filter(user=request.user).first()
    currentUserName = request.user#currentUser.values_list('nameofcontact', flat=True)
    proformainvoiceform = ProformaInvoiceForm(request.POST or None)
    allproducts = Product.objects.all()
    gstvalues = gsttable.objects.all()
    invoiceid = id
    thatInvoice = proformaInvoice.objects.filter(invoiceid=invoiceid).first()
    context = {
        "currentUserName": currentUserName,
        "thatInvoice": thatInvoice,
        "invoiceid": invoiceid,
        "allproducts": allproducts,
        "allcustomers": allcustomers,
        "gstvalues": gstvalues,
        "currentcounter": currentcounter.counter,
        "proformainvoiceform": proformainvoiceform,
        "creatorid": thatInvoice.creatorid,
        "customerid": thatInvoice.customerid,
        "invoicedate": thatInvoice.invoicedate,
        "po": thatInvoice.po,
        "items": thatInvoice.items,
        "finalamount": thatInvoice.finalamount,
        "signature": thatInvoice.signature,
    }
    if request.method == "POST":
        if proformainvoiceform.is_valid():
            try:
                invoiceID = proformaInvoice.objects.get(
                    invoiceid=proformainvoiceform.cleaned_data["invoiceid"]
                )
                messages.warning(request, "Please fill Invoice form!")
            except proformaInvoice.DoesNotExist:
                proformainvoiceform.save()
                proformainvoiceform = ProformaInvoiceForm()
                invoiceCounter = AllCounters.objects.filter(name="proformainvoice").first()
                invoiceCounter.counter = F("counter") + 1
                invoiceCounter.save()
                proformainvoiceform = ProformaInvoiceForm()
                messages.success(request, "Invoice Generated successfully")
        else:
            messages.warning(request, "Error Generating Invoice!")
    return render(request, "Invoice/ProformaInvoice/editingproinvoice.html", context)

@login_required
def cloning_proforma_invoice(request, id):
    # allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
    # currentUser = Profile.objects.filter(user=request.user).first()
    # currentUserName = currentUser.values_list('nameofcontact', flat=True)
    # currentcounter = AllCounters.objects.filter(name="taxinvoice").first()
    # taxinfform = TaxInvoiceForm(request.POST or None)
    allcustomers = CustomerProfile.objects.all()#filter(distributer=request.user.username)
    currentcounter = AllCounters.objects.filter(name="proformainvoice").first()
    currentUser = Profile.objects.all()#filter(user=request.user).first()
    currentUserName = request.user#currentUser.values_list('nameofcontact', flat=True)
    proformainvoiceform = ProformaInvoiceForm(request.POST or None)
    allproducts = Product.objects.all()
    gstvalues = gsttable.objects.all()
    invoiceid = id
    thatInvoice = proformaInvoice.objects.filter(invoiceid=invoiceid).first()
    context = {
        "currentUserName": currentUserName,
        "thatInvoice": thatInvoice,
        "invoiceid": invoiceid,
        "allproducts": allproducts,
        "allcustomers": allcustomers,
        "gstvalues": gstvalues,
        "currentcounter": currentcounter.counter,
        "proformainvoiceform": proformainvoiceform,
        "creatorid": thatInvoice.creatorid,
        "customerid": thatInvoice.customerid,
        "invoicedate": thatInvoice.invoicedate,
        "po": thatInvoice.po,
        "items": thatInvoice.items,
        "finalamount": thatInvoice.finalamount,
        "signature": thatInvoice.signature,
    }
    if request.method == "POST":
        if proformainvoiceform.is_valid():
            try:
                invoiceID = proformaInvoice.objects.get(
                    invoiceid=proformainvoiceform.cleaned_data["invoiceid"]
                )
                messages.warning(request, "Please fill Invoice form!")
            except proformaInvoice.DoesNotExist:
                proformainvoiceform.save()
                proformainvoiceform = ProformaInvoiceForm()
                invoiceCounter = AllCounters.objects.filter(name="proformainvoice").first()
                invoiceCounter.counter = F("counter") + 1
                invoiceCounter.save()
                proformainvoiceform = ProformaInvoiceForm()
                messages.success(request, "Invoice Generated successfully")
        else:
            messages.warning(request, "Error Generating Invoice!")
    return render(request, "Invoice/ProformaInvoice/cloningproinvoice.html", context)

@login_required
def proforma_to_invoice(request, id):
    # allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
    # currentUser = Profile.objects.filter(user=request.user).first()
    # currentUserName = currentUser.values_list('nameofcontact', flat=True)
    # currentcounter = AllCounters.objects.filter(name="taxinvoice").first()
    # taxinfform = TaxInvoiceForm(request.POST or None)
    allcustomers = CustomerProfile.objects.all()#filter(distributer=request.user.username)
    currentcounter = AllCounters.objects.filter(name="proformainvoice").first()
    currentUser = Profile.objects.all()#filter(user=request.user).first()
    currentUserName = request.user#currentUser.values_list('nameofcontact', flat=True)
    #proformainvoiceform = ProformaInvoiceForm(request.POST or None)
    taxinfform = TaxInvoiceForm(request.POST or None)
    allproducts = Product.objects.all()
    gstvalues = gsttable.objects.all()
    invoiceid = id
    thatInvoice = proformaInvoice.objects.filter(invoiceid=invoiceid).first()
    context = {
        "currentUserName": currentUserName,
        "thatInvoice": thatInvoice,
        "invoiceid": invoiceid,
        "allproducts": allproducts,
        "allcustomers": allcustomers,
        "gstvalues": gstvalues,
        "currentcounter": currentcounter.counter,
        #"proformainvoiceform": proformainvoiceform,
        "taxinfform":taxinfform,
        "creatorid": thatInvoice.creatorid,
        "customerid": thatInvoice.customerid,
        "invoicedate": thatInvoice.invoicedate,
        "po": thatInvoice.po,
        "items": thatInvoice.items,
        "finalamount": thatInvoice.finalamount,
        "signature": thatInvoice.signature,
    }
    if request.method == "POST":
        if taxinfform.is_valid():
            try:
                invoiceID = taxInvoice.objects.get(
                    invoiceid=taxinfform.cleaned_data["invoiceid"]
                )
                messages.warning(request, "Please fill Invoice form!")
            except taxInvoice.DoesNotExist:
                taxinfform.save()
                taxinfform = TaxInvoiceForm()
                invoiceCounter = AllCounters.objects.filter(name="proformainvoice").first()
                invoiceCounter.counter = F("counter") + 1
                invoiceCounter.save()
                taxinfform = TaxInvoiceForm()
                messages.success(request, "Invoice Generated successfully")
        else:
            messages.warning(request, "Error Generating Invoice!")
    return render(request, "Invoice/ProformaInvoice/convertproformainvoice.html", context)


# editing invoice
@login_required
def editingcustomer(request, id):
    alldistributers = Profile.objects.all().order_by("user")
    UserbasicData = User.objects.filter(id=id).first()
    CustomerProfileData = CustomerProfile.objects.filter(user_id=id).first()
    # currentUserName = currentUser.nameofcontact
    usercreationform = UserUpdateForm(instance=UserbasicData)
    profileform = CustomerProfileForm(instance=CustomerProfileData)

    if request.method == "POST":
        usercreationform = UserUpdateForm(request.POST,instance=UserbasicData )
        profileform = CustomerProfileForm(request.POST,instance=CustomerProfileData)
        if usercreationform.is_valid() and profileform.is_valid():
            usercreationform.save()
            profileform.save()
            messages.success(request, "Edited successfully")
        else:
            usercreationform = UserUpdateForm(instance=UserbasicData)
            profileform = CustomerProfileForm(instance=CustomerProfileData)
            messages.warning(request, "Error in Editing!")

    context = {
        "form": UserbasicData,
        "profileform": CustomerProfileData,
        "alldistributers": alldistributers,
        "usercreationform":usercreationform,
        "profileupform":profileform
    }
    return render(request, "customer/editcustomer.html", context)


# cloning invoice
@login_required
def cloninginvoice(request, id):
    # allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
    # currentcounter = AllCounters.objects.filter(name="taxinvoice").first()
    # currentUser = Profile.objects.filter(user=request.user).first()
    # currentUserName = request.user#currentUser.nameofcontact
    # taxinfform = TaxInvoiceForm(request.POST or None)
    allcustomers = CustomerProfile.objects.all()#filter(distributer=request.user.username)
    currentcounter = AllCounters.objects.filter(name="taxinvoice").first()
    currentUser = Profile.objects.all()#filter(user=request.user).first()
    currentUserName = request.user#currentUser.values_list('nameofcontact', flat=True)
    taxinfform = TaxInvoiceForm(request.POST or None)
    allproducts = Product.objects.all()
    gstvalues = gsttable.objects.all()
    invoiceid = id
    thatInvoice = taxInvoice.objects.filter(invoiceid=invoiceid).first()
    context = {
        "currentUserName":currentUserName,
        "thatInvoice": thatInvoice,
        "invoiceid": invoiceid,
        "allproducts": allproducts,
        "allcustomers": allcustomers,
        "gstvalues": gstvalues,
        "currentcounter": currentcounter.counter,
        "taxinfform": taxinfform,
        "creatorid": thatInvoice.creatorid,
        "customerid": thatInvoice.customerid,
        "invoicedate": thatInvoice.invoicedate,
        "duedate": thatInvoice.duedate,
        "po": thatInvoice.po,
        "items": thatInvoice.items,
        "finalamount": thatInvoice.finalamount,
        "adjustmentamount": thatInvoice.adjustmentamount,
        "signature": thatInvoice.signature,
    }
    if request.method == "POST":
        if taxinfform.is_valid():
            try:
                invoiceID = taxInvoice.objects.get(
                    invoiceid=taxinfform.cleaned_data["invoiceid"]
                )
                messages.warning(request, "Please fill Invoice form!")
            except taxInvoice.DoesNotExist:
                taxinfform.save()
                taxinfform = TaxInvoiceForm()
                invoiceCounter = AllCounters.objects.filter(name="taxinvoice").first()
                invoiceCounter.counter = F("counter") + 1
                invoiceCounter.save()
                taxinfform = TaxInvoiceForm()
                messages.success(request, "Invoice Generated successfully")
        else:
            messages.warning(request, "Error Generating Invoice!")
    return render(request, "Invoice/ProformaInvoice/convertproformainvoice.html", context)



    
# uodate individusal dealer
@login_required
def updatingdealer(request, id):
    userid = id
    thatUser = User.objects.filter(id=userid).first()
    thatUserProfile = Profile.objects.filter(user=thatUser).first()
    allproducts = Product.objects.all()
    username = (thatUser.username,)

    Profiledata = {
        "nameofcontact": thatUserProfile.nameofcontact,
        "telephone": thatUserProfile.telephone,
        "mobile": thatUserProfile.mobile,
        "contactparticulars": thatUserProfile.contactparticulars,
        "address": thatUserProfile.address,
        "pincode": thatUserProfile.pincode,
        "legalstatus": thatUserProfile.legalstatus,
        "gstno": thatUserProfile.gstno,
        "cinno": thatUserProfile.cinno,
        "panno": thatUserProfile.panno,
        "shopactno": thatUserProfile.shopactno,
        "businessgeography": thatUserProfile.businessgeography,
        "marketsegment": thatUserProfile.marketsegment,
        "currentproducts": thatUserProfile.currentproducts,
        "currentstaffstrength": thatUserProfile.currentstaffstrength,
        "customershandledsofar": thatUserProfile.customershandledsofar,
        "salersturnover": thatUserProfile.salersturnover,
        "parternshipcat": thatUserProfile.parternshipcat,
    }
    profileform = ProfileForm(initial=Profiledata)
    return render(
        request,
        "distributer/editingdealer.html",
        {
            "userid": userid,
            "allproducts": allproducts,
            "username": username,
            "profileform": profileform,
        },
    )


@login_required
def submitupdatedealer(request):
    setParam = request.GET.get("sqlParam1", None)
    if setParam:
        cursor = connection.cursor()
        cursor.execute(setParam)

    else:
        return HttpResponse("no setParam")

    return redirect("vieweditdealer")


# Delete dealer page
@login_required
def deletedealer(request):
    alldealer = Profile.objects.all()

    return render(request, "distributer/deletedealer.html", {"alldealer": alldealer})


@login_required
def deletingdealer(request, id):
    userid = id
    thatUser = User.objects.get(id=userid)
    thatUser.delete()
    return redirect("deletedealer")

    # increase Invoice counter by 1


@login_required
def removeinvoices(request):
    setParam = request.GET.get("sqlParam", None)
    if setParam:
        cursor = connection.cursor()
        cursor.execute(setParam)
    else:
        return HttpResponse("no setParam")

    return redirect("vieweditdealer")


@login_required
def removecustomer(request):
    setParam = request.GET.get("sqlParam", None)
    if setParam:
        cursor = connection.cursor()
        cursor.execute(setParam)
    else:
        return HttpResponse("no setParam")

    return redirect("vieweditcustomer")


@login_required
def editinvoices(request):
    setParam = request.GET.get("sqlParam", None)
    if setParam:
        cursor = connection.cursor()
        cursor.execute(setParam)
    else:
        return HttpResponse("no setParam")

    return redirect("vieweinvoices")


@login_required
def addtoinvoicedb(request):
    setParam = request.GET.get("sqlParam", None)
    if setParam:
        cursor = connection.cursor()
        cursor.execute(setParam)

    else:
        return HttpResponse("no setParam")

    return redirect("vieweinvoices")


# raw query to get all product data
@login_required
def checkUserName(request):

    setParam = request.GET.get("sqlParam", None)
    cursor = connection.cursor()
    cursor.execute(setParam)
    rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)
