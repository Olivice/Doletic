// ----------------------- FIRM INTERFACE SERVICES CLASS ----------------------------------

var FirmServicesInterface = new function () {

    this.meta = {
        // --- (object)
        OBJECT: 'firm',
        // --- (actions)
        ACTION: {
            GET_FIRM_BY_ID: 'byid',
            GET_ALL_FIRMS: 'all',
            GET_ALL_FIRM_TYPES: 'alltypes',
            INSERT: 'insert',
            UPDATE: 'update',
            DELETE: 'delete'
        }
    };

    this.getAll = function (successHandler) {
        return DoleticServicesInterface.callService(this.meta.OBJECT, this.meta.ACTION.GET_ALL_FIRMS, {}, successHandler);
    };

    this.getAllFirmTypes = function (successHandler) {
        return DoleticServicesInterface.callService(this.meta.OBJECT, this.meta.ACTION.GET_ALL_FIRM_TYPES, {}, successHandler);
    };

    this.getById = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_FIRM_BY_ID,
            {id: id},
            successHandler);
    };
    this.insert = function (siret, name, address, postalCode, city, country, type, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.INSERT,
            {
                siret: siret,
                name: name,
                address: address,
                postalCode: postalCode,
                city: city,
                country: country,
                type: type
            },
            successHandler);
    };
    this.update = function (id, siret, name, address, postalCode, city, country, type, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UPDATE,
            {
                id: id,
                siret: siret,
                name: name,
                address: address,
                postalCode: postalCode,
                city: city,
                country: country,
                type: type
            },
            successHandler);
    };
    this.delete = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DELETE,
            {id: id},
            successHandler);
    }
};

// ----------------------- CONTACT INTERFACE SERVICES CLASS ----------------------------------

var ContactServicesInterface = new function () {

    this.meta = {
        // --- (object)
        OBJECT: 'contact',
        // --- (actions)
        ACTION: {
            GET_CONTACT_BY_ID: 'byid',
            GET_CONTACTS_BY_CATEGORY: 'bycategory',
            GET_ALL_CONTACTS: 'all',
            GET_ALL_CONTACT_TYPES: 'alltypes',
            INSERT: 'insert',
            UPDATE: 'update',
            DELETE: 'delete',
            UPDATE_CATEGORY: 'upcat'
        }
    };

    this.getAll = function (successHandler) {
        return DoleticServicesInterface.callService(this.meta.OBJECT, this.meta.ACTION.GET_ALL_CONTACTS, {}, successHandler);
    };

    this.getAllContactTypes = function (successHandler) {
        return DoleticServicesInterface.callService(this.meta.OBJECT, this.meta.ACTION.GET_ALL_CONTACT_TYPES, {}, successHandler);
    };

    this.getById = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_CONTACT_BY_ID,
            {id: id},
            successHandler);
    };

    this.getByCategory = function (category, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.GET_CONTACTS_BY_CATEGORY,
            {category: category},
            successHandler);
    };

    this.insert = function (gender, firstname, lastname, firmId, email, phone, cellphone, category, role, notes,
                            origin, errorFlag, nextCallDate, prospected, assignedTo, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.INSERT,
            {
                gender: gender,
                firstname: firstname,
                lastname: lastname,
                firmId: firmId,
                email: email,
                phone: phone,
                cellphone: cellphone,
                category: category,
                role: role,
                notes: notes,
                origin: origin,
                errorFlag: errorFlag,
                nextCallDate: nextCallDate,
                prospected: prospected,
                assignedTo: assignedTo
            },
            successHandler);
    };

    this.update = function (id, gender, firstname, lastname, firmId, email, phone, cellphone, category, role, notes,
                            origin, errorFlag, prospected, assignedTo, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UPDATE,
            {
                id: id,
                gender: gender,
                firstname: firstname,
                lastname: lastname,
                firmId: firmId,
                email: email,
                phone: phone,
                cellphone: cellphone,
                category: category,
                role: role,
                notes: notes,
                origin: origin,
                errorFlag: errorFlag,
                nextCallDate: null,
                prospected: prospected,
                assignedTo: assignedTo

            },
            successHandler);
    };

    this.updateCategory = function (id, category, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.UPDATE_CATEGORY,
            {
                id: id,
                category: category
            },
            successHandler);
    };

    this.delete = function (id, successHandler) {
        return DoleticServicesInterface.callService(
            this.meta.OBJECT, this.meta.ACTION.DELETE,
            {id: id},
            successHandler);
    }
};