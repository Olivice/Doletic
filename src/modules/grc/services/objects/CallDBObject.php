<?php

require_once "interfaces/AbstractDBObject.php";
require_once "interfaces/AbstractObjectServices.php";
require_once "objects/DBProcedure.php";
require_once "objects/DBTable.php";

/**
 * @brief Contact object
 */
class Call implements \JsonSerializable
{

    // -- consts

    // -- attributes
    private $id = null;
    private $contact_id = null;
    private $call_date = null;
    private $category = null;
    private $author = null;
    private $notes = null;
    private $replied = null;
    private $creation_date = null;
    private $created_by = null;
    private $last_update = null;

    /**
     * @brief Constructs a contact
     */
    public function __construct($id, $contactId, $callDate, $category, $author, $notes, $replied, $creationDate, $createdBy, $lastUpdate)
    {
        $this->id = intval($id);
        $this->contact_id = intval($contactId);
        $this->call_date = $callDate;
        $this->category = $category;
        $this->author = intval($author);
        $this->notes = $notes;
        $this->replied = $replied;
        $this->creation_date = $creationDate;
        $this->created_by = intval($createdBy);
        $this->last_update = $lastUpdate;
    }

    public function jsonSerialize()
    {
        return [
            CallDBObject::COL_ID => $this->id,
            CallDBObject::COL_CONTACT_ID => $this->contact_id,
            CallDBObject::COL_CALL_DATE => $this->call_date,
            CallDBObject::COL_CATEGORY => $this->category,
            CallDBObject::COL_AUTHOR => $this->author,
            CallDBObject::COL_NOTES => $this->notes,
            CallDBObject::COL_REPLIED => $this->replied,
            CallDBObject::COL_CREATION_DATE => $this->creation_date,
            CallDBObject::COL_CREATED_BY => $this->created_by,
            CallDBObject::COL_LAST_UPDATE => $this->last_update
        ];
    }

    /**
     * @brief Returns object's id
     * @return int
     */
    public function GetId()
    {
        return $this->id;
    }

    /**
     * @brief
     */
    public function GetContactId()
    {
        return $this->contact_id;
    }

    /**
     * @brief
     */
    public function GetCallDate()
    {
        return $this->call_date;
    }

    /**
     * @brief
     */
    public function GetCategoryId()
    {
        return $this->category;
    }

    /**
     * @return null
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @return null
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @return null
     */
    public function getNotes()
    {
        return $this->notes;
    }

    /**
     * @return null
     */
    public function getReplied()
    {
        return $this->replied;
    }

    /**
     * @brief
     */
    public function GetLastUpdate()
    {
        return $this->last_update;
    }

    /**
     * @return null
     */
    public function getCreationDate()
    {
        return $this->creation_date;
    }

    /**
     * @return int
     */
    public function getCreatedBy()
    {
        return $this->created_by;
    }


}

/**
 * @brief Contact object related services
 */
class CallServices extends AbstractObjectServices
{

    // -- consts
    // --- params
    const PARAM_ID = "id";
    const PARAM_CONTACT_ID = "contactId";
    const PARAM_CALL_DATE = "callDate";
    const PARAM_CATEGORY = "category";
    const PARAM_AUTHOR = "author";
    const PARAM_NOTES = "notes";
    const PARAM_REPLIED = "replied";
    const PARAM_CREATION_DATE = "creationDate";
    const PARAM_CREATED_BY = "createdBy";
    const PARAM_LAST_UPDATE = "lastUpdate";

    // --- actions
    const GET_CALL_BY_ID = "byid";
    const GET_ALL_CALLS = "all";
    const GET_CALLS_BY_CONTACT = "bycont";
    const GET_ALL_CALL_TYPES = "alltypes";
    const INSERT = "insert";
    const UPDATE = "update";
    const DELETE = "delete";

    const FORCE_INSERT = "forins";

    // -- functions

    // --- construct
    public function __construct($currentUser, $dbObject, $dbConnection)
    {
        parent::__construct($currentUser, $dbObject, $dbConnection);
    }

