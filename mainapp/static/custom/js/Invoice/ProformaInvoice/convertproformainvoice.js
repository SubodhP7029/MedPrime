var ProductJSON = {}, gstvaluesJSON = {}
var selectedStateIGST, companyName, selectedStateSGST, itemJSON, totalItems
var rowsCounter = 0
var flagForTax = false, stateIGSTflag = false, stateCGSTflag = false, stateSGSTflag = false
var allProductsData, selectedStateCode, productTax, clickedTR, img, tableBodiesAllRows, allDiscCells, selectedStateIGST, selectedStateCGST, selectedStateSGST, logo, allCustomerData, customerusername, customerName, customerbuilding, customerarea, customerlandmark, shippingbuilding, shippingarea, shippinglandmark, customerPincode, shippingPincode, customerState, shippingState, customerGST, shippingCity, shippingCountry, customerCity, customerCountry, PONo, imgUrl, doc, allProductsDataColumns, allInfoOfSelectedCustomer, SelectedCustomerUsername, SelectedCustomerId
var allProductJSONArray = []
var TotalDisc = 0, totalAdjustment = 0, rowsCounter = 0, totalAmt = 0, totalGSTAmt = 0, finalAmout = 0
var flagForTax = false, stateIGSTflag = false, stateCGSTflag = false, stateSGSTflag = false
var taxBrackets = []
$(document).ready(function () {
    //set customer name
    $('#selectedcustomer').select2()
    $('#selectedProduct').select2()

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


            selectedcustid = $("#idofcustomer").val()
            $(function () {
                $("#selectedcustomer").val(selectedcustid).attr("selected", "selected");

                $("#selectedcustomer").select2()
            });

            // getting all current cust info 
            function startingcust(selectedcustid) {
                SelectedCustomerUsername = "SELECT billingbuilding,billingpincode,billingcity,billingstate,billingcountry,gst,stateid,building, pincode,  city,state,  country,customername,billingarea,billinglandmark,area,landmark FROM public.mainapp_customerprofile WHERE user_id= " + selectedcustid
                $.get("/getdetailofselectedcustmor/", { sqlParam: SelectedCustomerUsername }, function (data) {
                    allCustomerData = data
                    if (allCustomerData.length == 0) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Customer does not exist, Please select new!',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        $('#selectedcustomer').on('select2:select', function (e) {
                            startingcust($('#selectedcustomer').val())
                        });
                        // document.getElementById("selectedcustomer").addEventListener("change", )
                    } else {
                        // document.getElementById("selectedcustomer").addEventListener("change", )
                        $('#selectedcustomer').on('select2:select', function (e) {
                            getAllCustomerInfo()
                        });
                        customerName = document.getElementById('thisCust-' + selectedcustid).innerHTML
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
                        var tableheadarray = ['Sr No.', 'Product', 'HSN/SAC', 'QTY', 'Rate', 'Discount']

                        if (gstvaluesJSON[shippingState]) {
                            var gstJSON = JSON.parse(gstvaluesJSON[shippingState])
                            if (gstJSON["igst"] != 'False') {
                                tableheadarray.push('IGST')
                                stateIGSTflag = true
                                selectedStateIGST = 'True'
                            } else {
                                tableheadarray.push('CGST')
                                tableheadarray.push('SGST')
                                selectedStateIGST = 'False'
                            }
                            flagForTax = true
                        } else {
                            flagForTax = false
                        }
                        tableheadarray.push('Amount')


                        //creating table of items
                        var tr = document.getElementById('headOfProductPreview')
                        tr.innerHTML = ''
                        tr.className = 'tableHead'
                        theJSON = JSON.parse(document.getElementById('iteminfo').innerText.split("'").join('"'))
                        JSONlen = Object.keys(theJSON)
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
                                            var IGSTval = ((quantity * rate) - theJSON[JSONlen[j]]['Discount']) * taxValue / 100
                                            var td = document.createElement('td')
                                            td.className = 'productIGST'
                                            td.innerHTML = "<b class='igstvalue gstvalue'>" + IGSTval + "</b><br><p class='igstrate'>" + taxValue + "%</p>"
                                            tr.appendChild(td)
                                        } else {
                                            var CGSTval = ((quantity * rate) - theJSON[JSONlen[j]]['Discount']) * taxValue / 200
                                            var SGSTval = ((quantity * rate) - theJSON[JSONlen[j]]['Discount']) * taxValue / 200

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
                    }
                })
            }
            startingcust($("#idofcustomer").val())
        })
    })
})


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

