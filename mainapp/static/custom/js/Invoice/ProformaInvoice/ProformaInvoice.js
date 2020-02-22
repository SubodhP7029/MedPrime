// add variables 
var allProductsData, tableBodiesAllRows, logo, allCustomerData, customerName, customerAdd, customerPincode, customerState, customerGST, PONo, imgUrl, doc, allProductsDataColumns, allInfoOfSelectedCustomer, SelectedCustomerUsername, SelectedCustomerId
var allProductJSONArray = []
var TotalDisc = 0


//price of selected product
function priceOfProduct() {
    var product = document.getElementById('selectedProduct').value

    for (i = 0; i < allProductJSONArray.length; i++) {
        if (product == allProductJSONArray[i].name) {
            document.getElementById('selectedProductPrice').value = allProductJSONArray[i].price
        }
    }
}

// add new product to preview
function addProduct() {
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
    var IGSTval = quantity * rate * 18 / 100
    if (disctype == 'perc') {
        discount = rate * discount / 100
    }
    var finalVal = (quantity * rate) - discount
    if (product != '' && quantity != '') {
        var thebody = document.getElementById('bodyOfProductPreview')
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        td.innerHTML = "<b>" + product + "</b><br><p>" + desc + "</p>"
        tr.appendChild(td)
        var td = document.createElement('td')
        td.innerHTML = HSN
        tr.appendChild(td)
        var td = document.createElement('td')
        td.innerHTML = quantity
        tr.appendChild(td)
        var td = document.createElement('td')
        td.innerHTML = rate
        tr.appendChild(td)
        var td = document.createElement('td')
        td.innerHTML = discount
        tr.appendChild(td)
        var td = document.createElement('td')
        td.innerHTML = "<b class='gstvalue'>" + IGSTval + "</b><br><p>18%</p>"
        tr.appendChild(td)
        var td = document.createElement('td')
        td.className = 'finalvalue'
        td.innerHTML = finalVal
        tr.appendChild(td)
        thebody.appendChild(tr)
    }
}


// remove last product from preview
function removeProduct() {
    var thebody = document.getElementById('bodyOfProductPreview')
    var alltrs = thebody.getElementsByTagName('tr')
    alltrs[alltrs.length - 1].remove()
}

function getAllCustomerInfo() {
    SelectedCustomerUsername = "SELECT * FROM public.mainapp_customerprofile WHERE id=" + document.getElementById('selectedcustomer').value
    $.get("getdetailofselectedcustmor/", { sqlParam: SelectedCustomerUsername }, function (data) {
        allCustomerData = data
        customerName = document.getElementById('thisCust-' + document.getElementById('selectedcustomer').value).innerHTML
        customerAdd = data[0][1]
        customerPincode = data[0][2]
        customerState = data[0][7]
        customerGST = data[0][8]
    })
}



