<?php

require_once "interfaces/AbstractDBService.php";
require_once "objects/DBProcedure.php";
require_once "objects/DBTable.php";

class UaDBService extends AbstractDBService
{

    // -- consts

    // --- service name
    const SERV_NAME = "modua";
    // --- params keys

    // --- internal services (actions)
    const GET_FULL_PROJECT_BY_NUMBER = "fulprbynum";
    const INSERT_TASK_OWN = "instaskown";
    const INSERT_DELIVERY_OWN = "insdelown";
    const UPDATE_TASK_OWN = "updtaskown";
    const UPDATE_DELIVERY_OWN = "upddelown";
    const DELETE_TASK_OWN = "deltaskown";
    const DELETE_DELIVERY_OWN = "deldelown";
    const END_TASK_OWN = "endtaskown";
    const UNEND_TASK_OWN = "unendtaskown";
    const GET_PROJECT_DOCUMENTS = "projdoc";
    const SWITCH_TASK_NUMBER_OWN = "switchnumown";

    public function __construct($module)
    {
        // -- construct parent
        parent::__construct($module, UaDBService::SERV_NAME);
    }

    public function GetResponseData($action, $params)
    {
        $data = null;
        if (!strcmp($action, UaDBService::GET_FULL_PROJECT_BY_NUMBER)) {
            $data = $this->__get_full_project_by_number($params[ProjectServices::PARAM_NUMBER]);
        } else if (!strcmp($action, UaDBService::INSERT_TASK_OWN)) {
            $data = $this->__insert_task_own($params);
        } else if (!strcmp($action, UaDBService::INSERT_DELIVERY_OWN)) {
            $data = $this->__insert_delivery_own($params);
        } else if (!strcmp($action, UaDBService::UPDATE_TASK_OWN)) {
            $data = $this->__update_task_own($params);
        } else if (!strcmp($action, UaDBService::UPDATE_DELIVERY_OWN)) {
            $data = $this->__update_delivery_own($params);
        } else if (!strcmp($action, UaDBService::DELETE_TASK_OWN)) {
            $data = $this->__delete_task_own($params);
        } else if (!strcmp($action, UaDBService::DELETE_DELIVERY_OWN)) {
            $data = $this->__delete_delivery_own($params);
        } else if (!strcmp($action, UaDBService::END_TASK_OWN)) {
            $data = $this->__end_task_own($params);
        } else if (!strcmp($action, UaDBService::UNEND_TASK_OWN)) {
            $data = $this->__unend_task_own($params);
        } else if (!strcmp($action, UaDBService::GET_PROJECT_DOCUMENTS)) {
            $data = $this->__get_project_documents($params);
        } else if (!strcmp($action, UaDBService::SWITCH_TASK_NUMBER_OWN)) {
            $data = $this->__switch_tasks_own($params);
        }
        return $data;
    }

# PROTECTED & PRIVATE ####################################################

    private function __get_full_project_by_number($number)
    {
        $project = parent::getDBObjectResponseData(
            ProjectDBObject::OBJ_NAME,
            ProjectServices::GET_FULL_BY_NUMBER,
            array(
                ProjectServices::PARAM_NUMBER => $number
            )
        );

        $project->setTasks(
            parent::getDBObjectResponseData(
                TaskDBObject::OBJ_NAME,
                TaskServices::GET_BY_PROJECT,
                array(
                    TaskServices::PARAM_PROJECT_NUMBER => $number
                )
            )
        );

        return $project;
    }

    private function __get_project_documents($params)
    {
        $documents = parent::getDBObjectResponseData(
            DocumentDBObject::OBJ_NAME,
            DocumentServices::GET_PROJECT_DOCUMENTS,
            $params
        );
        return array(
            $documents,
            parent::getDBObjectResponseData(
                ProjectDBObject::OBJ_NAME,
                ProjectServices::HAS_AUDITOR_RIGHTS,
                array(ProjectServices::PARAM_NUMBER => $params[DocumentServices::PARAM_PROJECT_NUMBER])
            ),
            parent::getDBObjectResponseData(
                ProjectDBObject::OBJ_NAME,
                ProjectServices::HAS_RIGHTS,
                array(ProjectServices::PARAM_NUMBER => $params[DocumentServices::PARAM_PROJECT_NUMBER])
            )
        );
    }

