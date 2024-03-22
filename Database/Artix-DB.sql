

CREATE TABLE "Account" (
  "AccountID" int NOT NULL AUTO_INCREMENT,
  "RoleID" int NOT NULL,
  "Password" varchar(255) NOT NULL,
  "Email" varchar(255) NOT NULL,
  PRIMARY KEY ("AccountID"),
  UNIQUE KEY "Email" ("Email"),
  KEY "FK_RoleID" ("RoleID"),
  CONSTRAINT "FK_RoleID" FOREIGN KEY ("RoleID") REFERENCES "Roles" ("RoleID") ON DELETE CASCADE
);
CREATE TABLE "ArtworkTag" (
  "ArtworkTagID" int NOT NULL AUTO_INCREMENT,
  "ArtworkID" int NOT NULL,
  "TagID" int NOT NULL,
  PRIMARY KEY ("ArtworkTagID"),
  KEY "FK_ArtworkTag_Artwork" ("ArtworkID"),
  KEY "FK_ArtworkTag_Tag" ("TagID"),
  CONSTRAINT "FK_ArtworkTag_Artworks" FOREIGN KEY ("ArtworkID") REFERENCES "Artworks" ("ArtworkID"),
  CONSTRAINT "FK_ArtworkTag_Tag" FOREIGN KEY ("TagID") REFERENCES "Tags" ("TagID")
);
CREATE TABLE "Artworks" (
  "ArtworkID" int NOT NULL AUTO_INCREMENT,
  "CreatorID" int NOT NULL,
  "ArtworkName" varchar(255) DEFAULT NULL,
  "Description" text,
  "DateCreated" datetime NOT NULL,
  "Likes" int DEFAULT '0',
  "Purchasable" tinyint(1) DEFAULT '0',
  "Price" double DEFAULT NULL,
  "ImageFile" longtext,
  PRIMARY KEY ("ArtworkID"),
  KEY "CreatorID" ("CreatorID")
);

CREATE TABLE "Comments" (
  "CommentID" int NOT NULL AUTO_INCREMENT,
  "CreatorID" int NOT NULL,
  "ArtworkID" int NOT NULL,
  "CommentText" text NOT NULL,
  "DateCreated" datetime NOT NULL,
  PRIMARY KEY ("CommentID"),
  KEY "CreatorID" ("CreatorID"),
  KEY "ArtworkID" ("ArtworkID"),
  CONSTRAINT "Comments_ibfk_1" FOREIGN KEY ("CreatorID") REFERENCES "Creators" ("CreatorID"),
  CONSTRAINT "Comments_ibfk_2" FOREIGN KEY ("ArtworkID") REFERENCES "Artworks" ("ArtworkID")
);

CREATE TABLE "Commission" (
  "CommissionID" int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY ("CommissionID")
);

CREATE TABLE "CommissionForm" (
  "CommissionFormID" int NOT NULL AUTO_INCREMENT,
  "CommissionID" int NOT NULL,
  "ReceiverID" int NOT NULL,
  "RequestorID" int NOT NULL,
  "Description" text,
  PRIMARY KEY ("CommissionFormID"),
  KEY "CommissionID" ("CommissionID"),
  KEY "ReceiverID" ("ReceiverID"),
  KEY "RequestorID" ("RequestorID"),
  CONSTRAINT "CommissionForm_ibfk_1" FOREIGN KEY ("CommissionID") REFERENCES "Commission" ("CommissionID"),
  CONSTRAINT "CommissionForm_ibfk_2" FOREIGN KEY ("ReceiverID") REFERENCES "Creators" ("CreatorID"),
  CONSTRAINT "CommissionForm_ibfk_3" FOREIGN KEY ("RequestorID") REFERENCES "Creators" ("CreatorID")
);

