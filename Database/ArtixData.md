Dựa vào thông tin từ hình ảnh, đây là cấu trúc cơ sở dữ liệu và luồng quyết định cho ứng dụng:

### Cơ Sở Dữ Liệu

**Bảng:**
- ViewReport
  - FK: ModeratorID (int)
  - FK: ReportID (int)
- Reports
  - PK: ReportID  (int)
  - FK: ArtWorkID (int)
  - FK: CommentID (int)
  - FK: CreatorID (int)
- Follows
  - PK: FollowerID (int)
- Notification
  - FK: FollowID  (int)
  - FK: CreatorID (int)
  - FK: ArtWorkID (int)
  - View    (boolean)
- Creators
  - PK: CreatorID (int)
  - FK: FollowID (int)
  - FK: PaypalAccount (int)
  - UserName  (string)
  - Follower (Double)
  - ProfilePicture (image)
  - FirstName (string)
  - LastName  (string)
  - Address (string)
  - Phone (string)
  - LastLogDate (time)
  - AllowCommission (boolean)
- Comments
  - PK: CommentID (int)
  - FK: CreatorID (int)
  - FK: ArtWorkID (int)
  - CommentText (string)
  - DateCreated (datetime)
- Orders
  - PK: OrderID (int)
  - FK: CreatorID (int)
- OrderDetail
  - FK: OrderID (int)
  - FK: ArtWorkID (int)
  - DateOfPurchase (datetime)
  - Price (double)
- Commission
  - PK: CommissionID (int)
- CommissionForm
  - FK: CommissionID (int)
  - FK: ReceiverID (int)
  - FK: RequestorID  (int)
  - Description (string)
- Moderators
  - PK: ModeratorID (int)
  - FK: ReportID (int)
  - FK: AccountID (int)
- Account
  - PK: AccountID (int)
  - FK: RoleID  (Type)
  - IdRole (int)
  - Username  (string)
  - Password  (string)
  - Email (string)
- Artworks
  - PK: ArtworkID (int)
  - FK: CreatorID (int)
  - FK: TagID (int)
  - FK: CategoryID (int)
  - Description (string)
  - DateCreated (datetime)
  - Likes (int)
  - Purchasable (boolean)
  - Price (double)
- Roles
  - PK: RoleID (int)
  - RoleName (string)
  - Description (string)
- PayPalAccount
  - PK: PayPalAccount (int)
  - CreatorID  (int)
  - QR (string)
- Tags
  - PK: TagID (int)
  - TagName (string)

### Luồng

1. Người dùng tạo một tài khoản.
2. Người dùng được phân một vai trò (nghệ sĩ, người mua, hoặc admin).
3. Nếu người dùng là nghệ sĩ, họ có thể tạo và bán tác phẩm nghệ thuật.
4. Nếu người dùng là người mua, họ có thể mua tác phẩm nghệ thuật.
5. Nếu người dùng là admin, họ có thể quản lý website.

### Điểm Quyết Định

1. Người dùng là nghệ sĩ, người mua, hoặc admin?
2. Người dùng đã đăng nhập chưa?
3. Người dùng có đủ tiền để mua tác phẩm nghệ thuật không?
4. Tác phẩm nghệ thuật có sẵn không?

