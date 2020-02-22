// add variables 
var allProductsData, tableBodiesAllRows, logo, allCustomerData, customerName, customerAdd, customerPincode, customerState, customerGST, PONo, imgUrl, doc, allProductsDataColumns, allInfoOfSelectedCustomer, SelectedCustomerUsername, SelectedCustomerId
var allProductJSONArray = []
var TotalDisc = 0



//add or remove inouts for each serial number based on value entered in quanity
function addinputs() {
    var quantity = document.getElementById('selectedProductQuanity').value
    var divofserialnos = document.getElementById('typeserialnumbers')
    divofserialnos.innerHTML = ''
    var intQty = parseInt(quantity)
    for (i = 0; i < intQty; i++) {
        var div = document.createElement('div')
        div.className = 'col-xs-4 col-sm-3 col-md-3 col-lg-2 col-xl-2  '
        var label = document.createElement('label')
        label.innerHTML = 'Serial number for Product No: ' + (i + 1)
        div.appendChild(label)
        var input = document.createElement('input')
        input.type = 'text'
        input.id = 'prod-' + i
        div.appendChild(input)
        divofserialnos.appendChild(div)
    }
}
// add new product to preview
function addProduct() {
    var product = document.getElementById('selectedProduct').value
    var quantity = document.getElementById('selectedProductQuanity').value
    var desc
    for (i = 0; i < allProductJSONArray.length; i++) {
        if (product == allProductJSONArray[i].name) {
            desc = allProductJSONArray[i].description
        }
    }
    var intQty = parseInt(quantity)
    var finalStringofAllserialNumber = ''
    var doesAllItemHaveSerialNumber = true
    for (i = 0; i < intQty; i++) {
        var localSerialNo = document.getElementById('prod-' + i).value
        if (localSerialNo == "") {
            doesAllItemHaveSerialNumber = false
            break
        } else {
            finalStringofAllserialNumber += localSerialNo + ';'

        }
    }
    if (doesAllItemHaveSerialNumber == false) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Serial Number missing',
            showConfirmButton: false,
            timer: 2000
        })
    } else {
        if (product != '' && quantity != '') {
            var thebody = document.getElementById('bodyOfProductPreview')
            var tr = document.createElement('tr')
            var td = document.createElement('td')
            td.innerHTML = "<b>" + product + "</b><br><p>" + desc + "</p>"
            tr.appendChild(td)
            var td = document.createElement('td')
            td.innerHTML = finalStringofAllserialNumber
            tr.appendChild(td)
            var td = document.createElement('td')
            td.innerHTML = quantity
            tr.appendChild(td)
            thebody.appendChild(tr)
        }
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
$("#datepicker_expiry").datepicker("option", "showAnim", "slideDown");
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

            generatePDF(img);


        });
        function generatePDF(img) {

            //Generate Logo Image
            doc.addImage(img, 'PNG', 20, 20, 50, 10);
            // signature
            const imgWidth = 50;
            const imgHeight = 20;

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


            //setup date
            doc.setFontSize(10)
            doc.setFontType('normal');

            var datePosition = [160, 80]
            doc.setFontSize(8)
            if (document.getElementById('PONo').value == '') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Please Insert Delivery Challan Number',
                    showConfirmButton: false,
                    timer: 2000
                })
            } else {
                PONo = document.getElementById('PONo').value
                doc.text("Challan Date:", datePosition[0], datePosition[1], null, null, 'right')
                var dueDateEntered = document.getElementById('datepicker_invoice').value.split("-")
                if (dueDateEntered[0] == '') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Please Select Esitmate Date',
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else {

                    doc.text('' + dueDateEntered[2] + '/' + dueDateEntered[1] + '/' + dueDateEntered[0], datePosition[0] + 30, datePosition[1], null, null, 'right')
                    doc.text("PO NO:", datePosition[0], datePosition[1] + 10, null, null, 'right')
                    var POOno = document.getElementById('POONo').value
                    if (POOno == '') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Please Enter PO Number',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    } else {
                        doc.text("#" + POOno, datePosition[0] + 30, datePosition[1] + 10, null, null, 'right')

                        //final Amount
                        doc.setFontSize(13)
                        doc.setFontType('bold');
                        doc.setFontSize(16)
                        doc.text('Delivery Challan', 190, 20, null, null, 'right')
                        doc.setFontSize(11)
                        // doc.text("P.O.#:", 140, 30, null, null, 'right')
                        doc.text('#' + PONo, 190, 30, null, null, 'right')
                        doc.text(20, 230, 'For Medprime Technology Pvt. Ltd.')

                        doc.text(20, 260, 'Authorized Signatory ')
                        doc.text("Reciever's Signature", 190, 260, null, null, 'right')



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
    doc.save(PONo + '_challan.pdf')
    // Nextcounter = parseInt(document.getElementById('currentnumber').value) + 1
    // SelectedCustomerUsername = "update mainapp_serialnumbercounter set counter =" + Nextcounter + " where id = 1"
    // $.get("increaseinvoicecounter/", { sqlParam: SelectedCustomerUsername })
}
