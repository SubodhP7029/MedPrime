from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import F
from datetime import datetime, timedelta

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
    return render(request, "index.html")


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
                user = User.objects.get(email=form.cleaned_data["email"])
                messages.warning(request, "Email already exists!")
            except User.DoesNotExist:
                user = form.save()
                user.set_unusable_password()
                user.is_active = False
                user.save()
                profile = profileform.save(commit=False)
                profile.user = user
                profile.save()
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
    alldealer = CustomerProfile.objects.filter(distributer=request.user.username)

    return render(request, "customer/editcustomer.html", {"alldealer": alldealer})


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
    alldealer = Product.objects.all()

    return render(request, "product/allproducts.html", {"alldealer": alldealer})


# create invoice
@login_required
def invoice(request):
    # alldealers = Profile.objects.all()
    allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
    currentUser = Profile.objects.filter(user=request.user).first()
    currentUserName = currentUser.nameofcontact
    currentcounter = AllCounters.objects.filter(name="taxinvoice").first()
    taxinfform = TaxInvoiceForm(request.POST or None)
    context = {
        "currentUserName": currentUserName,
        "allcustomers": allcustomers,
        "currentcounter": currentcounter.counter,
        "taxinfform": taxinfform,
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


# create invoice
@login_required
def createQuotation(request):
    # alldealers = Profile.objects.all()
    allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
    currentcounter = SerialNumbercounter.objects.filter(id=1).first()
    taxinfform = quotationInvoiceForm()
    if request.method == "POST":
        requestedtaxinfform = quotationInvoiceForm(request.POST)
        if requestedtaxinfform.is_valid():
            requestedtaxinfform.save()
            requestedtaxinfform = quotationInvoiceForm()
            invoiceCounter = AllCounters.objects.filter(name="quotation").first()
            invoiceCounter.counter = F("counter") + 1
            invoiceCounter.save()
            vieweinvoices(request)
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
        else:
            return render(request, "index.html")
    else:
        context = {
            "allcustomers": allcustomers,
            "currentcounter": currentcounter,
            "taxinfform": taxinfform,
        }
        return render(request, "Invoice/Quotation/createquotation.html", context)


# create Proforma invoice
@login_required
def proformainvoice(request):
    # alldealers = Profile.objects.all()
    allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
    currentcounter = SerialNumbercounter.objects.filter(id=1).first()
    context = {"allcustomers": allcustomers, "currentcounter": currentcounter}
    return render(request, "Invoice/ProformaInvoice/ProInvoice.html", context)


# create Quotation
@login_required
def quotation(request):
    # alldealers = Profile.objects.all()
    allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
    currentcounter = SerialNumbercounter.objects.filter(id=1).first()
    context = {"allcustomers": allcustomers, "currentcounter": currentcounter}
    return render(request, "Invoice/Quotation/Quotation.html", context)


# create Delivery Challan
@login_required
def deliverychallan(request):
    # alldealers = Profile.objects.all()
    allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
    currentcounter = SerialNumbercounter.objects.filter(id=1).first()
    context = {"allcustomers": allcustomers, "currentcounter": currentcounter}
    return render(request, "Invoice/DeliveryChallan/DeliveryChallan.html", context)


# create contractorbill
@login_required
def contractorbill(request):
    # alldealers = Profile.objects.all()
    allcustomers = Profile.objects.all()
    currentcounter = SerialNumbercounter.objects.filter(id=1).first()
    context = {"allcustomers": allcustomers, "currentcounter": currentcounter}
    return render(request, "Invoice/ContractorBill/ContractorBill.html", context)


# create Installation report
@login_required
def InstallationReport(request):
    return render(request, "Invoice/InstallationReport/InstallationReport.html")


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


# editing invoice
@login_required
def editinginvoice(request, id):
    allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
    currentcounter = AllCounters.objects.filter(name="taxinvoice").first()
    currentUser = Profile.objects.filter(user=request.user).first()
    currentUserName = currentUser.nameofcontact
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
                messages.success(request, "Invoice Generated successfully")
        else:
            messages.warning(request, "Error Generating Invoice!")
    return render(request, "Invoice/TaxInvoice/editinginvoice.html", context)


# cloning invoice
@login_required
def cloninginvoice(request, id):
    allcustomers = CustomerProfile.objects.filter(distributer=request.user.username)
    currentcounter = AllCounters.objects.filter(name="taxinvoice").first()
    taxinfform = TaxInvoiceForm(request.POST or None)
    allproducts = Product.objects.all()
    gstvalues = gsttable.objects.all()
    invoiceid = id
    thatInvoice = taxInvoice.objects.filter(invoiceid=invoiceid).first()
    context = {
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
    return render(request, "Invoice/TaxInvoice/cloninginvoice.html", context)


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
def editinvoices(request):
    setParam = request.GET.get("sqlParam", None)
    if setParam:
        cursor = connection.cursor()
        cursor.execute(setParam)
    else:
        return HttpResponse("no setParam")

    return redirect("vieweditdealer")


@login_required
def addtoinvoicedb(request):
    setParam = request.GET.get("sqlParam", None)
    if setParam:
        cursor = connection.cursor()
        cursor.execute(setParam)

    else:
        return HttpResponse("no setParam")

    return redirect("vieweditdealer")


# raw query to get all product data
@login_required
def checkUserName(request):

    setParam = request.GET.get("sqlParam", None)
    cursor = connection.cursor()
    cursor.execute(setParam)
    rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)
