using sap.cap.schema as my from '../../srv/Schema';
annotate my.Passageiro with @UI : { 
    SelectionFields  : [
        nome,
        email
    ],
    LineItem  : [{
        $Type : 'UI.DataField',
        Value : email,
        Label :'Email'
    },

    {
        $Type : 'UI.DataField',
        Value : nome,
        Label :'Nome'
    }
        
    ],
 };