CREATE TABLE "Creators" (
  "CreatorID" int NOT NULL AUTO_INCREMENT,
  "PayPalAccountID" int DEFAULT NULL,
  "UserName" varchar(255) NOT NULL,
  "ProfilePicture" longtext,
  "FirstName" varchar(255) DEFAULT NULL,
  "LastName" varchar(255) DEFAULT NULL,
  "Address" varchar(255) DEFAULT NULL,
  "Phone" varchar(255) DEFAULT NULL,
  "LastLogDate" datetime DEFAULT NULL,
  "AllowCommission" tinyint(1) DEFAULT '0',
  "AccountID" int DEFAULT NULL,
  "Biography" text,
  "VIP" tinyint(1) DEFAULT '0',
  "FollowCounts" int DEFAULT NULL,
  "BackgroundPicture" longtext,
  "Email" varchar(255) NOT NULL,
  PRIMARY KEY ("CreatorID"),
  UNIQUE KEY "UserName" ("UserName"),
  UNIQUE KEY "FK_AccountID" ("AccountID"),
  KEY "FK_PayPalAccountID" ("PayPalAccountID"),
  CONSTRAINT "FK_AccountID" FOREIGN KEY ("AccountID") REFERENCES "Account" ("AccountID") ON DELETE CASCADE,
  CONSTRAINT "FK_PayPalAccountID" FOREIGN KEY ("PayPalAccountID") REFERENCES "PayPalAccount" ("PayPalAccountID") ON DELETE SET NULL
);

CREATE TABLE "Follows" (
  "FollowID" int NOT NULL AUTO_INCREMENT,
  "FollowerID" int DEFAULT NULL,
  "CreatorID" int DEFAULT NULL,
  PRIMARY KEY ("FollowID"),
  KEY "FollowerID" ("FollowerID"),
  KEY "CreatorID" ("CreatorID"),
  CONSTRAINT "Follows_ibfk_1" FOREIGN KEY ("FollowerID") REFERENCES "Creators" ("CreatorID"),
  CONSTRAINT "Follows_ibfk_2" FOREIGN KEY ("CreatorID") REFERENCES "Creators" ("CreatorID")
);

CREATE TABLE "Moderators" (
  "ModeratorID" int NOT NULL AUTO_INCREMENT,
  "ReportID" int DEFAULT NULL,
  "AccountID" int NOT NULL,
  PRIMARY KEY ("ModeratorID"),
  KEY "ReportID" ("ReportID"),
  KEY "AccountID" ("AccountID"),
  CONSTRAINT "Moderators_ibfk_1" FOREIGN KEY ("ReportID") REFERENCES "Reports" ("ReportID"),
  CONSTRAINT "Moderators_ibfk_2" FOREIGN KEY ("AccountID") REFERENCES "Account" ("AccountID")
);


CREATE TABLE "Notification" (
  "NotificationID" int NOT NULL AUTO_INCREMENT,
  "FollowID" int DEFAULT NULL,
  "CreatorID" int NOT NULL,
  "ArtworkID" int DEFAULT NULL,
  "View" tinyint(1) DEFAULT '0',
  PRIMARY KEY ("NotificationID"),
  KEY "FollowID" ("FollowID"),
  KEY "CreatorID" ("CreatorID"),
  KEY "Notification_ibfk_3" ("ArtworkID"),
  CONSTRAINT "Notification_ibfk_1" FOREIGN KEY ("FollowID") REFERENCES "Follows" ("FollowID"),
  CONSTRAINT "Notification_ibfk_2" FOREIGN KEY ("CreatorID") REFERENCES "Creators" ("CreatorID"),
  CONSTRAINT "Notification_ibfk_3" FOREIGN KEY ("ArtworkID") REFERENCES "Artworks" ("ArtworkID")
);

