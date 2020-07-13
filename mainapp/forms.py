from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile, CustomerProfile, Product, taxInvoice, quotationInvoice,proformaInvoice,deliveryChallan,installationReport
from phonenumber_field.modelfields import PhoneNumberField


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField(
        required=False,
        widget=forms.TextInput(attrs={"placeholder": "Email must be unique"}),
    )
    username = forms.CharField(
        label="Username",
        widget=forms.TextInput(attrs={"placeholder": "8 or more characters"}),
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password1",
            "password2",
        ]

    def __init__(self, *args, **kwargs):
        super(UserCreationForm, self).__init__(*args, **kwargs)

        for fieldname in [
            "username",
            "email",
            "password1",
            "password2",
        ]:
            self.fields[fieldname].help_text = None


#user update form
class UserUpdateForm(forms.ModelForm):
    
    email = forms.EmailField(
        required=False,
        widget=forms.TextInput(attrs={"placeholder": "Email must be unique"}),
    )
    username = forms.CharField(
        label="Username",
        widget=forms.TextInput(attrs={"placeholder": "8 or more characters"}),
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
          
        ]


# Dealer Registration Form
class DealerRegisterForm(UserCreationForm):
    email = forms.EmailField(required=False)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password1",
            "password2",
        ]
        labels = {"username": "Name of Agency:", "email": "Email ID:"}

    def __init__(self, *args, **kwargs):
        super(UserCreationForm, self).__init__(*args, **kwargs)

        for fieldname in [
            "username",
            "email",
            "password1",
            "password2",
        ]:
            self.fields[fieldname].help_text = None


# adding new dealer form
class ProfileForm(forms.ModelForm):
    currentproducts = forms.CharField(
        required=False, widget=forms.Textarea(attrs={"rows": 2})
    )

    class Meta:
        model = Profile
        exclude = ("user",)
        labels = {
            "nameofcontact": "Name of Contact Person:",
            "contactparticulars": "Contact Particulars:",
            "legalstatus": "Legal Status of Agency",
            "gstno": "GST No:",
            "cinno": "CIN No:",
            "panno": "PAN No:",
            "shopactno": "Shops and Establishments Act License No:",
            "businessgeography": "Proposed Geography of business:",
            "marketsegment": "Proposed market segment:",
            "currentproducts": "Current products and services handled:",
            "currentstaffstrength": "Current staff strength:",
            "customershandledsofar": "List of customers handled so far:",
            "salersturnover": "Annual Sales Turnover for last 3 years:",
            "parternshipcat": "Proposed Channel Partnership Category:",
        }



# updating existing Dealer


class DealerUpdateForm(forms.ModelForm):
    username = forms.CharField(required=True)
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ("username", "email")

    def clean_email(self):
        username = self.cleaned_data.get("username")
        email = self.cleaned_data.get("email")

        if (
            email
            and User.objects.filter(email=email).exclude(username=username).count()
        ):
            raise forms.ValidationError(
                "This email address is already in use. Please supply a different email address."
            )
        return email

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]

        if commit:
            user.save()

        return user


# Updating dealer info
class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        exclude = ("user",)


# Tax Invoice Form
class TaxInvoiceForm(forms.ModelForm):
    class Meta:
        model = taxInvoice
        fields = "__all__"
    invoicedate = forms.DateField(
        widget=forms.DateInput(format='%d-%m-%Y'),
        input_formats=('%d-%m-%Y', )
        )
    duedate = forms.DateField(
        widget=forms.DateInput(format='%d-%m-%Y'),
        input_formats=('%d-%m-%Y', )
        )

class ProformaInvoiceForm(forms.ModelForm):
    class Meta:
        model = proformaInvoice
        fields = "__all__"
    invoicedate = forms.DateField(
        widget=forms.DateInput(format='%d-%m-%Y'),
        input_formats=('%d-%m-%Y', )
        )

