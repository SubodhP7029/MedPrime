var table
$(document).ready(function () {
    $('#customerTables thead tr').clone(true).appendTo('#customerTables thead');
    $('#customerTables thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        $(this).html('<input type="text" style="color:black;width:100px" placeholder="Search ' + title + '" />');

        $('input', this).on('keyup change', function () {
            if (table.column(i).search() !== this.value) {
                table
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        });
    });
    table = $('#customerTables').DataTable({
        "scrollY": 290,
        "scrollX": true,
        // dom: 'Bfrtip',
        // buttons: [
        //     'copy', 'csv', 'excel', 'pdf', 'print'
        // ]
    });


});

//function when row is clicked
$('#customerTables tbody').on('click', 'tr', function () {
    selectedRowData = table.row(this).data();
    document.getElementById('viewcustomername').innerHTML = selectedRowData[2]
    SelectedCustomerUsername = "SELECT billingaddress,billingpincode,billingcity,billingstate,billingcountry,gst,address, pincode,  city,state,  country ,distributer FROM public.mainapp_customerprofile WHERE user_id= " + selectedRowData[0]
    $.get("/getdetailofselectedcustmor/", { sqlParam: SelectedCustomerUsername }, function (data) {
        // allCustomerData = data
        // customerName = document.getElementById('thisCust-' + selectedcustid).innerHTML
        document.getElementById('customerBillingAddress').innerHTML = data[0][0]
        document.getElementById('customerBillingPincode').innerHTML = data[0][1]
        document.getElementById('customerBillingCity').innerHTML = data[0][2]
        document.getElementById('customerBillingState').innerHTML = data[0][3]
        document.getElementById('customerBillingCountry').innerHTML = data[0][4]
        document.getElementById('customergst').innerHTML = data[0][5]
        document.getElementById('customerShippingAddress').innerHTML = data[0][6]
        document.getElementById('customerShippingPincode').innerHTML = data[0][7]
        document.getElementById('customerShippingCity').innerHTML = data[0][8]
        document.getElementById('customerShippingState').innerHTML = data[0][9]
        document.getElementById('customerShippingCountry').innerHTML = data[0][10]
        document.getElementById('customerdistributer').innerHTML = data[0][11]
        document.getElementById('customerusername').innerHTML = selectedRowData[1]
        document.getElementById('customeremail').innerHTML = selectedRowData[3]
        document.getElementById('customercustomername').innerHTML = selectedRowData[2]
        document.getElementById('customerphone').innerHTML = selectedRowData[4]
        $('#customerModal').modal('show')
    })
    var a = document.createElement('a')
    link = "/editingcustomer"
    a.href = link + '/' + selectedRowData[0]
    a.innerText = 'Edit'
    document.getElementById('editid').innerHTML = ''
    document.getElementById('editid').appendChild(a)
    var a = document.createElement('a')
    link = "/removingcustomer"
    a.href = link + '/' + selectedRowData[0]
    a.innerText = 'Delete'
    document.getElementById('deleteid').innerHTML = ''
    document.getElementById('deleteid').appendChild(a)

});
