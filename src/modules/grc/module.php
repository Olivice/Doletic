<?php

require_once "interfaces/AbstractModule.php";
require_once "../modules/kernel/services/objects/UserDataDBObject.php";
require_once "../modules/grc/services/objects/ContactDBObject.php";
require_once "../modules/grc/services/objects/FirmDBObject.php";
require_once "../modules/grc/services/objects/CallDBObject.php";

class GRCModule extends AbstractModule
{

    // -- attributes

    // -- functions

    public function __construct()
    {
        // -- build abstract module
        parent::__construct(
            "grc",
            "Gestion Relations Clients",
            "1.0dev",
            array("Paul Dautry", "Nicolas Sorin"),
            (RightsMap::A_G | RightsMap::M_G), // means only admin and members group can access this module
            array(
                // -- module interfaces
                'guest' => RightsMap::G_RMASK,
                'ui' => RightsMap::U_RMASK,
                'admin' => RightsMap::A_RMASK,
                'superadmin' => RightsMap::SA_RMASK,
                // -- module services
                // ---- contact object services
                ContactDBObject::OBJ_NAME . ':' . ContactServices::GET_CONTACT_BY_ID => RightsMap::U_RMASK,    // only super admin
                ContactDBObject::OBJ_NAME . ':' . ContactServices::GET_ALL_CONTACTS => RightsMap::U_RMASK,    // everyone
                ContactDBObject::OBJ_NAME . ':' . ContactServices::GET_CONTACTS_BY_CATEGORY => RightsMap::U_RMASK,    // everyone
                ContactDBObject::OBJ_NAME . ':' . ContactServices::GET_ALL_CONTACT_TYPES => RightsMap::U_RMASK,    // everyone
                ContactDBObject::OBJ_NAME . ':' . ContactServices::INSERT => RightsMap::A_RMASK,  // everyone
                ContactDBObject::OBJ_NAME . ':' . ContactServices::UPDATE => RightsMap::A_RMASK,    // everyone
                ContactDBObject::OBJ_NAME . ':' . ContactServices::UPDATE_CATEGORY => RightsMap::A_RMASK,    // everyone
                ContactDBObject::OBJ_NAME . ':' . ContactServices::DELETE => RightsMap::SA_RMASK, // only super admin

                // ---- contact object services
                FirmDBObject::OBJ_NAME . ':' . FirmServices::GET_FIRM_BY_ID => RightsMap::U_RMASK,    // only super admin
                FirmDBObject::OBJ_NAME . ':' . FirmServices::GET_ALL_FIRMS => RightsMap::U_RMASK,    // everyone
                FirmDBObject::OBJ_NAME . ':' . FirmServices::GET_ALL_FIRM_TYPES => RightsMap::U_RMASK,    // everyone
                FirmDBObject::OBJ_NAME . ':' . FirmServices::INSERT => RightsMap::A_RMASK,  // everyone
                FirmDBObject::OBJ_NAME . ':' . FirmServices::UPDATE => RightsMap::A_RMASK,    // everyone
                FirmDBObject::OBJ_NAME . ':' . FirmServices::DELETE => RightsMap::SA_RMASK, // only super admin
            ),
            false, // disable ui
            array('kernel') // kernel is always a dependency
        );
        // -- add module specific dbo objects
        parent::addDBObject(new FirmDBObject($this));
        parent::addDBObject(new ContactDBObject($this));
        parent::addDBObject(new CallDBObject($this));
        // -- add module specific ui
        parent::addUI('Super-admins', 'superadmin');    // refer to couple (admin.js, admin.css)
        parent::addUI('Administration', 'admin', false);    // refer to couple (admin.js, admin.css)
        parent::addUI('Membres', 'ui', false);    // refer to couple (ui.js, ui.css)
        parent::addUI('Invités', 'guest', false);    // refer to couple (ui.js, ui.css)
    }

}

// ----------- ADD MODULE TO GLOBAL MODULES VAR -------------

ModuleLoader::RegisterModule(new GRCModule());