    public function GetResponseData($action, $params)
    {
        $data = null;
        if (!strcmp($action, CallServices::GET_CALL_BY_ID)) {
            $data = $this->__get_call_by_id($params[CallServices::PARAM_ID]);
        } else if (!strcmp($action, CallServices::GET_CALLS_BY_CONTACT)) {
            $data = $this->__get_calls_by_contact($params[CallServices::PARAM_CONTACT_ID]);
        } else if (!strcmp($action, CallServices::GET_ALL_CALLS)) {
            $data = $this->__get_all_calls();
        } else if (!strcmp($action, CallServices::GET_ALL_CALL_TYPES)) {
            $data = $this->__get_all_call_types();
        } else if (!strcmp($action, CallServices::INSERT)) {
            $data = $this->__insert_call(
                $params[CallServices::PARAM_CONTACT_ID],
                $params[CallServices::PARAM_CALL_DATE],
                $params[CallServices::PARAM_CATEGORY],
                $params[CallServices::PARAM_AUTHOR],
                $params[CallServices::PARAM_NOTES],
                $params[CallServices::PARAM_REPLIED]);
        } else if (!strcmp($action, CallServices::FORCE_INSERT)) {
            $data = $this->__force_insert_call(
                $params[CallServices::PARAM_ID],
                $params[CallServices::PARAM_CONTACT_ID],
                $params[CallServices::PARAM_CALL_DATE],
                $params[CallServices::PARAM_CATEGORY],
                $params[CallServices::PARAM_AUTHOR],
                $params[CallServices::PARAM_NOTES],
                $params[CallServices::PARAM_REPLIED],
                $params[CallServices::PARAM_CREATION_DATE],
                $params[CallServices::PARAM_CREATED_BY],
                $params[CallServices::PARAM_LAST_UPDATE]);
        } else if (!strcmp($action, CallServices::UPDATE)) {
            $data = $this->__update_call(
                $params[CallServices::PARAM_ID],
                $params[CallServices::PARAM_CALL_DATE],
                $params[CallServices::PARAM_CATEGORY],
                $params[CallServices::PARAM_AUTHOR],
                $params[CallServices::PARAM_NOTES],
                $params[CallServices::PARAM_REPLIED]);
        } else if (!strcmp($action, CallServices::DELETE)) {
            $data = $this->__delete_call($params[CallServices::PARAM_ID]);
        }
        return $data;
    }

# PROTECTED & PRIVATE ###########################################################

    // --- consult

    private function __get_call_by_id($id)
    {
        // create sql params array
        $sql_params = array(":" . CallDBObject::COL_ID => $id);
        // create sql request
        $sql = parent::getDBObject()->GetTable(CallDBObject::TABL_CALL)->GetSELECTQuery(
            array(DBTable::SELECT_ALL), array(CallDBObject::COL_ID));
        // execute SQery and sresult
        $pdos = parent::getDBConnection()->ResultFromQuery($sql, $sql_params);
        // create contact
        $call = null;
        if (isset($pdos)) {
            if (($row = $pdos->fetch()) !== false) {
                $call = new Call(
                    $row[CallDBObject::COL_ID],
                    $row[CallDBObject::COL_CONTACT_ID],
                    $row[CallDBObject::COL_CALL_DATE],
                    $row[CallDBObject::COL_CATEGORY],
                    $row[CallDBObject::COL_AUTHOR],
                    $row[CallDBObject::COL_NOTES],
                    $row[CallDBObject::COL_REPLIED],
                    $row[CallDBObject::COL_CREATION_DATE],
                    $row[CallDBObject::COL_CREATED_BY],
                    $row[CallDBObject::COL_LAST_UPDATE]
                );
            }
        }
        return $call;
    }

