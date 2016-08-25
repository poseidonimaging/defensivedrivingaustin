$(document).ready(function() {
 var Parse = require('parse').Parse;
 Parse.initialize("X2QC5PaGsSESgfRRMzogPuMPDItgkkKyEVUaMabP", "oLQ2KQjMrQ5SAqjGCmkY8kyHNENINZfp2mTJ0uJL");

 var handler = StripeCheckout.configure({
     key: 'pk_test_zsWXe67nkzOTaAidhEWZ1lV9',
     image: '/img/documentation/checkout/marketplace.png',
     token: function(token) {
         Parse.Cloud.run("stripeCharge", token.id, {
             success: function(object) {
                 $('#response').html('Successful Charge!').addClass('success').fadeIn('fast');
             },

             error: function(object, error) {
                 console.log(error);
                 $('#response').html('Error! Card Not Charged!').addClass('error').fadeIn('fast');
             }
         });
     }   
  });
});

 $('#customButton').on('click', function(e) {
     // Open Checkout with further options
     handler.open({
         name: 'Matthew Arkin',
         description: '2 widgets',
         zipCode: true,
         amount: 2000
     });
     e.preventDefault();
 });

 // Close Checkout on page navigation
 $(window).on('popstate', function() {
     handler.close();
 });