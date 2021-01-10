public with sharing class Chatters {
    
    @AuraEnabled
    public static string getSObjectType(Id recordId){

        Schema.SObjectType type = recordId.getSObjectType();
        Schema.DescribeSObjectResult res = type.getDescribe();
        return res.getName();
    }
    
    @AuraEnabled
    public static List<FeedItem> getChatters(String recordId, String sObjectType, List<String> fields){

        String soqlFields = String.join(fields, ',');

        SObject obj = getDynamicObject(sObjectType, soqlFields, recordId);

        List<String> ids = new List<String>{recordId};

        for(String field : fields){
            String value = (String) obj.get(field);
            if(!ids.contains(value)){ ids.add( value ); }
        }

        return [
            SELECT Id, Body, BestCommentId, CommentCount, LikeCount, Type, ParentId,
                (SELECT CommentBody FROM FeedComments)
            FROM FeedItem
            WHERE ParentId IN :ids
        ];
    }

    @AuraEnabled
    public static sObject getDynamicObject(String sObjectType, String soqlFields, String recordId){

        String soqlString = 'SELECT '+soqlFields+' FROM '+sObjectType+' WHERE Id = \''+recordId+'\'';

        sObject obj = Database.query(soqlString);

        return obj;
    }
}