    private function __insert_task_own($params)
    {
        if (parent::getDBObjectResponseData(
            ProjectDBObject::OBJ_NAME,
            ProjectServices::HAS_RIGHTS,
            array(ProjectServices::PARAM_NUMBER => $params[TaskServices::PARAM_PROJECT_NUMBER]))
        ) {
            return parent::getDBObjectResponseData(TaskDBObject::OBJ_NAME, TaskServices::INSERT, $params);
        }
        return false;
    }

    private function __insert_delivery_own($params)
    {
        if ($this->__user_has_rights_on_task($params[TaskServices::PARAM_TASK_ID])) {
            return parent::getDBObjectResponseData(TaskDBObject::OBJ_NAME, TaskServices::INSERT_DELIVERY, $params);
        }
        return false;
    }

    private function __update_task_own($params)
    {
        if ($this->__user_has_rights_on_task($params[TaskServices::PARAM_ID])) {
            return parent::getDBObjectResponseData(TaskDBObject::OBJ_NAME, TaskServices::UPDATE, $params);
        }
        return false;
    }

    private function __update_delivery_own($params)
    {
        if ($this->__user_has_rights_on_delivery($params[TaskServices::PARAM_ID])) {
            return parent::getDBObjectResponseData(TaskDBObject::OBJ_NAME, TaskServices::UPDATE_DELIVERY, $params);
        }
        return false;
    }

    private function __delete_task_own($params)
    {
        if ($this->__user_has_rights_on_task($params[TaskServices::PARAM_ID])) {
            return parent::getDBObjectResponseData(TaskDBObject::OBJ_NAME, TaskServices::DELETE, $params);
        }
        return false;
    }

    private function __delete_delivery_own($params)
    {
        if ($this->__user_has_rights_on_delivery($params[TaskServices::PARAM_ID])) {
            return parent::getDBObjectResponseData(TaskDBObject::OBJ_NAME, TaskServices::DELETE_DELIVERY, $params);
        }
        return false;
    }

    private function __end_task_own($params)
    {
        if ($this->__user_has_rights_on_task($params[TaskServices::PARAM_ID])) {
            return parent::getDBObjectResponseData(TaskDBObject::OBJ_NAME, TaskServices::END_TASK, $params);
        }
        return false;
    }

    private function __unend_task_own($params)
    {
        if ($this->__user_has_rights_on_task($params[TaskServices::PARAM_ID])) {
            return parent::getDBObjectResponseData(TaskDBObject::OBJ_NAME, TaskServices::UNEND_TASK, $params);
        }
        return false;
    }

    private function __switch_tasks_own($params)
    {
        if ($this->__user_has_rights_on_task($params[TaskServices::PARAM_ID])) {
            return parent::getDBObjectResponseData(TaskDBObject::OBJ_NAME, TaskServices::SWITCH_TASKS_NUMBER, $params);
        }
        return false;
    }

    // -- special

    private function __user_has_rights_on_task($taskId)
    {
        return parent::getDBObjectResponseData(
            ProjectDBObject::OBJ_NAME,
            ProjectServices::HAS_RIGHTS,
            array(
                ProjectServices::PARAM_NUMBER =>
                    parent::getDBObjectResponseData(
                        TaskDBObject::OBJ_NAME,
                        TaskServices::GET_BY_ID,
                        array(
                            TaskServices::PARAM_ID => $taskId
                        )
                    )->getProjectNumber()
            )
        );
    }

    private function __user_has_rights_on_delivery($deliveryId)
    {
        return $this->__user_has_rights_on_task(
            parent::getDBObjectResponseData(
                TaskDBObject::OBJ_NAME,
                TaskServices::GET_DELIVERY_BY_ID,
                array(
                    TaskServices::PARAM_ID => $deliveryId
                )
            )[TaskDBObject::COL_TASK_ID]
        );
    }

}