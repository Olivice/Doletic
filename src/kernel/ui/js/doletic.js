// ------------------------ DOLETIC MASTER INTERFACE CLASS  ----------------------------------

/**
 *  DoleticMasterInterface
 */
var DoleticMasterInterface = new function () {

    // Constantes --------------------------------
    this.module_container_id = 'module_container';
    this.master_container_id = 'master_container';
    this.no_filter = 0;
    this.input_filter = 1;
    this.select_filter = 2;
    this.reset_filter = 3;
    // -------------------------------------------

    // Ui settings
    this.settings = {
        night_mode: false
    };

    this.init = function () {
        this.render(document.getElementById('body'));
    };
    /**
     *  Render function, this function builds the content of the web page,
     *  using the given module
     */
    this.render = function (htmlNode) {
        // DEBUG message -----------------------------------------
        console.debug("DoleticMasterInterface.render : Starting rendering process.");
        // -----------------------------------------------------------
        // create doletic page standard HTML content
        var html = this.build();
        // set htmlElment innerHTML content
        htmlNode.innerHTML = html;
        // call get ui login to retrieve appropriate module content
        DoleticServicesInterface.getUILogin();
        // DEBUG message -----------------------------------------
        console.debug("DoleticMasterInterface.render : Rendering process finished.");
        // -----------------------------------------------------------
    };
    /**
     *  Build Doletic common ui
     */
    this.build = function () {
        var html = '<a id="doletic_download" href="" download="" hidden></a>' +
            '<div id="left_menu" class="ui fixed menu">' +
            '<a id="menu_doletic" class="header item" onClick="DoleticServicesInterface.getUIHome();"><img class="ui mini spaced image" style="height:15px; width:15px;" src="/resources/doletic_logo.png"/>Doletic v2.1</a>' +
            '<a id="menu_about_doletic" class="right floated item" onClick="DoleticMasterInterface.showAboutDoletic();"><i class="info circle icon"></i></a>' +
            '</div>' + "<div class=\"pusher\"> \
                  <div class=\"ui container\"> \
                    <div id=\"" + this.master_container_id + "\" class=\"ui one column centered grid container\"> \
                    <!-- kernel message goes here --> \
                    </div> \
                  </div> \
                  <div id=\"" + this.module_container_id + "\"> \
                    <!-- module custom content goes here --> \
                  </div> \
                  <div id=\"about_doletic_modal\" class=\"ui basic modal\"> \
                    <i class=\"close icon\"></i> \
                    <div class=\"header\">Doletic v2.0</div> \
                    <div class=\"image content\"> \
                      <div class=\"image\"><i class=\"line chart icon\"></i></div> \
                      <div class=\"description\">  \
                        <p> \
                        Doletic est un ERP open-source destiné au Junior-Entreprises.<br><br> \
                        Son développement est à l'initiative du pôle DSI de la Junior-Entreprise de l'INSA de Lyon, \
                        ETIC INSA Technologies. Il est actuellement en cours de développement. \
                        Si vous souhaitez contribuer à ce merveilleux projet n'hésitez pas à nous contacter ! \
                        </p>  \
                        <p> \
                        Développeurs : \
                        <ul class=\"ui list\"> \
                          <li>Paul Dautry (ETIC INSA Technologies)</li> \
                          <li>Nicolas Sorin (ETIC INSA Technologies)</li> \
                        </ul> \
                        </p>  \
                      </div>  \
                    </div>  \
                    <div class=\"actions\"> \
                      <div class=\"one fluid ui inverted buttons\"> \
                        <div class=\"ui green basic inverted button\" onClick=\"DoleticMasterInterface.hideAboutDoletic();\"><i class=\"checkmark icon\"></i>Cool !</div>  \
                      </div> \
                    </div> \
                  </div> \
                </div> \
                <div id=\"confirm_modal\" class=\"ui basic modal\"> \
                  <div id=\"confirm_modal_header\" class=\"header\"><!-- Confirm modal header goes here --> \</div> \
                  <div class=\"image content\"> \
                    <div id=\"confirm_modal_icon\" class=\"image\"> \
                      <!-- Confirm modal icon goes here --> \
                    </div> \
                    <div id=\"confirm_modal_description\" class=\"description\"> \
                      <!-- Confirm modal description goes here --> \
                    </div> \
                  </div> \
                  <div class=\"actions\"> \
                    <div class=\"two fluid ui inverted buttons\"> \
                      <div id=\"confirm_modal_no\" class=\"ui red basic inverted button\"><i class=\"remove icon\"></i>Non</div> \
                      <div id=\"confirm_modal_yes\" class=\"ui green basic inverted button\"><i class=\"checkmark icon\"></i>Oui</div> \
                    </div> \
                  </div> \
                </div> \
                <div id=\"settings_modal\" class=\"ui modal\"> \
                  <div class=\"header\">Préférences</div> \
                  <div class=\"content\"> \
                  " + DoleticUISettings.configurationForm + " \
                  </div> \
                  <div class=\"actions\"> \
                    <div class=\"ui button\" onClick=\"DoleticUISettings.defaultSettings();\">Default</div> \
                    <div class=\"ui green button\" onClick=\"DoleticMasterInterface.hideSettingsModal();\">Terminé !</div> \
                  </div> \
                </div>";
        return html;
    };

    this.loadModule = function (data) {
        // clear message zone
        $('.dol_message').remove();
        // remove old scripts
        $('.doletic_subscript').remove();
        // add new ones
        $('head').append(data.module_scripts);
        // load new module
        if (DoleticUIModule != null) {
            if (DoleticUIModule.super.meta.name != 'Login_UIModule' &&
                DoleticUIModule.super.meta.name != 'Logout_UIModule' &&
                DoleticUIModule.super.meta.name != '404_UIModule' &&
                DoleticUIModule.super.meta.name != 'Lost_UIModule') {
                // add buttons
                DoleticMasterInterface.addGeneralButtons();
                // fill module submenu
                DoleticMasterInterface.clearModuleSubmenu();
                DoleticMasterInterface.fillModuleSubmenu();

            }
            // DEBUG message -----------------------------------------
            console.debug("DoleticMasterInterface.render : Calling render for DoleticModuleInterface::" + DoleticUIModule.super.meta.name);
            // -----------------------------------------------------------
            DoleticUIModule.render(document.getElementById(DoleticMasterInterface.module_container_id));
            // apply settings on module
            DoleticUISettings.applySettings();
        } else {

            // DEBUG message -----------------------------------------
            console.debug("DoleticMasterInterface.render : Calling render for DefaultDoleticUIModule ! ERROR !");
            // -----------------------------------------------------------
            DefaultDoleticUIModule.render(document.getElementById(DoleticMasterInterface.module_container_id));
        }
    };

    this.nightMode = function (on) {
        if (on) {
            $('#left_menu').attr('class', 'ui menu fixed inverted');
            $('#body').attr('style', 'background-color:#505050;');
        } else {
            $('#left_menu').attr('class', 'ui menu fixed');
            $('#body').attr('style', 'background-color:#FFFFFF;');
        }
    };

// ----------------------- DOLETIC INTERFACE COMMON FUNCTIONS ----------------------------------

    /**
     *  Adds general buttons such as logout and preferences
     */
    this.addGeneralButtons = function () {
        this.removeGeneralButtons();
        // add new buttons
        $('#menu_about_doletic').after('' +
            '<a id="menu_preferences_doletic" class="item" onclick="DoleticMasterInterface.showSettingsModal();"><i class="settings icon"></i></a>' +
            '<a id="menu_logout" class="item" onclick="DoleticServicesInterface.logout();"><i class="power icon"></i></a>');
    };
    /**
     *  Removes general buttons such as logout and preferences
     */
    this.removeGeneralButtons = function () {
        // remove buttons
        $('#menu_logout').remove();
        $('#menu_preferences_doletic').remove();
    };
    /**
     *  Shows about Doletic modal
     */
    this.showAboutDoletic = function () {
        $('#about_doletic_modal').modal('show');
    };
    /**
     *  Hides about Doletic modal
     */
    this.hideAboutDoletic = function () {
        $('#about_doletic_modal').modal('hide');
    };
    /**
     *  Shows Doletic confirmation standard modal
     */
    this.showConfirmModal = function (header, icon, question, yesHandler, noHandler) {
        $('#confirm_modal_no').off('click');
        $('#confirm_modal_yes').off('click');
        $('#confirm_modal_header').html(header);
        $('#confirm_modal_icon').html(icon);
        $('#confirm_modal_description').html(question);
        $('#confirm_modal_no').click(noHandler);
        $('#confirm_modal_yes').click(yesHandler);
        $('#confirm_modal').modal('show');
    };
    /**
     *  Shows Doletic confirmation standard modal
     */
    this.hideConfirmModal = function () {
        $('#confirm_modal').modal('hide');
        setTimeout(function () {
            $('#confirm_modal_header').html('');
            $('#confirm_modal_icon').html('');
            $('#confirm_modal_description').html('');
            $('#confirm_modal_no').click(function () {
            });
            $('#confirm_modal_yes').click(function () {
            });
        }, 200);
    };
    /**
     *  Shows about Doletic modal
     */
    this.showSettingsModal = function () {
        $('#settings_modal').modal('show');
    };
    /**
     *  Hides about Doletic modal
     */
    this.hideSettingsModal = function () {
        $('#settings_modal').modal('hide');
    };
    /**
     *  Shows a message
     *  @param type : message type
     *  @param header : message title
     *  @param content : message content
     */
    this.showMessage = function (type, header, content) {
        $('#' + this.master_container_id).html(
            "<div class=\"column\"> \
              <div class=\"ui " + type + " message dol_message\"> \
        <i class=\"close icon\" onClick=\"this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);\" ></i> \
        <div class=\"header\">" + header + "</div>" +
            content +
            "</div> \
          </div>");
        setTimeout(function () {
            $('#master_container').transition('fade');
        }, 2000);
    };
    this.showInfo = function (title, msg) {
        this.showMessage('info', title, msg);
    };
    this.showSuccess = function (title, msg) {
        this.showMessage('success', title, msg);
    };
    this.showWarn = function (title, msg) {
        this.showMessage('warning', title, msg);
    };
    this.showError = function (title, msg) {
        this.showMessage('negative', title, msg);
    };
    this.showFormError = function (title, msg, selector) {
        $(selector).prepend('<div class="ui negative message dol_message">' +
            '<i class="close icon" onClick="$(this).parent().remove();"></i>' +
            '<div class="header">' + title + '</div>' + msg +
            '</div>');
    };
    /**
     *  Fills submodules submenu
     */
    this.fillModuleSubmenu = function () {
        DoleticServicesInterface.availableModuleLinks(function (data) {
            // if no service error
            if (data.code == 0) {
                // create content var to build html
                var content = "";
                var json = JSON.parse(data.object);
                // iterate over values to build options
                for (var i = 0; i < json.length && json[i].length == 2; i++) {
                    if (json[i][0] == "Kernel" || json[i][1].length == 0) {
                        continue;
                    }
                    if (json[i][1].length == 0) {
                        // Nothing to do
                    } else if (json[i][1].length == 1) {
                        content += "    <a class=\"item module_submenu\" id=\"submenu_"
                            + json[i][1][0][1].split(':')[0] + "\" onClick=\"DoleticServicesInterface.getUI('" +
                            json[i][1][0][1] + "');\">" +
                            json[i][0] + "</a>\n";
                    } else {
                        content += "<div class='ui simple dropdown item module_submenu'> \
                        <div class=\"header\">" + json[i][0] + "</div><i class='dropdown icon'></i> \
                          <div class=\"menu\">\n";
                        for (var j = 0; j < json[i][1].length && json[i][1][j].length == 2; j++) {
                            content += "    <a class=\"item\" onClick=\"DoleticServicesInterface.getUI('" +
                                json[i][1][j][1] + "');\">" +
                                json[i][1][j][0] + "</a>\n";
                        }
                    }
                    content += "    </div> \
                        </div> \
                      </div>";
                }
                // insert html content
                $('#menu_doletic').after(content);
            } else {
                // use default service service error handler
                DoleticServicesInterface.handleServiceError(data);
            }
        });
    };

    this.clearModuleSubmenu = function () {
        $('.module_submenu').remove();
    };

    // Check functions
    /**
     *  Checks date
     */
    this.checkDate = function (str) {
        return str.trim().match(/^\d{4}\-\d{2}\-\d{2}$/g) != null;
    };
    /**
     *  Checks phone number
     */
    this.checkTel = function (str) {
        return str.trim().match(/^\d{10}$/g) != null;
    };
    /**
     *  Checks number
     */
    this.checkInt = function (str) {
        return str.trim().match(/^\d+$/g) != null;
    };
    /**
     *  Checks postal code
     */
    this.checkPostalCode = function (str) {
        return str.trim().match(/^\d{5}$/g) != null;
    };
    /**
     *  Checks email address
     */
    this.checkMail = function (str) {
        return str.trim().match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/g) != null;
    };
    /**
     *  Checks firstname or lastname
     */
    this.checkName = function (str) {
        return str.match(/^[^0-9\_\@\#\"\'\/\\\*\+]+$/) != null;
    };

    // Filters and sorting function
    /**
     *  Checks if an objects matches given keywords
     */
    this.matchKeywords = function (obj, keywords) {
        var objStr = JSON.stringify(obj);
        var keys = keywords.split(" ");
        for (var i = 0; i < keys.length; i++) {
            if (objStr.indexOf(keys[i]) > -1) {
                return true;
            }
        }
        return false;
    };
    /**
     *  Sorts an array of objects using defined attribute as reference.
     *  (Using bubble sort algorithm)
     */
    this.sortObjectsArray = function (objArray, attribute, asc) {
        var length = objArray.length;
        if (asc) {
            for (var i = length - 1; i >= 0; i--) {
                for (var j = 1; j <= i; j++) {
                    if (objArray[j - 1][attribute] > objArray[j][attribute]) {
                        var temp = objArray[j - 1];
                        objArray[j - 1] = objArray[j];
                        objArray[j] = temp;
                    }
                }
            }
        } else {
            for (var i = length - 1; i >= 0; i--) {
                for (var j = 1; j <= i; j++) {
                    if (objArray[j - 1][attribute] < objArray[j][attribute]) {
                        var temp = objArray[j - 1];
                        objArray[j - 1] = objArray[j];
                        objArray[j] = temp;
                    }
                }
            }
        }
        return objArray;
    };

    this.formatElementId = function (str) {
        var id = str.toLowerCase().trim().replace(/\s+/g, '_');
        window.original_id = str;
        return id;
    };

    this.makeDataTables = function (id, filters) {
        $.getJSON("./ui/dataTables/translate.json", function (data) {
            var table = $('#' + id).DataTable({
                retrieve: true,
                language: data,
                aaSorting: [],
                initComplete: function () {
                    if (filters != []) {
                        var i = 0;
                        this.api().columns().every(function () {
                            var column = this;
                            var footer = $(column.footer());
                            switch (filters[i]) {
                                case DoleticMasterInterface.input_filter:
                                    var title = footer.text();
                                    footer.html('<div class="ui fluid input"><input class="filter-input" type="text" placeholder="' + title + '" id="' + id + '_' + $(column.header()).html() + '"/></div>');
                                    $('input', footer).on('keyup change', function () {
                                        if (column.search() !== this.value) {
                                            column.search(this.value).draw();
                                        }
                                    });
                                    break;
                                case DoleticMasterInterface.select_filter:
                                    var select = $('<select class="ui fluid search dropdown" id="' + id + '_' + $(column.header()).html() + '"><option value=""></option></select>')
                                        .appendTo($(column.footer()).empty())
                                        .on('change', function () {
                                            var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                            column.search(val ? '^' + val + '$' : '', true, false).draw();
                                        });

                                    column.data().unique().sort().each(function (d, j) {
                                        d = d.replace(/(<([^>]+)>)/ig, "");
                                        select.append('<option value="' + d + '">' + d + '</option>').dropdown();
                                    });
                                    break;
                                case DoleticMasterInterface.reset_filter:
                                    var button = $('<button class="ui icon button"><i class="refresh icon"></i>Réinit.</button>')
                                        .appendTo($(column.footer()).empty())
                                        .click(function () {
                                            var tfoot = $(this).parent().parent().parent();
                                            tfoot.find(".filter-input").val("").change();
                                            tfoot.find(".dropdown").dropdown("restore defaults");
                                        });
                                    break;
                                default:
                                    break;
                            }
                            i++;
                        });
                    }
                }
            });
        });
    };

    this.drawGraphs = function (data, div_id) {
        var container = $('#' + div_id);
        for (var i = 0; i < data.length; i++) {
            var html = '<div class="ui horizontal divider">' + data[i].description + '</div>';
            html += '<div class="plotly-graph" id="' + data[i].graph_name + '"></div>';
            container.append(html);
            var dataSet = [];
            var options = {};
            switch (data[i].graph_type) {
                case 'pie':
                    dataSet = [{
                        values: data[i].results[1],
                        labels: data[i].results[0],
                        type: 'pie'
                    }];
                    options = {margin: {t: 0}};
                    break;
                case 'bar':
                    for (var j = 1; j < data[i].results.length; j++) {
                        dataSet.push({
                            y: data[i].results[j],
                            x: data[i].results[0],
                            name: data[i].legend[j - 1],
                            type: 'bar'
                        });
                    }
                    options = {
                        margin: {t: 0},
                        barmode: 'stack'
                    };
                    break;

                case 'scatter':
                    for (var j = 1; j < data[i].results.length; j++) {
                        dataSet.push({
                            y: data[i].results[j],
                            x: data[i].results[0],
                            name: data[i].legend[j - 1],
                            type: 'scatter'
                        });
                    }
                    options = {margin: {t: 0}};
                    break;
            }
            Plotly.plot(data[i].graph_name, dataSet, options);
        }
    };

    this.fillValueIndicators = function (data, tbody_id) {
        var container = $('#' + tbody_id);
        var html = "";
        for (var i = 0; i < data.length; i++) {
            var result = data[i].results[0][0];
            var tr = "<tr class=";
            if (result >= data[i].expected_result && data[i].expected_greater || result <= data[i].expected_result && !data[i].expected_greater) {
                tr += '"positive">';
            } else {
                tr += '"negative">';
            }
            html += tr + "<td>" + data[i].description + "</td><td>" + Number(result) + data[i].unit + "</td><td>" + Number(data[i].expected_result) + data[i].unit + "</td></tr>"
        }
        container.html(html);
    };

    this.fillTableIndicators = function (data, div_id) {
        var container = $('#' + div_id);
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].results[0] != null) {
                    var html = '<div class="ui horizontal divider">' + data[i].description + '</div>';
                    html += '<div class="row"><table class="ui very basic single line striped table"><thead><tr><th>';
                    html += data[i].label_column + '</th><th>' + data[i].result_column + '</th></tr></thead><tbody id="indictab_' + i + '"></tbody></table></div>';
                    container.append(html);
                    var rows = "";
                    for (var j = 0; j < data[i].results[0].length; j++) {
                        rows += '<tr><td><a href="#" class="indicval_label">' + data[i].results[0][j] + '</a></td><td>' + data[i].results[1][j] + '</td></tr>';
                    }
                }
                $('#indictab_' + i).html(rows);
            }
        }
    };

    this.toggleSidebar = function (id) {
        $(".ui.sidebar.visible").sidebar("toggle");
        $("#" + id).sidebar("toggle");
    };

    this.makeDefaultCalendar = function (id) {
        $("#" + id).calendar({
            type: 'date',
            formatter: {
                date: function (date) {
                    if (!date) return '';
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();
                    return year + '-'
                        + (Number(month) < 10 ? '0' : '') + month + '-'
                        + (Number(day) < 10 ? '0' : '') + day;
                }
            }
        });
    };

};

// ------------------------ DOLETIC DOCUMENT READY FUNCTION ------------------------------------

/**
 *  DOCUMENT READY : entry point
 */
$(document).ready(function () {
    // render page
    DoleticMasterInterface.init();
});