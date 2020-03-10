var table
$(document).ready(function () {
    $('#dealerTables thead tr').clone(true).appendTo('#dealerTables thead');
    $('#dealerTables thead tr:eq(1) th').each(function (i) {
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
    table = $('#dealerTables').DataTable({
        "scrollY": 290,
        "scrollX": true,
        // dom: 'Bfrtip',
        // buttons: [
        //     'copy', 'csv', 'excel', 'pdf', 'print'
        // ]
    });


});


//function when row is clicked
$('#dealerTables tbody').on('click', 'tr', function () {
    selectedRowData = table.row(this).data();
    SelectedCustomerUsername = "SELECT  address, pincode, telephone,  businessgeography, cinno, contactparticulars, currentproducts, currentstaffstrength, customershandledsofar, gstno, legalstatus, marketsegment, mobile, nameofcontact, panno, parternshipcat, salersturnover, shopactno FROM public.mainapp_profile WHERE user_id= " + selectedRowData[0]
    $.get("/getdetailofselectedcustmor/", { sqlParam: SelectedCustomerUsername }, function (data) {
        // allCustomerData = data
        // customerName = document.getElementById('thisCust-' + selectedcustid).innerHTML
        document.getElementById('dealeraddress').innerHTML = data[0][0]
        document.getElementById('dealerpincode').innerHTML = data[0][1]
        document.getElementById('dealertelephone').innerHTML = data[0][2]
        document.getElementById('dealerBusinessgeography').innerHTML = data[0][3]
        document.getElementById('dealerCinno').innerHTML = data[0][4]
        document.getElementById('dealerContactparticulars').innerHTML = data[0][5]
        document.getElementById('dealerCurrentproducts').innerHTML = data[0][6]
        document.getElementById('dealerCurrentstaffstrength').innerHTML = data[0][7]
        document.getElementById('dealerCustomershandledsofar').innerHTML = data[0][8]
        document.getElementById('dealerGstno').innerHTML = data[0][9]
        document.getElementById('dealerLegalstatus').innerHTML = data[0][10]
        document.getElementById('dealerMarketsegment').innerHTML = data[0][11]
        document.getElementById('dealermobile').innerHTML = data[0][12]
        document.getElementById('dealerNameofcontact').innerHTML = data[0][13]
        document.getElementById('dealerPanno').innerHTML = data[0][14]
        document.getElementById('dealerParternshipcat').innerHTML = data[0][15]
        document.getElementById('dealerSalersturnover').innerHTML = data[0][16]
        document.getElementById('dealerShopactno').innerHTML = data[0][17]

        $('#DealerModal').modal('show')
    })
    var a = document.createElement('a')
    link = "/editingdealer"
    a.href = link + '/' + selectedRowData[0]
    a.innerText = 'Edit'
    document.getElementById('editid').innerHTML = ''
    document.getElementById('editid').appendChild(a)
    var a = document.createElement('a')
    link = "/removingdealer"
    a.href = link + '/' + selectedRowData[0]
    a.innerText = 'Delete'
    document.getElementById('deleteid').innerHTML = ''
    document.getElementById('deleteid').appendChild(a)

});

// open confirmation of delete modal
function openconfirmationModal() {
    $('#confirmdeletemodal').modal('show');

}


function removedealer(selectedRowData) {

    var delteQuery = "DELETE FROM public.mainapp_customerprofile WHERE user_id= " + selectedRowData[0]
    // var addtoinvoicedb = "INSERT INTO public.mainapp_invoicestorage(invoiceid, creatorid, deletorid,typeofchange) VALUES (" + invoiceid + ", " + creator + ", " + loggedinuser + ",'delete');"
    // $.get("/addtoinvoicedb/", { sqlParam: addtoinvoicedb }, function (data) {
    //     console.log(data)
    $.get("/deletedealer/", { sqlParam: delteQuery }, function (data) {
        console.log(data)
        $('#customerModal').modal('hide');
        $('#confirmdeletemodal').modal('hide');


    })

    // })



}