function insertSrNo() {
    var allrows = document.getElementById('bodyOfProductPreview').getElementsByTagName('tr')

    for (i = 0; i < allrows.length; i++) {
        allrows[i].cells[0].innerHTML = i + 1
    }
}


function downloadPdf() {
    // $.get("increaseinvoicecounter/")
    saveDatatodb()
    if (!PONo) {
        PONo = 'ProformaInvoice'
    }
    doc.save(PONo + '.pdf')
    // SelectedCustomerUsername = "update mainapp_serialnumbercounter set counter = " + Nextcounter + " where id = 1"

}
//download the pdf
function savePdf() {
    // $.get("increaseinvoicecounter/")
    saveDatatodb()
    // Nextcounter = parseInt(document.getElementById('currentnumber').value) + 1
    
    // SelectedCustomerUsername = "update mainapp_serialnumbercounter set counter = " + Nextcounter + " where id = 1"

}



function getcustdetail() {
    document.getElementById('customerName').innerHTML = companyName
    document.getElementById('customerAdd').innerHTML = shippingbuilding + " , " + shippingarea + " , " + shippinglandmark
    document.getElementById('customerCity').innerHTML = customerCity
    document.getElementById('customerState').innerHTML = customerState
    document.getElementById('customerCountry').innerHTML = customerCountry
    $('#detailofcust').modal('show')
}

function removeProduct() {
    var thebody = document.getElementById('bodyOfProductPreview')
    var alltrs = thebody.getElementsByTagName('tr')
    alltrs[alltrs.length - 1].remove()
    getFinalAmountFromTable()
    insertSrNo()
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
    selectedcustid = document.getElementById('selectedcustomer').value
    SelectedCustomerUsername = "SELECT billingbuilding,billingpincode,billingcity,billingstate,billingcountry,gst,stateid,building, pincode,  city,state,  country,customername,billingarea,billinglandmark,area,landmark FROM public.mainapp_customerprofile WHERE user_id= " + selectedcustid
    $.get("/getdetailofselectedcustmor/", { sqlParam: SelectedCustomerUsername }, function (data) {
        allCustomerData = data
        customerName = document.getElementById('thisCust-' + selectedcustid).innerHTML
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

        var tableHeads = []
        if (gstvaluesJSON[shippingState]) {
            var gstJSON = JSON.parse(gstvaluesJSON[shippingState])
            selectedStateCGST = gstJSON["cgst"]
            selectedStateSGST = gstJSON["sgst"]
            selectedStateIGST = gstJSON["igst"]
            if (gstJSON["igst"] != 'False') {
                tableHeads.push('IGST')
                stateIGSTflag = true
            } else {
                stateIGSTflag = false
                tableHeads.push('CGST')
                tableHeads.push('SGST')
            }
            flagForTax = true
        } else {
            flagForTax = false
        }
        tableHeads.push('Amount')
        var tr = document.getElementById('headOfProductPreview')

        var tb = document.getElementById('bodyOfProductPreview')
        GSTRemovalCounter = document.getElementById("headOfProductPreview").cells.length - 5
        for (z = 0; z < GSTRemovalCounter; z++) {
            $('#Previewtable tr').find('td:eq(6),th:eq(6)').remove();

        }

        for (i = 0; i < tableHeads.length; i++) {
            var th = document.createElement('td')
            th.innerHTML = tableHeads[i]
            th.id = tableHeads[i] + 'Column'
            tr.appendChild(th)
        }
        for (x = 0; x < tb.rows.length; x++) {
            var productTax
            for (v = 0; v < allProductJSONArray.length; v++) {
                if (tb.rows[x].getElementsByClassName('productHSN')[0].innerText == allProductJSONArray[v]["HSN"]) {
                    productTax = allProductJSONArray[v]["tax"]
                    break
                }
            }
            if (flagForTax) {
                taxBrackets = []
                for (k = 0; k < JSONlen.length; k++) {
                    for (h = 0; h < allProductJSONArray.length; h++) {
                        if (theJSON[JSONlen[k]]['HSN'] == allProductJSONArray[h]["HSN"]) {
                            var taxValue = allProductJSONArray[h]['tax']
                            if (!taxBrackets.includes(taxValue)) {
                                taxBrackets.push(taxValue)
                            }
                        }
                    }
                }
                if (selectedStateIGST == 'True') {
                    var IGSTval = tb.rows[x].getElementsByClassName('productQuantity')[0].innerText * tb.rows[x].getElementsByClassName('productRate')[0].innerText * productTax / 100
                    var td = document.createElement('td')
                    td.className = 'productIGST'
                    td.innerHTML = "<b class='igstvalue gstvalue'>" + IGSTval + "</b><br><p class='igstrate'>" + productTax + "%</p>"
                    tb.rows[x].appendChild(td)
                } else {
                    var CGSTval = tb.rows[x].getElementsByClassName('productQuantity')[0].innerText * tb.rows[x].getElementsByClassName('productRate')[0].innerText * productTax / 200
                    var SGSTval = CGSTval
                    var td = document.createElement('td')
                    td.innerHTML = "<b class='cgstvalue gstvalue'>" + CGSTval + "</b><br><p class='cgstrate'>" + productTax / 2 + "%</p>"
                    tb.rows[x].appendChild(td)

                    var td = document.createElement('td')
                    td.innerHTML = "<b class='sgstvalue gstvalue'>" + SGSTval + "</b><br><p class='sgstrate'>" + productTax / 2 + "%</p>"
                    tb.rows[x].appendChild(td)
                }
            } else {

            }
            var td = document.createElement('td')
            td.className = 'finalvalue'
            finalVal = (tb.rows[x].getElementsByClassName('productQuantity')[0].innerText * tb.rows[x].getElementsByClassName('productRate')[0].innerText) - tb.rows[x].getElementsByClassName('discount')[0].innerText
            td.innerHTML = finalVal
            tb.rows[x].appendChild(td)
        }
        getFinalAmountFromTable()
    })
}



