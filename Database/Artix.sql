CREATE DATABASE Artix;

USE Artix;

-- Create Tables in specific order to avoid foreign key errors

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

-- 3. Creators
CREATE TABLE Creators (
  CreatorID INT PRIMARY KEY AUTO_INCREMENT,
  FollowID INT,
  PaypalAccount INT FOREIGN KEY REFERENCES PayPalAccount(PayPalAccount),
  UserName VARCHAR(255) NOT NULL UNIQUE,
  Follower DOUBLE DEFAULT 0,
  ProfilePicture BLOB,
  FirstName VARCHAR(255),
  LastName VARCHAR(255),
  Address VARCHAR(255),
  Phone VARCHAR(255),
  LastLogDate DATETIME,
  AllowCommission BOOLEAN DEFAULT 0,
  FOREIGN KEY (FollowID) REFERENCES Follows(FollowerID)
);

-- 4. PayPalAccount
CREATE TABLE PayPalAccount (
  PayPalAccount INT PRIMARY KEY AUTO_INCREMENT,
  CreatorID INT NOT NULL UNIQUE,
  QR VARCHAR(255) NOT NULL,
  FOREIGN KEY (CreatorID) REFERENCES Creators(CreatorID)
);

-- 5. Account
CREATE TABLE Account (
  AccountID INT PRIMARY KEY AUTO_INCREMENT,
  RoleID INT NOT NULL FOREIGN KEY REFERENCES Roles(RoleID),
  IdRole INT, -- Redundant field, can be removed
  Username VARCHAR(255) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL UNIQUE,
  FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);

-- 6. Moderators
CREATE TABLE Moderators (
  ModeratorID INT PRIMARY KEY AUTO_INCREMENT,
  ReportID INT,
  AccountID INT NOT NULL FOREIGN KEY REFERENCES Account(AccountID),
  FOREIGN KEY (ReportID) REFERENCES Reports(ReportID)
);

-- 7. Artworks
CREATE TABLE Artworks (
  ArtworkID INT PRIMARY KEY AUTO_INCREMENT,
  CreatorID INT NOT NULL FOREIGN KEY REFERENCES Creators(CreatorID),
  TagID INT FOREIGN KEY REFERENCES Tags(TagID),
  CategoryID INT, -- Not defined in provided schema
  Description TEXT,
  DateCreated DATETIME NOT NULL,
  Likes INT DEFAULT 0,
  Purchasable BOOLEAN DEFAULT 0,
  Price DOUBLE
);

-- 8. Comments
CREATE TABLE Comments (
  CommentID INT PRIMARY KEY AUTO_INCREMENT,
  CreatorID INT NOT NULL FOREIGN KEY REFERENCES Creators(CreatorID),
  ArtworkID INT NOT NULL FOREIGN KEY REFERENCES Artworks(ArtworkID),
  CommentText TEXT NOT NULL,
  DateCreated DATETIME NOT NULL
);

-- 9. Reports
CREATE TABLE Reports (
  ReportID INT PRIMARY KEY AUTO_INCREMENT,
  ArtWorkID INT FOREIGN KEY REFERENCES Artworks(ArtworkID),
  CommentID INT FOREIGN KEY REFERENCES Comments(CommentID),
  CreatorID INT FOREIGN KEY REFERENCES Creators(CreatorID)
);

-- 10. Follows
CREATE TABLE Follows (
  FollowerID INT PRIMARY KEY AUTO_INCREMENT
);

-- 11. Notification
CREATE TABLE Notification (
  FollowID INT FOREIGN KEY REFERENCES Follows(FollowerID),
  CreatorID INT NOT NULL FOREIGN KEY REFERENCES Creators(CreatorID),
  ArtworkID INT,
  View BOOLEAN DEFAULT 0,
  FOREIGN KEY (ArtworkID) REFERENCES Artworks(ArtworkID)
);

-- 12. ViewReport
CREATE TABLE ViewReport (
  ModeratorID INT NOT NULL FOREIGN KEY REFERENCES Moderators(ModeratorID),
  ReportID INT NOT NULL FOREIGN KEY REFERENCES Reports(ReportID),
  PRIMARY KEY (ModeratorID, ReportID)
);

-- 13. Orders
CREATE TABLE Orders (
  OrderID INT PRIMARY KEY AUTO_INCREMENT,
  CreatorID INT NOT NULL FOREIGN KEY REFERENCES Creators(CreatorID)
);

-- 14. OrderDetail
CREATE TABLE OrderDetail (
  OrderID INT NOT NULL FOREIGN KEY REFERENCES Orders(OrderID),
  ArtworkID INT NOT NULL FOREIGN KEY REFERENCES Artworks(ArtworkID),
  DateOfPurchase DATETIME NOT NULL,
  Price DOUBLE NOT NULL,
  PRIMARY KEY (OrderID, ArtworkID)
);

-- 15. Commission
CREATE TABLE Commission (
  CommissionID INT PRIMARY KEY AUTO_INCREMENT
);

-- 16. CommissionForm
CREATE TABLE CommissionForm (
  CommissionID INT NOT NULL
FOREIGN KEY REFERENCES Commission(CommissionID),
  ReceiverID INT NOT NULL FOREIGN KEY REFERENCES Creators(CreatorID),
  RequestorID INT NOT NULL FOREIGN KEY REFERENCES Creators(CreatorID),
  Description TEXT
);

-- Các ràng buộc khóa ngoại đã được thiết lập trong các câu lệnh CREATE TABLE.

-- Chèn dữ liệu mẫu (tùy chọn)

-- Ví dụ: thêm một vài vai trò

-- INSERT INTO Roles (RoleName, Description) VALUES
--   ('Artist', 'Người sáng tạo nội dung'),
--   ('Customer', 'Khách hàng'),
--   ('Admin', 'Quản trị viên');

-- Thêm dữ liệu cho các bảng khác theo cách tương tự

