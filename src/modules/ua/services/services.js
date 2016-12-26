// ----------------------- DBService INTERFACE SERVICES CLASS ----------------------------------

var UaDBServicesInterface = new function () {

    this.meta = {
        // --- (object)
        OBJECT: 'modua',
        // --- (actions)
        ACTION: {
            GET_FULL_PROJECT_BY_NUMBER: "fulprbynum",
            INSERT_TASK_OWN: "instaskown",
            INSERT_DELIVERY_OWN: "insdelown",
            UPDATE_TASK_OWN: "updtaskown",
            UPDATE_DELIVERY_OWN: "upddelown",
            DELETE_TASK_OWN: "deltaskown",
            DELETE_DELIVERY_OWN: "deldelown",
            END_TASK_OWN: "endtaskown",
            UNEND_TASK_OWN: "unendtaskown",
            GET_PROJECT_DOCUMENTS: "projdoc",
            SWITCH_TASK_NUMBER_OWN: "switchnumown"
        }
    };

    this.getFullProjectByNumber = function (number, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_FULL_PROJECT_BY_NUMBER,
            {
                number: number
            },
            successHandler);
    };

    this.getProjectDocuments = function (projectNumber, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_PROJECT_DOCUMENTS,
            {
                projectNumber: projectNumber
            },
            successHandler);
    };

    this.insertTaskOwn = function (projectNumber, name, description, jehAmount, jehCost, startDate, endDate, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.INSERT_TASK_OWN,
            {
                projectNumber: projectNumber,
                name: name,
                description: description,
                jehAmount: jehAmount,
                jehCost: jehCost,
                startDate: startDate,
                endDate: endDate
            },
            successHandler);
    };

    this.insertDeliveryOwn = function (taskId, number, content, billed, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.INSERT_DELIVERY_OWN,
            {
                taskId: taskId,
                number: number,
                content: content,
                billed: billed
            },
            successHandler);
    };

    this.updateTaskOwn = function (id, number, name, description, jehAmount, jehCost, startDate, endDate, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UPDATE_TASK_OWN,
            {
                id: id,
                number: number,
                name: name,
                description: description,
                jehAmount: jehAmount,
                jehCost: jehCost,
                startDate: startDate,
                endDate: endDate
            },
            successHandler);
    };

    this.updateDeliveryOwn = function (id, number, content, billed, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UPDATE_DELIVERY_OWN,
            {
                id: id,
                number: number,
                content: content,
                billed: billed
            },
            successHandler);
    };

    this.deleteTaskOwn = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DELETE_TASK_OWN,
            {
                id: id
            },
            successHandler);
    };

    this.deleteDeliveryOwn = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DELETE_DELIVERY_OWN,
            {
                id: id
            },
            successHandler);
    };

    this.endTaskOwn = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.END_TASK_OWN,
            {
                id: id
            },
            successHandler);
    };

    this.unendTaskOwn = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UNEND_TASK_OWN,
            {
                id: id
            },
            successHandler);
    };

    this.switchTaskNumbersOwn = function (id, idBis, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.SWITCH_TASK_NUMBER_OWN,
            {
                id: id,
                idBis: idBis
            },
            successHandler);
    };

};


// ----------------------- PROJECT INTERFACE SERVICES CLASS ----------------------------------

