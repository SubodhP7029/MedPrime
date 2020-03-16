// add variables 
var allProductsData, selectedStateCode, currentUserName, companyName, productTax, clickedTR, img, tableBodiesAllRows, allDiscCells, selectedStateIGST, selectedStateCGST, selectedStateSGST, logo, allCustomerData, customerusername, customerName, customerbuilding, customerarea, customerlandmark, shippingbuilding, shippingarea, shippinglandmark, customerPincode, shippingPincode, customerState, shippingState, customerGST, shippingCity, shippingCountry, customerCity, customerCountry, PONo, imgUrl, doc, allProductsDataColumns, allInfoOfSelectedCustomer, SelectedCustomerUsername, SelectedCustomerId
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
    var discount = parseFloat(document.getElementById('newdesc').value)
    var disctype = document.getElementById('typeOfDesc').value

    if (disctype == 'perc') {
        discount = (rate * discount / 100) * quantity
    }
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

    val.getElementsByClassName('discount')[0].innerText = discount

    var finalVal = (quantity * rate) - discount
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
// function getFinalAmountFromTable() {
//     var totalGSTItems = document.getElementsByClassName('gstvalue')
//     var totalAmtItems = document.getElementsByClassName('finalvalue')

//     totalAmt = 0, totalGSTAmt = 0, finalAmout = 0
//     for (i = 0; i < totalGSTItems.length; i++) {
//         totalGSTAmt += parseFloat(totalGSTItems[i].innerHTML)
//     }
//     for (i = 0; i < totalAmtItems.length; i++) {
//         totalAmt += parseFloat(totalAmtItems[i].innerHTML)
//     }


//     finalAmout = totalGSTAmt + totalAmt
//     $('#FinalAmount').val(finalAmout)
// }




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


// $('#invoice_to_db').submit(function (e) {
//     $.post('nvoice/', $(this).serialize(), function (data) {
//         console.log(data)
//         // of course you can do something more fancy with your respone
//     });
//     e.preventDefault();
// });

