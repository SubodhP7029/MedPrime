// // add variables 
var allProductsData, customerbuilding, customerarea, customerlandmark, shippingbuilding, shippingarea, shippinglandmark, invoiceDate, invoiceDateEntered, dueDate, dueDateEntered, customerStateCode, shippingPincode, shippingCity, shippingState, shippingCountry, selectedStateCode, customerCity, stateSGSTflag, stateCGSTflag, stateIGSTflag, img, tableBodiesAllRows, selectedStateIGST, selectedStateCGST, selectedStateSGST, logo, allCustomerData, companyName, customerAdd, customerPincode, customerState, customerCountry, customerGST, PONo, imgUrl, doc, allProductsDataColumns, allInfoOfSelectedCustomer, SelectedCustomerUsername, SelectedCustomerId
var allProductJSONArray = []
var TotalDisc = 0, totalAdjustment = 0, rowsCounter = 0, totalAmt = 0, totalGSTAmt = 0, finalAmout = 0, Finalamount
var selectedRowData, invoiceID, clickedTR, typeofadjustment
var flagForTax = false, stateIGSTflag = false, stateCGSTflag = false, stateSGSTflag = false
var taxBrackets = []
$(document).ready(function () {
    // raw query to get all prouct data columns
    $.get("/invoicegetallprodcol/", function (data) {
        allProductsDataColumns = data

        //  raw query to get all product data
        $.get("/invoicegetallprod/", function (data) {
            allProductsData = data

            //create allProductJSONArray 
            for (i = 0; i < allProductsData.length; i++) {
                var eachIndividualProduct = {}
                for (j = 0; j < allProductsDataColumns.length; j++) {
                    eachIndividualProduct[allProductsDataColumns[j].col[0]] = allProductsData[i].data[j]
                }
                allProductJSONArray.push(eachIndividualProduct)
            }


        })
    })
    // Setup - add a text input to each footer cell
    $('#invoiceTables thead tr').clone(true).appendTo('#invoiceTables thead');
    $('#invoiceTables thead tr:eq(1) th').each(function (i) {
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
    var table = $('#invoiceTables').DataTable({
        "scrollY": 290,
        "scrollX": true,
        'iDisplayLength': 100
        // dom: 'Bfrtip',
        // buttons: [
        //     'copy', 'csv', 'excel', 'pdf', 'print'
        // ]
    });

    //function when row is clicked
    $('#invoiceTables tbody').on('click', 'tr', function () {
        selectedRowData = table.row(this).data();
        var a = document.createElement('a')
        link = "/cloninginvoice"
        a.href = link + '/' + selectedRowData[0]
        a.innerText = 'Clone'
        document.getElementById('cloningid').innerHTML = ''
        document.getElementById('cloningid').appendChild(a)
        var a = document.createElement('a')
        link = "/editinginvoice"
        a.href = link + '/' + selectedRowData[0]
        a.innerText = 'Edit'
        document.getElementById('editid').innerHTML = ''
        document.getElementById('editid').appendChild(a)
        $('#optionsModal').modal('show');
    });


    // change items from raw to json 
    var allitems = document.getElementsByClassName('items')
    for (i = 0; i < allitems.length; i++) {
        var stingdata = allitems[i].innerText
        var c = stingdata.split("'").join('"')
        var theJSON = JSON.parse(c)
        var JSONlen = Object.keys(theJSON)
        var newString = ''
        for (j = 0; j < JSONlen.length; j++) {

            newString += '<b class="productName">' + theJSON[JSONlen[j]]["Product"] + '</b> <span class="productDesc">Qty :' + theJSON[JSONlen[j]]["Quantity"] + '  </span>'
        }
        allitems[i].innerHTML = newString
    }

    // function to open modal of options

});

function ViewPDF(selectedRowData) {
    SelectedState = "SELECT igst,cgst,sgst FROM public.mainapp_gsttable WHERE state= '" + selectedRowData[3] + "'"
    $.get("gettaxdetailofstate/", { sqlParam: SelectedState }, function (gsttype) {
        SelectedCustomerUsername = "SELECT billingbuilding,billingpincode,billingcity,billingstate,billingcountry,gst,stateid,building, pincode,  city,state,  country,customername,billingarea,billinglandmark,area,landmark FROM public.mainapp_customerprofile WHERE user_id=" + selectedRowData[1]
        $.get("/getdetailofselectedcustmor/", { sqlParam: SelectedCustomerUsername }, function (data) {
            var tableheadarray = ['Sr No.', 'Product', 'HSN/SAC', 'QTY', 'Rate', 'Discount']
            if (gsttype.length != 0) {
                stateIGSTflag = gsttype[0][0]
                stateCGSTflag = gsttype[0][1]
                stateSGSTflag = gsttype[0][2]
                if (stateIGSTflag) {
                    tableheadarray.push('IGST')

                } else {
                    tableheadarray.push('CGST')
                    tableheadarray.push('SGST')
                }
                flagForTax = true
            } else {
                flagForTax = false
            }
            tableheadarray.push('Amount')

            //create pdf 
            doc = new jsPDF()
            //assigning all variable values
            invoiceID = selectedRowData[0]
            companyName = data[0][12]
            customerbuilding = data[0][0]
            customerarea = data[0][13]
            customerlandmark = data[0][14]
            customerPincode = data[0][1]
            customerCity = data[0][2]
            customerState = data[0][3]
            customerCountry = data[0][4]
            customerGST = data[0][5]
            customerStateCode = data[0][6]
            invoiceDateEntered = selectedRowData[4].split('-')
            invoiceDate = selectedRowData[4]
            dueDate = selectedRowData[5]
            dueDateEntered = selectedRowData[6].split('-')
            PONo = selectedRowData[7]
            Finalamount = selectedRowData[12]
            totalAmt = selectedRowData[9]
            totalGSTAmt = selectedRowData[10]
            totalAdjustment = selectedRowData[11]
            typeofadjustment = selectedRowData[15]
            sign = selectedRowData[13]
            shippingbuilding = data[0][7]
            shippingarea = data[0][15]
            shippinglandmark = data[0][16]
            shippingPincode = data[0][8]
            shippingCity = data[0][9]
            shippingState = data[0][10]
            shippingCountry = data[0][11]
            //creat items table
            stingdata = selectedRowData[8]
            var c = stingdata.split("'").join('"')
            var theJSON = JSON.parse(c)
            var JSONlen = Object.keys(theJSON)
            var tr = document.getElementById('headOfProductPreview')
            tr.innerHTML = ''
            tr.className = 'tableHead'
            var tbody = document.getElementById('bodyOfProductPreview')
            tbody.innerHTML = ''
            for (i = 0; i < tableheadarray.length; i++) {
                var td = document.createElement('td')
                td.innerText = tableheadarray[i]
                td.id = tableheadarray[i] + 'Column'

                tr.appendChild(td)
            }
            for (j = 0; j < JSONlen.length; j++) {

                //
                var tr = document.createElement('tr')
                tr.onclick = function () {
                    $('#EditingRowInPreviewTable').modal('show');
                    clickedTR = this
                };
                var td = document.createElement('td')
                td.innerHTML = ''
                tr.appendChild(td)
                var td = document.createElement('td')
                td.innerHTML = "<b class='productName'>" + theJSON[JSONlen[j]]['Product'] + "</b><br><p class='productDesc'>" + theJSON[JSONlen[j]]['Description'] + "</p>"
                tr.appendChild(td)
                var td = document.createElement('td')
                td.className = 'productHSN'
                td.innerHTML = theJSON[JSONlen[j]]['HSN']
                tr.appendChild(td)
                var td = document.createElement('td')
                td.className = 'productQuantity'
                td.innerHTML = theJSON[JSONlen[j]]['Quantity']
                quantity = theJSON[JSONlen[j]]['Quantity']
                tr.appendChild(td)
                var td = document.createElement('td')
                td.className = 'productRate'
                td.innerHTML = theJSON[JSONlen[j]]['Rate']
                rate = theJSON[JSONlen[j]]['Rate']
                tr.appendChild(td)
                var td = document.createElement('td')
                td.className = 'discount'
                td.innerHTML = theJSON[JSONlen[j]]['Discount']
                tr.appendChild(td)
                if (flagForTax) {
                    for (h = 0; h < allProductJSONArray.length; h++) {
                        if (theJSON[JSONlen[j]]['HSN'] == allProductJSONArray[h]["HSN"]) {
                            var taxValue = allProductJSONArray[h]['tax']
                            if (!taxBrackets.includes(taxValue)) {
                                taxBrackets.push(taxValue)
                            }
                            if (stateIGSTflag) {
                                var IGSTval = quantity * rate * taxValue / 100
                                var td = document.createElement('td')
                                td.className = 'productIGST'
                                td.innerHTML = "<b class='igstvalue gstvalue'>" + IGSTval + "</b><br><p class='igstrate'>" + taxValue + "%</p>"
                                tr.appendChild(td)
                            } else {
                                var CGSTval = quantity * rate * taxValue / 200
                                var SGSTval = quantity * rate * taxValue / 200

                                var td = document.createElement('td')
                                td.className = 'productCGST'
                                td.innerHTML = "<b class='cgstvalue gstvalue'>" + CGSTval + "</b><br><p class='cgstrate'>" + taxValue / 2 + "%</p>"
                                tr.appendChild(td)

                                var td = document.createElement('td')
                                td.className = 'productSGST'
                                td.innerHTML = "<b class='sgstvalue gstvalue'>" + SGSTval + "</b><br><p class='sgstrate'>" + taxValue / 2 + "%</p>"
                                tr.appendChild(td)
                            }
                        }
                    }

                }
                var td = document.createElement('td')
                td.className = 'finalvalue'
                td.innerHTML = theJSON[JSONlen[j]]['Final Price']
                tr.appendChild(td)
                tbody.appendChild(tr)
                //
            }
            insertSrNo()
            getFinalAmountFromTable()
            // setup medprime info
            function getImgFromUrl(logo_url, callback) {
                img = new Image();
                img.src = logo_url;
                img.onload = function () {
                    callback(img);
                };
            }
            var logo_url = document.getElementById('logoofcompany').src;
            getImgFromUrl(logo_url, function (img) {
                imgUrl = document.getElementById('signatureOfAdmin').src
                getDataUri(imgUrl, function (dataUri) {
                    logo = dataUri;
                    console.log("logo=" + logo);
                    generatePDF(img);
                });

            });
        })
    }
    )
}

function generatePDF(img) {
    //check the total of all discounts
    TotalDisc = 0
    tableBodiesAllRows = document.getElementById('bodyOfProductPreview').getElementsByTagName('tr')
    allDiscCells = document.getElementsByClassName('discount')
    for (eachItem = 0; eachItem < allDiscCells.length; eachItem++) {
        TotalDisc += parseInt(allDiscCells[eachItem].innerHTML)
    }
    if (TotalDisc == 0) {
        document.getElementById('DiscountColumn').style.display = 'none'
        for (eachItem = 0; eachItem < allDiscCells.length; eachItem++) {
            allDiscCells[eachItem].style.display = 'none'
        }
    }
    var MedprimeAddressLocation = [20, 40]
    headerOfPdf(doc, img, MedprimeAddressLocation)
    //setup table of product
    doc.autoTable({
        html: '#Previewtable', columnStyles: {
            1: { columnWidth: 60 },
            // etc
        }, margin: { top: MedprimeAddressLocation[1] + 80, left: MedprimeAddressLocation[0], bottom: 100 }, pageBreak: 'avoid'
    });
    let finalY = doc.lastAutoTable.finalY;
    addfinalAmout(doc, finalY)
    var string = doc.output('datauristring');
    var modalBody = document.getElementById('previewModalBody')
    modalBody.innerHTML = ''
    var emb = document.createElement('embed')
    emb.width = '100%'
    emb.height = '100%'
    emb.src = string
    modalBody.appendChild(emb)
    $('#exampleModalLong').modal('show');
    if (TotalDisc == 0) {
        document.getElementById('DiscountColumn').removeAttribute("style");

        for (eachItem = 0; eachItem < allDiscCells.length; eachItem++) {
            allDiscCells[eachItem].removeAttribute("style");
        }
    }

}


//pdf header 
function headerOfPdf(doc, img, MedprimeAddressLocation) {
    doc.setFontSize(12)
    doc.setFontType('bold');
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1], 'Medprime Technologies Pvt Ltd.')
    doc.setFontType('normal');
    doc.setFontSize(9)
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 5, '104,105,106 Casa Piedade Co. HSG So. Anandji Sunder Road,')
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 10, 'Dighe Chowk')
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 15, 'Charai')
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 20, 'Thane 400601')
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 25, '9833680874')
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 30, 'GSTIN 27AAJCM5065B1ZK')

    //setup customer info
    //Billing Address
    doc.setFontSize(11)
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 40, 'Billing Address:')
    doc.setFontSize(9)
    doc.setFontType('bold');
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 45, companyName)
    doc.setFontType('normal');
    doc.setFontSize(9)
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 50, customerAdd)
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 60, '' + customerPincode + ',' + customerCity + ',')
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 65, '' + customerState + ',' + customerCountry)
    if (customerGST != '' && customerGST != null) {
        doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 70, 'GST No:' + customerGST)
    }
    //Shippinh Address
    var d = 50 //distance Between Billing And Shipping Text
    doc.setFontSize(11)
    doc.text(MedprimeAddressLocation[0] + d, MedprimeAddressLocation[1] + 40, 'Shipping Address:')
    doc.setFontSize(9)

    doc.text(MedprimeAddressLocation[0] + d, MedprimeAddressLocation[1] + 45, shippingbuilding)
    doc.text(MedprimeAddressLocation[0] + d, MedprimeAddressLocation[1] + 48, shippingarea)

    doc.text(MedprimeAddressLocation[0] + d, MedprimeAddressLocation[1] + 51, shippinglandmark)

    doc.text(MedprimeAddressLocation[0] + d, MedprimeAddressLocation[1] + 55, '' + shippingPincode + ',' + shippingCity + ',')
    doc.text(MedprimeAddressLocation[0] + d, MedprimeAddressLocation[1] + 60, '' + shippingState + ',' + shippingCountry)
    if (customerStateCode != 0) {
        doc.text(MedprimeAddressLocation[0] + d, MedprimeAddressLocation[1] + 65, 'Place Of Supply:' + shippingState + " (" + customerStateCode + ")")
    } else {
        doc.text(MedprimeAddressLocation[0] + d, MedprimeAddressLocation[1] + 65, 'Place Of Supply:' + shippingState)

    }
    var datePosition = [160, 80]
    doc.text("Invoice Date:", datePosition[0], datePosition[1], null, null, 'right')
    doc.text('' + invoiceDateEntered[2] + '-' + invoiceDateEntered[1] + '-' + invoiceDateEntered[0], datePosition[0] + 30, datePosition[1], null, null, 'right')
    doc.text("Terms:", datePosition[0], datePosition[1] + 5, null, null, 'right')
    doc.text("Due on Receipt", datePosition[0] + 30, datePosition[1] + 5, null, null, 'right')
    doc.text("Due Date:", datePosition[0], datePosition[1] + 10, null, null, 'right')
    doc.text('' + dueDateEntered[2] + '-' + dueDateEntered[1] + '-' + dueDateEntered[0], datePosition[0] + 30, datePosition[1] + 10, null, null, 'right')
    doc.text("P.O.#:", datePosition[0], datePosition[1] + 15, null, null, 'right')
    doc.setFontSize(8)

    doc.text(PONo, datePosition[0] + 30, datePosition[1] + 15, null, null, 'right')

    //Generate Logo Image
    doc.addImage(img, 'PNG', 20, 20, 50, 10);
    // signature
    const imgWidth = 50;
    const imgHeight = 20;
    if (sign == 'True') {
        doc.addImage(logo, 'PNG', 20, 225, imgWidth, imgHeight);
    }

    doc.text(20, 250, 'Signature ')
    doc.text(20, 260, 'Terms: ')
    doc.text(20, 270, document.getElementById('termsNcondition').value)
    //final Amount
    doc.setFontSize(13)
    doc.setFontType('bold');
    doc.text('Balance Due', 190, MedprimeAddressLocation[1], null, null, 'right')
    doc.setFontSize(11)
    doc.text('' + Finalamount + '', 190, MedprimeAddressLocation[1] + 7, null, null, 'right')
    doc.setFontSize(16)
    doc.text('Tax Invoice', 190, 20, null, null, 'right')
    doc.setFontSize(10)
    doc.setFontType('normal');
    doc.text('#Invoice :', 160, 27, null, null, 'right')
    doc.text(invoiceID + '', 190, 27, null, null, 'right')



}


