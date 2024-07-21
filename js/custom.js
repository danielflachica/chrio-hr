document.addEventListener("DataPageReady", function (event) {
  const cbForm = `form[action*="${event.detail.appKey}"]`;

  /** Details - User Topbar (Hidden) */
  if (event.detail.appKey == cbAppKeyPrefix + "c63b70804b124a74935d") {
    let fullName = $(`${cbForm} span.cbFormData:eq(0)`).text();
    let profilePic = $(`${cbForm} span.cbFormData:eq(1) img`).attr("src");

    $("#cbNavbarName").text(fullName);
    $("#cbNavbarPicture").attr("src", profilePic);
  }

  /** List - User */
  if (event.detail.appKey == cbAppKeyPrefix + "42cbdf1f2df049ae8d42") {
    if ($(`${cbForm} tr[class*="cbResultSetDataRow"]`).length > 0) {
      $("#cbBtnDownloadEmployeesReport").removeClass("disabled");
    } else {
      $("#cbBtnDownloadEmployeesReport").addClass("disabled");
    }
  }

  /** Add - Attendance Log */
  if (event.detail.appKey == cbAppKeyPrefix + "e261a066bf234eecb86a") {
    let attendanceTypeID = $(`${cbForm} #InsertRecordType_ID`).val();
    let btnSubmit = $(`${cbForm} input[type="submit"]`);
    if (attendanceTypeID == 1) {
      btnSubmit.val("Clock In");
      btnSubmit.removeClass("cbSubmitButton");
      btnSubmit.addClass("btn btn-success px-3");
    } else if (attendanceTypeID == 2) {
      btnSubmit.val("Clock Out");
      btnSubmit.removeClass("cbSubmitButton");
      btnSubmit.addClass("btn btn-warning px-3");
    }
  }

  /** List - Attendance Log */
  if (event.detail.appKey == cbAppKeyPrefix + "a7a202a767bb499cb204") {
    $(`${cbForm} .cbResultSetDataRow .cbResultSetData`).each((i, td) => {
      if (td.innerText == "Time In") {
        td.classList.add("text-success");
      } else if (td.innerText == "Time Out") {
        td.classList.add("text-warning");
      }
    });
  }
});

let cbDownloadReport = (appKey) => {
  $(`form[action*="${appKey}"] a[data-cb-name="DataDownloadButton"]`)
    .first()
    .click();
};

/** Set Footer Year */
$("#cbFooterYear").text(new Date().getFullYear());
