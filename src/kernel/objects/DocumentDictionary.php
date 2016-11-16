<?php

require_once "objects/phpword/PHPWord.php";

class DocumentDictionary
{

    // -- consts
    const DOC_PROPALE = 1;
    const DOC_CC = 2;
    const DOC_RM = 3;
    const DOC_PVF = 4;
    const DOC_PVL = 5;
    const DOC_AVENANTENTREPRISE = 6;
    const DOC_AVENANTETUDIANT = 7;
    const DOC_PVFR = 8;
    const DOC_CONFIDENTIALITEENTREPRISE = 9;
    const DOC_CONFIDENTIALITEETUDIANT = 10;
    const DOC_DEMANDEBV = 11;
    const DOC_DEMANDEFACTURE = 12;
    const DOC_DEVIS = 13;
    const DOC_LETTREENVOIAVENANT = 14;
    const DOC_LETTREENVOIPROPALE = 15;
    const DOC_AVENANTRUPTURECC = 16;
    const DOC_AVENANTRUPTURERM = 17;
    const DOC_LETTREENVOIPV = 18;
    const DOC_LETTREENVOIDEVIS = "lettreenvoidevis";


    // -- attributes
    private $dict = array();

    // -- functions

    public function __construct($docType, $params)
    {
        switch ($docType) {
            case DocumentDictionary::DOC_PROPALE:
                $this->__make_propositioncommerciale_dict($params);
                break;
            case DocumentDictionary::DOC_CC:
                $this->__make_conventionclient_dict($params);
                break;
            case DocumentDictionary::DOC_RM:
                $this->__make_recapitulatifmission_dict($params);
                break;
            case DocumentDictionary::DOC_PVL:
                $this->__make_procesverballivraison_dict($params);
                break;
            case DocumentDictionary::DOC_PVFR:
                $this->__make_procesverbalfinrecette_dict($params);
                break;
            case DocumentDictionary::DOC_PVF:
                $this->__make_procesverbalfin_dict($params);
                break;
            case DocumentDictionary::DOC_AVENANTETUDIANT:
                $this->__make_avenantetudiant_dict($params);
                break;
            case DocumentDictionary::DOC_AVENANTENTREPRISE:
                $this->__make_avenantentreprise_dict($params);
                break;
            case DocumentDictionary::DOC_LETTREENVOIAVENANT:
                $this->__make_lettreenvoiavenant_dict($params);
                break;
            case DocumentDictionary::DOC_LETTREENVOIPROPALE:
                $this->__make_lettreenvoipropale_dict($params);
                break;
            case DocumentDictionary::DOC_LETTREENVOIDEVIS:
                $this->__make_lettreenvoidevis_dict($params);
                break;
            case DocumentDictionary::DOC_DEVIS:
                $this->__make_devis_dict($params);
                break;
            case DocumentDictionary::DOC_CONFIDENTIALITEETUDIANT:
                $this->__make_confidentialiteetudiant_dict($params);
                break;
            case DocumentDictionary::DOC_CONFIDENTIALITEENTREPRISE:
                $this->__make_confidentialiteentreprise_dict($params);
                break;
            case DocumentDictionary::DOC_DEMANDEFACTURE:
                $this->__make_demandefacture_dict($params);
                break;
            case DocumentDictionary::DOC_DEMANDEBV:
                $this->__make_demandebv_dict($params);
                break;
            case DocumentDictionary::DOC_LETTREENVOIPV:
                $this->__make_lettreenvoipv_dict($params);
                break;
            case DocumentDictionary::DOC_AVENANTRUPTURECC:
                $this->__make_avenantrupturecc_dict($params);
                break;
            case DocumentDictionary::DOC_AVENANTRUPTURERM:
                $this->__make_avenantrupturerm_dict($params);
                break;
        }
    }

    public function getDict()
    {
        return $this->dict;
    }