var ProjectServicesInterface = new function () {

    this.meta = {
        // --- (object)
        OBJECT: 'project',
        // --- (actions)
        ACTION: {
            GET_ALL: "getall",
            GET_ALL_FULL: "getallful",
            GET_DISABLED: "getdisabled",
            GET_BY_NUMBER: "getbynum",
            GET_FULL_BY_NUMBER: "fullbynum",
            GET_BY_STATUS: "getbystatus",
            GET_BY_ORIGIN: "getbyorigin",
            GET_BY_FIELD: "getbyfield",
            GET_BY_CHADAFF: "getbycha",
            GET_BY_INT: "getbyint",
            GET_BY_AUDITOR: "getbyaud",
            GET_BY_FIRM: "getbyfirm",
            GET_BY_CONTACT: "getbycont",
            GET_CRITICAL: "getcritical",
            GET_SECRET: "getsecret",
            GET_ALL_STATUS: "allstatus",
            GET_ALL_ORIGIN: "allorigin",
            GET_ALL_AMEND_TYPE: "allamendtype",
            GET_ALL_AMENDMENT: "allamendment",
            GET_AMENDMENT_BY_ID: "amendbyid",
            GET_ALL_AMENDMENT_BY_PROJECT: "amendbypro",
            GET_ALL_CHADAFF_BY_PROJECT: "allchabypro",
            GET_ALL_INT_BY_PROJECT: "allintbypro",
            GET_ALL_CONTACT_BY_PROJECT: "allcontbypro",
            INSERT: "insert",
            INSERT_OWN: "insertown",
            UPDATE: "update",
            UPDATE_OWN: "updateown",
            UNSIGN: "unsign",
            SIGN: "sign",
            BAD_END: "break",
            ABORT: "abort",
            END: "end",
            UNEND: "unend",
            ASSIGN_CHADAFF: "assigncha",
            REMOVE_CHADAFF: "removecha",
            ASSIGN_AUDITOR: "assignaudit",
            ASSIGN_CONTACT: "assigncontact",
            ASSIGN_CONTACT_OWN: "asscontown",
            REMOVE_CONTACT: "removecontact",
            REMOVE_CONTACT_OWN: "remcontown",
            ASSIGN_INT: "assignint",
            ASSIGN_INT_OWN: "assintown",
            REMOVE_INT: "removeint",
            REMOVE_INT_OWN: "remintown",
            DELETE: "delete",
            DISABLE: "disable",
            ENABLE: "enable",
            INSERT_AMENDMENT: "insam",
            INSERT_AMENDMENT_OWN: "insamown",
            UPDATE_AMENDMENT: "updam",
            UPDATE_AMENDMENT_OWN: "updamown",
            DELETE_AMENDMENT: "delam",
            DELETE_AMENDMENT_OWN: "delamown",
            ARCHIVE: "archive",
            UNARCHIVE: "unarchive"
        }
    };

    this.getAll = function (successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL,
            {},
            successHandler);
    };

    this.getAllFull = function (successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL_FULL,
            {},
            successHandler);
    };

    this.getByNumber = function (number, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_NUMBER,
            {
                number: number
            },
            successHandler);
    };

    this.getFullByNumber = function (number, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_FULL_BY_NUMBER,
            {
                number: number
            },
            successHandler);
    };

    this.getByStatus = function (status, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_STATUS,
            {
                status: status
            },
            successHandler);
    };

    this.getByOrigin = function (origin, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_ORIGIN,
            {
                origin: origin
            },
            successHandler);
    };

    this.getByField = function (field, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_FIELD,
            {
                field: field
            },
            successHandler);
    };

    this.getByChadaff = function (chadaffId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_CHADAFF,
            {
                chadaffId: chadaffId
            },
            successHandler);
    };

    this.getByInt = function (intId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_INT,
            {
                intId: intId
            },
            successHandler);
    };

    this.getByAuditor = function (auditorId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_AUDITOR,
            {
                auditorId: auditorId
            },
            successHandler);
    };

    this.getByContact = function (contactId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_CONTACT,
            {
                contactId: contactId
            },
            successHandler);
    };

    this.getByFirm = function (firmId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_FIRM,
            {
                firmId: firmId
            },
            successHandler);
    };

    this.getByCritical = function (critical, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_CRITICAL,
            {
                critical: critical
            },
            successHandler);
    };

    this.getBySecrecy = function (secret, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_SECRET,
            {
                secret: secret
            },
            successHandler);
    };

    this.getAllStatuses = function (successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL_STATUS,
            {},
            successHandler);
    };

    this.getAllOrigins = function (successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL_ORIGIN,
            {},
            successHandler);
    };

    this.getAllAmendmentTypes = function (successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL_AMEND_TYPE,
            {},
            successHandler);
    };

    this.getAllAmendments = function (successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL_AMENDMENT,
            {},
            successHandler);
    };

    this.getAmendmentById = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_AMENDMENT_BY_ID,
            {
                id: id
            },
            successHandler);
    };

    this.getAllAmendmentsByProject = function (projectNumber, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL_AMENDMENT_BY_PROJECT,
            {
                projectNumber: projectNumber
            },
            successHandler);
    };

    this.getAllChadaffsByProject = function (projectNumber, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL_CHADAFF_BY_PROJECT,
            {
                projectNumber: projectNumber
            },
            successHandler);
    };

    this.getAllIntsByProject = function (projectNumber, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL_INT_BY_PROJECT,
            {
                projectNumber: projectNumber
            },
            successHandler);
    };

    this.getAllContactsByProject = function (projectNumber, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL_CONTACT_BY_PROJECT,
            {
                projectNumber: projectNumber
            },
            successHandler);
    };

    this.insert = function (name, description, origin, field, firmId, mgmtFee, appFee, rebilledFee, advance,
                            secret, critical, assignCurrent, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.INSERT,
            {
                name: name,
                description: description,
                origin: origin,
                field: field,
                firmId: firmId,
                mgmtFee: mgmtFee,
                appFee: appFee,
                rebilledFee: rebilledFee,
                advance: advance,
                secret: secret,
                critical: critical,
                assignCurrent: assignCurrent
            },
            successHandler);
    };

    this.insertOwn = function (name, description, origin, field, firmId, mgmtFee, appFee, rebilledFee, advance,
                            secret, critical, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.INSERT_OWN,
            {
                name: name,
                description: description,
                origin: origin,
                field: field,
                firmId: firmId,
                mgmtFee: mgmtFee,
                appFee: appFee,
                rebilledFee: rebilledFee,
                advance: advance,
                secret: secret,
                critical: critical
            },
            successHandler);
    };

    this.update = function (number, name, description, origin, field, firmId, mgmtFee, appFee, rebilledFee, advance,
                            secret, critical, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UPDATE,
            {
                number: number,
                name: name,
                description: description,
                origin: origin,
                field: field,
                firmId: firmId,
                mgmtFee: mgmtFee,
                appFee: appFee,
                rebilledFee: rebilledFee,
                advance: advance,
                secret: secret,
                critical: critical
            },
            successHandler);
    };

    this.updateOwnProject = function (number, name, description, origin, field, firmId, mgmtFee, appFee, rebilledFee, advance,
                                      secret, critical, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UPDATE_OWN,
            {
                number: number,
                name: name,
                description: description,
                origin: origin,
                field: field,
                firmId: firmId,
                mgmtFee: mgmtFee,
                appFee: appFee,
                rebilledFee: rebilledFee,
                advance: advance,
                secret: secret,
                critical: critical
            },
            successHandler);
    };

    this.delete = function(number, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DELETE,
            {
                number: number
            },
            successHandler);
    };

    this.signProject = function (number, signDate, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.SIGN,
            {
                number: number,
                signDate: signDate
            },
            successHandler);
    };

    this.unsignProject = function (number, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UNSIGN,
            {
                number: number
            },
            successHandler);
    };

    this.endProject = function (number, endDate, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.END,
            {
                number: number,
                endDate: endDate
            },
            successHandler);
    };

    this.unendProject = function (number, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UNEND,
            {
                number: number
            },
            successHandler);
    };

    this.badEndProject = function (number, endDate, content, attributable, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.BAD_END,
            {
                number: number,
                endDate: endDate,
                content: content,
                attributable: attributable
            },
            successHandler);
    };

    this.abortProject = function (number, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.ABORT,
            {
                number: number
            },
            successHandler);
    };

    this.disable = function (number, disabledUntil, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DISABLE,
            {
                number: number,
                disabledUntil: disabledUntil
            },
            successHandler);
    };

    this.enable = function (number, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.ENABLE,
            {
                number: number
            },
            successHandler);
    };

    this.deleteProject = function (number, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DELETE,
            {
                number: number
            },
            successHandler);
    };

    this.assignProjectAuditor = function (number, auditorId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.ASSIGN_AUDITOR,
            {
                number: number,
                auditorId: auditorId
            },
            successHandler);
    };

    this.assignProjectChadaff = function (number, chadaffId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.ASSIGN_CHADAFF,
            {
                number: number,
                chadaffId: chadaffId
            },
            successHandler);
    };

    this.assignProjectContact = function (number, contactId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.ASSIGN_CONTACT,
            {
                number: number,
                contactId: contactId
            },
            successHandler);
    };

    this.assignOwnProjectContact = function (number, contactId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.ASSIGN_CONTACT_OWN,
            {
                number: number,
                contactId: contactId
            },
            successHandler);
    };

    this.assignProjectInt = function (number, intId, jehAssigned, pay, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.ASSIGN_INT,
            {
                number: number,
                intId: intId,
                jehAssigned: jehAssigned,
                pay: pay
            },
            successHandler);
    };

    this.assignOwnProjectInt = function (number, intId, jehAssigned, pay, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.ASSIGN_INT_OWN,
            {
                number: number,
                intId: intId,
                jehAssigned: jehAssigned,
                pay: pay
            },
            successHandler);
    };

    this.removeProjectChadaff = function (number, chadaffId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.REMOVE_CHADAFF,
            {
                number: number,
                chadaffId: chadaffId
            },
            successHandler);
    };

    this.removeProjectContact = function (number, contactId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.REMOVE_CONTACT,
            {
                number: number,
                contactId: contactId
            },
            successHandler);
    };

    this.removeOwnProjectContact = function (number, contactId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.REMOVE_CONTACT_OWN,
            {
                number: number,
                contactId: contactId
            },
            successHandler);
    };

    this.removeProjectInt = function (number, intId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.REMOVE_INT,
            {
                number: number,
                intId: intId
            },
            successHandler);
    };

    this.removeOwnProjectInt = function (number, intId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.REMOVE_INT_OWN,
            {
                number: number,
                intId: intId
            },
            successHandler);
    };

    this.insertAmendment = function (projectNumber, type, content, attributable, creationDate, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.INSERT_AMENDMENT,
            {
                projectNumber: projectNumber,
                type: type,
                content: content,
                attributable: attributable,
                creationDate: creationDate
            },
            successHandler);
    };

    this.updateAmendment = function (id, type, content, attributable, creationDate, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UPDATE_AMENDMENT,
            {
                id: id,
                type: type,
                content: content,
                attributable: attributable,
                creationDate: creationDate
            },
            successHandler);
    };

    this.insertOwnAmendment = function (projectNumber, type, content, attributable, creationDate, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.INSERT_AMENDMENT_OWN,
            {
                projectNumber: projectNumber,
                type: type,
                content: content,
                attributable: attributable,
                creationDate: creationDate
            },
            successHandler);
    };

    this.updateOwnAmendment = function (id, type, content, attributable, creationDate, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UPDATE_AMENDMENT_OWN,
            {
                id: id,
                type: type,
                content: content,
                attributable: attributable,
                creationDate: creationDate
            },
            successHandler);
    };

    this.deleteAmendment = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DELETE_AMENDMENT,
            {
                id: id
            },
            successHandler);
    };

    this.deleteOwnAmendment = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DELETE_AMENDMENT_OWN,
            {
                id: id
            },
            successHandler);
    };

    this.archiveProject = function (number, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.ARCHIVE,
            {
                number: number
            },
            successHandler);
    };

    this.unarchiveProject = function (number, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UNARCHIVE,
            {
                number: number
            },
            successHandler);
    };

};