// add final total after table 
function addfinalAmout(doc, finalY) {
    //setup final amount
    doc.setFontSize(11)
    doc.text("Sub Total", 120, finalY + 7, null, null, 'left')
    doc.text('' + (Math.round(totalAmt * 100) / 100) + '', 190, finalY + 7, null, null, 'right')
    if (flagForTax) {
        var offset = 0
        startPos = finalY + 14
        if (!stateIGSTflag) {
            for (k = 0; k < taxBrackets.length; k++) {
                var taxVal = taxBrackets[k] / 2
                var taxTotal = 0
                var allCGST = document.getElementsByClassName('cgstrate')
                for (j = 0; j < allCGST.length; j++) {
                    if (parseFloat(allCGST[j].innerHTML.slice(0, -1)) == taxVal) {
                        taxTotal += parseFloat(allCGST[j].parentElement.getElementsByClassName('cgstvalue')[0].innerHTML)
                    }
                }
                if (taxTotal != 0) {
                    doc.text("CGST(" + taxVal + "%)", 120, startPos + offset, null, null, 'left')
                    doc.text('' + (Math.round(taxTotal)) + '', 190, startPos + offset, null, null, 'right')
                    offset = offset + 7
                }
            }
            for (k = 0; k < taxBrackets.length; k++) {
                var taxVal = taxBrackets[k] / 2
                var taxTotal = 0
                var allSGST = document.getElementsByClassName('sgstrate')
                for (j = 0; j < allSGST.length; j++) {
                    if (parseFloat(allSGST[j].innerHTML.slice(0, -1)) == taxVal) {
                        taxTotal += parseFloat(allSGST[j].parentElement.getElementsByClassName('sgstvalue')[0].innerHTML)
                    }
                }
                if (taxTotal != 0) {
                    doc.text("SGST(" + taxVal + "%)", 120, startPos + offset, null, null, 'left')
                    doc.text('' + (Math.round(taxTotal)) + '', 190, startPos + offset, null, null, 'right')
                    offset = offset + 7
                }
            }
            if (typeofadjustment == 'add') {
                doc.text("Adjustment (+)", 120, startPos + offset + 7, null, null, 'left')
            } else {
                doc.text("Adjustment (-)", 120, startPos + offset + 7, null, null, 'left')
            } doc.text('' + (Math.round(totalAdjustment * 100) / 100) + '', 190, startPos + offset + 7, null, null, 'right')
            doc.setFontType('bold');
            doc.text("Total", 120, startPos + offset + 14, null, null, 'left')
            doc.text('' + Finalamount + '', 190, startPos + offset + 14, null, null, 'right')
        } else {
            for (k = 0; k < taxBrackets.length; k++) {
                var taxVal = taxBrackets[k]
                var taxTotal = 0
                var allIGST = document.getElementsByClassName('igstrate')
                for (j = 0; j < allIGST.length; j++) {
                    if (parseFloat(allIGST[j].innerHTML.slice(0, -1)) == taxVal) {
                        taxTotal += parseFloat(allIGST[j].parentElement.getElementsByClassName('igstvalue')[0].innerHTML)
                    }
                }
                if (taxTotal != 0) {
                    doc.text("IGST(" + taxVal + "%)", 120, startPos + offset, null, null, 'left')
                    doc.text('' + (Math.round(taxTotal)) + '', 190, startPos + offset, null, null, 'right')
                    offset = offset + 7
                }
            }
            if (typeofadjustment == 'add') {
                doc.text("Adjustment (+)", 120, startPos + offset + 7, null, null, 'left')
            } else {
                doc.text("Adjustment (-)", 120, startPos + offset + 7, null, null, 'left')
            } doc.text('' + (Math.round(totalAdjustment * 100) / 100) + '', 190, startPos + offset + 7, null, null, 'right')
            doc.setFontType('bold');
            doc.text("Total", 120, startPos + offset + 14, null, null, 'left')
            doc.text('' + Finalamount + '', 190, startPos + offset + 14, null, null, 'right')
        }
    } else {
        if (typeofadjustment == 'add') {
            doc.text("Adjustment (+)", 120, finalY + 14, null, null, 'left')
        } else {
            doc.text("Adjustment (-)", 120, finalY + 14, null, null, 'left')
        }
        doc.text('' + (Math.round(totalAdjustment * 100) / 100) + '', 190, finalY + 14, null, null, 'right')
        doc.setFontType('bold');
        doc.text("Total", 120, finalY + 21, null, null, 'left')
        doc.text('' + Finalamount + '', 190, finalY + 21, null, null, 'right')

    }
    //setup date
    doc.setFontSize(10)
    doc.setFontType('normal');
}