    private function __make_propositioncommerciale_dict($params)
    {
        $chadaff = $params[Services::PARAM_CHADAFF];
        $project = $params[Services::PARAM_PROJECT];
        $int = $params[Services::PARAM_INT];
        $contact = $params[Services::PARAM_CONTACT];
        $president = $params[Services::PARAM_PRESIDENT];

        $totalJeh = 0;
        $total = $project->GetMgmtFee() + $project->GetAppFee();
        foreach($project->GetTasks() as $task) {
            $totalJeh += $task->GetJehAmount();
            $total += $task->GetJehAmount() * $task->GetJehCost();
        }

        $signDate = $project->GetSignDate();
        $endDate = $project->GetEndDate();

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'TITREETUDE' => $project->GetNumber(),
            'DESCRIPTIONETUDE' => $project->GetName(),
            'CIVILITEUSER' => $chadaff->GetGender(), //Monsieur ou madame
            'NOMUSER' => $chadaff->GetFirstName() . ' ' . mb_strtoupper($chadaff->GetLastName(), 'UTF-8'), //Nom du chadaff
            'CIVILITEINTERVENANT' => isset($int['int']) ? $int['int']->GetGender() : 'CIVILITE INTERVENANT', //Monsieur ou madame
            'NOMINTERVENANT' => isset($int['int']) ? ($int['int']->GetFirstName() . ' ' . mb_strtoupper($int['int']->GetLastName(), 'UTF-8')) : 'NOM INTERVENANT', //Nom de l'intervenant, à faire plusieurs fois si plusieurs intervenants
            'CIVILITEINTERVENANT1' => isset($int['int']) ? $int['int']->GetGender()  : 'CIVILITE INTERVENANT', //Monsieur ou madame
            'NOMINTERVENANT1' => isset($int['int']) ? ($int['int']->GetFirstName() . ' ' . mb_strtoupper($int['int']->GetLastName(), 'UTF-8')) : 'NOM INTERVENANT', //Nom de l'intervenant, à faire plusieurs fois si plusieurs intervenants
            'CIVILITECORRESPONDANTQUALITE' => $project->GetAuditorId()->GetGender(), //Monsieur ou madame
            'NOMCORRESPONDANTQUALITE' => $project->GetAuditorId()->GetFirstname() . ' ' . mb_strtoupper($project->GetAuditorId()->GetLastName(), 'UTF-8'), // Nom du corres qualité
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'PRENOMCONTACT' => $contact->GetFirstName(), //Prenom du client
            'FCTCONTACT' => $contact->GetRole(), //Fonction du contact
            'CIVPREZ' => isset($president) ? $president->GetGender() : 'CIV PRESIDENT', //Monsieur ou madame
            'CIVPRESIDENT' => isset($president) ? $president->GetGender() : 'CIV PRESIDENT', //Monsieur ou madame
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstname() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT', //Nom du président
            'DUREEETUDE' => isset($signDate) && isset($endDate) ? $this->datediffInWeeks($signDate, $endDate) : 'X', //Durée de l'étude
            'NBJOURSJEH' => $totalJeh, //Nombre total de JEHs
            'FRAISETUDE' => $project->GetMgmtFee(),
            'FRAISENTREPRISE' => $project->GetAppFee(),
            'TOTALENTREPRISE' => $total,
            'MONTANTTVAENT' => $total*0.2,
            'TOTALENTREPRISETTC' => $total*1.2,
            'TAUXTVA' => '20', //taux de tva
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
        ];
    }

    private function __make_conventionclient_dict($params)
    {
        $project = $params[Services::PARAM_PROJECT];
        $contact = $params[Services::PARAM_CONTACT];
        $president = $params[Services::PARAM_PRESIDENT];

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'ADRESSEENTREPRISE' => $project->GetFirmId()->GetAddress(), //adresse de l'etreprise
            'CPENTREPRISE' => $project->GetFirmId()->GetPostalCode(), //code postale de l'entreprise
            'VILLEENTREPRISE' => $project->GetFirmId()->GetCity(), //ville de l'entreprise
            'SIRETENTREPRISE' => $project->GetFirmId()->GetSiret(), //siret de l'entreprise
            'TITREETUDE' => $params[Services::PARAM_PROJECT]->GetNumber(),
            'DESCRIPTIONETUDE' => $params[Services::PARAM_PROJECT]->GetName(),
            'CIVILITECORRESPONDANTQUALITE' => $project->GetAuditorId()->GetGender(), //Monsieur ou madame
            'NOMCORRESPONDANTQUALITE' => $project->GetAuditorId()->GetFirstname() . ' ' . mb_strtoupper($project->GetAuditorId()->GetLastName(), 'UTF-8'), // Nom du corres qualité
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'PRENOMCONTACT' => $contact->GetFirstName(), //Prenom du client
            'FCTCONTACT' => $contact->GetRole(), //Fonction du contact
            'CIVPRESIDENT' => isset($president) ? $president->GetGender() : 'CIV PRESIDENT', //Monsieur ou madame
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstname() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT', //Nom du président
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
        ];
    }

    private function __make_recapitulatifmission_dict($params)
    {
        $project = $params[Services::PARAM_PROJECT];
        $int = $params[Services::PARAM_INT];
        $president = $params[Services::PARAM_PRESIDENT];

        $membership = $int['membership'];
        if(isset($membership) && !empty($membership)) {
            $membership = $membership[0];
        } else {
            $membership = null;
        }

        $total_int = $int['details'][ProjectDBObject::COL_JEH_ASSIGNED] * $int['details'][ProjectDBObject::COL_PAY];
        $total_int_ttc = $int['details'][ProjectDBObject::COL_JEH_ASSIGNED] * ($int['details'][ProjectDBObject::COL_PAY]-10);
        $fmt = new NumberFormatter('fr', NumberFormatter::SPELLOUT);
        $total_int_l = $fmt->format($total_int);

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'TITREETUDE' => $project->GetNumber(),
            'NUMINTER' => $int['details'][ProjectDBObject::COL_NUMBER], //Numero de l'intervenant
            'CIVILITEINTERVENANT' => $int['int']->GetGender(), //Monsieur ou madame
            'NOMINTERVENANT' => mb_strtoupper($int['int']->GetLastName(), 'UTF-8'), //Nom de l'intervenant, à faire plusieurs fois si plusieurs intervenants
            'PRENOMINTERVENANT' => $int['int']->GetFirstname(), //Prénom de l'intervenant
            'ADRESSEINTERVENANT' => $int['int']->GetAddress(), //Monsieur ou madame
            'CPINTERVENANT' => $int['int']->GetPostalCode(), //Code postal de l'intervenant
            'VILLEINTERVENANT' => $int['int']->GetCity(), //Ville intervenant
            'SECUINTERVENANT' => isset($membership) ? $membership->GetSecuNumber() : 'NUMERO SECU', //n° sécu intervenant
            'NBJOURSINTER' => $int['details'][ProjectDBObject::COL_JEH_ASSIGNED], //nb de jeh de l'intervenant
            'TOTALINTERVENANT_L' => $total_int, //total d'indemnisation brut
            'TOTALINTERVENANT' => $total_int_l, //total d'indemnisation brut en lettre
            'TARIFINTERV' => $int['details'][ProjectDBObject::COL_PAY], //nb de euros par jeh
            'TOTALINTERVENANTTTC_L' => $total_int_ttc, //total TTC
            'TOTALINTERVENANTTTC' => $fmt->format($total_int_ttc), //total TTC en lettre
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstname() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT',
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
        ];
    }

    private function __make_procesverballivraison_dict($params)
    {
        $project = $params[Services::PARAM_PROJECT];
        $contact = $params[Services::PARAM_CONTACT];
        $president = $params[Services::PARAM_PRESIDENT];

        $signDate = $project->GetSignDate();

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'TITREETUDE' => $project->GetNumber(),
            'DESCRIPTIONETUDE' => $project->GetName(),
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'PRENOMCONTACT' => $contact->GetFirstName(), //Prenom du client
            'FCTCONTACT' => $contact->GetRole(), //Fonction du contact
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstName() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT', //Nom du président
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
            'DATESIGCV' => isset($signDate) ? date('d/m/Y', strtotime($signDate)) : 'JJ/MM/AAAA' //date signature de la cc
        ];
    }

    private function __make_procesverbalfinrecette_dict($params)
    {
        $project = $params[Services::PARAM_PROJECT];
        $contact = $params[Services::PARAM_CONTACT];
        $president = $params[Services::PARAM_PRESIDENT];

        $signDate = $project->GetSignDate();

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'TITREETUDE' => $project->GetNumber(),
            'DESCRIPTIONETUDE' => $project->GetName(),
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'PRENOMCONTACT' => $contact->GetFirstName(), //Prenom du client
            'FCTCONTACT' => $contact->GetRole(), //Fonction du contact
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstName() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT', //Nom du président
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
            'DATESIGCV' => isset($signDate) ? date('d/m/Y', strtotime($signDate)) : 'JJ/MM/AAAA' //date signature de la cc
        ];
    }

    private function __make_procesverbalfin_dict($params)
    {
        $project = $params[Services::PARAM_PROJECT];
        $contact = $params[Services::PARAM_CONTACT];
        $president = $params[Services::PARAM_PRESIDENT];

        $signDate = $project->GetSignDate();

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'TITREETUDE' => $project->GetNumber(),
            'DESCRIPTIONETUDE' => $project->GetName(),
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'PRENOMCONTACT' => $contact->GetFirstName(), //Prenom du client
            'FCTCONTACT' => $contact->GetRole(), //Fonction du contact
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstName() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT', //Nom du président
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
            'DATESIGCV' => isset($signDate) ? date('d/m/Y', strtotime($signDate)) : 'JJ/MM/AAAA' //date signature de la cc
        ];
    }


    private function __make_avenantetudiant_dict($params)
    {
        $project = $params[Services::PARAM_PROJECT];
        $int = $params[Services::PARAM_INT];
        $president = $params[Services::PARAM_PRESIDENT];
        $membership = $int['membership'];
        if(isset($membership) && !empty($membership)) {
            $membership = $membership[0];
        } else {
            $membership = null;
        }

        $this->dict = [
            'TITREETUDE' => $project->GetNumber(),
            'NUMINTERVENANT' => $int['details'][ProjectDBObject::COL_NUMBER], //Numero de l'intervenant
            'CIVILITEINTERVENANT' => $int['int']->GetGender(), //Monsieur ou madame
            'NOMINTERVENANT' => mb_strtoupper($int['int']->GetLastName(), 'UTF-8'), //Nom de l'intervenant, à faire plusieurs fois si plusieurs intervenants
            'PRENOMINTERVENANT' => $int['int']->GetFirstName(), //Prénom de l'intervenant
            'ADRESSEINTERVENANT' => $int['int']->GetAddress(), //Monsieur ou madame
            'CPINTERVENANT' => $int['int']->GetPostalCode(), //Code postal de l'intervenant
            'VILLEINTERVENANT' => $int['int']->GetCity(), //Ville intervenant
            'SECUINTERVENANT' => isset($membership) ? $membership->GetSecuNumber() : 'NUMERO SECU', //n° sécu intervenant
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstName() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT', //Nom du président
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
        ];
    }

    private function __make_avenantentreprise_dict($params)
    {
        $project = $params[Services::PARAM_PROJECT];
        $contact = $params[Services::PARAM_CONTACT];
        $president = $params[Services::PARAM_PRESIDENT];

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'ADRESSEENTREPRISE' => $project->GetFirmId()->GetAddress(), //adresse de l'etreprise
            'CPENTREPRISE' => $project->GetFirmId()->GetPostalCode(), //code postale de l'entreprise
            'VILLEENTREPRISE' => $project->GetFirmId()->GetCity(), //ville de l'entreprise
            'SIRETENTREPRISE' => $project->GetFirmId()->GetSIRET(), //siret de l'entreprise
            'TITREETUDE' => $project->GetNumber(),
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'PRENOMCONTACT' => $contact->GetFirstname(), //Prenom du client
            'FCTCONTACT' => $contact->GetRole(), //Fonction du contact
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstName() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT', //Nom du président
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
        ];
    }

    private function __make_lettreenvoiavenant_dict($params)
    {
        $chadaff = $params[Services::PARAM_CHADAFF];
        $project = $params[Services::PARAM_PROJECT];
        $contact = $params[Services::PARAM_CONTACT];

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'ADRESSEENTREPRISE' => $project->GetFirmId()->GetAddress(), //adresse de l'etreprise
            'CPENTREPRISE' => $project->GetFirmId()->GetPostalCode(), //code postale de l'entreprise
            'VILLEENTREPRISE' => $project->GetFirmId()->GetCity(), //ville de l'entreprise
            'TITREETUDE' => $project->GetNumber(),
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => $contact->GetFirstname() . ' ' . mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
            'NOMUSER' => mb_strtoupper($chadaff->GetLastName(), 'UTF-8'), //Nom du chadaff
            'PRENOMUSER' => $chadaff->GetFirstName(), //Prenom du chadaff
        ];
    }

    private function __make_lettreenvoipropale_dict($params)
    {
        $chadaff = $params[Services::PARAM_CHADAFF];
        $project = $params[Services::PARAM_PROJECT];
        $contact = $params[Services::PARAM_CONTACT];

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'ADRESSEENTREPRISE' => $project->GetFirmId()->GetAddress(), //adresse de l'etreprise
            'CPENTREPRISE' => $project->GetFirmId()->GetPostalCode(), //code postale de l'entreprise
            'VILLEENTREPRISE' => $project->GetFirmId()->GetCity(), //ville de l'entreprise
            'TITREETUDE' => $project->GetNumber(),
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
            'NOMUSER' => mb_strtoupper($chadaff->GetLastName(), 'UTF-8'), //Nom du chadaff
            'PRENOMUSER' => $chadaff->GetFirstname(), //Prenom du chadaff
        ];
    }

    private function __make_lettreenvoipv_dict($params)
    {
        $chadaff = $params[Services::PARAM_CHADAFF];
        $project = $params[Services::PARAM_PROJECT];
        $contact = $params[Services::PARAM_CONTACT];

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'ADRESSEENTREPRISE' => $project->GetFirmId()->GetAddress(), //adresse de l'etreprise
            'CPENTREPRISE' => $project->GetFirmId()->GetPostalCode(), //code postale de l'entreprise
            'VILLEENTREPRISE' => $project->GetFirmId()->GetCity(), //ville de l'entreprise
            'TITREETUDE' => $project->GetNumber(),
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
            'NOMUSER' => mb_strtoupper($chadaff->GetLastName(), 'UTF-8'), //Nom du chadaff
            'PRENOMUSER' => $chadaff->GetFirstname(), //Prenom du chadaff
        ];
    }

    private function __make_lettreenvoidevis_dict($params)
    {
        $chadaff = $params[Services::PARAM_CHADAFF];
        $project = $params[Services::PARAM_PROJECT];
        $contact = $params[Services::PARAM_CONTACT];

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'ADRESSEENTREPRISE' => $project->GetFirmId()->GetAddress(), //adresse de l'etreprise
            'CPENTREPRISE' => $project->GetFirmId()->GetPostalCode(), //code postale de l'entreprise
            'VILLEENTREPRISE' => $project->GetFirmId()->GetCity(), //ville de l'entreprise
            'TITREETUDE' => $project->GetNumber(),
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
            'NOMUSER' => mb_strtoupper($chadaff->GetLastName(), 'UTF-8'), //Nom du chadaff
            'PRENOMUSER' => $chadaff->GetFirstname(), //Prenom du chadaff
        ];
    }

    private function __make_devis_dict($params)
    {
        $project = $params[Services::PARAM_PROJECT];
        $chadaff = $params[Services::PARAM_CHADAFF];
        $contact = $params[Services::PARAM_CONTACT];

        $total = $project->GetMgmtFee() + $project->GetAppFee();
        foreach($project->GetTasks() as $task) {
            $total += $task->GetJehAmount() * $task->GetJehCost();
        }
        $tva = 0.2 * $total;

        $this->dict = [
            'FRAISETIC' => $project->GetMgmtFee(), // frais de gestion
            'FRAISENTREPRISE' => $project->GetAppFee(), // frais de dossier
            'TOTALENTREPRISE' => $total, // total HT
            'MONTANTTVAENT' => $tva, // montant de la tva
            'TOTALENTREPRISETTC' => $total + $tva, // total ttc
            'TAUXTVA' => '20', // Taux de tva
            'NOMENTRPERISE' => $project->GetFirmId()->GetName(),
            'ADRESSEENTREPRISE' => $project->GetFirmId()->GetAddress(), //adresse de l'etreprise
            'CPENTREPRISE' => $project->GetFirmId()->GetPostalCode(), //code postale de l'entreprise
            'VILLEENTREPRISE' => $project->GetFirmId()->GetCity(), //ville de l'entreprise
            'TITREETUDE' => $project->GetNumber(),
            'DESCRIPTIONETUDE' => $project->GetName(),
            'CIVILITEUSER' => $chadaff->GetGender(), //Monsieur ou madame
            'NOMUSER' => $chadaff->GetFirstName() . ' ' . mb_strtoupper($chadaff->GetLastName(), 'UTF-8'), //Nom du chadaff
            'PRENOMUSER' => $chadaff->GetFirstname(), //Prenom du chadaff
            'CIVILITECORRESPONDANTQUALITE' => $project->GetAuditorId()->GetGender(), //Monsieur ou madame
            'NOMCORRESPONDANTQUALITE' => $project->GetAuditorId()->GetFirstname() . ' ' . mb_strtoupper($project->GetAuditorId()->GetLastName(), 'UTF-8'), // Nom du corres qualité
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'PRENOMCONTACT' => $contact->GetFirstName(), //Prenom du client
            'FCTCONTACT' => $contact->GetRole(), //Fonction du contact
            'CIVPREZ' => isset($president) ? $president->GetGender() : 'CIV PRESIDENT', //Monsieur ou madame
            'CIVPRESIDENT' => isset($president) ? $president->GetGender() : 'CIV PRESIDENT', //Monsieur ou madame
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstname() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT', //Nom du président
            'DUREEETUDE' => isset($signDate) && isset($endDate) ? $this->datediffInWeeks($signDate, $endDate) : 'X', //Durée de l'étude
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
        ];
    }

    private function __make_confidentialiteetudiant_dict($params)
    {
        $project = $params[Services::PARAM_PROJECT];
        $int = $params[Services::PARAM_INT];
        $president = $params[Services::PARAM_PRESIDENT];

        $membership = $int['membership'];
        if(isset($membership) && !empty($membership)) {
            $membership = $membership[0];
        } else {
            $membership = null;
        }

        $this->dict = [
            'TITREETUDE' => $project->GetNumber(),
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'CIVILITEINTERVENANT' => $int['int']->GetGender(), //Monsieur ou madame
            'NOMINTERVENANT' => mb_strtoupper($int['int']->GetLastName(), 'UTF-8'), //Nom de l'intervenant, à faire plusieurs fois si plusieurs intervenants
            'PRENOMINTERVENANT' => $int['int']->GetFirstname(), //Prénom de l'intervenant
            'ADRESSEINTERVENANT' => $int['int']->GetAddress(), //Monsieur ou madame
            'CPINTERVENANT' => $int['int']->GetPostalCode(), //Code postal de l'intervenant
            'VILLEINTERVENANT' => $int['int']->GetCity(), //Ville intervenant
            'SECUINTERVENANT' => isset($membership) ? $membership->GetSecuNumber() : 'NUMERO SECU', //n° sécu intervenant
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstName() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT', //Nom du président
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
        ];
    }

    private function __make_confidentialiteentreprise_dict($params)
    {
        $project = $params[Services::PARAM_PROJECT];
        $contact = $params[Services::PARAM_CONTACT];
        $president = $params[Services::PARAM_PRESIDENT];
        $treso = $params[Services::PARAM_TRESORIER];

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'ADRESSEENTREPRISE' => $project->GetFirmId()->GetAddress(), //adresse de l'etreprise
            'CPENTREPRISE' => $project->GetFirmId()->GetPostalCode(), //code postale de l'entreprise
            'VILLEENTREPRISE' => $project->GetFirmId()->GetCity(), //ville de l'entreprise
            'SIRETENTREPRISE' => $project->GetFirmId()->GetSIRET(), //siret de l'entreprise
            'TITREETUDE' => $project->GetNumber(),
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'PRENOMCONTACT' => $contact->GetFirstname(), //Prenom du client
            'FCTCONTACT' => $contact->GetRole(), //Fonction du contact
            'CIVTRESORIER' => isset($treso) ? $treso->GetGender() : 'CIVILITE TRESORIER',
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstname() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT',//Nom du président
            'NOMTRESORIER' => isset($treso) ? $treso->GetLastname() : 'NOM TRESORIER', //Nom du treso
            'PRENOMTRESORIER' => isset($treso) ? $treso->GetFirstname() : 'PRENOM TRESORIER',
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
        ];
    }

    private function __make_demandefacture_dict($params)
    {

        $chadaff = $params[Services::PARAM_CHADAFF];
        $project = $params[Services::PARAM_PROJECT];
        $contact = $params[Services::PARAM_CONTACT];
        $int = $params[Services::PARAM_INT];
        $president = $params[Services::PARAM_PRESIDENT];

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'ADRESSEENTREPRISE' => $project->GetFirmId()->GetAddress(), //adresse de l'etreprise
            'CPENTREPRISE' => $project->GetFirmId()->GetPostalCode(), //code postale de l'entreprise
            'VILLEENTREPRISE' => $project->GetFirmId()->GetCity(), //ville de l'entreprise
            'SIRETENTREPRISE' => $project->GetFirmId()->GetSIRET(), //siret de l'entreprise
            'TITREETUDE' => $project->GetNumber(),
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'PRENOMCONTACT' => $contact->GetFirstname(), //Prenom du client
            'DATESIGCV' => isset($signDate) ? date('d/m/Y', strtotime($signDate)) : 'JJ/MM/AAAA', //date signature de la cc
            'DESCRIPTIONETUDE' => $project->GetName(),
            'NOMUSER' => mb_strtoupper($chadaff->GetLastName(), 'UTF-8'),
            'PRENOMUSER' => $chadaff->GetFirstname() //Prenom du chadaff
        ];
    }

    private function __make_demandebv_dict($params)
    {
        $chadaff = $params[Services::PARAM_CHADAFF];
        $project = $params[Services::PARAM_PROJECT];
        $int = $params[Services::PARAM_INT];
        $president = $params[Services::PARAM_PRESIDENT];

        $membership = $int['membership'];
        if(isset($membership) && !empty($membership)) {
            $membership = $membership[0];
        } else {
            $membership = null;
        }

        $this->dict = [
            'TITREETUDE' => $project->GetNumber(),
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'NOMINTERVENANT' => mb_strtoupper($int['int']->GetLastName(), 'UTF-8'), //Nom de l'intervenant, à faire plusieurs fois si plusieurs intervenants
            'PRENOMINTERVENANT' => $int['int']->GetFirstname(), //Prénom de l'intervenant
            'ADRESSEINTERVENANT' => $int['int']->GetAddress(), //Monsieur ou madame
            'CPINTERVENANT' => $int['int']->GetPostalCode(), //Code postal de l'intervenant
            'VILLEINTERVENANT' => $int['int']->GetCity(), //Ville intervenant
            'SECUINTERVENANT' => isset($membership) ? $membership->GetSecuNumber() : 'NUMERO SECU', //n° sécu intervenant
            'NOMUSER' => mb_strtoupper($chadaff->GetLastName(), 'UTF-8'),
            'PRENOMUSER' => $chadaff->GetFirstname() //Prenom du chadaff
        ];
    }

    private function __make_avenantrupturecc_dict($params)
    {
        $project = $params[Services::PARAM_PROJECT];
        $contact = $params[Services::PARAM_CONTACT];
        $president = $params[Services::PARAM_PRESIDENT];

        $this->dict = [
            'NOMENTREPRISE' => $project->GetFirmId()->GetName(),
            'ADRESSEENTREPRISE' => $project->GetFirmId()->GetAddress(), //adresse de l'etreprise
            'CPENTREPRISE' => $project->GetFirmId()->GetPostalCode(), //code postale de l'entreprise
            'VILLEENTREPRISE' => $project->GetFirmId()->GetCity(), //ville de l'entreprise
            'SIRETENTREPRISE' => $project->GetFirmId()->GetSIRET(), //siret de l'entreprise
            'TITREETUDE' => $project->GetNumber(),
            'CIVILITECONTACT' => $contact->GetGender(), //Monsieur ou madame
            'NOMCONTACT' => mb_strtoupper($contact->GetLastName(), 'UTF-8'), //Nom du client
            'PRENOMCONTACT' => $contact->GetFirstname(), //Prenom du client
            'FCTCONTACT' => $contact->GetRole(), //Fonction du contact
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstName() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT', //Nom du président
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
        ];
    }

    private function __make_avenantrupturerm_dict($params)
    {
        $project = $params[Services::PARAM_PROJECT];
        $int = $params[Services::PARAM_INT];
        $president = $params[Services::PARAM_PRESIDENT];
        $membership = $int['membership'];
        if(isset($membership) && !empty($membership)) {
            $membership = $membership[0];
        } else {
            $membership = null;
        }

        $this->dict = [
            'TITREETUDE' => $project->GetNumber(),
            'NUMINTERVENANT' => $int['details'][ProjectDBObject::COL_NUMBER], //Numero de l'intervenant
            'CIVILITEINTERVENANT' => $int['int']->GetGender(), //Monsieur ou madame
            'NOMINTERVENANT' => mb_strtoupper($int['int']->GetLastName(), 'UTF-8'), //Nom de l'intervenant, à faire plusieurs fois si plusieurs intervenants
            'PRENOMINTERVENANT' => $int['int']->GetFirstName(), //Prénom de l'intervenant
            'ADRESSEINTERVENANT' => $int['int']->GetAddress(), //Monsieur ou madame
            'CPINTERVENANT' => $int['int']->GetPostalCode(), //Code postal de l'intervenant
            'VILLEINTERVENANT' => $int['int']->GetCity(), //Ville intervenant
            'SECUINTERVENANT' => isset($membership) ? $membership->GetSecuNumber() : 'NUMERO SECU', //n° sécu intervenant
            'NOMPRESIDENT' => isset($president) ? $president->GetFirstName() . ' ' . mb_strtoupper($president->GetLastname(), 'UTF-8') : 'NOM PRESIDENT', //Nom du président
            'DJOUR' => date('d/m/Y'), //date actuelle au format 05/05/1994
        ];
    }

    private function datediffInWeeks($date1, $date2)
    {
        if($date1 > $date2) return $this->datediffInWeeks($date2, $date1);
        $first = DateTime::createFromFormat('Y-m-d', $date1);
        $second = DateTime::createFromFormat('Y-m-d', $date2);
        return floor($first->diff($second)->days/7);
    }

}