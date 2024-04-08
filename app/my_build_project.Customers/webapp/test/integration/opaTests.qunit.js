sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'mybuildproject/Customers/test/integration/FirstJourney',
		'mybuildproject/Customers/test/integration/pages/CustomersList',
		'mybuildproject/Customers/test/integration/pages/CustomersObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomersList, CustomersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('mybuildproject/Customers') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCustomersList: CustomersList,
					onTheCustomersObjectPage: CustomersObjectPage
                }
            },
            opaJourney.run
        );
    }
);