// ----------------------- TASK INTERFACE SERVICES CLASS ----------------------------------

var TaskServicesInterface = new function () {

    this.meta = {
        // --- (object)
        OBJECT: 'task',
        // --- (actions)
        ACTION: {
            GET_ALL: "getall",
            GET_BY_ID: "getbyid",
            GET_BY_PROJECT: "getbypro",
            GET_BY_PROJECT_AND_NUMBER: "getbypronum",
            GET_BILLED: "getbill",
            GET_BILLED_BY_PROJECT: "getbilbypro",
            GET_ALL_WITH_DELIVERY: "allwdel",
            GET_BY_PROJECT_WITH_DELIVERY: "allwdelbypro",
            GET_ALL_DELIVERY: "alldel",
            GET_DELIVERY_BY_ID: "delbyid",
            GET_DELIVERY_BY_PROJECT: "delbypro",
            GET_DELIVERY_BY_TASK: "delbytask",
            END_TASK: "endtask",
            UNEND_TASK: "unendtask",
            PAY_DELIVERY: "paydel",
            UNPAY_DELIVERY: "unpaydel",
            DELIVER_DELIVERY: "deldel",
            UNDELIVER_DELIVERY: "undeldel",
            INSERT: "insert",
            INSERT_DELIVERY: "insertdel",
            UPDATE: "update",
            UPDATE_DELIVERY: "updatedel",
            DELETE: "delete",
            DELETE_DELIVERY: "deletedel",
            SWITCH_TASKS_NUMBER: "switchnum"
        }
    };

    this.getAll = function (successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL,
            {},
            successHandler);
    };

    this.getById = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_ID,
            {
                id: id
            },
            successHandler);
    };

    this.getByProject = function (projectNumber, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_PROJECT,
            {
                projectNumber: projectNumber
            },
            successHandler);
    };

    this.getByProjectAndNumber = function (projectNumber, number, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_PROJECT_AND_NUMBER,
            {
                projectNumber: projectNumber,
                number: number
            },
            successHandler);
    };

    this.getAllWithDelivery = function (successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL_WITH_DELIVERY,
            {},
            successHandler);
    };

    this.getByProjectWithDelivery = function (projectNumber, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_PROJECT_WITH_DELIVERY,
            {
                projectNumber: projectNumber
            },
            successHandler);
    };

    this.getAllDeliveries = function (successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL_DELIVERY,
            {},
            successHandler);
    };

    this.getDeliveryById = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_DELIVERY_BY_ID,
            {
                id: id
            },
            successHandler);
    };

    this.getDeliveryByTask = function (taskId, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_DELIVERY_BY_TASK,
            {
                taskId: taskId
            },
            successHandler);
    };

    this.endTask = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.END_TASK,
            {
                id: id
            },
            successHandler);
    };

    this.unendTask = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UNEND_TASK,
            {
                id: id
            },
            successHandler);
    };

    this.payDelivery = function (id, paymentDate, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.PAY_DELIVERY,
            {
                id: id,
                paymentDate: paymentDate
            },
            successHandler);
    };

    this.unpayDelivery = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UNPAY_DELIVERY,
            {
                id: id
            },
            successHandler);
    };

    this.insert = function (projectNumber, name, description, jehAmount, jehCost, startDate, endDate,
                            successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.INSERT,
            {
                projectNumber: projectNumber,
                name: name,
                description: description,
                jehAmount: jehAmount,
                jehCost: jehCost,
                startDate: startDate,
                endDate: endDate
            },
            successHandler);
    };

    this.insertDelivery = function (taskId, number, content, billed, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.INSERT_DELIVERY,
            {
                taskId: taskId,
                number: number,
                content: content,
                billed: billed
            },
            successHandler);
    };

    this.update = function (id, name, description, jehAmount, jehCost, startDate, endDate,
                            successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UPDATE,
            {
                id: id,
                name: name,
                description: description,
                jehAmount: jehAmount,
                jehCost: jehCost,
                startDate: startDate,
                endDate: endDate
            },
            successHandler);
    };

    this.updateDelivery = function (id, number, content, billed, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UPDATE_DELIVERY,
            {
                id: id,
                number: number,
                content: content,
                billed: billed
            },
            successHandler);
    };

    this.deliverDelivery = function (id, deliveryDate, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DELIVER_DELIVERY,
            {
                id: id,
                deliveryDate: deliveryDate
            },
            successHandler);
    };

    this.undeliverDelivery = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UNDELIVER_DELIVERY,
            {
                id: id
            },
            successHandler);
    };

    this.delete = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DELETE,
            {
                id: id
            },
            successHandler);
    };

    this.deleteDelivery = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DELETE_DELIVERY,
            {
                id: id
            },
            successHandler);
    };

    this.switchTaskNumbers = function (id, idBis, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.SWITCH_TASKS_NUMBER,
            {
                id: id,
                idBis: idBis
            },
            successHandler);
    };

};

