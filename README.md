# Welcome to project SWP 
## Artix - Artwork Sharing Platform
# Table of Contents

    *Quy trình 1: ( đăng kí tài khoản User)

• Gửi form cho Guest đăng kí

• Sdt

• Email

• Mật khẩu

• Nhập lại Mật khẩu

• Tự động cấp roleid là user

    *Quy trình 2: ( kiểm tra người dùng, login)

• Lấy thông tin người dùng

• Kiểm tra xem là guest hay user để cấp quyền cho người dùng

• Nếu là guest không có quyền mua bán hay đăng các tác phẩm lên web

• User hoặc Admin có quyền tạo sản phẩm thêm bớt xoá….(Chỉ có admin có quyền chỉnh sửa quyền User.)
webweb
*Quy trình 3: ( quản lý tác phẩm )*

    *Quy trình 4 ( lấy chi tiết sản phẩm)

• Cửa hàng gửi thông tin chi tiết tác phẩm cho khách hàng trong 1 trang web mới

• Tên

• Thông tin

• Đánh giá

• Add wishlist

    *Quy trình 5 ( quản lý cart)

• Tạo giỏ hàng nếu giỏ hàng trống

• Thêm vào giỏ hàng (detail to cart)

• Tên sản phẩm

• Xoá sản phẩm

• Cập nhật giỏ hàng khi user điều chỉnh thêm bớt

• Xoá toàn bộ giỏ hàng

• Chuyển sang thanh toán

    *Quy trình 6 ( quản lý thanh toán )

• Cửa hàng cho phép khách hàng chọn hình thức thanh toán bằng nhiều hình thức:

• Trực tiếp nhắn tin với họa sĩ: Nhắn tin trao đổi trực tiếp với họa sĩ để thanh toán

• Gián tiếp: Thanh toán online qua app ngân hàng hoặc các app như MOMO,ZaloPay,..

• Áp dụng mã giảm giá

• Hủy hình thức thanh toán

• Kiểm tra thanh toán thành công chưa do bên phía web chấp nhận thanh toán gửi về ( nếu thành công chuyển về trang chi tiết thanh toán và hiện popup thanh toán thành công tới khách hàng/ thất bại chuyển lại trang giỏ hàng và hiện popup thất bại)
