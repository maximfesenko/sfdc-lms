public with sharing class QueryService {
	@AuraEnabled
	public static List<Contact> getContacts() {
		return [SELECT Name, Email, Description FROM Contact LIMIT 1000];
	}
}