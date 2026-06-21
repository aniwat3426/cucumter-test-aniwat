Feature: Create Employee API

  Scenario: Create employee successfully
    Given I have employee payload
    When I send POST request to create employee
    Then the response status should be 201


  Scenario: Create employee with invalid email should return 400
    Given I have employee payload with invalid email
    When I send POST request to create employee
    Then the response status should be 400
    And the response should contain email validation error


  Scenario: Get employee successfully
    Given I have employee id 11
    When I send GET request for employee
    Then the response status should be 200
    And the response should contain correct employee data


  Scenario: Get employee with empty id should return error
    Given I have empty employee id
    When I send GET request with empty id
    Then the response status should be 404
