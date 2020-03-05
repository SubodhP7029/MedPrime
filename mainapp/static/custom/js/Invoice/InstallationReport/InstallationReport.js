
$("#datepicker_invoice").datepicker({ dateFormat: "mm/dd/yyyy" }).datepicker("setDate", new Date());







// Create invoice 
function createPDF() {
    //get all details from front end
    var reportNo = document.getElementById('reportnum').value
    var custInfo = document.getElementById('custnameadd').value
    var deviceInfo = document.getElementById('devicename').value
    var serialNo = document.getElementById('serialno').value
    var imeiNo = document.getElementById('iemino').value
    var probDesc = document.getElementById('problemdesc').value
    var actionTaken = document.getElementById('actiontaken').value
    var testing = document.getElementById('testingdone').value
    var custcomment = document.getElementById('customercomment').value
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
                                                document.getElementById('previewOfPdf').setAttribute('src', string)
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