// ----------------------- DOCUMENT INTERFACE SERVICES CLASS ----------------------------------

var DocumentServicesInterface = new function () {

    this.meta = {
        // --- (object)
        OBJECT: 'document',
        // --- (actions)
        ACTION: {
            GET_ALL: "getall",
            GET_BY_ID: "getbyid",
            GET_PROJECT_DOCUMENTS: "projdoc",
            GET_BY_PROJECT: "byproject",
            GET_BY_TEMPLATE: "bytemp",
            GET_BY_PROJECT_AND_TEMPLATE: "byprotemp",
            GET_ALL_TEMPLATES: "getalltemp",
            GET_TEMPLATE_BY_LABEL: "tempbylabel",
            GET_PREVIOUS: "getprev",
            INSERT: "insert",
            UPDATE: "update",
            DELETE: "delete",
            VALID: "valid",
            INVALID: "invalid"
        }
    };

    this.getAll = function (successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL,
            {},
            successHandler);
    };

    this.getById = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_ID,
            {
                id: id
            },
            successHandler);
    };

    this.getPrevious = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_PREVIOUS,
            {
                id: id
            },
            successHandler);
    };

    this.getByProject = function (projectNumber, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_PROJECT,
            {
                projectNumber: projectNumber
            },
            successHandler);
    };

    this.getByTemplate = function (template, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_TEMPLATE,
            {
                template: template
            },
            successHandler);
    };

    this.getByProjectAndTemplate = function (projectNumber, template, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_BY_PROJECT_AND_TEMPLATE,
            {
                projectNumber: projectNumber,
                template: template
            },
            successHandler);
    };

    this.getProjectDocuments = function (projectNumber, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_PROJECT_DOCUMENTS,
            {
                projectNumber: projectNumber
            },
            successHandler);
    };

    this.getAllTemplates = function (successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_ALL_TEMPLATES,
            {},
            successHandler);
    };

    this.getTemplateByLabel = function (label, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_TEMPLATE_BY_LABEL,
            {
                label: label
            },
            successHandler);
    };

    this.insert = function (projectNumber, template, upload, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.INSERT,
            {
                projectNumber: projectNumber,
                template: template,
                upload: upload
            },
            successHandler);
    };

    this.update = function (id, template, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UPDATE,
            {
                id: id,
                template: template
            },
            successHandler);
    };

    this.delete = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DELETE,
            {
                id: id
            },
            successHandler);
    };

    this.valid = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.VALID,
            {
                id: id
            },
            successHandler);
    };

    this.invalid = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.INVALID,
            {
                id: id
            },
            successHandler);
    };
};