//add onclick function to each tr
function addOnclick(tr) {
    tr.onclick = function () {
        $('#EditingRowInPreviewTable').modal('show');
        console.log(this);
        var thetr = this
        document.getElementById('deleteButton').addEventListener('click', function () {
            removingTr(thetr);
        });
        document.getElementById('editButton').addEventListener('click', function () {
            EditingTrclone(thetr);
        });
    };
}

function EditingTrclone(val) {
    document.getElementById('newName').value = val.getElementsByClassName('productName')[0].innerText
    document.getElementById('newDescription').value = val.getElementsByClassName('productDesc')[0].innerText
    document.getElementById('newqt').value = val.getElementsByClassName('productQuantity')[0].innerText
    document.getElementById('newrate').value = val.getElementsByClassName('productRate')[0].innerText
    document.getElementById('newdesc').value = val.getElementsByClassName('discount')[0].innerText

    document.getElementById('newQtydiv').style.display = 'block'


    document.getElementById('saveButton').addEventListener('click', function () {
        SavingNewQtyclone(val);
    });
}



function SavingNewQtyclone(val) {
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
    if (flagForTax) {
        var productTax
        for (v = 0; v < allProductJSONArray.length; v++) {
            if (val.getElementsByClassName('productHSN')[0].innerText == allProductJSONArray[v]["HSN"]) {
                productTax = allProductJSONArray[v]["tax"]
                break
            }
        }
        if (selectedStateIGST == 'True') {
            var IGSTval = ((quantity * rate) - discount) * productTax / 100
            // val.getElementsByClassName('gstvalue')[0].innerText = IGSTval
            val.getElementsByClassName('productIGST')[0].innerHTML = "<b class='igstvalue gstvalue'>" + IGSTval + "</b><br><p class='igstrate'>" + productTax + "%</p>"

        }
        else {
            var CGSTval = ((quantity * rate) - discount) * productTax / 200
            var SGSTval = ((quantity * rate) - discount) * productTax / 200
            val.getElementsByClassName('productCGST')[0].innerHTML = "<b class='cgstvalue gstvalue'>" + CGSTval + "</b><br><p class='cgstrate'>" + productTax / 2 + "%</p>"
            val.getElementsByClassName('productSGST')[0].innerHTML = "<b class='sgstvalue gstvalue'>" + SGSTval + "</b><br><p class='sgstrate'>" + productTax / 2 + "%</p>"
        }
    }

    val.getElementsByClassName('discount')[0].innerText = discount

    var finalVal = (quantity * rate) - discount
    val.getElementsByClassName('finalvalue')[0].innerText = finalVal
    getFinalAmountFromTable()
}

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
            var dueDateEntered = document.getElementById('datepicker').value
            if (dueDateEntered == "") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Please select Due date',
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
}