//download the pdf
function downloadPdf() {

    doc.save(PONo + '.pdf')

}
function getDataUri(url, cb) {
    var image = new Image();
    image.setAttribute('crossOrigin', 'anonymous'); //getting images from external domain

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;

        //next three lines for white background in case png has a transparent background
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';  /// set white fill style
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        canvas.getContext('2d').drawImage(this, 0, 0);

        cb(canvas.toDataURL('image/jpeg'));
    };

    image.src = url;
}

function removeinvoice(selectedRowData) {
    var creator = selectedRowData[14]
    var loggedinuser = document.getElementById('currentloggedinuser').value
    var invoiceid = selectedRowData[0]
    var delteQuery = 'DELETE FROM mainapp_taxinvoice WHERE invoiceid = ' + invoiceid
    var addtoinvoicedb = "INSERT INTO public.mainapp_invoicestorage(invoiceid, creatorid, deletorid,typeofchange) VALUES (" + invoiceid + ", " + creator + ", " + loggedinuser + ",'delete');"
    $.get("/addtoinvoicedb/", { sqlParam: addtoinvoicedb }, function (data) {
        console.log(data)
        $.get("/removeinvoices/", { sqlParam: delteQuery }, function (data) {
            console.log(data)
            $('#optionsModal').modal('hide');

            $('#confirmdeletemodal').modal('hide');


        })

    })



}


// open confirmation of delete modal
function opencoinfirmationModal() {
    $('#confirmdeletemodal').modal('show');

}