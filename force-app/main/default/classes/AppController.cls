public with sharing class AppController {
    @AuraEnabled(cacheable=true)
    public static List<App__c> getAppList(Integer offset, Integer pagesize) {
        List<App__c> appList = new List<App__c>();
        try{
            offset = (offset == null)? 0 : offset;
            pagesize = (pagesize == null)? 10 : pagesize;
            appList = [
                SELECT Id, Name, Details__c, Deploy_URL__c
                FROM App__c
                WHERE Active__c = True
                WITH SECURITY_ENFORCED
                LIMIT :pagesize  OFFSET :offset
            ];
        }catch(Exception e){

            DMUtils.log('AppController:getAppList(): ' + e.getMessage());
            // How rude! Gracefully return an error...
            throw new AuraHandledException('Some error occured while retrieving App Records');
        }
        return appList;
    }

    @AuraEnabled
    public static Integer totalRecords(){
        return [
            SELECT count()
            FROM App__c
            WHERE Active__c = True
            WITH SECURITY_ENFORCED
        ];
    }
}
