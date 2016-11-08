var DoleticUIModule = new function () {
    /**
     *    Parent abstract module
     */
    this.super = new AbstractDoleticUIModule('GRC_UIModule', 'Olivier Vicente', '1.0dev');
    /**
     *    Override render function
     */
    this.render = function (htmlNode) {
        this.super.render(htmlNode, this);
        // activate items in tabs
        $('.menu .item').tab();
        // Load HTML templates
        DoleticUIModule.getContactsTab();
        DoleticUIModule.getCompaniesTab();
        DoleticUIModule.getStatsTab();
        // Fill tables
        DoleticUIModule.fillFirmList(true);
        // Fill all the selectors
        DoleticUIModule.fillContactTypeSelector();
        DoleticUIModule.fillFirmTypeSelector();
        DoleticUIModule.fillCountrySelector();
        DoleticUIModule.fillGenderSelector();
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
   								<a class=\"item\" data-tab=\"contacts\">Gestion des Contacts</a> \
 							</div> \
 							<div class=\"ui bottom attached tab segment active\" data-tab=\"companies\"> \
								<div id=\"companiesTab\"> \
								</div> \
                        	</div> \
                            <div class=\"ui bottom attached tab segment\" data-tab=\"contacts\"> \
								<div id=\"contactsTab\"> \
								</div> \
 					    	</div> \
						</div> \
 					</div> \
	 				<div class=\"row\"> \
	 				</div> \
				</div>";
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
    this.getContactsTab = function () {
        $('#contact_form_modal').remove();
        $('#contactsTab').load("../modules/grc/ui/templates/contactsTab.html");
    };

    /**
     *    Load the HTML code of the Companies Tab
     */
    this.getCompaniesTab = function () {
        $('#company_form_modal').remove();
        $('#companiesTab').load("../modules/grc/ui/templates/companiesTab.html");
    };

    /**
     *    Load the HTML code of the Stats Tab
     */
    this.getStatsTab = function () {
        $('#statsTab').load("../modules/grc/ui/templates/statsTab.html");
    };

    /**
     *    Clear all the field from the Contact Form
     */
    this.clearNewContactForm = function () {
        $('#contact_form .message').remove();
        $('#contact_form')[0].reset();
        $('#contact_form .dropdown').dropdown('restore defaults');
        $('#contact_form h4').html("Ajout d'un contact");
        $('#addcontact_btn').html("Ajouter").attr("onClick", "DoleticUIModule.insertNewContact(); return false;");
    };

    /**
     *    Add a new Contact
     */
    this.insertNewContact = function () {
        // ADD OTHER TESTS
        if (DoleticUIModule.checkNewContactForm()) {
            // Insert new project in db
            ContactServicesInterface.insert(
                $('#contact_gender_search').dropdown('get value'),
                $('#contact_firstname').val(),
                $('#contact_lastname').val(),
                $('#contact_firm_search').dropdown('get value'),
                $('#contact_mail').val(),
                $('#contact_tel').val(),
                $('#contact_cell').val(),
                $('#contact_type_search').dropdown('get value'),
                $('#contact_role').val(),
                $('#contact_notes').val(),
                function (data) {
                    DoleticUIModule.addContactHandler(data);
                });
        }
    };

    /**
     *    Add a new Firm
     */
    this.insertNewFirm = function () {
        // ADD OTHER TESTS
        if (DoleticUIModule.checkNewFirmForm()) {
            // Insert new project in db
            FirmServicesInterface.insert(
                $('#firm_siret').val(),
                $('#firm_name').val(),
                $('#firm_address').val(),
                $('#firm_postalcode').val(),
                $('#firm_city').val(),
                $('#firm_country_search').dropdown('get value'),
                $('#firm_type_search').dropdown('get value'),
                function (data) {
                    DoleticUIModule.addFirmHandler(data);
                });
        }
    };

    this.editContact = function (id) {
        $('#contact_form h4').html("Edition d'un contact");
        ContactServicesInterface.getById(id, function (data) {
            // if no service error
            if (data.code == 0 && data.object != "[]") {
                $('#contact_firstname').val(data.object.firstname);
                $('#contact_lastname').val(data.object.lastname);
                $('#contact_tel').val(data.object.phone);
                $('#contact_cell').val(data.object.cellphone);
                $('#contact_mail').val(data.object.email);
                $('#contact_role').val(data.object.role);
                $('#contact_notes').val(data.object.notes);
                $('#contact_gender_search').dropdown("set selected", data.object.gender);
                $('#contact_type_search').dropdown("set selected", data.object.category);
                $('#contact_firm_search').dropdown("set selected", data.object.firm_id);
                $('#addcontact_btn').html("Confirmer").attr("onClick", "DoleticUIModule.updateContact(" + id + "); return false;");
                $('#contact_form_modal').modal('show');
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    this.editFirm = function (id) {
        $('#company_form h4').html("Edition d'une société");
        FirmServicesInterface.getById(id, function (data) {
            // if no service error
            if (data.code == 0 && data.object != "[]") {
                $('#firm_name').val(data.object.name);
                $('#firm_siret').val(data.object.siret);
                $('#firm_address').val(data.object.address);
                $('#firm_postalcode').val(data.object.postal_code);
                $('#firm_city').val(data.object.city);
                $('#firm_type_search').dropdown("set selected", data.object.type);
                $('#contact_type_search').dropdown("set selected", data.object.category);
                $('#firm_country_search').dropdown("set selected", data.object.country);
                $('#addfirm_btn').html("Confirmer").attr("onClick", "DoleticUIModule.updateFirm(" + id + "); return false;");
                $('#company_form_modal').modal('show');
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    this.updateContact = function (id) {
        // ADD OTHER TESTS
        if (DoleticUIModule.checkNewContactForm()) {
            // Insert new project in db
            ContactServicesInterface.update(
                id,
                $('#contact_gender_search').dropdown('get value'),
                $('#contact_firstname').val(),
                $('#contact_lastname').val(),
                $('#contact_firm_search').dropdown('get value'),
                $('#contact_mail').val(),
                $('#contact_tel').val(),
                $('#contact_cell').val(),
                $('#contact_type_search').dropdown('get value'),
                $('#contact_role').val(),
                $('#contact_notes').val(),
                function (data) {
                    DoleticUIModule.editContactHandler(data);
                });
        }
    };

    this.updateFirm = function (id) {
        // ADD OTHER TESTS
        if (DoleticUIModule.checkNewFirmForm()) {
            // Insert new project in db
            FirmServicesInterface.update(
                id,
                $('#firm_siret').val(),
                $('#firm_name').val(),
                $('#firm_address').val(),
                $('#firm_postalcode').val(),
                $('#firm_city').val(),
                $('#firm_country_search').dropdown('get value'),
                $('#firm_type_search').dropdown('get value'),
                function (data) {
                    DoleticUIModule.editFirmHandler(data);
                });
        }
    };

    /**
     *    Clear all the field from the Firm Form
     */
    this.clearNewFirmForm = function () {
        $('#company_form .message').remove();
        $('#company_form')[0].reset();
        $('#company_form .dropdown').dropdown('restore defaults');
        $('#company_form h4').html("Ajout d'une société");
        $('#addfirm_btn').html("Ajouter").attr("onClick", "DoleticUIModule.insertNewFirm(); return false;");
    };

    /**
     *    Fill the contact type selector
     */
    this.fillContactTypeSelector = function () {
        ContactServicesInterface.getAllContactTypes(function (data) {
            // if no service error
            if (data.code == 0 && data.object != "[]") {
                var content = '';
                for (var i = 0; i < data.object.length; i++) {
                    content += '<div class="item" data-value="' + data.object[i] + '">' + data.object[i] + '</div>';
                }
                $('#contact_type_search .menu').html(content);
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    /**
     *    Fill the firm type selector
     */
    this.fillFirmTypeSelector = function () {
        FirmServicesInterface.getAllFirmTypes(function (data) {
            // if no service error
            if (data.code == 0 && data.object != "[]") {
                var content = '';
                for (var i = 0; i < data.object.length; i++) {
                    content += '<div class="item" data-value="' + data.object[i] + '">' + data.object[i] + '</div>';
                }
                $('#firm_type_search .menu').html(content).dropdown();
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    /**
     *    Add the countries selector
     */
    this.fillCountrySelector = function () {
        UserDataServicesInterface.getAllCountries(function (data) {
            // if no service error
            if (data.code == 0 && data.object != "[]") {
                var content = '';
                for (var i = 0; i < data.object.length; i++) {
                    content += '<div class="item" data-value="' + data.object[i] + '">' + data.object[i] + '</div>';
                }
                $('#firm_country_search .menu').html(content);
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    /**
     *    Add the gender selector
     */
    this.fillGenderSelector = function () {
        UserDataServicesInterface.getAllGenders(function (data) {
            // if no service error
            if (data.code == 0) {
                // create content var to build html
                var content = '';
                // iterate over values to build options
                for (var i = 0; i < data.object.length; i++) {
                    content += '<div class="item" data-value="' + data.object[i] + '">' + data.object[i] + '</div>';
                }
                // insert html content
                $('#contact_gender_search .menu').html(content);
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    /**
     *    Add the gender selector
     */
    this.fillFirmList = function (fillContact) {
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
			    				<td> \
			    					<div class=\"ui icon buttons\"> \
				    					<button class=\"ui blue icon button\" data-tooltip=\"Modifier\" onClick=\"DoleticUIModule.editFirm(" + data.object[i].id + "); return false;\"> \
				  							<i class=\"write icon\"></i> \
										</button>" +
                            "</div> \
                        </td> \
                        </tr>";
                    }
                    selector_content += '<div class="item" data-value="' + data.object[i].id + '">' + data.object[i].name + '</div>';
                    counter++;
                }
                content += "</tbody></table>";
                $('#company_table_container').append(content);
                $('#contact_firm_search .menu').html(selector_content);
                DoleticMasterInterface.makeDataTables('company_table', filters);
                if (fillContact) {
                    DoleticUIModule.fillContactList();
                }
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    this.fillContactList = function () {
        var showOld = $('#toggle_old_contacts').prop('checked');
        ContactServicesInterface.getAll(function (data) {
            $('#contact_table_container').html('');
            // if no service error
            if (data.code == 0 && data.object != "[]") {
                var content = "<table class=\"ui very basic celled table\" id=\"contact_table\"> \
                <thead> \
                    <tr>\
                        <th>Nom/Email</th> \
                        <th>Type</th> \
                        <th>Téléphone</th> \
                        <th>Mobile</th> \
                        <th>Société</th> \
                        <th>Role</th> \
                        <th>Actions</th> \
                    </tr>\
                </thead>\
                <tfoot> \
                    <tr>\
                        <th>Nom/Email</th> \
                        <th>Type</th> \
                        <th>Téléphone</th> \
                        <th>Mobile</th> \
                        <th>Société</th> \
                        <th>Role</th> \
                        <th></th> \
                    </tr>\
                </tfoot>\
                <tbody id=\"company_body\">";

                var filters = [
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.select_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.select_filter,
                    DoleticMasterInterface.input_filter,
                    DoleticMasterInterface.reset_filter
                ];
                var counter = 0;
                for (var i = 0; i < data.object.length && (showOld || counter < 100); i++) {
                    content += "<tr><td> \
			        				<h4 class=\"ui header\"> \
			          				<div class=\"content\">" + data.object[i].firstname + " " + data.object[i].lastname +
                        "<div class=\"sub header\"><a href=\"mailto:" + data.object[i].email + "\" target=\"_blank\">" + data.object[i].email + "</a></div> \
			        				</div> \
			      					</h4></td> \
			      					<td>" + data.object[i].category + "</td> \
			      					<td>" + data.object[i].phone + "</td> \
			      					<td>" + data.object[i].cellphone + "</td> \
			      					<td>" + (typeof window.firm_list[data.object[i].firm_id] !== 'undefined' ? window.firm_list[data.object[i].firm_id].name : '<i>Aucune</i>') + "</td> \
			    				    <td>" + data.object[i].role + "</td> \
			    				    <td> \
			    					<div class=\"ui icon buttons\"> \
				    					<button class=\"ui blue icon button\" data-tooltip=\"Modifier\" onClick=\"DoleticUIModule.editContact(" + data.object[i].id + "); return false;\"> \
				  							<i class=\"write icon\"></i> \
										</button>" +
                        "</div> \
                    </td> \
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

    this.showNewFirmForm = function () {
        DoleticUIModule.clearNewFirmForm();
        $('#company_form_modal').modal('show');
    };

    this.cancelNewFirmForm = function () {
        DoleticUIModule.clearNewFirmForm();
        $('#company_form_modal').modal('hide');
    };

    this.showNewContactForm = function () {
        DoleticUIModule.clearNewContactForm();
        $('#contact_form_modal').modal('show');
    };

    this.cancelNewContactForm = function () {
        DoleticUIModule.clearNewContactForm();
        $('#contact_form_modal').modal('hide');
    };

    this.addContactHandler = function (data) {
        // if no service error
        if (data.code == 0) {
            // clear contact form
            DoleticUIModule.cancelNewContactForm();
            DoleticMasterInterface.showSuccess("Ajout réussi !", "Le contact a été ajouté avec succès !");
            DoleticUIModule.fillContactList();
        } else {
            // use default service service error handler
            DoleticServicesInterface.handleServiceError(data);
        }
    };

    this.editContactHandler = function (data) {
        // if no service error
        if (data.code == 0) {
            // clear contact form
            DoleticUIModule.cancelNewContactForm();
            DoleticMasterInterface.showSuccess("Édition réussie !", "Le contact a été modifié avec succès !");
            DoleticUIModule.fillContactList();
        } else {
            // use default service service error handler
            DoleticServicesInterface.handleServiceError(data);
        }
    };

    this.addFirmHandler = function (data) {
        // if no service error
        if (data.code == 0) {
            // clear firm form
            DoleticUIModule.cancelNewFirmForm();
            DoleticMasterInterface.showSuccess("Ajout réussi !", "La société a été ajoutée avec succès !");
            DoleticUIModule.fillFirmList(false);
        } else {
            // use default service service error handler
            DoleticServicesInterface.handleServiceError(data);
        }
    };

    this.editFirmHandler = function (data) {
        // if no service error
        if (data.code == 0) {
            // clear firm form
            DoleticUIModule.cancelNewFirmForm();
            DoleticMasterInterface.showSuccess("Édition réussi !", "La société a été modifiée avec succès !");
            DoleticUIModule.fillFirmList(false);
        } else {
            // use default service service error handler
            DoleticServicesInterface.handleServiceError(data);
        }
    };

    this.checkNewContactForm = function () {
        $('#contact_form .message').remove();
        $('#contact_form .field').removeClass('error');
        var valid = true;
        if (!DoleticMasterInterface.checkName($('#contact_firstname').val())) {
            valid = false;
            $('#contact_firstname_field').addClass('error');
        }
        if (!DoleticMasterInterface.checkName($('#contact_lastname').val())) {
            valid = false;
            $('#contact_lastname_field').addClass('error');
        }
        if ($('#contact_gender_search').dropdown('get value') == "") {
            $('#contact_gender_field').addClass("error");
            valid = false;
        }
        if ($('#contact_type_search').dropdown('get value') == "") {
            $('#contact_type_field').addClass("error");
            valid = false;
        }
        if ($('#contact_firm_search').dropdown('get value') == "") {
            $('#contact_firm_field').addClass("error");
            valid = false;
        }
        if ($('#contact_tel').val() != '' && !DoleticMasterInterface.checkTel($('#contact_tel').val())) {
            valid = false;
            $('#contact_tel_field').addClass('error');
        }
        if ($('#contact_cell').val() != '' && !DoleticMasterInterface.checkTel($('#contact_cell').val())) {
            valid = false;
            $('#contact_cell_field').addClass('error');
        }
        if ($('#contact_mail').val() != '' && !DoleticMasterInterface.checkMail($('#contact_mail').val())) {
            valid = false;
            $('#contact_email_field').addClass('error');
        }
        if (!valid) {
            $('#contact_form').transition('shake');
            DoleticMasterInterface.showFormError("Erreur !", "Merci de corriger les champs affichés en rouge.", '#contact_form');
        }
        return valid;
    };

    this.checkNewFirmForm = function () {
        $('#company_form .message').remove();
        $('#company_form .field').removeClass('error');
        var valid = true;
        if (!DoleticMasterInterface.checkName($('#firm_name').val())) {
            valid = false;
            $('#firm_name_field').addClass('error');
        }
        if ($('#firm_address').val() == "") {
            valid = false;
            $('#firm_address_field').addClass('error');
        }
        if ($('#firm_city').val() == "") {
            valid = false;
            $('#firm_city_field').addClass('error');
        }
        if ($('#firm_country_search').dropdown('get value') == "") {
            $('#firm_country_field').addClass("error");
            valid = false;
        }
        if ($('#firm_type_search').dropdown('get value') == "") {
            $('#firm_type_field').addClass("error");
            valid = false;
        }
        if (!DoleticMasterInterface.checkPostalCode($('#firm_postalcode').val())) {
            valid = false;
            $('#firm_postalcode_field').addClass('error');
        }
        if (!valid) {
            $('#company_form').transition('shake');
            DoleticMasterInterface.showFormError("Erreur !", "Merci de corriger les champs affichés en rouge.", '#company_form');
        }
        return valid;
    };

};
