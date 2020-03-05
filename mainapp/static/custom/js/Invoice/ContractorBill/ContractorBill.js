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
    var desc, rate
    // get  desc, HSN,rate info of selected product
    for (i = 0; i < allProductJSONArray.length; i++) {
        if (product == allProductJSONArray[i].name) {
            desc = allProductJSONArray[i].description
        }
    }
    rate = document.getElementById('selectedProductPrice').value
    var finalVal = (quantity * rate)
    if (product != '' && quantity != '') {
        var thebody = document.getElementById('bodyOfProductPreview')
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        td.innerHTML = "<b>" + product + "</b><br><p>" + desc + "</p>"
        tr.appendChild(td)
        var td = document.createElement('td')
        td.innerHTML = quantity
        tr.appendChild(td)
        var td = document.createElement('td')
        td.innerHTML = rate
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
    SelectedCustomerUsername = "SELECT * FROM public.mainapp_profile WHERE id=" + document.getElementById('selectedcustomer').value
    $.get("getdetailofselectedcustmor/", { sqlParam: SelectedCustomerUsername }, function (data) {
        allCustomerData = data
        customerName = document.getElementById('thisCust-' + document.getElementById('selectedcustomer').value).innerHTML
        customerAdd = data[0][1]
        customerPincode = data[0][2]
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
            title: 'Please select Contractor first',
            showConfirmButton: false,
            timer: 2000
        })
    } else {
        //check if there is any discount, if not then remove discound column

        //check the total of all discounts

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
            // doc.addImage(img, 'PNG', 20, 20, 50, 10);
            // signature
            // const imgWidth = 50;
            // const imgHeight = 20;
            // doc.addImage(logo, 'PNG', 20, 225, imgWidth, imgHeight);

            var MedprimeAddressLocation = [20, 40]
            doc.setFontSize(11)
            doc.setFontType('bold');
            doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1], "Contractor Agreement No: ")
            doc.setFontType('normal');
            doc.text(MedprimeAddressLocation[0] + 50, MedprimeAddressLocation[1], document.getElementById('CANo').value)
            doc.setFontSize(9)
            doc.text(MedprimeAddressLocation[0], MedprimeAddressLocation[1] + 5, 'Contractor’s Name & Address -')
            doc.text(MedprimeAddressLocation[0] + 50, MedprimeAddressLocation[1] + 5, customerName)
            doc.text(MedprimeAddressLocation[0] + 50, MedprimeAddressLocation[1] + 10, customerAdd + ' ,' + customerPincode + '')

            //setup table of product
            doc.autoTable({ html: '#Previewtable', margin: { top: MedprimeAddressLocation[1] + 20, left: MedprimeAddressLocation[0] } });
            let finalY = doc.lastAutoTable.finalY;
            // var totalGSTItems = document.getElementsByClassName('gstvalue')
            var totalAmtItems = document.getElementsByClassName('finalvalue')
            var totalGSTAmt = 0, totalAmt = 0, totalAdjustment = 0, finalAmout = 0

            for (i = 0; i < totalAmtItems.length; i++) {
                totalAmt += parseFloat(totalAmtItems[i].innerHTML)
            }
            totalGSTAmt = totalAmt * 0.18
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
                doc.text("Total", 120, finalY + 28, null, null, 'left')
                doc.text('' + finalAmout + '', 190, finalY + 28, null, null, 'right')
                doc.text("Total In Words:", 20, finalY + 35, null, null, 'left')
                var AmtInWord = convertNumberToWords(finalAmout)
                doc.setFontType('bold');
                doc.text(AmtInWord, 50, finalY + 35, null, null, 'left')
                doc.setFontType('normal');
                // terms
                var terms = document.getElementById('termsNcondition').value
                doc.text(terms, 20, finalY + 40, null, null, 'left')
                doc.text("RECEIVED PAYMENT", 20, finalY + 60, null, null, 'left')
                doc.text("Rs", 20, finalY + 65, null, null, 'left')
                doc.text("COUNTERSIGNED", 190, finalY + 60, null, null, 'right')
                doc.text("Signature of the contractor", 20, finalY + 95, null, null, 'left')
                doc.text("(Payment to be made to my bankers)", 20, finalY + 90, null, null, 'left')
                doc.text("WARRANTY CERTIFICATE", 190, finalY + 90, null, null, 'right')

                doc.text("Certified that the items supplied by me will be serviced free of cost", 20, finalY + 110, null, null, 'left')
                doc.text("if found defective / deteriorated within the shelf life.", 20, finalY + 115, null, null, 'left')
                doc.text("Signature of the Contractor.", 190, finalY + 130, null, null, 'right')

                //setup date
                doc.setFontSize(10)
                doc.setFontType('normal');

                var datePosition = [160, 40]
                doc.text("Date:", datePosition[0], datePosition[1], null, null, 'right')
                doc.setFontSize(8)
                if (document.getElementById('PONo').value == '') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Please Insert Invoice Number',
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

                        doc.setFontSize(16)
                        doc.text('CONTRACTORS’S BILL', 80, 20, null, null, 'left')
                        doc.setFontSize(11)
                        doc.text("Invoice :", 140, 30, null, null, 'right')
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



// conver number to words 
function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++ , j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++ , j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}