var allProductsData,selectedStateCode,Nextcounter, currentUserName, companyName, productTax, clickedTR, img, tableBodiesAllRows, allDiscCells, selectedStateIGST, selectedStateCGST, selectedStateSGST, logo, allCustomerData, customerusername, customerName, customerbuilding, customerarea, customerlandmark, shippingbuilding, shippingarea, shippinglandmark, customerPincode, shippingPincode, customerState, shippingState, customerGST, shippingCity, shippingCountry, customerCity, customerCountry, PONo, imgUrl, doc, allProductsDataColumns, allInfoOfSelectedCustomer, SelectedCustomerUsername, SelectedCustomerId


$("#datepicker_invoice").datepicker({ dateFormat: "mm/dd/yyyy" }).datepicker("setDate", new Date());







// Create invoice 
function createPDF() {
    
    getAllCustomerInfo()
    //get all details from front end
    var reportNo = document.getElementById('reportNo').value
    // var custInfo = JSON.stringify(customerdetailjson)
    customerdetailjson =  {
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

    var custInfo = JSON.stringify(customerdetailjson)
    var deviceInfo = document.getElementById('deviceName').value
    var serialNo = document.getElementById('serialNo').value
    var imeiNo = document.getElementById('imeiNo').value
    var probDesc = document.getElementById('problemDescription').value
    var actionTaken = document.getElementById('actionTaken').value
    var testing = document.getElementById('testing').value
    var custcomment = document.getElementById('customerComment').value
    var accessories = document.getElementById('accessories').value
    var dueDateEntered = document.getElementById('datepicker_invoice').value.split("-")
    

    doc = new jsPDF()

    if (reportNo == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Please Enter Report number',
            showConfirmButton: false,
            timer: 2000
        })
    } else {
        var startingPoint = [20, 40]
        doc.text("Service/Installations Report No.", startingPoint[0], startingPoint[1], null, null, 'left')
        doc.text(reportNo, startingPoint[0] + 80, startingPoint[1], null, null, 'left')
        if (dueDateEntered[0] == '') {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please Select Installation Date',
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            doc.text("Date", startingPoint[0] + 120, startingPoint[1], null, null, 'left')
            doc.text('' + dueDateEntered[2] + '/' + dueDateEntered[1] + '/' + dueDateEntered[0], startingPoint[0] + 130, startingPoint[1], null, null, 'left')
            if (custInfo == "") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Please Enter Customer information',
                    showConfirmButton: false,
                    timer: 2000
                })
            } else {
                doc.text("Customer Name & address:", startingPoint[0], startingPoint[1] + 10, null, null, 'left')
                doc.text(custInfo, startingPoint[0] + 10, startingPoint[1] + 15, null, null, 'left')
                if (deviceInfo == "") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Please Enter Serial Number',
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else {
                    doc.text("Device Name:", startingPoint[0], startingPoint[1] + 30, null, null, 'left')
                    doc.text(deviceInfo, startingPoint[0] + 40, startingPoint[1] + 30, null, null, 'left')
                    if (serialNo == "") {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Please Enter Serial Number',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    } else {
                        doc.text("Serial NO:", startingPoint[0], startingPoint[1] + 40, null, null, 'left')
                        doc.text(serialNo, startingPoint[0] + 40, startingPoint[1] + 40, null, null, 'left')
                        if (imeiNo == "") {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Please Enter IMEI Number',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        } else {
                            doc.text("Tablet/Mobile IEMI No.:", startingPoint[0] + 80, startingPoint[1] + 40, null, null, 'left')
                            doc.text(imeiNo, startingPoint[0] + 140, startingPoint[1] + 40, null, null, 'left')
                            if (accessories == "") {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Please Enter Accessories Information',
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                            } else {
                                doc.text("Accessories:", startingPoint[0], startingPoint[1] + 50, null, null, 'left')
                                doc.text(accessories, startingPoint[0], startingPoint[1] + 55, null, null, 'left')
                                if (probDesc == "") {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'error',
                                        title: 'Please Enter Problem Description',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                } else {
                                    doc.text("Problem Description:", startingPoint[0], startingPoint[1] + 65, null, null, 'left')
                                    doc.text(probDesc, startingPoint[0], startingPoint[1] + 70, null, null, 'left')
                                    if (actionTaken == "") {
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'error',
                                            title: 'Please Mention Action Taken',
                                            showConfirmButton: false,
                                            timer: 2000
                                        })
                                    } else {
                                        doc.text("Action Taken:", startingPoint[0], startingPoint[1] + 90, null, null, 'left')
                                        doc.text(actionTaken, startingPoint[0], startingPoint[1] + 95, null, null, 'left')

                                        if (testing == "") {
                                            Swal.fire({
                                                position: 'top-end',
                                                icon: 'error',
                                                title: 'Please Mention Testing & Calibration',
                                                showConfirmButton: false,
                                                timer: 2000
                                            })
                                        } else {
                                            doc.text("Testing Done & Calibration:", startingPoint[0], startingPoint[1] + 130, null, null, 'left')
                                            doc.text(testing, startingPoint[0], startingPoint[1] + 135, null, null, 'left')
                                            if (custcomment == "") {
                                                Swal.fire({
                                                    position: 'top-end',
                                                    icon: 'error',
                                                    title: 'Please Mention Testing & Calibration',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                })
                                            } else {
                                                doc.text("Customer comment:", startingPoint[0], startingPoint[1] + 160, null, null, 'left')
                                                doc.text(custcomment, startingPoint[0], startingPoint[1] + 165, null, null, 'left')

                                                doc.text("For customer", startingPoint[0], startingPoint[1] + 175, null, null, 'left')
                                                doc.text("Name:", startingPoint[0], startingPoint[1] + 180, null, null, 'left')
                                                doc.text("Signature", startingPoint[0], startingPoint[1] + 185, null, null, 'left')
                                                doc.text("For Medprime Technologies", startingPoint[0], startingPoint[1] + 200, null, null, 'left')
                                                doc.text("Engineer name:", startingPoint[0], startingPoint[1] + 205, null, null, 'left')
                                                doc.text("Signature", startingPoint[0], startingPoint[1] + 210, null, null, 'left')
                                                var string = doc.output('datauristring');
                                                document.getElementById('previewModalBody').setAttribute('src', string)
                                                $('#exampleModalLong').modal('show');
                                            }

                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }

        }
    }

}

//download the pdf
function downloadPdf() {
    doc.save(reportNo + '_installationReport.pdf')
}

function getcustdetail() {
    document.getElementById('customerName').innerHTML = companyName
    document.getElementById('customerAdd').innerHTML = shippingbuilding + " , " + shippingarea + " , " + shippinglandmark
    document.getElementById('customerCity').innerHTML = customerCity
    document.getElementById('customerState').innerHTML = customerState
    document.getElementById('customerCountry').innerHTML = customerCountry
    $('#detailofcust').modal('show')
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
    })

}


