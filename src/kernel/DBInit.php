<?php

require_once "interfaces/AbstractScript.php";
require_once "DoleticKernel.php";
include_once "../../migrate/DBFill.php";

//________________________________________________________________________________________________________________________
// ------------- declare script functions --------------------------------------------------------------------------------

class ResetDBFunction extends AbstractFunction
{
    public function __construct($script)
    {
        parent::__construct($script,
            'Reset DB',
            '-rdb',
            '--reset-database',
            "Reset database dropping tables and creating them again.");
    }

    public function Execute()
    {
        parent::info("-- dbinit process starts --");
        $kernel = new DoleticKernel();    // instanciate
        $kernel->Init();                // initialize
        $kernel->ConnectDB();            // connect database
        parent::info("Reseting database...", true);
        $kernel->ResetDatabase();        // full database reset
        parent::endlog("done !");
        $kernel = null;
        parent::info("-- dbinit process ends --");
    }
}

class DataMigrationFunction extends AbstractFunction
{
    public function __construct($script)
    {
        parent::__construct($script,
            'Data Migration',
            '-dm',
            '--data-migration',
            "Adds data from a remote database. Requires an external DBFill.php script.");
    }

    public function Execute()
    {

        parent::info("-- data migration process starts --");

        $dbfill = new DBFill();
        $data = $dbfill
            ->fetchData()
            ->formatFetchedData()
            ->printFormattedData()
            ->getFormattedData();

        // Init kernel
        $kernel = new DoleticKernel();    // instanciate
        $kernel->Init();                // initialize
        $kernel->ConnectDB();            // connect database

        // Fill db with formatted data
        parent::info("-- filling ag --");
        foreach ($data['ag'] as $ag) {
            $kernel
                ->GetDBObject(UserDataDBObject::OBJ_NAME)
                ->GetServices($kernel->GetCurrentUser())
                ->GetResponseData(UserDataServices::INSERT_AG, $ag);
        }
        parent::info("done !");

        parent::info("-- filling udata --");
        foreach ($data['user_data'] as $udata) {
            $kernel->GetDBObject(UserDataDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
                ->GetResponseData(UserDataServices::FORCE_INSERT, $udata);
        }
        parent::info("done !");

        parent::info("-- filling udata position --");
        foreach ($data['user_position'] as $upos) {
            foreach ($upos as $u) {
                $kernel->GetDBObject(UserDataDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
                    ->GetResponseData(UserDataServices::FORCE_POSITION, $u);
            }
        }
        parent::info("done !");

        parent::info("-- filling memberships --");
        foreach ($data['admm'] as $admm) {
            $kernel->GetDBObject(AdmMembershipDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
                ->GetResponseData(AdmMembershipServices::INSERT, $admm);
        }
        foreach ($data['intm'] as $intm) {
            $kernel->GetDBObject(IntMembershipDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
                ->GetResponseData(IntMembershipServices::INSERT, $intm);
        }
        parent::info("done !");

        parent::info("-- filling user --");
        foreach ($data['user'] as $user) {
            $kernel->GetDBObject(UserDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
                ->GetResponseData(UserServices::FORCE_INSERT, $user);
        }
        parent::info("done !");

        parent::info("-- filling firm --");
        foreach ($data['firm'] as $firm) {
            $kernel->GetDBObject(FirmDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
                ->GetResponseData(FirmServices::FORCE_INSERT, $firm);
        }
        parent::info("done !");

        parent::info("-- filling contact --");
        foreach ($data['contact'] as $contact) {
            $kernel->GetDBObject(ContactDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
                ->GetResponseData(ContactServices::FORCE_INSERT, $contact);
        }
        parent::info("done !");

        parent::info("-- filling project --");
        foreach ($data['project'] as $project) {
            $kernel->GetDBObject(ProjectDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
                ->GetResponseData(ProjectServices::FORCE_INSERT, $project);
        }
        parent::info("done !");

        parent::info("-- filling task --");
        foreach ($data['task'] as $task) {
            $kernel->GetDBObject(TaskDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
                ->GetResponseData(TaskServices::FORCE_INSERT, $task);
        }
        parent::info("done !");

        parent::info("-- filling chadaff --");
        foreach ($data['chadaff'] as $chadaff) {
            $kernel->GetDBObject(ProjectDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
                ->GetResponseData(ProjectServices::ASSIGN_CHADAFF, $chadaff);
        }
        parent::info("done !");

        parent::info("-- filling int --");
        foreach ($data['int'] as $int) {
            $kernel->GetDBObject(ProjectDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
                ->GetResponseData(ProjectServices::ASSIGN_INT, $int);
        }
        parent::info("done !");

        parent::info("-- filling project contact --");
        foreach ($data['project_contact'] as $contact) {
            $kernel->GetDBObject(ProjectDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
                ->GetResponseData(ProjectServices::ASSIGN_CONTACT, $contact);
        }
        parent::info("done !");
    }
}

class FakeDataFunction extends AbstractFunction
{
    public function __construct($script)
    {
        parent::__construct($script,
            'Fake Data',
            '-fd',
            '--fake-data',
            "Adds fake data to the data base.");
    }

    public function Execute()
    {
        parent::info("-- fake data process starts --");
        $kernel = new DoleticKernel();    // instanciate
        $kernel->Init();                // initialize
        $kernel->ConnectDB();            // connect database
        // --- fill tickets
        parent::info("Filling ticket object related tables...", true);
        // --------------------------------------------------------------
        $kernel->GetDBObject(TicketDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(TicketServices::INSERT, array(
                TicketServices::PARAM_RECEIVER => 1,
                TicketServices::PARAM_SUBJECT => "Test subject",
                TicketServices::PARAM_CATEGO => 2,
                TicketServices::PARAM_DATA => "Test data",
                TicketServices::PARAM_STATUS => 3));
        // --------------------------------------------------------------
        parent::endlog("done !");
        // --- fill users
        parent::info("Filling user object related tables...", true);
        // --------------------------------------------------------------
        // SA account
        $kernel->GetDBObject(UserDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(UserServices::INSERT, array(
                UserServices::PARAM_UNAME => "super-admin.doe",
                UserServices::PARAM_HASH => sha1("password")));
        // A account
        $kernel->GetDBObject(UserDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(UserServices::INSERT, array(
                UserServices::PARAM_UNAME => "admin.doe",
                UserServices::PARAM_HASH => sha1("password")));
        // U account
        $kernel->GetDBObject(UserDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(UserServices::INSERT, array(
                UserServices::PARAM_UNAME => "user.doe",
                UserServices::PARAM_HASH => sha1("password")));
        // G account
        $kernel->GetDBObject(UserDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(UserServices::INSERT, array(
                UserServices::PARAM_UNAME => "guest.doe",
                UserServices::PARAM_HASH => sha1("password")));
        // --------------------------------------------------------------
        parent::endlog("done !");
        // --- fill userdata
        parent::info("Filling userdata object related tables...", true);
        // --------------------------------------------------------------
        // Add AG
        $kernel->GetDBObject(UserDataDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(UserDataServices::INSERT_AG, array(
                UserDataServices::PARAM_AG => "2016-02-20",
                UserDataServices::PARAM_PRESENCE => 7
            ));

        $kernel->GetDBObject(UserDataDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(UserDataServices::INSERT_AG, array(
                UserDataServices::PARAM_AG => "2015-02-17",
                UserDataServices::PARAM_PRESENCE => 4
            ));

        $kernel->GetDBObject(UserDataDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(UserDataServices::INSERT_AG, array(
                UserDataServices::PARAM_AG => "2015-10-04",
                UserDataServices::PARAM_PRESENCE => 5
            ));

        // SA account
        $kernel->GetDBObject(UserDataDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(UserDataServices::INSERT, array(
                UserDataServices::PARAM_USER_ID => 1,
                UserDataServices::PARAM_GENDER => "M.",
                UserDataServices::PARAM_FIRSTNAME => "SuperAdmin",
                UserDataServices::PARAM_LASTNAME => "DOE",
                UserDataServices::PARAM_BIRTHDATE => "1994-02-13",
                UserDataServices::PARAM_TEL => "0600000000",
                UserDataServices::PARAM_EMAIL => "super-admin.doe@gmail.com",
                UserDataServices::PARAM_ADDRESS => "1 avenue Doletic",
                UserDataServices::PARAM_CITY => "Etic",
                UserDataServices::PARAM_POSTAL_CODE => 99999,
                UserDataServices::PARAM_COUNTRY => "France",
                UserDataServices::PARAM_SCHOOL_YEAR => 4,
                UserDataServices::PARAM_INSA_DEPT => "IF",
                UserDataServices::PARAM_AG => "2015-02-17",
                UserDataServices::PARAM_POSITION => "Responsable DSI"
            ));
        // A account
        $kernel->GetDBObject(UserDataDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(UserDataServices::INSERT, array(
                UserDataServices::PARAM_USER_ID => 2,
                UserDataServices::PARAM_GENDER => "M.",
                UserDataServices::PARAM_FIRSTNAME => "Admin",
                UserDataServices::PARAM_LASTNAME => "DOE",
                UserDataServices::PARAM_BIRTHDATE => "1994-02-13",
                UserDataServices::PARAM_TEL => "0600000000",
                UserDataServices::PARAM_EMAIL => "admin.doe@gmail.com",
                UserDataServices::PARAM_ADDRESS => "1 avenue Doletic",
                UserDataServices::PARAM_CITY => "Etic",
                UserDataServices::PARAM_POSTAL_CODE => 99999,
                UserDataServices::PARAM_COUNTRY => "France",
                UserDataServices::PARAM_SCHOOL_YEAR => 4,
                UserDataServices::PARAM_INSA_DEPT => "IF",
                UserDataServices::PARAM_AG => "2016-02-20",
                UserDataServices::PARAM_POSITION => "Secrétaire Général"

            ));
        // U account
        $kernel->GetDBObject(UserDataDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(UserDataServices::INSERT, array(
                UserDataServices::PARAM_USER_ID => 3,
                UserDataServices::PARAM_GENDER => "M.",
                UserDataServices::PARAM_FIRSTNAME => "User",
                UserDataServices::PARAM_LASTNAME => "DOE",
                UserDataServices::PARAM_BIRTHDATE => "1994-02-13",
                UserDataServices::PARAM_TEL => "0600000000",
                UserDataServices::PARAM_EMAIL => "user.doe@gmail.com",
                UserDataServices::PARAM_ADDRESS => "1 avenue Doletic",
                UserDataServices::PARAM_CITY => "Etic",
                UserDataServices::PARAM_POSTAL_CODE => 99999,
                UserDataServices::PARAM_COUNTRY => "France",
                UserDataServices::PARAM_SCHOOL_YEAR => 2,
                UserDataServices::PARAM_INSA_DEPT => "PC",
                UserDataServices::PARAM_AG => "2016-02-20",
                UserDataServices::PARAM_POSITION => "Junior DSI"
            ));
        // G account
        $kernel->GetDBObject(UserDataDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(UserDataServices::INSERT, array(
                UserDataServices::PARAM_USER_ID => 4,
                UserDataServices::PARAM_GENDER => "M.",
                UserDataServices::PARAM_FIRSTNAME => "Guest",
                UserDataServices::PARAM_LASTNAME => "DOE",
                UserDataServices::PARAM_BIRTHDATE => "1994-02-13",
                UserDataServices::PARAM_TEL => "0600000000",
                UserDataServices::PARAM_EMAIL => "guest.doe@gmail.com",
                UserDataServices::PARAM_ADDRESS => "1 avenue Doletic",
                UserDataServices::PARAM_CITY => "Etic",
                UserDataServices::PARAM_POSTAL_CODE => 99999,
                UserDataServices::PARAM_COUNTRY => "France",
                UserDataServices::PARAM_SCHOOL_YEAR => 3,
                UserDataServices::PARAM_INSA_DEPT => "GI",
                UserDataServices::PARAM_AG => "2015-10-04",
                UserDataServices::PARAM_POSITION => "Président"
            ));

        $kernel->GetDBObject(IntMembershipDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(IntMembershipServices::INSERT, array(
                IntMembershipServices::PARAM_USER => 1,
                IntMembershipServices::PARAM_START => "2016-02-02",
                IntMembershipServices::PARAM_FEE => false,
                IntMembershipServices::PARAM_FORM => true,
                IntMembershipServices::PARAM_CERTIF => true,
                IntMembershipServices::PARAM_RIB => true,
                IntMembershipServices::PARAM_IDENTITY => false,
                IntMembershipServices::PARAM_SECU_NUMBER => 1234567890123
            ));

        $kernel->GetDBObject(IntMembershipDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(IntMembershipServices::INSERT, array(
                IntMembershipServices::PARAM_USER => 3,
                IntMembershipServices::PARAM_START => "2016-02-02",
                IntMembershipServices::PARAM_FEE => true,
                IntMembershipServices::PARAM_FORM => true,
                IntMembershipServices::PARAM_CERTIF => true,
                IntMembershipServices::PARAM_RIB => true,
                IntMembershipServices::PARAM_IDENTITY => true,
                IntMembershipServices::PARAM_SECU_NUMBER => 1234567890123
            ));

        $kernel->GetDBObject(AdmMembershipDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(AdmMembershipServices::INSERT, array(
                AdmMembershipServices::PARAM_USER => 1,
                AdmMembershipServices::PARAM_START => "2016-02-02",
                AdmMembershipServices::PARAM_END => "2017-02-02",
                AdmMembershipServices::PARAM_FEE => true,
                AdmMembershipServices::PARAM_FORM => true,
                AdmMembershipServices::PARAM_CERTIF => true
            ));

        $kernel->GetDBObject(AdmMembershipDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(AdmMembershipServices::INSERT, array(
                AdmMembershipServices::PARAM_USER => 2,
                AdmMembershipServices::PARAM_START => "2016-02-02",
                AdmMembershipServices::PARAM_END => "2017-02-02",
                AdmMembershipServices::PARAM_FEE => true,
                AdmMembershipServices::PARAM_FORM => true,
                AdmMembershipServices::PARAM_CERTIF => true
            ));
        $kernel->GetDBObject(AdmMembershipDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(AdmMembershipServices::INSERT, array(
                AdmMembershipServices::PARAM_USER => 4,
                AdmMembershipServices::PARAM_START => "2016-02-02",
                AdmMembershipServices::PARAM_END => "2017-02-02",
                AdmMembershipServices::PARAM_FEE => true,
                AdmMembershipServices::PARAM_FORM => true,
                AdmMembershipServices::PARAM_CERTIF => true
            ));

        $kernel->GetDBObject(TeamDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(TeamServices::INSERT, array(
                TeamServices::PARAM_LEADER_ID => 1,
                TeamServices::PARAM_NAME => "Doletic",
                TeamServices::PARAM_CREATION_DATE => date('Y-m-d'),
                TeamServices::PARAM_DIVISION => "DSI"
            ));
        $kernel->GetDBObject(TeamDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(TeamServices::INSERT_MEMBER, array(
                TeamServices::PARAM_ID => 1,
                TeamServices::PARAM_MEMBER_ID => array(2)
            ));
        // --------------------------------------------------------------
        parent::endlog("done !");

        // --- fill userdata
        parent::info("Filling firm and contact object related tables...", true);
        // --------------------------------------------------------------
        // Example firm
        $kernel->GetDBObject(FirmDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(FirmServices::INSERT, array(
                FirmServices::PARAM_SIRET => 123456789,
                FirmServices::PARAM_NAME => "Acme",
                FirmServices::PARAM_ADDRESS => "10 rue de l'argent",
                FirmServices::PARAM_POSTAL_CODE => "66666",
                FirmServices::PARAM_CITY => "Ville",
                FirmServices::PARAM_COUNTRY => "France",
                FirmServices::PARAM_TYPE => "SA",
                FirmServices::PARAM_LAST_CONTACT => "2015-01-01",
                FirmServices::PARAM_TYPE => "Start-up"
            ));

        // Example contact
        $kernel->GetDBObject(ContactDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(ContactServices::FORCE_INSERT, array(
                ContactServices::PARAM_ID => NULL,
                ContactServices::PARAM_GENDER => "M.",
                ContactServices::PARAM_FIRSTNAME => "Client",
                ContactServices::PARAM_LASTNAME => "DOE",
                ContactServices::PARAM_FIRM_ID => 1,
                ContactServices::PARAM_EMAIL => "client.doe@gmail.com",
                ContactServices::PARAM_PHONE => "0100000000",
                ContactServices::PARAM_CELLPHONE => "0700000000",
                ContactServices::PARAM_CATEGORY => "Client",
                ContactServices::PARAM_NOTES => "QQues notes",
                ContactServices::PARAM_ORIGIN => "Obtenu via Kim",
                ContactServices::PARAM_ROLE => "CEO",
                ContactServices::PARAM_ERROR_FLAG => -1,
                ContactServices::PARAM_NEXT_CALL_DATE => NULL,
                ContactServices::PARAM_PROSPECTED => 0,
                ContactServices::PARAM_LAST_UPDATE => "2015-01-01",
                ContactServices::PARAM_CREATED_BY => 1,
                ContactServices::PARAM_CREATION_DATE => "2015-01-01"
            ));

        $kernel->GetDBObject(ContactDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(ContactServices::FORCE_INSERT, array(
                ContactServices::PARAM_ID => NULL,
                ContactServices::PARAM_GENDER => "M.",
                ContactServices::PARAM_FIRSTNAME => "Prospect",
                ContactServices::PARAM_LASTNAME => "DOE",
                ContactServices::PARAM_FIRM_ID => 1,
                ContactServices::PARAM_EMAIL => "prospect.doe@gmail.com",
                ContactServices::PARAM_PHONE => "0100000000",
                ContactServices::PARAM_CELLPHONE => "0700000000",
                ContactServices::PARAM_CATEGORY => "Prospect",
                ContactServices::PARAM_NOTES => NULL,
                ContactServices::PARAM_ORIGIN => NULL,
                ContactServices::PARAM_ROLE => "CEO",
                ContactServices::PARAM_ERROR_FLAG => -1,
                ContactServices::PARAM_NEXT_CALL_DATE => NULL,
                ContactServices::PARAM_PROSPECTED => 1,
                ContactServices::PARAM_LAST_UPDATE => "2015-01-01",
                ContactServices::PARAM_CREATED_BY => 1,
                ContactServices::PARAM_CREATION_DATE => "2015-01-01"
            ));

        $kernel->GetDBObject(ContactDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(ContactServices::FORCE_INSERT, array(
                ContactServices::PARAM_ID => NULL,
                ContactServices::PARAM_GENDER => "M.",
                ContactServices::PARAM_FIRSTNAME => "Called",
                ContactServices::PARAM_LASTNAME => "DOE",
                ContactServices::PARAM_FIRM_ID => 1,
                ContactServices::PARAM_EMAIL => "called.doe@gmail.com",
                ContactServices::PARAM_PHONE => "0100000000",
                ContactServices::PARAM_CELLPHONE => "0700000000",
                ContactServices::PARAM_CATEGORY => "Prospect appelé",
                ContactServices::PARAM_NOTES => "Pas très gentil",
                ContactServices::PARAM_ORIGIN => NULL,
                ContactServices::PARAM_ROLE => "CEO",
                ContactServices::PARAM_ERROR_FLAG => -1,
                ContactServices::PARAM_NEXT_CALL_DATE => "2016-12-01",
                ContactServices::PARAM_PROSPECTED => 1,
                ContactServices::PARAM_LAST_UPDATE => "2015-01-01",
                ContactServices::PARAM_CREATED_BY => 1,
                ContactServices::PARAM_CREATION_DATE => "2015-01-01"
            ));

        $kernel->GetDBObject(ContactDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(ContactServices::FORCE_INSERT, array(
                ContactServices::PARAM_ID => NULL,
                ContactServices::PARAM_GENDER => "M.",
                ContactServices::PARAM_FIRSTNAME => "Vieux",
                ContactServices::PARAM_LASTNAME => "DOE",
                ContactServices::PARAM_FIRM_ID => 1,
                ContactServices::PARAM_EMAIL => "vieux.doe@gmail.com",
                ContactServices::PARAM_PHONE => "0100000000",
                ContactServices::PARAM_CELLPHONE => "0700000000",
                ContactServices::PARAM_CATEGORY => "Ancien Client",
                ContactServices::PARAM_NOTES => NULL,
                ContactServices::PARAM_ORIGIN => NULL,
                ContactServices::PARAM_ROLE => "CEO",
                ContactServices::PARAM_ERROR_FLAG => -1,
                ContactServices::PARAM_NEXT_CALL_DATE => NULL,
                ContactServices::PARAM_PROSPECTED => 1,
                ContactServices::PARAM_LAST_UPDATE => "2015-01-01",
                ContactServices::PARAM_CREATED_BY => 1,
                ContactServices::PARAM_CREATION_DATE => "2015-01-01"
            ));
        // --------------------------------------------------------------
        parent::endlog("done !");

        // --- fill project
        parent::info("Filling project object related tables...", true);
        // --------------------------------------------------------------
        // Example project
        $kernel->GetDBObject(ProjectDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(ProjectServices::INSERT, array(
                ProjectServices::PARAM_NAME => "Site web",
                ProjectServices::PARAM_DESCRIPTION => "Développement d'un site web.",
                ProjectServices::PARAM_ORIGIN => "Mail",
                ProjectServices::PARAM_FIELD => "IF",
                ProjectServices::PARAM_FIRM_ID => 1,
                ProjectServices::PARAM_MGMT_FEE => 0,
                ProjectServices::PARAM_APP_FEE => 0,
                ProjectServices::PARAM_REBILLED_FEE => 0,
                ProjectServices::PARAM_ADVANCE => 0,
                ProjectServices::PARAM_SECRET => 0,
                ProjectServices::PARAM_CRITICAL => 0,
                ProjectServices::PARAM_ASSIGN_CURRENT => false
            ));
        // --------------------------------------------------------------
        parent::endlog("done !");

        // --- fill maillist
        parent::info("Filling mailing list object related tables...", true);
        // --------------------------------------------------------------
        // membres-ca@...
        $kernel->GetDBObject(MailingListDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(MailingListServices::INSERT, array(
                MailingListServices::PARAM_CAN_SUBSCRIBE => "false",
                MailingListServices::PARAM_NAME => "Membres CA"));
        // membres-ca@...
        $kernel->GetDBObject(MailingListDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(MailingListServices::INSERT, array(
                MailingListServices::PARAM_CAN_SUBSCRIBE => "true",
                MailingListServices::PARAM_NAME => "Newsletter"));
        // attach users to mailing lists
        $kernel->GetDBObject(MailingListDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(MailingListServices::AFFECT, array(
                MailingListServices::PARAM_MAILLIST_ID => 1,
                MailingListServices::PARAM_USER_ID => 1));
        $kernel->GetDBObject(MailingListDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(MailingListServices::AFFECT, array(
                MailingListServices::PARAM_MAILLIST_ID => 1,
                MailingListServices::PARAM_USER_ID => 2));
        $kernel->GetDBObject(MailingListDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(MailingListServices::AFFECT, array(
                MailingListServices::PARAM_MAILLIST_ID => 2,
                MailingListServices::PARAM_USER_ID => 1));
        $kernel->GetDBObject(MailingListDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(MailingListServices::AFFECT, array(
                MailingListServices::PARAM_MAILLIST_ID => 2,
                MailingListServices::PARAM_USER_ID => 3));
        $kernel->GetDBObject(MailingListDBObject::OBJ_NAME)->GetServices($kernel->GetCurrentUser())
            ->GetResponseData(MailingListServices::AFFECT, array(
                MailingListServices::PARAM_MAILLIST_ID => 2,
                MailingListServices::PARAM_USER_ID => 4));
        // --------------------------------------------------------------
        parent::endlog("done !");
        // --- disconnect database
        $kernel->DisconnectDB();
        $kernel = null;
        parent::info("-- fake data process ends --");
    }
}

class TestDocumentFunction extends AbstractFunction {

    public function __construct($script)
    {
        parent::__construct($script,
            'Test document generation',
            '-td',
            '--test-document',
            "Generates a document");
    }

    public function Execute()
    {
        parent::info("-- dbinit process starts --");
        $kernel = new DoleticKernel();    // instantiate
        $kernel->Init();                // initialize
        $kernel->ConnectDB();            // connect database

        $phpword = new PHPWord();
        $template = $phpword->loadTemplate('Propale.docx');
        $template->setValue('NOMENTREPRISE', 'ACME');
        $template->save('Propale2.docx');

        parent::endlog("done !");
        $kernel = null;
        parent::info("-- dbinit process ends --");
    }
}

//________________________________________________________________________________________________________________________
// ------------- declare script in itself --------------------------------------------------------------------------------

class DBInitializerScript extends AbstractScript
{

    public function __construct($arg_v)
    {
        // ---- build parent
        parent::__construct($arg_v, "DBInitializerScript", true, "This script can be used to automate database operations.");
        // ---- add script functions
        parent::addFunction(new ResetDBFunction($this));
        parent::addFunction(new FakeDataFunction($this));
        parent::addFunction(new DataMigrationFunction($this));
        parent::addFunction(new TestDocumentFunction($this));
    }
}

//________________________________________________________________________________________________________________________
// ------------- run script ----------------------------------------------------------------------------------------------

$script = new DBInitializerScript($argv);
$script->Run();