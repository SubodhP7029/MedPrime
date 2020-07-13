// add variables 
var allProductsData, selectedStateCode, companyName, productTax, clickedTR, img, tableBodiesAllRows, allDiscCells, selectedStateIGST, selectedStateCGST, selectedStateSGST, logo, allCustomerData, customerusername, customerName, customerbuilding, customerarea, customerlandmark, shippingbuilding, shippingarea, shippinglandmark, customerPincode, shippingPincode, customerState, shippingState, customerGST, shippingCity, shippingCountry, customerCity, customerCountry, PONo, imgUrl, doc, allProductsDataColumns, allInfoOfSelectedCustomer, SelectedCustomerUsername, SelectedCustomerId
var allProductJSONArray = []
var TotalDisc = 0, totalAdjustment = 0, rowsCounter = 0, totalAmt = 0, totalGSTAmt = 0, finalAmout = 0
var flagForTax = false, stateIGSTflag = false, stateCGSTflag = false, stateSGSTflag = false
var taxBrackets = []


// $("#Previewtable tbody tr").on("click", function (event) {
//     alert(event)

// });
//price of selected product
function priceOfProduct() {
    var product = document.getElementById('selectedProduct').value

    for (i = 0; i < allProductJSONArray.length; i++) {
        if (product == allProductJSONArray[i].name) {
            document.getElementById('selectedProductPrice').value = allProductJSONArray[i].price
            productTax = allProductJSONArray[i].tax
            if (!taxBrackets.includes(productTax)) {
                taxBrackets.push(productTax)
            }
        }
    }
}



function EditingTr(val) {
    document.getElementById('newName').value = val.getElementsByClassName('productName')[0].innerText
    document.getElementById('newDescription').value = val.getElementsByClassName('productDesc')[0].innerText
    document.getElementById('newqt').value = val.getElementsByClassName('productQuantity')[0].innerText
    document.getElementById('newrate').value = val.getElementsByClassName('productRate')[0].innerText
    document.getElementById('newdesc').value = val.getElementsByClassName('discount')[0].innerText

    document.getElementById('newQtydiv').style.display = 'block'


    document.getElementById('saveButton').addEventListener('click', function () {
        SavingNewQty(val);
    });
}

function SavingNewQty(val) {
    document.getElementById('newQtydiv').style.display = 'none'
    val.getElementsByClassName('productName')[0].innerHTML = document.getElementById('newName').value
    val.getElementsByClassName('productDesc')[0].innerHTML = document.getElementById('newDescription').value
    quantity = parseFloat(document.getElementById('newqt').value)

    val.getElementsByClassName('productQuantity')[0].innerHTML = quantity
    rate = parseFloat(document.getElementById('newrate').value)
    if (rate == '') {
        rate = val.getElementsByClassName('productRate')[0].innerHTML
    } else {
        val.getElementsByClassName('productRate')[0].innerHTML = rate
    }
    var disctype = document.getElementById('typeOfDesc').value
    var discount = parseFloat(document.getElementById('newdesc').value)
    if (disctype == 'perc') {
        discount = (rate * discount / 100) * quantity
    }
    val.getElementsByClassName('discount')[0].innerText = discount

    var finalVal = (quantity * rate) - discount
    if (flagForTax) {
        if (selectedStateIGST) {
            var IGSTval = ((quantity * rate) - discount) * selectedStateIGST / 100
            // val.getElementsByClassName('gstvalue')[0].innerText = IGSTval
            val.getElementsByClassName('productIGST')[0].innerHTML = "<b class='igstvalue gstvalue'>" + IGSTval + "</b><br><p class='igstrate'>" + selectedStateIGST + "%</p>"

        }
        else {
            var CGSTval = ((quantity * rate) - discount) * selectedStateCGST / 100
            var SGSTval = ((quantity * rate) - discount) * selectedStateSGST / 100
            val.getElementsByClassName('productCGST')[0].innerHTML = "<b class='cgstvalue gstvalue'>" + CGSTval + "</b><br><p class='cgstrate'>" + selectedStateCGST + "%</p>"
            val.getElementsByClassName('productSGST')[0].innerHTML = "<b class='sgstvalue gstvalue'>" + SGSTval + "</b><br><p class='sgstrate'>" + selectedStateSGST + "%</p>"
        }
    }

    val.getElementsByClassName('finalvalue')[0].innerText = finalVal
    getFinalAmountFromTable()
}

