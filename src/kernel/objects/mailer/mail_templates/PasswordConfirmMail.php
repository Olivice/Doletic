<?php

require_once "objects/mailer/MailTemplate.php";

class PasswordConfirmMail extends MailTemplate
{

    // -- consts
    const NAME = 'password_confirm_mail';
    // -- attributes

    // -- functions

    public function __construct()
    {
        parent::__construct(
        //__________________________________________________________________________________________________________________________________________
        // -- subject ------------------------------------------------------------------------------------------------------------------------------
            "[Doletic] - Mot de passe réinitialisé !",
            //__________________________________________________________________________________________________________________________________________
            // -- plain text body ----------------------------------------------------------------------------------------------------------------------
            "Bonjour -{PRENOM}-, \n" .
            "\n" .
            "Ton mot de passe a bien été réinitilisé !\n" .
            "\n" .
            "Ton nouveau mot de passe est :\n" .
            "\n" .
            "-{PASSWORD}-\n" .
            "\n" .
            "Change-le sur Doletic pour mettre à jour celui de ton adresse mail.\n" .
            "\n" .
            "À bientôt sur Doletic !\n",
            //__________________________________________________________________________________________________________________________________________
            // -- plain text body ----------------------------------------------------------------------------------------------------------------------
            "Bonjour -{PRENOM}-, <br>" .
            "<br>" .
            "Ton mot de passe a bien été réinitilisé !<br>" .
            "<br>" .
            "Ton nouveau mot de passe est :<br>" .
            "<br>" .
            "-{PASSWORD}-<br>" .
            "<br>" .
            "Change-le sur Doletic pour mettre à jour celui de ton adresse mail.<br>" .
            "<br>" .
            "À bientôt sur Doletic !<br>",
            //__________________________________________________________________________________________________________________________________________
            // attachments -----------------------------------------------------------------------------------------------------------------------------
            array() // no attachment here
        );
    }
}