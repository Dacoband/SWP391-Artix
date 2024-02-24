CREATE DATABASE Artix ;
USE Artix ;

-- 1. Roles
CREATE TABLE Roles (
  RoleID INT PRIMARY KEY AUTO_INCREMENT,
  RoleName VARCHAR(255) NOT NULL,
  Description TEXT
);

-- 2. Tags
CREATE TABLE Tags (
  TagID INT PRIMARY KEY AUTO_INCREMENT,
  TagName VARCHAR(255) NOT NULL
);

-- 3. Follows
CREATE TABLE Follows (
  FollowerID INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE Creators (
  CreatorID INT PRIMARY KEY AUTO_INCREMENT,
  PaypalAccount INT,
  UserName VARCHAR(255) NOT NULL UNIQUE,
  Follower DOUBLE DEFAULT 0,
  FollowID INT, -- Thêm cột FollowID
  ProfilePicture BLOB,
  FirstName VARCHAR(255),
  LastName VARCHAR(255),
  Address VARCHAR(255),
  Phone VARCHAR(255),
  LastLogDate DATETIME,
  AllowCommission BOOLEAN DEFAULT 0,
  FOREIGN KEY (FollowID) REFERENCES Follows(FollowerID) -- Tạo khóa ngoại trên cột FollowID tham chiếu đến bảng Follows
);


-- 5. PayPalAccount
CREATE TABLE PayPalAccount (
  PayPalAccount INT PRIMARY KEY AUTO_INCREMENT,
  CreatorID INT NOT NULL UNIQUE,
  QR VARCHAR(255) NOT NULL,
  FOREIGN KEY (CreatorID) REFERENCES Creators(CreatorID)
);

-- 6. Account
CREATE TABLE Account (
  AccountID INT PRIMARY KEY AUTO_INCREMENT,
  RoleID INT NOT NULL,
  Username VARCHAR(255) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL UNIQUE,
  FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);

-- 8. Artworks
CREATE TABLE Artworks (
  ArtworkID INT PRIMARY KEY AUTO_INCREMENT,
  CreatorID INT NOT NULL,
  TagID INT,
  CategoryID INT,
  Description TEXT,
  DateCreated DATETIME NOT NULL,
  Likes INT DEFAULT 0,
  Purchasable BOOLEAN DEFAULT 0,
  Price DOUBLE,
  FOREIGN KEY (CreatorID) REFERENCES Creators(CreatorID),
  FOREIGN KEY (TagID) REFERENCES Tags(TagID)
);

-- 9. Comments
CREATE TABLE Comments (
  CommentID INT PRIMARY KEY AUTO_INCREMENT,
  CreatorID INT NOT NULL,
  ArtworkID INT NOT NULL,
  CommentText TEXT NOT NULL,
  DateCreated DATETIME NOT NULL,
  FOREIGN KEY (CreatorID) REFERENCES Creators(CreatorID),
  FOREIGN KEY (ArtworkID) REFERENCES Artworks(ArtworkID)
);
-- 10. Reports
CREATE TABLE Reports (
  ReportID INT PRIMARY KEY AUTO_INCREMENT,
  ArtWorkID INT,
  CommentID INT,
  CreatorID INT,
  FOREIGN KEY (ArtWorkID) REFERENCES Artworks(ArtworkID),
  FOREIGN KEY (CommentID) REFERENCES Comments(CommentID),
  FOREIGN KEY (CreatorID) REFERENCES Creators(CreatorID)
);

-- 7. Moderators
CREATE TABLE Moderators (
  ModeratorID INT PRIMARY KEY AUTO_INCREMENT,
  ReportID INT,
  AccountID INT NOT NULL,
  FOREIGN KEY (ReportID) REFERENCES Reports(ReportID),
  FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);

-- 11. Notification
CREATE TABLE Notification (
  NotificationID INT PRIMARY KEY AUTO_INCREMENT, -- Thêm một cột NotificationID là khóa chính
  FollowID INT,
  CreatorID INT NOT NULL,
  ArtworkID INT,
  View BOOLEAN DEFAULT 0,
  FOREIGN KEY (FollowID) REFERENCES Follows(FollowerID),
  FOREIGN KEY (CreatorID) REFERENCES Creators(CreatorID),
  FOREIGN KEY (ArtworkID) REFERENCES Artworks(ArtworkID)
);


-- 12. ViewReport
CREATE TABLE ViewReport (
  ModeratorID INT NOT NULL,
  ReportID INT NOT NULL,
  PRIMARY KEY (ModeratorID, ReportID),
  FOREIGN KEY (ModeratorID) REFERENCES Moderators(ModeratorID),
  FOREIGN KEY (ReportID) REFERENCES Reports(ReportID)
);

-- 13. Orders
CREATE TABLE Orders (
  OrderID INT PRIMARY KEY AUTO_INCREMENT,
  CreatorID INT NOT NULL,
  FOREIGN KEY (CreatorID) REFERENCES Creators(CreatorID)
);

-- 14. OrderDetail
CREATE TABLE OrderDetail (
  OrderID INT NOT NULL,
  ArtworkID INT NOT NULL,
  DateOfPurchase DATETIME NOT NULL,
  Price DOUBLE NOT NULL,
  PRIMARY KEY (OrderID, ArtworkID),
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
  FOREIGN KEY (ArtworkID) REFERENCES Artworks(ArtworkID)
);

-- 15. Commission
CREATE TABLE Commission (
  CommissionID INT PRIMARY KEY AUTO_INCREMENT
);

-- 16. CommissionForm
CREATE TABLE CommissionForm (
  CommissionFormID INT PRIMARY KEY AUTO_INCREMENT,
  CommissionID INT NOT NULL,
  ReceiverID INT NOT NULL,
  RequestorID INT NOT NULL,
  Description TEXT,
  FOREIGN KEY (CommissionID) REFERENCES Commission(CommissionID),
  FOREIGN KEY (ReceiverID) REFERENCES Creators(CreatorID),
  FOREIGN KEY (RequestorID) REFERENCES Creators(CreatorID)
);