CREATE TABLE "OrderDetail" (
  "OrderDetailID" int NOT NULL AUTO_INCREMENT,
  "OrderID" int NOT NULL,
  "ArtworkID" int NOT NULL,
  "DateOfPurchase" datetime NOT NULL,
  "Price" double NOT NULL,
  PRIMARY KEY ("OrderDetailID"),
  KEY "OrderID" ("OrderID"),
  KEY "OrderDetail_ibfk_2" ("ArtworkID"),
  CONSTRAINT "OrderDetail_ibfk_1" FOREIGN KEY ("OrderID") REFERENCES "Orders" ("OrderID"),
  CONSTRAINT "OrderDetail_ibfk_2" FOREIGN KEY ("ArtworkID") REFERENCES "Artworks" ("ArtworkID")
);

CREATE TABLE "Orders" (
  "OrderID" int NOT NULL AUTO_INCREMENT,
  "CreatorID" int NOT NULL,
  PRIMARY KEY ("OrderID"),
  KEY "CreatorID" ("CreatorID"),
  CONSTRAINT "Orders_ibfk_1" FOREIGN KEY ("CreatorID") REFERENCES "Creators" ("CreatorID")
);

CREATE TABLE "PayPalAccount" (
  "PayPalAccountID" int NOT NULL,
  "QR" varchar(255) NOT NULL,
  PRIMARY KEY ("PayPalAccountID")
);

CREATE TABLE "ReplyComments" (
  "ReplyCommentID" int NOT NULL AUTO_INCREMENT,
  "CommentID" int NOT NULL,
  "ReplierID" int NOT NULL,
  "ReplyText" text NOT NULL,
  "DateReplied" datetime NOT NULL,
  PRIMARY KEY ("ReplyCommentID"),
  KEY "CommentID" ("CommentID"),
  KEY "ReplierID" ("ReplierID"),
  CONSTRAINT "ReplyComments_ibfk_1" FOREIGN KEY ("CommentID") REFERENCES "Comments" ("CommentID"),
  CONSTRAINT "ReplyComments_ibfk_2" FOREIGN KEY ("CommentID") REFERENCES "Comments" ("CommentID") ON DELETE CASCADE
);

CREATE TABLE "Reports" (
  "ReportID" int NOT NULL AUTO_INCREMENT,
  "ArtWorkID" int DEFAULT NULL,
  "CommentID" int DEFAULT NULL,
  "CreatorID" int DEFAULT NULL,
  PRIMARY KEY ("ReportID"),
  KEY "CreatorID" ("CreatorID"),
  KEY "Reports_ibfk_2" ("CommentID"),
  KEY "Reports_ibfk_1" ("ArtWorkID"),
  CONSTRAINT "Reports_ibfk_1" FOREIGN KEY ("ArtWorkID") REFERENCES "Artworks" ("ArtworkID"),
  CONSTRAINT "Reports_ibfk_2" FOREIGN KEY ("CommentID") REFERENCES "Comments" ("CommentID") ON DELETE CASCADE,
  CONSTRAINT "Reports_ibfk_3" FOREIGN KEY ("CreatorID") REFERENCES "Creators" ("CreatorID")
);

CREATE TABLE "Roles" (
  "RoleID" int NOT NULL AUTO_INCREMENT,
  "RoleName" varchar(255) NOT NULL,
  "Description" text,
  PRIMARY KEY ("RoleID")
);

CREATE TABLE "Tags" (
  "TagID" int NOT NULL AUTO_INCREMENT,
  "TagName" varchar(255) NOT NULL,
  PRIMARY KEY ("TagID")
);

CREATE TABLE "ViewReport" (
  "ViewReportID" int NOT NULL AUTO_INCREMENT,
  "ModeratorID" int NOT NULL,
  "ReportID" int NOT NULL,
  PRIMARY KEY ("ViewReportID"),
  KEY "ModeratorID" ("ModeratorID"),
  KEY "ReportID" ("ReportID"),
  CONSTRAINT "ViewReport_ibfk_1" FOREIGN KEY ("ModeratorID") REFERENCES "Moderators" ("ModeratorID"),
  CONSTRAINT "ViewReport_ibfk_2" FOREIGN KEY ("ReportID") REFERENCES "Reports" ("ReportID")
);