# Quotation Invoice Form
class quotationInvoiceForm(forms.ModelForm):
    class Meta:
        model = quotationInvoice
        fields = "__all__"
    quotationdate = forms.DateField(
        widget=forms.DateInput(format='%d-%m-%Y'),
        input_formats=('%d-%m-%Y', )
        )

# Delivery Invoice Form
class deliveryChallanForm(forms.ModelForm):
    class Meta:
        model = deliveryChallan
        fields = "__all__"
    challandate = forms.DateField(
        widget=forms.DateInput(format='%d-%m-%Y'),
        input_formats=('%d-%m-%Y', )
        )

# Installation Report Form
class installationReportForm(forms.ModelForm):
    class Meta:
        model = installationReport
        fields = "__all__"
    installationDate = forms.DateField(
        widget=forms.DateInput(format='%d-%m-%Y'),
        input_formats=('%d-%m-%Y', )
        )

# add new customer
class CustomerProfileForm(forms.ModelForm):
    # distributer = models.CharField(max_length=500)
    billingbuilding = forms.CharField(
        label="Building",
        widget=forms.TextInput(
            attrs={"placeholder": "Flat / Office no. / floor "}
        ),
    )
    billingarea = forms.CharField(
        label="Area",
        widget=forms.TextInput(
            attrs={"placeholder": "Colony / Street / Locality "}
        ),
    )
    billinglandmark = forms.CharField(
        label="Landmark",
        widget=forms.TextInput(
            attrs={"placeholder": "E.g. : Near Ragalartech Ltd.. "}
        ),
    )
    building = forms.CharField(
        label="Building",
        widget=forms.TextInput(
            attrs={"placeholder": "Flat / Office no. / floor "}
        ),
    )
    area = forms.CharField(
        label="Area",
        widget=forms.TextInput(
            attrs={"placeholder": "Colony / Street / Locality "}
        ),
    )
    landmark = forms.CharField(
        label="Landmark",
        widget=forms.TextInput(
            attrs={"placeholder": "E.g. : Near Ragalartech Ltd.. "}
        ),
    )
    # billingcountry =
    billingpincode = forms.CharField(
        label="Billing Pincode",
        widget=forms.TextInput(attrs={"placeholder": "Billing Address Pincode Here"}),
    )
    # billingcity = models.CharField( max_length=50)
    # billingstate = models.CharField( max_length=50)
    # country = models.CharField(max_length=50)

    pincode = forms.CharField(
        label="Shipping Pincode",
        widget=forms.TextInput(attrs={"placeholder": "Shipping Address Pincode Here"}),
    )
    # city = models.CharField( max_length=50)
    # state = models.CharField(max_length=50)
    # stateid = models.IntegerField(null=True)

    phone = forms.CharField(
        label="Phone No. (add Country Code)",
        required=False,
        widget=forms.TextInput(attrs={"placeholder": "+91XXXXXXXXX"}),
    )
    customername = forms.CharField(
        label="Customer Name",
        widget=forms.TextInput(attrs={"placeholder": "Company or Customer Name"}),
    )

    class Meta:
        model = CustomerProfile
        exclude = ("user",)


# add new product


class ProductForm(forms.ModelForm):
    name = forms.CharField(
        label="Product Name",
        widget=forms.TextInput(attrs={"placeholder": "Product Name"}),
    )
    HSN = forms.CharField(
        label="HSN", widget=forms.TextInput(attrs={"placeholder": "HSN Number"}),
    )
    price = forms.CharField(
        label="Price of product",
        widget=forms.TextInput(attrs={"placeholder": "Price of product (₹)"}),
    )
    tax = forms.CharField(
        label="Tax on product",
        widget=forms.TextInput(attrs={"placeholder": "Tax on product (%)"}),
    )
    description = forms.CharField(
        label="Product description",
        widget=forms.Textarea(
            attrs={"placeholder": "Brief description of product", "rows": 5}
        ),
    )

    class Meta:
        model = Product
        fields = "__all__"
