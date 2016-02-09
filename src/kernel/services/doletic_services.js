
// ----------------------- DOLETIC INTERFACE SERVICES CLASS ----------------------------------

/**
 *  DoleticServicesInterface
 */
var DoleticServicesInterface = new function() {

  /**
   *  Global url to main script
   */
  this.doleticMainURL = 'http://localhost/src/kernel/Main.php';
  this.serviceErrors = [
  'ERR_NO_ERROR',
  'ERR_MISSING_PARAMS',
  'ERR_MISSING_OBJ',
  'ERR_MISSING_ACT',
  'ERR_MISSING_SERVICE',
  'ERR_SERVICE_FAILED',
  'ERR_INSUFFICIENT_RIGHTS',
  ];
  /**
   *  Loads a standard Doletic page using ui parameter 
   */
  this.getUI = function(ui) {
    this.ajaxPOST(
      this.doleticMainURL, 
      {
        q:'ui',
        page: ui
      },
      'json',
      DoleticServicesInterface.handleAJAXError,
      DoleticMasterInterface.loadModule);
  }
  this.resetUI = function() {
    window.location.href = this.doleticMainURL;
  } 
  /**
   *  Loads a specific Doletic Login page
   */
  this.getUILogin = function() {
    this.ajaxPOST(
      this.doleticMainURL, 
      {q:'login'},'json',
      DoleticServicesInterface.handleAJAXError,
      DoleticMasterInterface.loadModule);
  }
  /**
   *  Loads a specific Doletic Lost password page
   */
  this.getUILost = function() {
    this.ajaxPOST(
      this.doleticMainURL, 
      {q:'lost'},'json',
      DoleticServicesInterface.handleAJAXError,
      DoleticMasterInterface.loadModule);
  }
  /**
   *  Loads a specific Doletic Lost password page
   */
  this.getUILogout = function() {
    this.ajaxPOST(
      this.doleticMainURL, 
      {q:'logout'},'json',
      DoleticServicesInterface.handleAJAXError,
      DoleticMasterInterface.loadModule);
  }
  /**
   *  Loads a specific Doletic Logout page
   */
  this.logout = function() {
    DoleticMasterInterface.showConfirmModal(
      '',
      '',
      '<h2 class="ui inverted header"> \
        <i class="help inverted icon"></i> \
        <div class="content"> \
          Déconnexion ? \
          <div class="sub header">Souhaitez-vous vraiment vous deconnecter ?</div> \
        </div> \
      </h2>',
      function(){
        // require logout
        DoleticServicesInterface.getUILogout();
        // and hide modal
        DoleticMasterInterface.hideConfirmModal();
      },
      function() {
        // hide modal and don't do anything
        DoleticMasterInterface.hideConfirmModal();
      });
  }
  /**
   *  Loads a specific Doletic 404 page
   */
  this.getUI404 = function() {
    this.getUI('404');
  }
  /**
   *  Loads a specific Doletic Home page
   */
  this.getUIHome = function() {
    this.getUI('kernel:home');
  }
  /**
   *  Loads a specific Doletic Auth page
   */
  this.authenticate = function(username, password, successHandler) {
    this.ajaxPOST(
      this.doleticMainURL, 
      {
        q: 'auth',
        user: username,
        hash: phpjsLight.sha1(password)
      },
      'json',
      DoleticServicesInterface.handleAJAXError,
      successHandler
      );
  }
  /**
   *  Send mail to reset password
   */
  this.resetPassword = function(mail, successHandler) {
    this.ajaxPOST(
      this.doleticMainURL, 
      {
        q: 'resetpass',
        mail: mail
      },
      'json',
      DoleticServicesInterface.handleAJAXError,
      successHandler
      );
  }
  /**
   *  Require an upload from server
   */
  this.upload = function(formData, successHandler) {
    $.ajax({
         url: this.doleticMainURL,
         type: 'POST',
         data: formData,
         processData: false,
         contentType: false,
         dataType: 'json',
         error: DoleticServicesInterface.handleAJAXError,
         success: successHandler
      });
  }
  /**
   *  Require a download
   */
   this.download = function(fileId) {
    this.ajaxPOST(
      this.doleticMainURL,
      {
        q:'service',
        obj:'service',
        act:'download',
        params:{
          id:fileId
        }
      },
      'json',
      DoleticServicesInterface.handleAJAXError,
      function(data) {
        if(data.code == 0) {
          $('#doletic_download').attr('href', data.object.url).attr('download', data.object.basename);
          $('#doletic_download')[0].click();
          $('#doletic_download').attr('href', '').attr('download', '');
        } else {
          DoleticMasterInterface.showError("Erreur de téléchargement !", "Le système est potentiellement indisponible. Si ce problème persiste merci de prévenir un développeur en lui fournissant le code suivant : " + data.code);
        }
      });
  }
  /**
   *  Require list of available uis from the server
   */
  this.availableModuleLinks = function(successHandler) {
    this.callService('service','uilinks', {}, successHandler);
  }
  /**
   *
   */
  this.getCurrentUser = function(successHandler) {
    this.callService('service', 'getuser', {}, successHandler);
  }
  /**
   *
   */
  this.updateAvatar = function(newAvatarId, successHandler) {
   this.callService('service', 'updateava', { avatarId:newAvatarId }, successHandler); 
  }
  /**
   *
   */
  this.getAvatar = function(successHandler) {
   this.callService('service', 'getava', {}, successHandler); 
  }
  /**
   *  Make an AJAX call to Doletic services to retrieve some data
   */
  this.callService = function(object, action, params, successHandler) {
    this.ajaxPOST(
      this.doleticMainURL,
      {
        q:'service',
        obj:object,
        act:action,
        params:params
      },
      'json',
      DoleticServicesInterface.handleAJAXError,
      successHandler
      );
  }
  /**
   *  Make an ajax call. Do not call it from the outside of this class
   */
  this.ajaxPOST = function(url, data, dataType, errorHandler, successHandler) {
      // DEBUG -------------------------------
      console.debug("ajaxPOST called with url = "+url+"\ndata = \n"+JSON.stringify(data));
      // -------------------------------------
      $.ajax({
         url: url,
         type: 'POST',
         data: data,
         dataType: dataType,
         error: errorHandler,
         success: successHandler
      });
  }
  /**
   *  AJAX error default handler
   */
   this.handleAJAXError = function(jqXHR, textStatus, errorThrown) {
    // Show an error message on doletic interface
        DoleticMasterInterface.showError("L'appel AJAX a échoué !", 
          "<p>L'appel AJAX d'authentification à échoué ! Détails : " + errorThrown + " ("+textStatus+")</p>");
        // Debug the response content
        console.debug(jqXHR.responseText);
   }
   /**
    *  Service error
    */
    this.handleServiceError = function(data) {
      if(data.code != 0) {
        if(data.code < this.serviceErrors.length) {
          var html = "<ul><li>Erreur : "+this.serviceErrors[data.code]+"</li>";
          if(data.code == 5) { html += "<li>Détails : "+data.error+"</li>"; }
          html += "</ul>";
          DoleticMasterInterface.showError("Le service a renvoyé une erreur !", html);
        } else {
          DoleticMasterInterface.showError("Le service a renvoyé une erreur !", 
            "<p>Une erreur inconnue s'est produite lors de l'appel au service. Merci de prévenir les développeurs.</p>");
        }
      }
    }
}

