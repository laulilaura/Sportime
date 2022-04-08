#titre Sportime
Projet web Polytech Montpellier : Projet web  

__Projet se trouvant sur la branche master__  

*Vous devez créer une application web. Il n'y a aucune restriction quant aux technologies à utiliser (tant que vous justifiez votre choix dans votre rapport), ni au domaine d'activité (profitez-en !).*  
*Votre application,*  
  * - doit utiliser une base de données avec  
        *`* au moins 5 tables,`*      
  * - doit être conforme à REST (verbes, uri, etc.) ;  
  * - doit être évolutive ;    
  * - doit être déployé dans le cloud ;  
  * - doit être réactive (responsive design) ;  
  * - doit être sécurisée (attention à OWASP TOP10) ;  
  * - doit implémenter un CRUD ;  
  * - doit limiter l'accessibilité d'une partie uniquement aux utilisateurs autorisés (par exemple une section d'administration); *  
 
*Vous devez rédiger un document d'architecture technique (DAT).*  

*Vous devez remplir le formulaire ci-dessous et rendre votre dossier d'architecture avant le 28 mars 2022 à 23h55.*  

*Vous aurez une présentation orale le 1er avril. Soyez aussi professionnel que possible dans votre communication orale et écrite.*  

Projet : __Sportime__  
Application permettant à des utilisateurs de se creer un compte (ou se connecter) afin d'avoir accès à un profil personnel (où sont affichés leurs informations personnelles). L'utilisateur peut appartenir à une team, pratiquer des sports et connaître les entrainements proposés par d'autres utilisateurs. Un accès admionistrateur permet d'afficher tous les utilisateurs, et de créer et afficher une team, un sport et un spot.  
  
Un utilisateur a un id et un username unique.  
Une team a un id unique.  
Un sport a un id et un nom unique.  
Un spot a un id et un nom unique.  
Une pratique a un id unique et se base sur un utilisateur et un sport.  
Une presence a un id unique et se base sur un utilisateur, un sport et un spot.  
Chaque entraînement proposé se base sur une clef unique utilisateur-sport-spot.  

Rendez-vous sur [Sportime](https://polytech-sportime.herokuapp.com/) !  