    private function __get_calls_by_contact($contactId)
    {
        // create sql params array
        $sql_params = array(":" . CallDBObject::COL_CONTACT_ID => $contactId);
        // create sql request
        $sql = parent::getDBObject()->GetTable(CallDBObject::TABL_CALL)->GetSELECTQuery(
            array(DBTable::SELECT_ALL), array(CallDBObject::COL_CONTACT_ID));
        // execute SQery and sresult
        $pdos = parent::getDBConnection()->ResultFromQuery($sql, $sql_params);
        // create an empty array for contacts and fill it
        $calls = array();
        if (isset($pdos)) {
            while (($row = $pdos->fetch()) !== false) {
                array_push($calls, new Call(
                    $row[CallDBObject::COL_ID],
                    $row[CallDBObject::COL_CONTACT_ID],
                    $row[CallDBObject::COL_CALL_DATE],
                    $row[CallDBObject::COL_CATEGORY],
                    $row[CallDBObject::COL_AUTHOR],
                    $row[CallDBObject::COL_NOTES],
                    $row[CallDBObject::COL_REPLIED],
                    $row[CallDBObject::COL_CREATION_DATE],
                    $row[CallDBObject::COL_CREATED_BY],
                    $row[CallDBObject::COL_LAST_UPDATE]
                ));
            }
        }
        return $calls;
    }

    private function __get_all_calls()
    {
        // create sql request
        $sql = parent::getDBObject()->GetTable(CallDBObject::TABL_CALL)->GetSELECTQuery(
            array(DBTable::SELECT_ALL),
            array(DBTable::EVERYWHERE),
            array(),
            array(CallDBObject::COL_CREATION_DATE => DBTable::ORDER_DESC)
        );
        // execute SQery and sresult
        $pdos = parent::getDBConnection()->ResultFromQuery($sql, array());
        // create an empty array for contacts and fill it
        $calls = array();
        if (isset($pdos)) {
            while (($row = $pdos->fetch()) !== false) {
                array_push($calls, new Call(
                    $row[CallDBObject::COL_ID],
                    $row[CallDBObject::COL_CONTACT_ID],
                    $row[CallDBObject::COL_CALL_DATE],
                    $row[CallDBObject::COL_CATEGORY],
                    $row[CallDBObject::COL_AUTHOR],
                    $row[CallDBObject::COL_NOTES],
                    $row[CallDBObject::COL_REPLIED],
                    $row[CallDBObject::COL_CREATION_DATE],
                    $row[CallDBObject::COL_CREATED_BY],
                    $row[CallDBObject::COL_LAST_UPDATE]
                ));
            }
        }
        return $calls;
    }

    private function __get_all_call_types()
    {
        // create sql request
        $sql = parent::getDBObject()->GetTable(CallDBObject::TABL_CALL_TYPE)->GetSELECTQuery();
        // execute SQery and sresult
        $pdos = parent::getDBConnection()->ResultFromQuery($sql, array());
        // create an empty array for contacts and fill it
        $data = array();
        if (isset($pdos)) {
            while (($row = $pdos->fetch()) !== false) {
                array_push($data, $row[CallDBObject::COL_LABEL]);
            }
        }
        return $data;
    }

    // --- modify

    private function __insert_call($contactId, $callDate, $category, $author, $notes, $replied)
    {
        // create sql params
        $sql_params = array(
            ":" . CallDBObject::COL_ID => null,
            ":" . CallDBObject::COL_CONTACT_ID => $contactId,
            ":" . CallDBObject::COL_CALL_DATE => $callDate,
            ":" . CallDBObject::COL_CATEGORY => $category,
            ":" . CallDBObject::COL_AUTHOR => $author,
            ":" . CallDBObject::COL_NOTES => $notes,
            ":" . CallDBObject::COL_REPLIED => $replied,
            ":" . CallDBObject::COL_CREATION_DATE => date('Y-m-d H:i:s'),
            ":" . CallDBObject::COL_CREATED_BY => $this->getCurrentUser()->GetId(),
            ":" . CallDBObject::COL_LAST_UPDATE => date('Y-m-d H:i:s')
        );
        // create sql request
        $sql = parent::getDBObject()->GetTable(CallDBObject::TABL_CALL)->GetINSERTQuery();
        return parent::getDBConnection()->PrepareExecuteQuery($sql, $sql_params);
    }

