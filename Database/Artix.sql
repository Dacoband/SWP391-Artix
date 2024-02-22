-- Tạo database Artix
CREATE DATABASE Artix;

-- Sử dụng database Artix
USE Artix;

-- Tạo bảng ViewReport
CREATE TABLE ViewReport (
  ModeratorID INT NOT NULL, -- Khóa ngoại đến bảng Moderators (chưa tạo)
  ReportID INT NOT NULL, -- Khóa ngoại đến bảng Reports (đã tạo)
  PRIMARY KEY (ModeratorID, ReportID),
  FOREIGN KEY (ModeratorID) REFERENCES Moderators(ModeratorID),
  FOREIGN KEY (ReportID) REFERENCES Reports(ReportID)
);

-- Tạo bảng Reports
CREATE TABLE Reports (
  ReportID INT NOT NULL AUTO_INCREMENT, -- Khóa chính
  ArtWorkID INT NOT NULL, -- Khóa ngoại đến bảng ArtWork (chưa tạo)
  CommentID INT, -- Khóa ngoại đến bảng Comments (đã tạo), có thể null
  CreatorID INT NOT NULL, -- Khóa ngoại đến bảng Creators (đã tạo)
  PRIMARY KEY (ReportID),
  FOREIGN KEY (ArtWorkID) REFERENCES ArtWork(ArtWorkID),
  FOREIGN KEY (CommentID) REFERENCES Comments(CommentID),
  FOREIGN KEY (CreatorID) REFERENCES Creators(CreatorID)
);

-- Tạo bảng Follows
CREATE TABLE Follows (
  FollowerID INT NOT NULL AUTO_INCREMENT, -- Khóa chính
  PRIMARY KEY (FollowerID)
);

-- Tạo bảng Notification
CREATE TABLE Notification (
  FollowID INT NOT NULL, -- Khóa ngoại đến bảng Follows (đã tạo)
  CreatorID INT NOT NULL, -- Khóa ngoại đến bảng Creators (đã tạo)
  ArtWorkID INT, -- Khóa ngoại đến bảng ArtWork (chưa tạo), có thể null
  View BOOLEAN NOT NULL, -- Kiểu bool
  PRIMARY KEY (FollowID),
  FOREIGN KEY (FollowID) REFERENCES Follows(FollowID),
  FOREIGN KEY (CreatorID) REFERENCES Creators(CreatorID),
  FOREIGN KEY (ArtWorkID) REFERENCES ArtWork(ArtWorkID)
);

-- Tạo bảng Creators
CREATE TABLE Creators (
  CreatorID INT NOT NULL AUTO_INCREMENT, -- Khóa chính
  FollowID INT, -- Khóa ngoại đến bảng Follows (đã tạo), có thể null
  PayPalAccountID INT, -- Khóa ngoại đến bảng PayPalAccount (chưa tạo)
  Username VARCHAR(255) NOT NULL UNIQUE, -- Username duy nhất
  FollowerCount INT DEFAULT 0, -- Số người theo dõi
  ProfilePicture BLOB, -- Ảnh đại diện (kiểu dữ liệu BLOB)
  FirstName VARCHAR(255) NOT NULL,
  LastName VARCHAR(255) NOT NULL,
  Address VARCHAR(255),
  Phone VARCHAR(255),
  LastLogDate DATETIME,
  AllowCommission BOOLEAN DEFAULT 0, -- Kiểu bool
  PRIMARY KEY (CreatorID),
  FOREIGN KEY (FollowID) REFERENCES Follows(FollowID),
  FOREIGN KEY (PayPalAccountID) REFERENCES PayPalAccount(PayPalAccountID)
);

CREATE TABLE Comments (
  CommentID INT NOT NULL AUTO_INCREMENT, -- Khóa chính
  CreatorID INT NOT NULL, -- Khóa ngoại đến bảng Creators (đã tạo)
  ArtWorkID INT NOT NULL, -- Khóa ngoại đến bảng ArtWork (đã tạo)
  CommentText VARCHAR(1000) NOT NULL, -- Nội dung bình luận
  DateCreated DATETIME NOT NULL, -- Ngày tạo bình luận
  PRIMARY KEY (CommentID),
  FOREIGN KEY (CreatorID) REFERENCES Creators(CreatorID),
  FOREIGN KEY (ArtWorkID) REFERENCES ArtWork(ArtWorkID)
);

