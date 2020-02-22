function updateSelectedDealer() {
    updateSelectedDealerquery = "UPDATE mainapp_profile SET "
    var UserId = parseInt(document.getElementById('usersid').value)
    var id_nameofcontact = document.getElementById('id_nameofcontact').value
    if (id_nameofcontact != '') {
        updateSelectedDealerquery += "nameofcontact = '" + id_nameofcontact + "',"
    }
    var id_telephone_0 = document.getElementById('id_telephone_0').value

    var id_telephone_1 = document.getElementById('id_telephone_1').value
    if (id_telephone_1 != '') {
        id_telephone_1 = null
    }
    var id_mobile_0 = document.getElementById('id_mobile_0').value

    var id_mobile_1 = document.getElementById('id_mobile_1').value
    if (id_mobile_1 != '') {
        id_mobile_1 = null
    }
    var id_contactparticulars = document.getElementById('id_contactparticulars').value
    if (id_contactparticulars != '') {
        updateSelectedDealerquery += "contactparticulars = '" + id_contactparticulars + "',"
    }
    var id_address = document.getElementById('id_address').value
    if (id_address != '') {
        updateSelectedDealerquery += "address = '" + id_address + "',"
    }
    var id_pincode = document.getElementById('id_pincode').value
    if (id_pincode != '') {
        updateSelectedDealerquery += "pincode = " + id_pincode + ","
    }
    var id_legalstatus = document.getElementById('id_legalstatus').value
    if (id_legalstatus != '') {
        updateSelectedDealerquery += "legalstatus = '" + id_legalstatus + "',"
    }
    var id_gstno = document.getElementById('id_gstno').value
    if (id_gstno != '') {
        updateSelectedDealerquery += "gstno = '" + id_gstno + "',"
    }
    var id_cinno = document.getElementById('id_cinno').value
    if (id_cinno != '') {
        updateSelectedDealerquery += "cinno = '" + id_cinno + "',"
    }
    var id_panno = document.getElementById('id_panno').value
    if (id_panno != '') {
        updateSelectedDealerquery += "panno = '" + id_panno + "',"
    }
    var id_shopactno = document.getElementById('id_shopactno').value
    if (id_shopactno != '') {
        updateSelectedDealerquery += "shopactno = '" + id_shopactno + "',"
    }
    var id_businessgeography = document.getElementById('id_businessgeography').value
    if (id_businessgeography != '') {
        updateSelectedDealerquery += "businessgeography = '" + id_businessgeography + "',"
    }
    var id_marketsegment = document.getElementById('id_marketsegment').value
    if (id_marketsegment != '') {
        updateSelectedDealerquery += "marketsegment = '" + id_marketsegment + "',"
    }
    var id_currentproducts = document.getElementById('id_currentproducts').value
    if (id_currentproducts != '') {
        updateSelectedDealerquery += "currentproducts = '" + id_currentproducts + "',"
    }
    var id_currentstaffstrength = document.getElementById('id_currentstaffstrength').value
    if (id_currentstaffstrength != '') {
        updateSelectedDealerquery += "currentstaffstrength = " + id_currentstaffstrength + ","
    }
    var id_customershandledsofar = document.getElementById('id_customershandledsofar').value
    if (id_customershandledsofar != '') {
        updateSelectedDealerquery += "customershandledsofar = '" + id_customershandledsofar + "',"
    }
    var id_salersturnover = document.getElementById('id_salersturnover').value
    if (id_salersturnover != '') {
        updateSelectedDealerquery += "salersturnover = " + id_salersturnover + ","
    }
    var id_parternshipcat = document.getElementById('id_parternshipcat').value
    if (id_parternshipcat != '') {
        updateSelectedDealerquery += "parternshipcat = '" + id_parternshipcat + "',"
    }
    var finalphonen, finalmobilen
    if (id_telephone_1 != '' && id_telephone_1 != null) {
        finalphonen = id_telephone_0 + 'x' + id_telephone_1
    } else {
        finalphonen = id_telephone_0
    }
    if (id_telephone_0 != '') {
        updateSelectedDealerquery += "telephone = '" + finalphonen + "',"

    }


    if (id_mobile_1 != '' && id_mobile_1 != null) {
        finalmobilen = id_mobile_0 + 'x' + id_mobile_1
    } else {
        finalmobilen = id_mobile_0
    }

    if (id_mobile_0 != '') {
        updateSelectedDealerquery += "mobile = '" + finalmobilen + "',"

    }
    var newStr = updateSelectedDealerquery.slice(0, -1)
    newStr += " where user_id =" + UserId
    $.get("submitupdatedealer/", { sqlParam1: newStr })

}

