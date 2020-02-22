from django.contrib import admin

# Register your models here.
from .models import (
    Profile,
    CustomerProfile,
    Product,
    SerialNumbercounter,
    gsttable,
    taxInvoice,
    invoicestorage,
    quotationInvoice,
    AllCounters,
)

admin.site.register(AllCounters)
admin.site.register(Profile)
admin.site.register(CustomerProfile)
admin.site.register(Product)
admin.site.register(SerialNumbercounter)
admin.site.register(gsttable)
admin.site.register(taxInvoice)
admin.site.register(invoicestorage)
admin.site.register(quotationInvoice)