function insertSrNo() {
    var allrows = document.getElementById('bodyOfProductPreview').getElementsByTagName('tr')

    for (i = 0; i < allrows.length; i++) {
        allrows[i].cells[0].innerHTML = i + 1
    }
}
// add new product to preview
function addProduct() {
    rowsCounter++
    var product = document.getElementById('selectedProduct').value
    var quantity = document.getElementById('selectedProductQuanity').value
    var disctype = document.getElementById('typeofdiscout').value
    var discount = document.getElementById('selectedProductDiscount').value
    var desc, HSN, rate
    // get  desc, HSN,rate info of selected product
    for (i = 0; i < allProductJSONArray.length; i++) {
        if (product == allProductJSONArray[i].name) {
            desc = allProductJSONArray[i].description
            HSN = allProductJSONArray[i].HSN
        }
    }
    rate = document.getElementById('selectedProductPrice').value
    if (disctype == 'perc') {
        discount = (rate * discount / 100) * quantity
    }
    if (flagForTax) {
        if (stateIGSTflag) {
            selectedStateIGST = productTax
            var IGSTval = ((quantity * rate) - discount) * selectedStateIGST / 100
        }
        else {
            selectedStateCGST = productTax / 2
            selectedStateSGST = productTax / 2
            var CGSTval = ((quantity * rate) - discount) * selectedStateCGST / 100
            var SGSTval = ((quantity * rate) - discount) * selectedStateSGST / 100

        }
    }

    var finalVal = (quantity * rate) - discount
    if (product != '' && quantity != '') {
        var thebody = document.getElementById('bodyOfProductPreview')
        var tr = document.createElement('tr')
        tr.onclick = function () {
            $('#EditingRowInPreviewTable').modal('show');
            clickedTR = this
        };
        var td = document.createElement('td')
        td.innerHTML = ''
        tr.appendChild(td)
        var td = document.createElement('td')
        td.innerHTML = "<b class='productName'>" + product + "</b><br><p class='productDesc'>" + desc + "</p>"
        tr.appendChild(td)
        var td = document.createElement('td')
        td.className = 'productHSN'
        td.innerHTML = HSN
        tr.appendChild(td)
        var td = document.createElement('td')
        td.className = 'productQuantity'
        td.innerHTML = quantity
        tr.appendChild(td)
        var td = document.createElement('td')
        td.className = 'productRate'
        td.innerHTML = rate
        tr.appendChild(td)
        var td = document.createElement('td')
        td.className = 'discount'
        td.innerHTML = discount
        tr.appendChild(td)
        if (flagForTax) {
            if (stateIGSTflag) {
                var td = document.createElement('td')
                td.className = 'productIGST'
                td.innerHTML = "<b class='igstvalue gstvalue'>" + IGSTval + "</b><br><p class='igstrate'>" + selectedStateIGST + "%</p>"
                tr.appendChild(td)
            } else {
                var td = document.createElement('td')
                td.className = 'productCGST'
                td.innerHTML = "<b class='cgstvalue gstvalue'>" + CGSTval + "</b><br><p class='cgstrate'>" + selectedStateCGST + "%</p>"
                tr.appendChild(td)

                var td = document.createElement('td')
                td.className = 'productSGST'
                td.innerHTML = "<b class='sgstvalue gstvalue'>" + SGSTval + "</b><br><p class='sgstrate'>" + selectedStateSGST + "%</p>"
                tr.appendChild(td)
            }
        }
        var td = document.createElement('td')
        td.className = 'finalvalue'
        td.innerHTML = finalVal
        tr.appendChild(td)
        thebody.appendChild(tr)

    }
    insertSrNo()
    getFinalAmountFromTable()
}