    private function __force_insert_call($id, $contactId, $callDate, $category, $author, $notes, $replied,
                                         $creationDate, $createdBy, $lastUpdate)
    {
        // create sql params
        $sql_params = array(
            ":" . CallDBObject::COL_ID => $id,
            ":" . CallDBObject::COL_CONTACT_ID => $contactId,
            ":" . CallDBObject::COL_CALL_DATE => $callDate,
            ":" . CallDBObject::COL_CATEGORY => $category,
            ":" . CallDBObject::COL_AUTHOR => $author,
            ":" . CallDBObject::COL_NOTES => $notes,
            ":" . CallDBObject::COL_REPLIED => $replied,
            ":" . CallDBObject::COL_CREATION_DATE => $creationDate,
            ":" . CallDBObject::COL_CREATED_BY => $createdBy,
            ":" . CallDBObject::COL_LAST_UPDATE => $lastUpdate
        );
        // create sql request
        $sql = parent::getDBObject()->GetTable(CallDBObject::TABL_CONTACT)->GetINSERTQuery();
        return parent::getDBConnection()->PrepareExecuteQuery($sql, $sql_params);
    }

    private function __update_call($id, $callDate, $category, $author, $notes, $replied)
    {
        // create sql params
        $sql_params = array(
            ":" . CallDBObject::COL_ID => $id,
            ":" . CallDBObject::COL_CALL_DATE => $callDate,
            ":" . CallDBObject::COL_CATEGORY => $category,
            ":" . CallDBObject::COL_AUTHOR => $author,
            ":" . CallDBObject::COL_NOTES => $notes,
            ":" . CallDBObject::COL_REPLIED => $replied,
            ":" . CallDBObject::COL_LAST_UPDATE => date('Y-m-d H:i:s')
        );
        // sql request
        $sql = parent::getDBObject()->GetTable(CallDBObject::TABL_CALL)->GetUPDATEQuery(
            array(
                CallDBObject::COL_CALL_DATE,
                CallDBObject::COL_CATEGORY,
                CallDBObject::COL_AUTHOR,
                CallDBObject::COL_NOTES,
                CallDBObject::COL_REPLIED,
                CallDBObject::COL_LAST_UPDATE
            )
        );
        // execute query
        return parent::getDBConnection()->PrepareExecuteQuery($sql, $sql_params);
    }

    private function __delete_call($id)
    {
        // create sql params
        $sql_params = array(":" . CallDBObject::COL_ID => $id);
        // create sql request
        $sql = parent::getDBObject()->GetTable(CallDBObject::TABL_CALL)->GetDELETEQuery();
        // execute query
        return parent::getDBConnection()->PrepareExecuteQuery($sql, $sql_params);
    }


# PUBLIC RESET STATIC PHONE FUNCTION --------------------------------------------------------------------

    /**
     *    ---------!---------!---------!---------!---------!---------!---------!---------!---------
     *  !                            PHONEBASE CONSISTENCY WARNING                                !
     *  !                                                                                        !
     *  !  Please respect the following points :                                                !
     *    !  - When adding static data to existing data => always add at the end of the list      !
     *  !  - Never remove data (or ensure that no database element use one as a foreign key)    !
     *    ---------!---------!---------!---------!---------!---------!---------!---------!---------
     */
    public function ResetStaticData()
    {
        // --- retrieve SQL query
        $types = [
            'Appel',
            'Email'
        ];
        $sql = parent::getDBObject()->GetTable(CallDBObject::TABL_CALL_TYPE)->GetINSERTQuery();
        foreach ($types as $type) {
            // --- create param array
            $sql_params = array(
                ":" . CallDBObject::COL_LABEL => $type
            );
            // --- execute SQL query
            parent::getDBConnection()->PrepareExecuteQuery($sql, $sql_params);
        }
    }

}

/*
 *	@brief Contact object interface
 */

class CallDBObject extends AbstractDBObject
{

