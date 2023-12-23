
const WarrantyInformation = () => {
    return (
        <div className="bg-main px-[10vw] flex justify-center">
            <div className="w-full bg-white pb-[10vh] shadow-md">
                <p className="text-[27px] text-center text-main font-semibold py-7">Chính sách Bảo hành - Cửa hàng Thanh Huy</p>
                <div className="w-full px-[10vw] text-[20px]">
                    <p className="text py-4">Chào mừng quý khách hàng đến với cửa hàng Thanh Huy. Chúng tôi luôn nỗ lực nhằm mang lại sự hài lòng cho bạn thông qua chất lượng sản phẩm và dịch vụ chăm sóc khách hàng tốt nhất. Dưới đây là thông tin chi tiết về Chính sách Bảo hành của chúng tôi:</p>
                    <p className="font-semibold pb-5">1. Hóa Đơn và Thời Hạn Bảo Hành:</p>
                    <p className="font-semibold pb-5">1.1 Hóa Đơn Chi Tiết:</p>
                    <span className="px-10">
                    Mọi giao dịch mua sắm hoặc sửa chữa tại cửa hàng Thanh Huy đều được chúng tôi ghi chép chi tiết trong hóa đơn và được lưu trữ trên hệ thống của cửa hàng. Hóa đơn sẽ bao gồm các thông tin như: ngày lập hoá đơn, thông tin khách hàng, tên sản phẩm/dịch vụ, số lượng, giá trị, và thời hạn bảo hành cụ thể.
                    </span>
                    <p className="font-semibold py-5">1.2 Thời Hạn Bảo Hành:</p>
                    <span className="px-10">
                    Thời hạn bảo hành phụ thuộc vào từng loại sản phẩm hoặc dịch vụ cụ thể - được quy định rõ trong phần "Thời Hạn Bảo Hành" trên hóa đơn. Chúng tôi cam kết tuân thủ thời hạn bảo hành đã thông báo.
                    </span>
                    <p className="font-semibold py-5">
                    2. Phạm Vi Bảo Hành:
                    </p>
                    <span className="px-10">
                    Chính sách bảo hành của chúng tôi áp dụng đối với tất cả các sản phẩm và dịch vụ mà quý khách hàng đã sử dụng tại cửa hàng Thanh Huy. Bảo hành chỉ áp dụng cho các lỗi kỹ thuật từ phía nhân viên của cửa hàng hoặc lỗi từ sản phẩm xuất hiện trong thời gian bảo hành. Đối với những vấn đề xảy ra sau thời gian bảo hành, việc đảm bảo này không được áp dụng. Nếu quý khách có bất kỳ vấn đề gì, xin vui lòng liên hệ với Cửa hàng Thanh Huy để được giải đáp mọi thắc mắc, yêu cầu của quý khách.
                    </span>
                    <p className="font-semibold py-5">3. Trách Nhiệm Bảo Hành:</p>
                    <p className="font-semibold pb-5">3.1 Sửa Chữa và Thay Thế:</p>
                    <li className="px-10 pb-3">
                    Trong thời hạn bảo hành, chúng tôi chịu trách nhiệm bảo hành cho tất cả sản phẩm/dịch vụ được phân phối bởi Cửa hàng Thanh Huy đối với các hư hỏng do khuyết tật của vật liệu hoặc lỗi sản xuất theo các điều kiện và điều khoản bảo hành đã quy định.
                    </li>
                    <li className="px-10">
                    Chúng tôi sẽ tiến hành sửa chữa hoặc thay thế miễn phí các phụ tùng (chi tiết có thể tháo rời) được Nhân Viên Kỹ Thuật của Cửa hàng Thanh Huy xác nhận là bị hư hỏng do khuyết tật của vật liệu hoặc lỗi sản xuất trong phạm vi và giới hạn bảo hành (miễn phí cả về nhân công và phụ tùng thay thế). Tất cả các phụ tùng hư hỏng đã được thay thế bằng phụ tùng mới theo điều kiện bảo hành này sẽ trở thành tài sản của Cửa hàng Thanh Huy.
                    </li>
                    <p className="font-semibold py-5">3.2 Điều Kiện Bảo Hành Hết Hiệu Lực:</p>
                    <li className="px-10">
                    Bảo hành sẽ không được áp dụng nếu khách hàng không thể cung cấp hoá đơn mua hàng hoặc thông tin mua hàng không trùng khớp với dữ liệu trên hệ thống.
                    </li>
                    <li className="px-10">
                    Bảo hành sẽ không được áp dụng cho bất cứ một hư hỏng, tổn thất nào xảy ra do việc sửa chữa hay điều chỉnh không tuân theo các phương pháp đã được quy định do nguyên nhân của việc sửa chữa, điều chỉnh  không được thực hiện bởi Cửa hàng Thanh Huy.
                    </li>
                    <li className="px-10">
                    Bảo hành sẽ không được áp dụng cho tất cả các hư hỏng do việc bảo quản hoặc vận chuyển phụ kiện không đúng, sử dụng linh kiện không đúng cách (đua xe, chở quá tải, đi xe vào đường bị ngập nước…) tai nạn, bị ngoại lực tác động hoặc các tình huống tương tự khác.
                    </li>
                    <li className="px-10">
                    Bảo hành sẽ không được áp dụng cho bất cứ một hư hỏng, tổn thất nào gây ra bởi các yếu tố ngoài tầm kiểm soát của nhà sản xuất như thảm họa tự nhiên (hỏa hoạn, động đất, thiên tai, lũ lụt, giông bão, sấm, sét, ngập nước…); cháy nổ, va chạm, đá văng, trộm cắp hay các tình huống tương tự khác và các hư hỏng xảy ra sau đó do hậu quả của các sự kiện này; hư hỏng, tổn thất gây ra bởi khói, các chất hóa học, phân chim, nước biển, gió biển, muối, mưa axit hoặc các hiện tượng tương tự khác
                    </li>
                    <li className="px-10">
                    Bảo hành sẽ không được áp dụng cho các hiện tượng như tiếng ồn, độ rung, thấm dầu, ăn mòn, mờ sương đèn pha, giảm giá trị tự nhiên theo thời gian sử dụng,…
                    </li>
                    <li className="px-10">
                    Bảo hành sẽ không được áp dụng cho  các chi phí liên quan:
                    </li>
                    <ul className="list-none px-20">
                        <li className="relative pl-8 mb-5">
                            <span className="absolute left-0 top-4 transform -translate-y-1/2 w-2 h-2 bg-white border-2 border-black rounded-full mr-2"></span>
                            Chi phí đền bù về thời gian, thiệt hại trong kinh doanh hay chi phí thuê xe để sử dụng trong suốt thời gian sửa chữa .
                        </li>
                    </ul>
                    <ul className="list-none px-20">
                        <li className="relative pl-8 mb-5">
                            <span className="absolute left-0 top-4 transform -translate-y-1/2 w-2 h-2 bg-white border-2 border-black rounded-full mr-2"></span>
                            Các chi phí hoặc thiệt hại khác (nếu có) chưa được liệt kê ở đây.
                        </li>
                    </ul>
                    <p className="font-semibold py-5">4. Đổi hàng</p>
                    <li className="px-10">Chính sách áp dụng: Tối đa 01 lần đổi/01 đơn hàng. Hỗ trợ đổi hàng tại cửa hàng.</li>
                    <li className="px-10">Chỉ áp dụng với sản phẩm chưa qua sử dụng, còn nguyên vẹn bao bì, nhãn mác, thẻ bảo hành,….và lỗi từ nhà sản xuất.</li>
                    <li className="px-10">Thời gian đổi tối đa 3 ngày (kể từ ngày mua/nhận). Nếu vượt quá thời gian quy định sẽ không nhận đổi sản phẩm với bất kì lý do nào.</li>
                    <li className="px-10">Sản phẩm nguyên giá được đổi sang sản phẩm nguyên giá khác còn hàng. Khách hàng thanh toán số tiền chênh lệch nếu giá trị sản phẩm đổi lớn hơn. Không hoàn trả lại tiền thừa dưới bất kỳ hình thức nào.</li>
                    <li className="px-10">Hàng giảm giá, khuyến mãi, thanh lý,… không được đổi trả dưới bất kỳ hình thức nào.</li>
                    <p className="font-semibold py-5">5. Thủ Tục Yêu Cầu Bảo Hành:</p>
                    <span className="pl-14">Bất cứ khi nào quý khách không hài lòng với chất lượng dịch vụ hay thấy xe có dấu hiệu bất thường nghi ngờ phát sinh lỗi do sản phẩm hoặc dịch vụ từ phía cửa hàng, quý khách có thể trực tiếp liên hệ với cửa hàng qua thông tin liên hệ hoặc mang xe đến cửa hàng, cung cấp hóa đơn mua hàng và mô tả chi tiết về vấn đề gặp phải để nhận sự hỗ trợ từ nhân viên tư vấn.</span>
                    <p className="pl-[9vw] py-1">Cửa hàng Thanh Huy Địa chỉ: D4, khu Công Nghệ Cao, phường Long Thạnh Mỹ, Thủ Đức, TP. Hồ Chí Minh</p>
                    <p className="pl-[9vw] pb-1">Email: <a className="text-blue-500 hover:underline hover:underline-offset-4 "
                    href="mailto:support@thanhhuy.com">support@thanhhuy.com</a></p>
                    <p className="pl-[9vw] pb-10">Điện thoại: 0969 920 894</p>
                    <span className="pl-14">Chúng tôi mong muốn mang lại trải nghiệm mua sắm và dịch vụ tốt nhất cho bạn. Mọi ý kiến đóng góp và phản hồi đều là nguồn động viên quý báu để chúng tôi không ngừng cải thiện. Cảm ơn bạn đã tin tưởng và chọn lựa cửa hàng Thanh Huy!</span>
                    <p className="pt-5 pb-3">Trân trọng,</p>
                    <p className="font-semibold">Cửa hàng Thanh Huy</p>
                </div>
            </div>
        </div>
    )
}

export default WarrantyInformation