//get final amount when product is added or removed
function getFinalAmountFromTable() {
    var totalGSTItems = document.getElementsByClassName('gstvalue')
    var totalAmtItems = document.getElementsByClassName('finalvalue')

    totalAmt = 0, totalGSTAmt = 0, finalAmout = 0
    for (i = 0; i < totalGSTItems.length; i++) {
        totalGSTAmt += parseFloat(totalGSTItems[i].innerHTML)
    }
    for (i = 0; i < totalAmtItems.length; i++) {
        totalAmt += parseFloat(totalAmtItems[i].innerHTML)
    }


    finalAmout = totalGSTAmt + totalAmt
    $('#FinalAmount').val(finalAmout)
}




function getAllCustomerInfo() {
    SelectedCustomerUsername = "SELECT billingbuilding,billingpincode,billingcity,billingstate,billingcountry,gst,stateid,building, pincode,  city,state,  country,customername,billingarea,billinglandmark,area,landmark FROM public.mainapp_customerprofile WHERE user_id=" + document.getElementById('selectedcustomer').value
    $.get("/getdetailofselectedcustmor/", { sqlParam: SelectedCustomerUsername }, function (data) {
        allCustomerData = data
        customerName = document.getElementById('thisCust-' + document.getElementById('selectedcustomer').value).innerHTML
        customerbuilding = data[0][0]
        customerarea = data[0][13]
        customerlandmark = data[0][14]
        customerPincode = data[0][1]
        customerCity = data[0][2]
        customerState = data[0][3]
        customerCountry = data[0][4]
        customerGST = data[0][5]
        customerStateCode = data[0][6]
        shippingbuilding = data[0][7]
        shippingarea = data[0][15]
        shippinglandmark = data[0][16]
        shippingPincode = data[0][8]
        shippingCity = data[0][9]
        shippingState = data[0][10]
        shippingCountry = data[0][11]
        companyName = data[0][12]
        if (shippingState) {
            SelectedState = "SELECT igst,cgst,sgst FROM public.mainapp_gsttable WHERE state= '" + shippingState + "'"
            $.get("gettaxdetailofstate/", { sqlParam: SelectedState }, function (data) {

                var tr = document.getElementById('headOfProductPreview')
                tr.innerHTML = ''
                var tb = document.getElementById('bodyOfProductPreview')
                tb.innerHTML = ''
                rowsCounter = 0
                var tableHeads = ['Sr No.', 'Product', 'HSN/SAC', 'QTY', 'Rate', 'Discount']

                if (data.length != 0) {
                    stateIGSTflag = data[0][0]
                    stateCGSTflag = data[0][1]
                    stateSGSTflag = data[0][2]
                    if (stateIGSTflag) {
                        tableHeads.push('IGST')

                    } else {
                        tableHeads.push('CGST')
                        tableHeads.push('SGST')
                    }
                    flagForTax = true

                } else {
                    flagForTax = false
                }
                tableHeads.push('Amount')
                for (i = 0; i < tableHeads.length; i++) {
                    var th = document.createElement('th')
                    th.innerHTML = tableHeads[i]
                    th.id = tableHeads[i] + 'Column'
                    tr.appendChild(th)
                }
            })
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Customer state is not defined!',
                showConfirmButton: false,
                timer: 2000
            })
        }
    })

}



// raw query to get all prouct data columns
$.get("/invoicegetallprodcol/", function (data) {
    allProductsDataColumns = data

    //  raw query to get all product data
    $.get("/invoicegetallprod/", function (data) {
        allProductsData = data

        var ProductSelectDropdown = document.getElementById('selectedProduct')
        ProductSelectDropdown.innerHTML = "<option value=''>Select Product</option>"

        //create allProductJSONArray 
        for (i = 0; i < allProductsData.length; i++) {
            var eachIndividualProduct = {}
            for (j = 0; j < allProductsDataColumns.length; j++) {
                eachIndividualProduct[allProductsDataColumns[j].col[0]] = allProductsData[i].data[j]
            }
            allProductJSONArray.push(eachIndividualProduct)
        }
        // find index of name column in db 
        var indexOfName
        for (j = 0; j < allProductsDataColumns.length; j++) {
            if (allProductsDataColumns[j].col[0] == 'name') {
                indexOfName = j
                break;
            }
        }

        for (i = 0; i < allProductsData.length; i++) {
            ProductSelectDropdown.innerHTML += "<option value='" + allProductsData[i].data[indexOfName] + "'>" + allProductsData[i].data[indexOfName] + "</option>"
        }

    })
})

