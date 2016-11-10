var DoleticUIModule = new function () {
    /**
     *    Parent abstract module
     */
    this.super = new AbstractDoleticUIModule('GRC_UIModule', 'Olivier Vicente', '1.0dev');

    this.CONTACT_TYPES = {
        PROSPECT: 'Prospect',
        ACHIEVED_PROSPECT: 'Prospect appelé',
        CONTACT: 'Client',
        OLD_CONTACT: 'Ancien Client'
    };

    window.currentDetails = -1;

    /**
     *    Override render function
     */
    this.render = function (htmlNode) {
        this.super.render(htmlNode, this);
        // activate items in tabs
        $('.menu .item').tab();
        // hide some tabs
        $('#det_cont_tabChoose').hide();
        // Load HTML templates
        DoleticUIModule.getCompaniesTab(function () {
            DoleticUIModule.fillFirmList(function () {
                DoleticUIModule.getProspectsTab();
                DoleticUIModule.getAchievedProspectsTab();
                DoleticUIModule.getContactsTab(function () {
                    DoleticUIModule.fillContactTypeSelector();
                    DoleticUIModule.fillFirmTypeSelector();
                    DoleticUIModule.fillCountrySelector();
                    DoleticUIModule.fillGenderSelector();
                    DoleticUIModule.fillFirmSelector();
                    DoleticUIModule.fillUserDataSelector();
                });
                DoleticUIModule.getOldContactsTab();
                DoleticUIModule.getStatsTab();
                DoleticUIModule.getContactDetailsTab();
            });
        });

        window.postLoad();
    };
    /**
     *    Override build function
     */
    this.build = function () {
        return "<div class=\"ui two column grid container\"> \
 				  	<div class=\"row\"> \
 				  		<div class=\"sixteen wide column\"> \
 				  			<div class=\"ui top attached tabular menu\"> \
   								<a class=\"item active\" data-tab=\"companies\">Gestion des Sociétés</a> \
   								<a class=\"item\" data-tab=\"prospects\">Prospections à réaliser</a> \
   								<a class=\"item\" data-tab=\"achievedProspects\">Résultats des prospections</a> \
   								<a class=\"item\" data-tab=\"contacts\" id=\"contactsTabMenu\">Contacts courants</a> \
   								<a class=\"item\" data-tab=\"oldContacts\">Anciens contacts</a> \
   								<a class=\"item\" data-tab=\"contactDetails\" id=\"det_cont_tabChoose\">Détails du contact</a> \
 							</div> \
 							<div class=\"ui bottom attached tab segment active\" data-tab=\"companies\"> \
								<div id=\"companiesTab\"> \
								</div> \
                        	</div> \
                            <div class=\"ui bottom attached tab segment\" data-tab=\"prospects\"> \
								<div id=\"prospectsTab\"> \
								</div> \
 					    	</div> \
                            <div class=\"ui bottom attached tab segment\" data-tab=\"achievedProspects\"> \
								<div id=\"achievedProspectsTab\"> \
								</div> \
 					    	</div> \
                            <div class=\"ui bottom attached tab segment\" data-tab=\"contacts\"> \
								<div id=\"contactsTab\"> \
								</div> \
 					    	</div> \
                            <div class=\"ui bottom attached tab segment\" data-tab=\"oldContacts\"> \
								<div id=\"oldContactsTab\"> \
								</div> \
 					    	</div> \
                            <div class=\"ui bottom attached tab segment\" data-tab=\"contactDetails\"> \
								<div id=\"contactDetailsTab\"> \
								</div> \
 					    	</div> \
						</div> \
 					</div> \
	 				<div class=\"row\"> \
	 				</div> \
				</div>\
                <div class=\"ui modal\" id=\"contact_form_modal\"></div>";
    };
    /**
     *    Override uploadSuccessHandler
     */
    this.uploadSuccessHandler = function (id, data) {
        this.super.uploadSuccessHandler(id, data);
    };

    this.nightMode = function (on) {
        if (on) {

        } else {

        }
    };

// ---- OTHER FUNCTION REQUIRED BY THE MODULE ITSELF

    /**
     *    Load the HTML code of the Contacts Tab
     */
    this.getContactsTab = function (callbackFct) {
        //$('#contact_form_modal').remove();
        $('#contactsTab').load("../modules/grc/ui/templates/contactsTab.html", function () {
            $('#contact_modal_btn').remove();
            $('#toggle_old_contacts').change(function () {
                DoleticUIModule.fillContactList();
            });
            DoleticUIModule.fillContactList();
            if (callbackFct) {
                callbackFct();
            }
        });
    };

    /**
     *    Load the HTML code of the Companies Tab
     */
    this.getCompaniesTab = function (callbackFct) {
        $('#company_form_modal').remove();
        $('#companiesTab').load("../modules/grc/ui/templates/companiesTab.html", function () {
            $('#company_form_modal').remove();
            $('#company_modal_btn').remove();
            $('#toggle_old_firms').change(function () {
                DoleticUIModule.fillFirmList(false);
            });
            if (callbackFct) {
                callbackFct();
            }
        });
    };

    /**
     *    Load the HTML code of the Propects Tab
     */
    this.getProspectsTab = function (callbackFct) {
        //$('#prospects_form_modal').remove();
        $('#prospectsTab').load("../modules/grc/ui/templates/prospectsTab.html", function () {
            DoleticUIModule.fillProspectList();
            $('#prospect_modal_btn').remove();
            if (callbackFct) {
                callbackFct();
            }
        });
    };

    /**
     *    Load the HTML code of the Propects Tab
     */
    this.getAchievedProspectsTab = function (callbackFct) {
        //$('#prospects_form_modal').remove();
        $('#achievedProspectsTab').load("../modules/grc/ui/templates/achievedProspectsTab.html", function () {
            DoleticUIModule.fillAchievedProspectList();
            if (callbackFct) {
                callbackFct();
            }
        });
    };

    /**
     *    Load the HTML code of the Contacts Tab
     */
    this.getOldContactsTab = function (callbackFct) {
        //$('#contact_form_modal').remove();
        $('#oldContactsTab').load("../modules/grc/ui/templates/oldContactsTab.html", function () {
            DoleticUIModule.fillOldContactList();
            if (callbackFct) {
                callbackFct();
            }
        });
    };

    /**
     *    Load the HTML code of the Stats Tab
     */
    this.getStatsTab = function (callbackFct) {
        $('#statsTab').load("../modules/grc/ui/templates/statsTab.html");
    };

    /**
     *    Load the HTML code of the Stats Tab
     */
    this.getContactDetailsTab = function (callbackFct) {
        $('#contactDetailsTab').load("../modules/grc/ui/templates/contactDetailsTab.html", function () {
            $('#deletecontact_btn').remove();
            $('#editcontact_modal_btn').remove();
            if (callbackFct) {
                callbackFct();
            }
        });
    };

    /**
     *    Open Contact Details Tab
     */
    this.openContactInfo = function (contactId) {
        ContactServicesInterface.getById(contactId, function (data) {
            // if no service error
            if (data.code == 0 && data.object != "[]") {

                window.currentDetails = contactId;
                var tabTitle = "Détails de ";
                tabTitle += data.object.firstname;
                tabTitle += " ";
                tabTitle += data.object.lastname;
                $('#det_cont_tabChoose').html(tabTitle);

                $('#det_cont_name').html(data.object.gender + " " + data.object.firstname + " " + data.object.lastname);
                $('#det_cont_email').html(data.object.email);
                $('#det_cont_phone').html(data.object.phone);
                $('#det_cont_cellphone').html(data.object.cellphone);
                $('#det_cont_role').html(data.object.role);

                if (typeof window.firm_list[data.object.firm_id] !== 'undefined') {
                    $('#det_cont_firm').html(window.firm_list[data.object.firm_id].name);
                } else {
                    $('#det_cont_firm').html("<i>Aucune</i>");
                }

                if (data.object.prospected == 1) {
                    $('#det_cont_prospected').html("Oui");
                } else if (data.object.prospected == 0) {
                    $('#det_cont_prospected').html("Non");
                } else {
                    $('#det_cont_prospected').html("undefined");
                }

                if (data.object.errorFlag == -1) {
                    $('#det_cont_error').html("Correctes");
                } else {
                    $('#det_cont_error').html("Erronées");
                }

                if (data.object.nextCallDate !== null && data.object.nextCallDate != "") {
                    $('#det_cont_next_call_date').html(data.object.nextCallDate);
                } else {
                    $('#det_cont_next_call_date').html("<i>Aucune</i>");
                }

                if (data.object.origin !== null && data.object.origin != "") {
                    $('#det_cont_origin').html(data.object.origin);
                } else {
                    $('#det_cont_origin').html("<i>Inconnue</i>");
                }

                if (data.object.notes !== null && data.object.notes != "") {
                    $('#det_cont_notes').html(data.object.notes);
                } else {
                    $('#det_cont_notes').html("<i>Aucune</i>");
                }

                $('#det_cont_tabChoose').show();
                $('#det_cont_tabChoose').click();

                $('#editcontact_modal_btn').attr('onClick', "DoleticUIModule.editContact(" + contactId + ");");

            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    this.fillUserDataSelector = function () {
        UserDataServicesInterface.getAll(function (data) {
            // if no service error
            if (data.code == 0) {
                // create content var to build html
                var content = '';
                // iterate over values to build options
                for (var i = 0; i < data.object.length; i++) {
                    content += '<div class="item" data-value="' + data.object[i].user_id + '">' + data.object[i].firstname + ' ' + data.object[i].lastname + '</div>';
                }
                // insert html content
                $('#contact_user_search .menu').html(content);
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    /**
     *    Add the gender selector
     */
    this.fillFirmList = function (callbackFct) {
        var showOld = $('#toggle_old_firms').prop('checked');
        FirmServicesInterface.getAll(function (data) {
            window.firm_list = [];
            $('#company_table_container').html('');
            // if no service error
            if (data.code == 0 && data.object != "[]") {
                var content = "<table class=\"ui very basic celled table\" id=\"company_table\"> \
                <thead> \
                    <tr>\
                        <th>Nom</th> \
                        <th>SIRET</th> \
                        <th>Type</th> \
                        <th>Adresse</th> \
                        <th>Code postal</th> \
                        <th>Ville</th> \
                        <th>Pays</th> \
                        <th>Actions</th> \
                    </tr>\
                </thead>\
                <tfoot> \
                    <tr>\
                        <th>Nom</th> \
                        <th>SIRET</th> \
                        <th>Type</th> \
                        <th>Adresse</th> \
                        <th>Code postal</th> \
                        <th>Ville</th> \
                        <th>Pays</th> \
                        <th></th> \
                    </tr>\
                </tfoot>\
                <tbody id=\"company_body\">";

                var filters = [
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.select_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.select_filter,
                    DoleticMasterInterface.reset_filter
                ];
                var selector_content = '';
                var counter = 0;
                for (var i = 0; i < data.object.length; i++) {
                    window.firm_list[data.object[i].id] = data.object[i];
                    if (showOld || counter < 100) {
                        content += "<tr><td>" + data.object[i].name + "</td> \
			      					<td>" + data.object[i].siret + "</td> \
			      					<td>" + data.object[i].type + "</td> \
			      					<td>" + data.object[i].address + "</td> \
			      					<td>" + data.object[i].postal_code + "</td>\
			    					<td>" + data.object[i].city + "</td>\
                                    <td>" + data.object[i].country + "</td> \
			    				<td><i>Aucune</i></td> \
			    				</tr>";
                    }
                    counter++;
                }
                content += "</tbody></table>";
                $('#company_table_container').append(content);
                DoleticMasterInterface.makeDataTables('company_table', filters);
                if (callbackFct) {
                    callbackFct();
                }
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    this.fillProspectList = function () {
        ContactServicesInterface.getByCategory(this.CONTACT_TYPES.PROSPECT, function (data) {
            $('#prospect_table_container').html('');
            // if no service error
            if (data.code == 0 && data.object != "[]") {
                var content = "<table class=\"ui very basic celled table\" id=\"prospect_table\"> \
                <thead> \
                    <tr>\
                        <th></th>\
                        <th>Nom/Email</th> \
                        <th>Téléphone</th> \
                        <th>Mobile</th> \
                        <th>Société</th> \
                        <th>Role</th> \
                        <th>Actions</th> \
                    </tr>\
                </thead>\
                <tfoot> \
                    <tr>\
                        <th></th>\
                        <th>Nom/Email</th> \
                        <th>Téléphone</th> \
                        <th>Mobile</th> \
                        <th>Société</th> \
                        <th>Role</th> \
                        <th></th> \
                    </tr>\
                </tfoot>\
                <tbody id=\"prospect_body\">";

                var filters = [
                    DoleticMasterInterface.no_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.select_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.reset_filter
                ];
                var counter = 0;
                for (var i = 0; i < data.object.length && counter < 100; i++) {

                    content += "<tr><td>\
                    			    <button class=\"ui teal icon button\" data-tooltip=\"Détails du contact\" onClick=\"DoleticUIModule.openContactInfo(" + data.object[i].id + "); return false;\"> \
				  					    <i class=\"user icon\"></i> \
									</button>\
                                </td><td> \
			        				<h4 class=\"ui header\"> \
			          				<div class=\"content\">" + data.object[i].firstname + " " + data.object[i].lastname +
                        "<div class=\"sub header\"><a href=\"mailto:" + data.object[i].email + "\" target=\"_blank\">" + data.object[i].email + "</a></div> \
			        				</div> \
			      					</h4></td> \
			      					<td>" + data.object[i].phone + "</td> \
			      					<td>" + data.object[i].cellphone + "</td> \
			      					<td>" + (typeof window.firm_list[data.object[i].firm_id] !== 'undefined' ? window.firm_list[data.object[i].firm_id].name : '<i>Aucune</i>') + "</td> \
			    				    <td>" + data.object[i].role + "</td> \
			    				    <td><i>Aucune</i></td> \
			    				</tr>";
                    counter++;
                }
                content += "</tbody></table>";
                $('#prospect_table_container').append(content);
                DoleticMasterInterface.makeDataTables('prospect_table', filters);
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    this.fillAchievedProspectList = function () {
        ContactServicesInterface.getByCategory(this.CONTACT_TYPES.ACHIEVED_PROSPECT, function (data) {
            $('#achievedProspect_table_container').html('');
            // if no service error
            if (data.code == 0 && data.object != "[]") {
                var content = "<table class=\"ui very basic celled table\" id=\"achievedProspect_table\"> \
                <thead> \
                    <tr>\
                        <th></th>\
                        <th>Nom/Email</th> \
                        <th>Société</th> \
                        <th>Role</th> \
                        <th>Prochaine prospection</th> \
                        <th>Coordonnées</th> \
                        <th>Actions</th> \
                    </tr>\
                </thead>\
                <tfoot> \
                    <tr>\
                        <th></th>\
                        <th>Nom/Email</th> \
                        <th>Société</th> \
                        <th>Role</th> \
                        <th>Prochaine prospection</th> \
                        <th>Coordonnées</th> \
                        <th></th> \
                    </tr>\
                </tfoot>\
                <tbody id=\"achievedProspect_body\">";

                var filters = [
                    DoleticMasterInterface.no_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.select_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.select_filter,
                    DoleticMasterInterface.reset_filter
                ];
                var counter = 0;
                for (var i = 0; i < data.object.length && counter < 100; i++) {

                    var nextCallDate = "<i>Aucune</i>";
                    if (data.object[i].nextCallDate !== null) {
                        nextCallDate = data.object[i].nextCallDate;
                    }

                    var error = "Correctes";
                    if (data.object[i].errorFlag != -1) {
                        error = "Erronées";
                    }

                    content += "<tr><td>\
                    <button class=\"ui teal icon button\" data-tooltip=\"Détails du contact\" onClick=\"DoleticUIModule.openContactInfo(" + data.object[i].id + "); return false;\"> \
				  		<i class=\"user icon\"></i> \
					</button>\
                    </td><td> \
			        				<h4 class=\"ui header\"> \
			          				<div class=\"content\">" + data.object[i].firstname + " " + data.object[i].lastname +
                        "<div class=\"sub header\"><a href=\"mailto:" + data.object[i].email + "\" target=\"_blank\">" + data.object[i].email + "</a></div> \
			        				</div> \
			      					</h4></td> \
			      					<td>" + (typeof window.firm_list[data.object[i].firm_id] !== 'undefined' ? window.firm_list[data.object[i].firm_id].name : '<i>Aucune</i>') + "</td> \
			    				    <td>" + data.object[i].role + "</td> \
			      					<td>" + nextCallDate + "</td> \
			    				    <td>" + error + "</td> \
			    				    <td><i>Aucune</i></td> \
			    				</tr>";
                    counter++;
                }
                content += "</tbody></table>";
                $('#achievedProspect_table_container').append(content);
                DoleticMasterInterface.makeDataTables('achievedProspect_table', filters);
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    this.fillContactList = function () {
        var showOld = $('#toggle_old_contacts').prop('checked');
        ContactServicesInterface.getByCategory(this.CONTACT_TYPES.CONTACT, function (data) {
            $('#contact_table_container').html('');
            // if no service error
            if (data.code == 0 && data.object != "[]") {
                var content = "<table class=\"ui very basic celled table\" id=\"contact_table\"> \
                <thead> \
                    <tr>\
                        <th></th>\
                        <th>Nom/Email</th> \
                        <th>Téléphone</th> \
                        <th>Mobile</th> \
                        <th>Société</th> \
                        <th>Role</th> \
                        <th>Prospecté</th> \
                        <th>Actions</th> \
                    </tr>\
                </thead>\
                <tfoot> \
                    <tr>\
                        <th></th>\
                        <th>Nom/Email</th> \
                        <th>Téléphone</th> \
                        <th>Mobile</th> \
                        <th>Société</th> \
                        <th>Role</th> \
                        <th>Prospecté</th> \
                        <th></th> \
                    </tr>\
                </tfoot>\
                <tbody id=\"company_body\">";

                var filters = [
                    DoleticMasterInterface.no_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.select_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.select_filter,
                    DoleticMasterInterface.reset_filter
                ];
                var counter = 0;
                for (var i in data.object) {
                    if (counter >= 100 && !showOld) {
                        break;
                    }
                    var isProspected = "Non";
                    if (data.object[i].prospected == 1) {
                        isProspected = "Oui";
                    }

                    content += "<tr>\
                                    <td>\
                                    <button class=\"ui teal icon button\" data-tooltip=\"Détails du contact\" onClick=\"DoleticUIModule.openContactInfo(" + data.object[i].id + "); return false;\"> \
				  						<i class=\"user icon\"></i> \
									</button>\
                                    </td>\
                                    <td> \
			        				<h4 class=\"ui header\"> \
			          				<div class=\"content\">" + data.object[i].firstname + " " + data.object[i].lastname +
                        "<div class=\"sub header\"><a href=\"mailto:" + data.object[i].email + "\" target=\"_blank\">" + data.object[i].email + "</a></div> \
			        				</div> \
			      					</h4></td> \
			      					<td>" + data.object[i].phone + "</td> \
			      					<td>" + data.object[i].cellphone + "</td> \
			      					<td>" + (typeof window.firm_list[data.object[i].firm_id] !== 'undefined' ? window.firm_list[data.object[i].firm_id].name : '<i>Aucune</i>') + "</td> \
			    				    <td>" + data.object[i].role + "</td> \
			    				    <td>" + isProspected + "</td> \
			    				    <td><i>Aucune</i></td> \
			    				</tr>";
                    counter++;
                }
                content += "</tbody></table>";
                $('#contact_table_container').append(content);
                DoleticMasterInterface.makeDataTables('contact_table', filters);
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    this.fillOldContactList = function () {
        ContactServicesInterface.getByCategory(this.CONTACT_TYPES.OLD_CONTACT, function (data) {
            $('#oldContact_table_container').html('');
            // if no service error
            if (data.code == 0 && data.object != "[]") {
                var content = "<table class=\"ui very basic celled table\" id=\"oldContact_table\"> \
                <thead> \
                    <tr>\
                        <th></th>\
                        <th>Nom/Email</th> \
                        <th>Téléphone</th> \
                        <th>Mobile</th> \
                        <th>Société</th> \
                        <th>Role</th> \
                        <th>Prospecté</th> \
                        <th>Actions</th> \
                    </tr>\
                </thead>\
                <tfoot> \
                    <tr>\
                        <th></th>\
                        <th>Nom/Email</th> \
                        <th>Téléphone</th> \
                        <th>Mobile</th> \
                        <th>Société</th> \
                        <th>Role</th> \
                        <th>Prospecté</th> \
                        <th></th> \
                    </tr>\
                </tfoot>\
                <tbody id=\"oldContact_body\">";

                var filters = [
                    DoleticMasterInterface.no_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.select_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.select_filter,
                    DoleticMasterInterface.reset_filter
                ];
                var counter = 0;
                for (var i = 0; i < data.object.length && counter < 100; i++) {

                    var isProspected = "Non";
                    if (data.object[i].prospected == 1) {
                        isProspected = "Oui";
                    }

                    content += "<tr><td>\
                    <button class=\"ui teal icon button\" data-tooltip=\"Détails du contact\" onClick=\"DoleticUIModule.openContactInfo(" + data.object[i].id + "); return false;\"> \
				  		<i class=\"user icon\"></i> \
					</button>\
                    </td><td> \
			        				<h4 class=\"ui header\"> \
			          				<div class=\"content\">" + data.object[i].firstname + " " + data.object[i].lastname +
                        "<div class=\"sub header\"><a href=\"mailto:" + data.object[i].email + "\" target=\"_blank\">" + data.object[i].email + "</a></div> \
			        				</div> \
			      					</h4></td> \
			      					<td>" + data.object[i].phone + "</td> \
			      					<td>" + data.object[i].cellphone + "</td> \
			      					<td>" + (typeof window.firm_list[data.object[i].firm_id] !== 'undefined' ? window.firm_list[data.object[i].firm_id].name : '<i>Aucune</i>') + "</td> \
			    				    <td>" + data.object[i].role + "</td> \
			    				    <td>" + isProspected + "</td> \
			    				    <td><i>Aucune</i></td> \
			    				</tr>";
                    counter++;
                }
                content += "</tbody></table>";
                $('#oldContact_table_container').append(content);
                DoleticMasterInterface.makeDataTables('oldContact_table', filters);
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

};
