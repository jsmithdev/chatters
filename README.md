# chatters (POC)

View chatter posts from related records

![screenshot](https://i.imgur.com/iE1SK5y.png)

[todo] Cleaner idea for separation of sobjects

![image](https://github.com/user-attachments/assets/b49bc4ce-1dc6-4987-a230-a65e4078f12e)


## Notes

Tested on Account

Uses lookup fields (references) on the sobject of record (not childRelationships)

There will be ones you want to ignore. Account has a reference of CloneSourceId for instance. Made a util with ignore array for now

With childRelationships, there would likely be many more to ignore (Account has 64 in my dev org)

## Deploy

Click to deploy can be done at [https://component.land?share=jsmithdev%2Fchatters](https://component.land?share=jsmithdev%2Fchatters)

SFDX deployment instructions can be found at [https://github.com/jsmithdev/sfdx-deploy-instructions](https://github.com/jsmithdev/sfdx-deploy-instructions)

---

coded while petting a 🐶 by [Jamie Smith](https://jsmith.dev)