// Create invoice 
function createPDF() {

    if (allCustomerData == undefined) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Please select customer first',
            showConfirmButton: false,
            timer: 2000
        })
    } else {
        finalAmout = $('#FinalAmount').val()
        if (finalAmout == 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please select Products first',
                showConfirmButton: false,
                timer: 2000
            })
        } else {
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
                doc = new jsPDF()
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
                function generatePDF(img) {

                    var MedprimeAddressLocation = [20, 40]

                    headerOfPdf(doc, img, MedprimeAddressLocation)



                    //setup table of product
                    doc.autoTable({
                        html: '#Previewtable', columnStyles: {
                            1: { columnWidth: 55 },
                            // etc
                        }, margin: { top: MedprimeAddressLocation[1] + 80, left: MedprimeAddressLocation[0], bottom: 100 }, pageBreak: 'avoid'
                    });
                    let finalY = doc.lastAutoTable.finalY;



                    addfinalAmout(doc, finalY)
                    // doc.save(PONo + '.pdf')
                    var string = doc.output('datauristring');
                    var modalBody = document.getElementById('previewModalBody')
                    modalBody.innerHTML = ''
                    var emb = document.createElement('embed')
                    emb.width = '100%'
                    emb.height = '100%'
                    emb.src = string
                    modalBody.appendChild(emb)
                    // document.getElementById('previewOfPdf').setAttribute('src', string)
                    // var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
                    // var x = window.open();
                    // x.document.open();
                    // x.document.write(embed);
                    // x.document.close();
                    $('#exampleModalLong').modal('show');
                    if (TotalDisc == 0) {
                        document.getElementById('DiscountColumn').removeAttribute("style");

                        for (eachItem = 0; eachItem < allDiscCells.length; eachItem++) {
                            allDiscCells[eachItem].removeAttribute("style");
                        }
                    }

                    // location.reload();
                }
        }
    }
}


function insertSrNo() {
    var allrows = document.getElementById('bodyOfProductPreview').getElementsByTagName('tr')

    for (i = 0; i < allrows.length; i++) {
        allrows[i].cells[0].innerHTML = i + 1
    }
}

//get final amount when product is added or removed
function getFinalAmountFromTable() {
    var totalGSTItems = document.getElementsByClassName('gstvalue')
    var totalAmtItems = document.getElementsByClassName('finalvalue')
    var adjustment = parseFloat($('#adjustment').val())
    var adjtype = $('#typeofadjustment').val()

    totalAmt = 0, totalGSTAmt = 0, finalAmout = 0
    for (i = 0; i < totalGSTItems.length; i++) {
        totalGSTAmt += parseFloat(totalGSTItems[i].innerHTML)
    }
    for (i = 0; i < totalAmtItems.length; i++) {
        totalAmt += parseFloat(totalAmtItems[i].innerHTML)
    }
    if (isNaN(adjustment)) {
        adjustment = 0
    }
    if (adjtype == 'add') {
        finalAmout = totalGSTAmt + totalAmt + adjustment

    } else {
        finalAmout = totalGSTAmt + totalAmt - adjustment
    }
    $('#FinalAmount').val(finalAmout)
}

// remove specific tr from preview table
function removingTr(val) {
    val.remove()
    document.getElementById('deleteButton').removeEventListener('click', function () {
        removingTr(thetr);
    });
    insertSrNo()
    getFinalAmountFromTable()
}
// subtract adjustment from finalAmt
function subtractAdj() {
    totalAdjustment = parseFloat($('#adjustment').val())
    var adjtype = $('#typeofadjustment').val()
    if (isNaN(totalAdjustment)) {
        totalAdjustment = 0
    }
    if (adjtype == 'add') {
        $('#FinalAmount').val(finalAmout + totalAdjustment)
    } else {
        $('#FinalAmount').val(finalAmout - totalAdjustment)
    }
}


