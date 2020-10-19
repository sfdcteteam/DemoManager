public with sharing class AppController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAppList() {
        return [
            SELECT Id, Name 
            FROM Account
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }
}