    // -- consts
    // --- object name
    const OBJ_NAME = "call";
    // --- tables
    const TABL_CALL = "dol_call";
    const TABL_CALL_TYPE = "dol_call_type";
    // --- columns
    const COL_ID = "id";
    const COL_LABEL = "label";
    const COL_CONTACT_ID = "contactId";
    const COL_CALL_DATE = "callDate";
    const COL_CATEGORY = "category";
    const COL_AUTHOR = "author";
    const COL_NOTES = "notes";
    const COL_REPLIED = "replied";
    const COL_CREATION_DATE = "creation_date";
    const COL_CREATED_BY = "created_by";
    const COL_LAST_UPDATE = "last_update";
    // -- attributes

    // -- functions

    public function __construct($module)
    {
        // -- construct parent
        parent::__construct($module, CallDBObject::OBJ_NAME);
        // -- create tables
        // --- dol_contact table
        $dol_call_type = new DBTable(CallDBObject::TABL_CALL_TYPE);
        $dol_call_type
            ->AddColumn(CallDBObject::COL_LABEL, DBTable::DT_VARCHAR, 255, false, "", false, true);

        // --- dol_contact table
        $dol_call = new DBTable(CallDBObject::TABL_CALL);
        $dol_call
            ->AddColumn(CallDBObject::COL_ID, DBTable::DT_INT, 11, false, "", true, true)
            ->AddColumn(CallDBObject::COL_CONTACT_ID, DBTable::DT_INT, 11, true, NULL)
            ->AddColumn(CallDBObject::COL_CALL_DATE, DBTable::DT_VARCHAR, 255, NULL)
            ->AddColumn(CallDBObject::COL_CATEGORY, DBTable::DT_VARCHAR, 255, false)
            ->AddColumn(CallDBObject::COL_AUTHOR, DBTable::DT_INT, 11, true, NULL)
            ->AddColumn(CallDBObject::COL_NOTES, DBTable::DT_TEXT, -1, true, NULL)
            ->AddColumn(CallDBObject::COL_REPLIED, DBTable::DT_INT, 11, true, 0)
            ->AddColumn(CallDBObject::COL_CREATION_DATE, DBTable::DT_VARCHAR, 255, false)
            ->AddColumn(CallDBObject::COL_CREATED_BY, DBTable::DT_INT, 11, true, NULL)
            ->AddColumn(CallDBObject::COL_LAST_UPDATE, DBTable::DT_VARCHAR, 255, false)
            ->AddForeignKey(
                CallDBObject::TABL_CALL . '_fk1',
                CallDBObject::COL_CATEGORY,
                CallDBObject::TABL_CALL_TYPE,
                CallDBObject::COL_LABEL, DBTable::DT_CASCADE, DBTable::DT_CASCADE
            )
            ->AddForeignKey(
                CallDBObject::TABL_CALL . '_fk2',
                CallDBObject::COL_CONTACT_ID,
                ContactDBObject::TABL_CONTACT,
                ContactDBObject::COL_ID, DBTable::DT_CASCADE, DBTable::DT_CASCADE
            )
            ->AddForeignKey(
                CallDBObject::TABL_CALL . '_fk3',
                CallDBObject::COL_AUTHOR,
                UserDataDBObject::TABL_USER_DATA,
                UserDataDBObject::COL_USER_ID, DBTable::DT_SET_NULL, DBTable::DT_CASCADE
            )
            ->AddForeignKey(
                CallDBObject::TABL_CALL . '_fk4',
                CallDBObject::COL_CREATED_BY,
                UserDataDBObject::TABL_USER_DATA,
                UserDataDBObject::COL_USER_ID, DBTable::DT_SET_NULL, DBTable::DT_CASCADE
            );

        // -- add tables
        parent::addTable($dol_call_type);
        parent::addTable($dol_call);
    }

    /**
     * @brief Returns all services associated with this object
     */
    public function GetServices($currentUser)
    {
        return new CallServices($currentUser, $this, $this->getDBConnection());
    }

    /**
     *    Initialize static data
     */
    public function ResetStaticData()
    {
        $services = new CallServices(null, $this, $this->getDBConnection());
        $services->ResetStaticData();
    }

}