// remove last product from preview
function removeProduct() {
    var thebody = document.getElementById('bodyOfProductPreview')
    var alltrs = thebody.getElementsByTagName('tr')
    alltrs[alltrs.length - 1].remove()
    getFinalAmountFromTable()
    insertSrNo()
}



//pdf header 
function headerOfPdf(doc, img, MedprimeAddressLocation) {


    doc.setFontSize(12)
    doc.setFontType('bold');
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1], 'Medprime Technologies Pvt Ltd.')
    doc.setFontType('normal');
    doc.setFontSize(9)
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 5, '104,105,106 Casa Piedade Co. HSG So. ')
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 10, 'Anandji Sunder Road,Dighe Chowk,Charai,')
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 15, 'Thane 400601')

    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 20, 'Contact : +919833680874')
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 25, 'GSTIN 27AAJCM5065B1ZK')

    //setup customer info
    //Billing Address
    doc.setFontSize(11)
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 40, 'Billing Address:')
    doc.setFontSize(9)
    doc.setFontType('bold');
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 45, companyName)
    doc.setFontType('normal');
    doc.setFontSize(8)
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 50, customerbuilding)
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 53, customerarea)
    if (customerlandmark == null) {
        customerlandmark = ''
    }
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 56, customerlandmark)
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 60, '' + customerPincode + ',' + customerCity + ',')
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 65, '' + customerState + ',' + customerCountry)
    if (customerGST == '' && customerGST == null) {
        customerGST = 'Not Provided'
    }
    doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 70, 'GST No:' + customerGST)

    //Shippinh Address
    var d = 50 //distance Between Billing And Shipping Text
    doc.setFontSize(11)
    doc.text(MedprimeAddressLocation[0] + d, MedprimeAddressLocation[1] + 40, 'Shipping Address:')
    doc.setFontSize(8)

    doc.text(MedprimeAddressLocation[0] + d, MedprimeAddressLocation[1] + 45, shippingbuilding)
    doc.text(MedprimeAddressLocation[0] + d, MedprimeAddressLocation[1] + 48, shippingarea)
    if (shippinglandmark == null) {
        shippinglandmark = ''
    }
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
    var dueDateEntered = $('#datepicker_invoice').datepicker({ dateFormat: 'yy-mm-dd' }).val();
    doc.text(dueDateEntered, datePosition[0] + 30, datePosition[1], null, null, 'right')
    doc.text("Terms:", datePosition[0], datePosition[1] + 5, null, null, 'right')
    doc.text("Due on Receipt", datePosition[0] + 30, datePosition[1] + 5, null, null, 'right')
    doc.text("Due Date:", datePosition[0], datePosition[1] + 10, null, null, 'right')
    var dueDateEntered = $('#datepicker').datepicker({ dateFormat: 'yy-mm-dd' }).val();


    //doc.text(dueDateEntered, datePosition[0] + 30, datePosition[1] + 10, null, null, 'right')
    doc.setFontSize(8)
    if (document.getElementById('PONo').value != '') {
        doc.text("P.O.#:", datePosition[0], datePosition[1] + 15, null, null, 'right')
        PONo = document.getElementById('PONo').value
        doc.text(PONo, datePosition[0] + 30, datePosition[1] + 15, null, null, 'right')

    }

    //Generate Logo Image
    doc.addImage(img, 'PNG', 20, 20, 50, 10);
    // signature
    const imgWidth = 50;
    const imgHeight = 20;
    if ($('#sign').prop("checked")) {
        doc.addImage(logo, 'PNG', 20, 225, imgWidth, imgHeight);
    }

    doc.text(20, 250, 'Signature ')
    doc.text(20, 260, 'Terms: ')
    doc.text(20, 270, document.getElementById('termsNcondition').value)
    //final Amount
    doc.setFontSize(13)
    doc.setFontType('bold');
    // doc.text('Balance Due', 190, MedprimeAddressLocation[1], null, null, 'right')
    // doc.setFontSize(11)
    // doc.text('' + (Math.round(parseFloat($('#FinalAmount').val()) * 100) / 100) + '', 190, MedprimeAddressLocation[1] + 7, null, null, 'right')
    doc.setFontSize(16)
    doc.text('Quotation', 190, 20, null, null, 'right')
    Nextcounter = parseInt(document.getElementById('currentnumber').value) + 1
    doc.setFontSize(10)
    doc.setFontType('normal');
    doc.text('#Quotation :', 180, 27, null, null, 'right')
    doc.text(Nextcounter + '', 190, 27, null, null, 'right')






}