// raw query to get all prouct data columns
$.get("invoicegetallprodcol/", function (data) {
    allProductsDataColumns = data

    //  raw query to get all product data
    $.get("invoicegetallprod/", function (data) {
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
//  animation for datepicker
// $("#datepicker").datepicker("option", "showAnim", "slideDown");
$("#datepicker_invoice").datepicker({ dateFormat: "mm/dd/yyyy" }).datepicker("setDate", new Date());

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





        //check if there is any discount, if not then remove discound column

        //check the total of all discounts
        TotalDisc = 0
        tableBodiesAllRows = document.getElementById('bodyOfProductPreview').getElementsByTagName('tr')

        for (eachItem = 0; eachItem < tableBodiesAllRows.length; eachItem++) {
            TotalDisc += parseInt(tableBodiesAllRows[eachItem].getElementsByTagName('td')[4].innerHTML)
        }
        if (TotalDisc == 0) {
            document.getElementById('discountColumn').style.display = 'none'
            for (eachItem = 0; eachItem < tableBodiesAllRows.length; eachItem++) {
                tableBodiesAllRows[eachItem].getElementsByTagName('td')[4].style.display = 'none'
            }
        }
        doc = new jsPDF()
        // setup medprime info
        function getImgFromUrl(logo_url, callback) {
            var img = new Image();
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

            //Generate Logo Image
            doc.addImage(img, 'PNG', 20, 20, 50, 10);
            // signature
            const imgWidth = 50;
            const imgHeight = 20;
            doc.addImage(logo, 'PNG', 20, 225, imgWidth, imgHeight);

            var MedprimeAddressLocation = [20, 40]
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
            doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 40, 'Bill To:')
            doc.setFontType('bold');
            doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 45, customerName)
            doc.setFontType('normal');
            doc.setFontSize(9)
            doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 50, customerAdd)
            doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 60, '' + customerPincode + '')
            doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 65, 'Place Of Supply:' + customerState)
            if (customerGST != '') {
                doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 70, 'GST No:' + customerGST)
            }






            //setup table of product
            doc.autoTable({ html: '#Previewtable', margin: { top: MedprimeAddressLocation[1] + 80, left: MedprimeAddressLocation[0] } });
            let finalY = doc.lastAutoTable.finalY;
            var totalGSTItems = document.getElementsByClassName('gstvalue')
            var totalAmtItems = document.getElementsByClassName('finalvalue')
            var totalGSTAmt = 0, totalAmt = 0, totalAdjustment = 0, finalAmout = 0
            for (i = 0; i < totalGSTItems.length; i++) {
                totalGSTAmt += parseFloat(totalGSTItems[i].innerHTML)
            }
            for (i = 0; i < totalAmtItems.length; i++) {
                totalAmt += parseFloat(totalAmtItems[i].innerHTML)
            }
            if ((totalGSTAmt + "").split(".")[1]) {
                totalAdjustment += (totalGSTAmt + "").split(".")[1] / 100
            }
            if ((totalAmt + "").split(".")[1]) {
                totalAdjustment += (totalAmt + "").split(".")[1] / 100
            }

            finalAmout = totalGSTAmt + totalAmt - totalAdjustment

            if (finalAmout == 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Please select Products first',
                    showConfirmButton: false,
                    timer: 2000
                })
            } else {
                //setup final amount
                doc.setFontSize(11)
                doc.text("Sub Total", 120, finalY + 7, null, null, 'left')
                doc.text('' + totalAmt + '', 190, finalY + 7, null, null, 'right')
                if (allCustomerData[0][7] == 'Maharashtra') {
                    doc.text("SGST (9%) + CGST(9%)", 120, finalY + 14, null, null, 'left')
                } else {
                    doc.text("IGST (18%)", 120, finalY + 14, null, null, 'left')
                }
                doc.text('' + totalGSTAmt + '', 190, finalY + 14, null, null, 'right')
                doc.text("Adjustment(-)", 120, finalY + 21, null, null, 'left')
                doc.text('' + totalAdjustment + '', 190, finalY + 21, null, null, 'right')
                doc.setFontType('bold');
                doc.text("Total", 120, finalY + 28, null, null, 'left')
                doc.text('' + finalAmout + '', 190, finalY + 28, null, null, 'right')

                //setup date
                doc.setFontSize(10)
                doc.setFontType('normal');

                var datePosition = [160, 80]
                doc.text("Date:", datePosition[0], datePosition[1], null, null, 'right')
                doc.setFontSize(8)
                if (document.getElementById('PONo').value == '') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Please Insert PI Number',
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else {
                    PONo = document.getElementById('PONo').value



                    var dueDateEntered = document.getElementById('datepicker_invoice').value.split("-")
                    if (dueDateEntered[0] == '') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Please Select Invoice Date',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    } else {
                        doc.text('' + dueDateEntered[2] + '/' + dueDateEntered[1] + '/' + dueDateEntered[0], datePosition[0] + 30, datePosition[1], null, null, 'right')

                        doc.setFontSize(8)

                        // terms and condition
                        doc.text(20, 250, 'Signature ')
                        doc.text(20, 260, 'Terms: ')
                        doc.text(20, 270, document.getElementById('termsNcondition').value)
                        //final Amount
                        doc.setFontSize(13)
                        doc.setFontType('bold');
                        doc.setFontSize(16)
                        doc.text('Proforma Invoice', 190, 20, null, null, 'right')
                        doc.setFontSize(11)
                        doc.text("P.O.#:", 140, 30, null, null, 'right')
                        doc.text('#' + PONo, 190, 30, null, null, 'right')



                        // doc.save(PONo + '.pdf')
                        var string = doc.output('datauristring');
                        document.getElementById('previewOfPdf').setAttribute('src', string)
                        // var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
                        // var x = window.open();
                        // x.document.open();
                        // x.document.write(embed);
                        // x.document.close();
                        $('#exampleModalLong').modal('show');
                        if (TotalDisc == 0) {
                            document.getElementById('discountColumn').removeAttribute("style");

                            for (eachItem = 0; eachItem < tableBodiesAllRows.length; eachItem++) {
                                tableBodiesAllRows[eachItem].getElementsByTagName('td')[4].removeAttribute("style");
                            }
                        }

                        // location.reload();
                    }
                }
            }
        }
    }
}

//download the pdf
function downloadPdf() {
    doc.save(PONo + '_proforma.pdf')
    // Nextcounter = parseInt(document.getElementById('currentnumber').value) + 1
    // SelectedCustomerUsername = "update mainapp_serialnumbercounter set counter =" + Nextcounter + " where id = 1"
    // $.get("increaseinvoicecounter/", { sqlParam: SelectedCustomerUsername })
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
