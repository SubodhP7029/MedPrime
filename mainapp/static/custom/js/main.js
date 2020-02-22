
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

    doc.text(MedprimeAddressLocation[0] + d, MedprimeAddressLocation[1] + 45, shippingAdd)
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


    doc.text(dueDateEntered, datePosition[0] + 30, datePosition[1] + 10, null, null, 'right')
    doc.text("P.O.#:", datePosition[0], datePosition[1] + 15, null, null, 'right')
    doc.setFontSize(8)
    if (document.getElementById('PONo').value != '') {
        PONo = document.getElementById('PONo').value

    } else {
        PONo = '/' + document.getElementById('currentnumber').value + '-' + new Date().getFullYear() + '/' + document.getElementById('idofuser').value + '/' + document.getElementById('selectedcustomer').value

    }
    doc.text(PONo, datePosition[0] + 30, datePosition[1] + 15, null, null, 'right')

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
    doc.text('Balance Due', 190, MedprimeAddressLocation[1], null, null, 'right')
    doc.setFontSize(11)
    doc.text('' + (Math.round(parseFloat($('#FinalAmount').val()) * 100) / 100) + '', 190, MedprimeAddressLocation[1] + 7, null, null, 'right')
    doc.setFontSize(16)
    doc.text('Tax Invoice', 190, 20, null, null, 'right')
    Nextcounter = parseInt(document.getElementById('currentnumber').value) + 1
    doc.setFontSize(10)
    doc.setFontType('normal');
    doc.text('#Invoice :', 160, 27, null, null, 'right')
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

        cb(canvas.toDataURL('image/jpeg'));
    };

    image.src = url;
}


//download the pdf
function downloadPdf() {
    // $.get("increaseinvoicecounter/")
    saveDatatodb()
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
    $('#id_invoiceid').val(Nextcounter)
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
    $('#id_invoicedate').val($('#datepicker_invoice').val())
    // due date
    $('#id_duedate').val($('#datepicker').val())
    //set terms
    $('#id_terms').val("Due on Receipt")
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

    $('#saveDataToForm').click()
}