// add final total after table 
function addfinalAmout(doc, finalY) {
    totalAdjustment = parseFloat($('#adjustment').val())
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
                } if (taxTotal != 0) {
                    doc.text("SGST(" + taxVal + "%)", 120, startPos + offset, null, null, 'left')
                    doc.text('' + (Math.round(taxTotal)) + '', 190, startPos + offset, null, null, 'right')
                    offset = offset + 7
                }
            }
            if ($('#typeofadjustment').val() == 'add') {
                doc.text("Adjustment (+)", 120, startPos + offset + 7, null, null, 'left')
            } else {
                doc.text("Adjustment (-)", 120, startPos + offset + 7, null, null, 'left')
            }
            doc.text('' + (Math.round(totalAdjustment * 100) / 100) + '', 190, startPos + offset + 7, null, null, 'right')
            doc.setFontType('bold');
            doc.text("Total", 120, startPos + offset + 14, null, null, 'left')
            doc.text('' + (Math.round(parseFloat($('#FinalAmount').val()) * 100) / 100) + '', 190, startPos + offset + 14, null, null, 'right')
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
            if ($('#typeofadjustment').val() == 'add') {
                doc.text("Adjustment (+)", 120, startPos + offset + 7, null, null, 'left')
            } else {
                doc.text("Adjustment (-)", 120, startPos + offset + 7, null, null, 'left')
            }
            doc.text('' + (Math.round(totalAdjustment * 100) / 100) + '', 190, startPos + offset + 7, null, null, 'right')
            doc.setFontType('bold');
            doc.text("Total", 120, startPos + offset + 14, null, null, 'left')
            doc.text('' + (Math.round(parseFloat($('#FinalAmount').val()) * 100) / 100) + '', 190, startPos + offset + 14, null, null, 'right')
        }
    } else {
        if ($('#typeofadjustment').val() == 'add') {
            doc.text("Adjustment (+)", 120, finalY + 14, null, null, 'left')
        } else {
            doc.text("Adjustment (-)", 120, finalY + 14, null, null, 'left')
        }
        doc.text('' + (Math.round(totalAdjustment * 100) / 100) + '', 190, finalY + 14, null, null, 'right')
        doc.setFontType('bold');
        doc.text("Total", 120, finalY + 21, null, null, 'left')
        doc.text('' + (Math.round(parseFloat($('#FinalAmount').val()) * 100) / 100) + '', 190, finalY + 21, null, null, 'right')

    }
    //setup date
    doc.setFontSize(10)
    doc.setFontType('normal');
}


//signature
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

        cb(canvas.toDataURL('image/png'));
    };

    image.src = url;
}


//download the pdf
function downloadPdf() {
    // $.get("increaseinvoicecounter/")
    saveDatatodb()
    if (!PONo) {
        PONo = 'TaxInvoice'
    }
    doc.save(PONo + '.pdf')
    // SelectedCustomerUsername = "update mainapp_serialnumbercounter set counter = " + Nextcounter + " where id = 1"

}
//download the pdf
function savePdf() {
    // $.get("increaseinvoicecounter/")
    saveDatatodb()
    Nextcounter = parseInt(document.getElementById('currentnumber').value) + 1
    // SelectedCustomerUsername = "update mainapp_serialnumbercounter set counter = " + Nextcounter + " where id = 1"

}