CREATE TABLE Orders (
  OrderID INT NOT NULL AUTO_INCREMENT, -- Khóa chính
  CreatorID INT NOT NULL, -- Khóa ngoại đến bảng Creators (đã tạo)
  DateCreated DATETIME NOT NULL, -- Ngày tạo đơn hàng
  OrderStatus VARCHAR(255) NOT NULL, -- Trạng thái đơn hàng
  ShippingAddress VARCHAR(255), -- Địa chỉ giao hàng
  ShippingMethod VARCHAR(255), -- Phương thức giao hàng
  ShippingCost DECIMAL(10,2), -- Chi phí vận chuyển
  TotalCost DECIMAL(10,2) NOT NULL, -- Tổng chi phí
  PRIMARY KEY (OrderID),
  FOREIGN KEY (CreatorID) REFERENCES Creators(CreatorID)
);

CREATE TABLE OrderDetail (
  OrderID INT NOT NULL, -- Khóa ngoại đến bảng Orders (đã tạo)
  ArtWorkID INT NOT NULL, -- Khóa ngoại đến bảng ArtWork (đã tạo)
  Quantity INT NOT NULL, -- Số lượng sản phẩm
  Price DECIMAL(10,2) NOT NULL, -- Giá sản phẩm
  PRIMARY KEY (OrderID, ArtWorkID),
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
  FOREIGN KEY (ArtWorkID) REFERENCES ArtWork(ArtWorkID)
);

CREATE TABLE Commission (
  CommissionID INT NOT NULL AUTO_INCREMENT, -- Khóa chính
  CreatorID INT NOT NULL, -- Khóa ngoại đến bảng Creators (đã tạo)
  ArtWorkID INT NOT NULL, -- Khóa ngoại đến bảng ArtWork (đã tạo)
  Description VARCHAR(1000), -- Mô tả hoa hồng
  Amount DECIMAL(10,2) NOT NULL, -- Số tiền hoa hồng
  DateRequested DATETIME, -- Ngày yêu cầu hoa hồng
  DatePaid DATETIME, -- Ngày thanh toán hoa hồng
  Status VARCHAR(255) NOT NULL, -- Trạng thái hoa hồng
  PRIMARY KEY (CommissionID),
  FOREIGN KEY (CreatorID) REFERENCES Creators(CreatorID),
  FOREIGN KEY (ArtWorkID) REFERENCES ArtWork(ArtWorkID)
);

CREATE TABLE CommissionForm (
  CommissionID INT NOT NULL, -- Khóa ngoại đến bảng Commission (đã tạo)
  RequestorID INT NOT NULL, -- Khóa ngoại đến bảng Creators (đã tạo)
  Description VARCHAR(1000), -- Mô tả yêu cầu hoa hồng
  DateSubmitted DATETIME NOT NULL, -- Ngày gửi yêu cầu hoa hồng
  PRIMARY KEY (CommissionID),
  FOREIGN KEY (CommissionID) REFERENCES Commission(CommissionID),
  FOREIGN KEY (RequestorID) REFERENCES Creators(CreatorID)
);

CREATE TABLE Moderators (
  ModeratorID INT NOT NULL AUTO_INCREMENT, -- Khóa chính
  AccountID INT NOT NULL, -- Khóa ngoại đến bảng Account (chưa tạo)
  PRIMARY KEY (ModeratorID),
  FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);

CREATE TABLE Account (
  AccountID INT NOT NULL AUTO_INCREMENT, -- Khóa chính
  RoleID INT NOT NULL, -- Khóa ngoại đến bảng Roles (chưa tạo)
  Type VARCHAR(255) NOT NULL, -- Loại tài khoản
  Username VARCHAR(255) NOT NULL UNIQUE, -- Username duy nhất
  Password VARCHAR(255) NOT NULL, -- Mật khẩu
  Email VARCHAR(255) NOT NULL, -- Email
  PRIMARY KEY (AccountID),
  FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);


