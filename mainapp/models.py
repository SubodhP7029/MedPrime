from django.db import models
from django.contrib.auth.models import User
from phone_field import PhoneField
from jsonfield import JSONField
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.

# Profile Model


class SerialNumbercounter(models.Model):
    counter = models.IntegerField()

    def __str__(self):
        return f"{self.counter}"


class Profile(models.Model):
    geography = (("gujrat", "Inside Gujrat"), ("other", "Outside Gujrat"))
    market_segment = (
        ("medclg", "Medical College"),
        ("pathological", "Pathological Laboratories"),
        ("hospitals", "Hospitals"),
        ("medpro", "Medical Professionals"),
        ("sciclg", "Science College"),
        ("schools", "Schools"),
        ("rnd", "R&D Institues"),
        ("agriculture", "Agriculture"),
        ("veterinary", "Veterinary"),
        ("industrial", "Industrial"),
    )
    partnership_cat = (
        ("Level1", "Level 1"),
        ("Level2", "Level 2"),
        ("Level3", "Level 3"),
        ("Level4", "Level 4"),
    )
    legal_stus = (
        ("prlc", "Private Limited Company"),
        ("pulc", "Public Limited Company"),
        ("llp", "Limited Liability Partnership"),
        ("partner", "Partnership"),
        ("solepartner", "Sole Proprietorship"),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.TextField(blank=True)
    pincode = models.IntegerField(null=True, blank=True)
    telephone = PhoneNumberField(blank=True, help_text="Contact phone number")
    mobile = PhoneNumberField(blank=True, help_text="Contact mobile number")
    nameofcontact = models.CharField(max_length=100)
    contactparticulars = models.CharField(blank=True, max_length=100)
    legalstatus = models.CharField(blank=True, max_length=100, choices=legal_stus)
    gstno = models.CharField(blank=True, max_length=20)
    cinno = models.CharField(blank=True, max_length=20)
    panno = models.CharField(blank=True, max_length=20)
    shopactno = models.CharField(blank=True, max_length=20)
    businessgeography = models.CharField(blank=True, max_length=50, choices=geography)
    marketsegment = models.CharField(blank=True, max_length=50, choices=market_segment)
    currentproducts = models.TextField(blank=True)
    currentstaffstrength = models.IntegerField(null=True, blank=True)
    customershandledsofar = models.TextField(blank=True)
    salersturnover = models.IntegerField(null=True, blank=True)
    parternshipcat = models.CharField(
        blank=True, max_length=50, choices=partnership_cat
    )
    image = models.ImageField(default="default.png", upload_to="profile_pics")

    def __str__(self):
        return f"{self.user}"

    def __unicode__(self):
        return


class CustomerProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    customername = models.CharField(max_length=100)
    distributer = models.CharField(max_length=500)
    billingaddress = models.TextField()
    billingcountry = models.CharField(max_length=50)
    billingpincode = models.IntegerField()
    billingcity = models.CharField(max_length=50)
    billingstate = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    address = models.TextField(blank=True)
    pincode = models.IntegerField(blank=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    stateid = models.IntegerField(null=True)
    gst = models.CharField(blank=True, null=True, max_length=500)
    phone = PhoneNumberField(blank=True, null=True)

    def __str__(self):
        return f"{self.user}"

    def __unicode__(self):
        return


class Product(models.Model):

    name = models.CharField(max_length=150)
    description = models.TextField()
    price = models.IntegerField()
    HSN = models.IntegerField()
    tax = models.IntegerField()

    def __str__(self):
        return f"{self.name}"


class gsttable(models.Model):
    state = models.CharField(max_length=150)
    igst = models.BooleanField()
    cgst = models.BooleanField()
    sgst = models.BooleanField()

    def __str__(self):
        return self.state


class AllCounters(models.Model):

    name = models.CharField(max_length=150)
    counter = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name


# Final invoice model
class taxInvoice(models.Model):
    invoiceid = models.IntegerField()
    customerid = models.IntegerField()
    creatorid = models.IntegerField(null=True, blank=True)
    creatorname = models.CharField(max_length=500, null=True, blank=True)
    updatorid = models.IntegerField(null=True, blank=True)
    customername = models.CharField(max_length=500)
    invoicedate = models.DateField(null=True, blank=True)
    terms = models.CharField(max_length=500, blank=True)
    duedate = models.DateField(null=True, blank=True)
    po = models.CharField(max_length=500, blank=True)
    items = JSONField()
    shippingState = models.CharField(max_length=500, blank=True)
    subtotalamount = models.FloatField(null=True, blank=True)
    taxamount = models.FloatField(null=True, blank=True)
    adjustmentamount = models.FloatField(null=True, blank=True)
    adjustmenttype = models.CharField(max_length=500, blank=True)
    finalamount = models.FloatField(null=True, blank=True)
    signature = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return f"{self.invoiceid}"


class invoicestorage(models.Model):
    invoiceid = models.IntegerField(null=True, blank=True)
    creatorid = models.IntegerField(null=True, blank=True)
    deletorid = models.IntegerField(null=True, blank=True)
    typeofchange = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return str(self.invoiceid)


# Quotation model
class quotationInvoice(models.Model):
    quotationid = models.IntegerField()
    customerid = models.IntegerField()
    creatorid = models.IntegerField(null=True, blank=True)
    updatorid = models.IntegerField(null=True, blank=True)
    customername = models.CharField(max_length=500)
    customeraddress = models.CharField(null=True, blank=True, max_length=500)
    customerpincode = models.CharField(null=True, blank=True, max_length=500)
    customerstate = models.CharField(null=True, blank=True, max_length=500)
    customergst = models.CharField(null=True, blank=True, max_length=500)
    customerplaceofsupply = models.CharField(null=True, blank=True, max_length=500)
    quotationdate = models.DateField()
    terms = models.CharField(max_length=500, blank=True)
    exiprydate = models.DateField()
    quotationnumber = models.IntegerField()
    items = JSONField()
    subtotalamount = models.FloatField(null=True, blank=True)
    taxamount = models.FloatField(null=True, blank=True)
    adjustmentamount = models.FloatField(null=True, blank=True)
    finalamount = models.FloatField(null=True, blank=True)
    signature = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return f"{self.quotationid}"


class quotationstorage(models.Model):
    quotationid = models.IntegerField(null=True, blank=True)
    creatorid = models.IntegerField(null=True, blank=True)
    deletorid = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.quotationid