""

""
""
""
""
""

function savePdf() {
    // $.get("increaseinvoicecounter/")
    saveDatatodb()
    // Nextcounter = parseInt(document.getElementById('currentnumber').value) + 1
    
    // SelectedCustomerUsername = "update mainapp_serialnumbercounter set counter = " + Nextcounter + " where id = 1"

}

function saveDatatodb() 
{

    document.getElementById('id_installationid').value = parseInt($('#currentnumber').val()) + 1;
    //$('#id_invoiceid').val(Nextcounter)
    // set customer id a1
    $('#id_customerid').val(parseInt($('#selectedcustomer').val()))
    //creator's name
    currentUserName = document.getElementById('currentUser').innerHTML
    $('#id_creatorname').val(currentUserName)
    //set customer name
    $('#id_customername').val(companyName)
    // invoice date
    $('#id_installationDate').val($('#datepicker_invoice').val())
 
    $('#id_po').val($('#PONo').val())
    //set creator id 
    $('#id_creatorid').val($('#idofuser').val())
    
    $('#id_reportnumber').val($('#reportNo').val())

    $('#id_serialnumber').val($('#serialNo').val())

    $('#id_imeinumber').val($('#imeiNo').val())
 
    //customerComment = document.getElementById('customerComment').innerHTML
    $('#id_customerComment').val($('#customerComment').val())

    //devicename = document.getElementById('deviceName').innerHTML
    $('#id_devicename').val($('#customerComment').val())

    //accessories = document.getElementById('accessories').innerHTML
    $('#id_accessories').val($('#accessories').val())

    //problemDescription = document.getElementById('problemDescription').innerHTML
    $('#id_problemDescription').val($('#problemDescription').val())

    //actionTaken = document.getElementById('actionTaken').innerHTML
    $('#id_actionTaken').val($('#actionTaken').val())

    //testing = document.getElementById('testing').innerHTML
    $('#id_testing').val($('#testing').val())

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