var table
$(document).ready(function () {
    $('#productTables thead tr').clone(true).appendTo('#productTables thead');
    $('#productTables thead tr:eq(1) th').each(function (i) {
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
    table = $('#productTables').DataTable({
        "scrollY": 290,
        "scrollX": true,
        // dom: 'Bfrtip',
        // buttons: [
        //     'copy', 'csv', 'excel', 'pdf', 'print'
        // ]
    });


});

//function when row is clicked
$('#productTables tbody').on('click', 'tr', function () {
    selectedRowData = table.row(this).data();
    // allCustomerData = data
    // customerName = document.getElementById('thisCust-' + selectedcustid).innerHTML
    document.getElementById('productname').innerHTML = selectedRowData[0]
    document.getElementById('productprice').innerHTML = selectedRowData[1]
    document.getElementById('productHSN').innerHTML = selectedRowData[2]
    document.getElementById('producttax').innerHTML = selectedRowData[3]
    document.getElementById('productdescription').innerHTML = selectedRowData[4]

    var a = document.createElement('a')
    link = "/editingproduct"
    a.href = link + '/' + selectedRowData[2]
    a.innerText = 'Edit'
    document.getElementById('editid').innerHTML = ''
    document.getElementById('editid').appendChild(a)
    var a = document.createElement('a')
    link = "/deleteproduct"
    a.href = link + '/' + selectedRowData[2]
    a.innerText = 'Remove'
    document.getElementById('deleteid').innerHTML = ''
    document.getElementById('deleteid').appendChild(a)
    $('#productModal').modal('show')
});

