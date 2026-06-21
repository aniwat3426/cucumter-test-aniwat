Feature: QA Practice
  Verify Ecommerce - Login, Add to Cart, Submit order, Logout

  Scenario: Step1 - Login 
    Given I open the Login Shop page
    When I attempt to login with email "wrong@example.com" and password "wrongpass"
    Then I should see a login error message
    When I attempt to login with email "admin@admin.com" and password "admin123"
    Then I should see login success
    
  Scenario: Step2 - Add to Cart
    Given Select Items correctly by following
    When Select "Dior J'adore" for "2" units to Cart
    Then Cart should display "Dior J'adore" for "2" units
    When Select "Gucci Bloom Eau de" for "3" units to Cart
    Then Cart should display "Gucci Bloom Eau de" for "3" units
    When Calculate The total cost by using price x quality
    Then Total cost should display result correctly


  Scenario: Step3 - Shopping Details
    Given Display Shopping Details page
    When Enter blank value to all fields
    Then Should see inline error message
    When Enter valid value to all fields
    Then Should see Street, city - Country format