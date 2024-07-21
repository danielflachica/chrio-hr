const cbAccountID = "c2dcs839.caspio.com";
const cbAppKeyPrefix = "3fbcc000";
const cbDomain = "https://c2dcs839.caspio.com";
const cbLogoutURL = "https://c2dcs839.caspio.com/folderlogout";
const cbDataPagePrefix = "https://c2dcs839.caspio.com/dp/3fbcc000";

/**
 * Deploy a DataPage to an element.
 * Sample call:
 * deployDP('result-container', '7a03bf51843444c08db3', '?ID=24')
 *
 * @param {string} containerID Element's ID where the DataPage will be inserted
 * @param {string} appKey DataPage App Key without the 8 digit prefix
 * @param {string} params Query string parameters for the DataPage, question mark should be included.
 */
function deployDP(containerID, appKey, params) {
  var params = params || "";
  var dataPageScript = document.createElement("script");
  var container = document.getElementById(containerID);
  dataPageScript.src = cbDataPagePrefix + appKey + "/emb" + params;
  container.innerHTML = "";
  container.appendChild(dataPageScript);
}

/**
 * Deploy a DataPage to the common modal and show it. Uses deployDP internally
 * Also makes that modal draggable.
 * Sample call:
 * openModal('Edit Employee', '7a03bf51843444c08db3', '?ID=24', 'modal-md')
 *
 * @param {string} modalTitle Title to appear in the modal header
 * @param {string} appKey DataPage AppKey without the prefix
 * @param {string} params Query string parameters for the DataPage, question mark should be included.
 * @param {string} size Bootstrap modal class to be added for its size, i.e  'modal-sm', 'modal-md', 'modal-lg', or 'modal-xl'
 */
function openModal(modalTitle, appKey, params, size) {
  $("#cb-modal-body").html("");
  if (size) {
    $("#cb-modal .modal-dialog")
      .removeClass("modal-sm modal-md modal-lg modal-xl")
      .addClass(size);
  } else {
    $("#cb-modal .modal-dialog").removeClass(
      "modal-sm modal-md modal-lg modal-xl"
    );
  }
  deployDP("cb-modal-body", appKey, params);
  $("#cb-modal-title").html(modalTitle);
  $("#cb-modal").modal({
    backdrop: "static",
    keyboard: false,
  });

  // draggable modal
  $(".modal-header").on("mousedown", function (mousedownEvt) {
    var $draggable = $(this);
    var x = mousedownEvt.pageX - $draggable.offset().left,
      y = mousedownEvt.pageY - $draggable.offset().top;
    $("body").on("mousemove.draggable", function (mousemoveEvt) {
      $draggable.closest(".modal-content").offset({
        left: mousemoveEvt.pageX - x,
        top: mousemoveEvt.pageY - y,
      });
    });
    $("body").one("mouseup", function () {
      $("body").off("mousemove.draggable");
    });
    $draggable.closest(".modal").one("bs.modal.hide", function () {
      $("body").off("mousemove.draggable");
    });
  });
}

/**
 * Refresh a DataPage manually.
 *
 * @param {string} appKey DataPage AppKey without the prefix
 */
function refreshDP(appKey) {
  for (var key in window.dataPageManagerObj.dataPages) {
    if (key.search(cbAppKeyPrefix + appKey) != -1) {
      window.dataPageManagerObj.dataPages[key].refresh();
    }
  }
}

// function - get URL Vars
function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");

  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    hash[1] = unescape(hash[1]);
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }

  return vars;
}
var urlVars = getUrlVars();

function getTodaysDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return today;
}