// save all info to db 
function saveDatatodb() {
    //set invoice id 
    // document.getElementById('id_invoiceid').value = parseInt(document.getElementById('currentnumber').value)
    $('#id_quotationid').val(Nextcounter)
    // set customer id a
    $('#id_customerid').val(parseInt($('#selectedcustomer').val()))
    //creator's name
    currentUserName = document.getElementById('currentUser').innerHTML
    $('#id_creatorname').val(currentUserName)
    //set customer name
    $('#id_customername').val(companyName)
    //set customer shipping state
    $('#id_shippingState').val(shippingState)
    // invoice date
    var date = document.getElementById('datepicker_invoice').value
    $('#id_quotationdate').val(date)
    //set terms
    $('#id_terms').val(document.getElementById('termsNcondition').innerHTML)
    //set po
    $('#id_po').val($('#PONo').val())
    //set creator id 
    $('#id_creatorid').val(document.getElementById('idofuser').value)
    //set subtotal
    $('#id_subtotalamount').val(Math.round(totalAmt * 100) / 100)
    //set gst
    $('#id_taxamount').val(Math.round(totalGSTAmt * 100) / 100)
    //set adjustment
    $('#id_adjustmentamount').val(Math.round(totalAdjustment * 100) / 100)
    // set adjustment type
    $('#id_adjustmenttype').val($('#typeofadjustment').val())
    //set finaltotal  
    $('#id_finalamount').val(Math.round(parseFloat($('#FinalAmount').val()) * 100) / 100)
    //set Signature
    if ($('#sign').prop("checked")
    ) {
        $("#id_signature").val("true").attr("selected", "selected");
    } else {
        $("#id_signature").val("false").attr("selected", "selected");
    }
    //create item json
    var finalJson = {}
    var t = document.getElementById('Previewtable')
    var allRowsInTable = t.rows
    var headsOfTable = allRowsInTable[0].cells
    var headsOfTable = ['Product', 'Description', 'HSN', 'Quantity', 'Rate', 'Discount', 'Final Price']

    var jsonkeys = []
    for (i = 0; i < headsOfTable.length; i++) {
        jsonkeys.push(headsOfTable[i].innerText)
    }
    for (j = 1; j < allRowsInTable.length; j++) {
        var eachrowobj = {}
        eachrowobj['Product'] = allRowsInTable[j].getElementsByClassName('productName')[0].innerText
        eachrowobj['Description'] = allRowsInTable[j].getElementsByClassName('productDesc')[0].innerText
        eachrowobj['HSN'] = parseInt(allRowsInTable[j].getElementsByClassName('productHSN')[0].innerText)
        eachrowobj['Rate'] = parseFloat(allRowsInTable[j].getElementsByClassName('productRate')[0].innerText)
        eachrowobj['Quantity'] = parseInt(allRowsInTable[j].getElementsByClassName('productQuantity')[0].innerText)
        eachrowobj['Discount'] = parseFloat(allRowsInTable[j].getElementsByClassName('discount')[0].innerText)
        eachrowobj['Final Price'] = parseFloat(allRowsInTable[j].getElementsByClassName('finalvalue')[0].innerText)
        finalJson[j] = eachrowobj

    }
    $('#id_items').val(JSON.stringify(finalJson))

    var customerdetailjson = {
        "customerbuilding": customerbuilding,
        "customerarea": customerarea,
        "customerlandmark": customerlandmark,
        "customerPincode": customerPincode,
        "customerCity": customerCity,
        "customerState": customerState,
        "customerCountry": customerCountry,
        "customerGST": customerGST,
        "customerStateCode": customerStateCode,
        "shippingbuilding": shippingbuilding,
        "shippingarea": shippingarea,
        "shippinglandmark": shippinglandmark,
        "shippingPincode": shippingPincode,
        "shippingCity": shippingCity,
        "shippingState": shippingState,
        "shippingCountry": shippingCountry,
        "companyName": companyName

    }
    $('#id_customerdetails').val(JSON.stringify(customerdetailjson))
    $('#saveDataToForm').click()
}


//get selected customer's info from dropdown
function getcustdetail() {
    document.getElementById('customerName').innerHTML = companyName
    document.getElementById('customerAdd').innerHTML = shippingbuilding + " , " + shippingarea + " , " + shippinglandmark
    document.getElementById('customerCity').innerHTML = customerCity
    document.getElementById('customerState').innerHTML = customerState
    document.getElementById('customerCountry').innerHTML = customerCountry
    $('#detailofcust').modal('show')
}
