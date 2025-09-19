-- 1. Hiển thị danh sách tên khách hàng (name) và email.​

SELECT Name, Email FROM Customers; 

-- 2. Tìm khách hàng sống tại thành phố Hanoi hoặc Hue.​

SELECT * FROM Customers WHERE City IN ('Hanoi', 'Hue');

-- 3. Liệt kê khách hàng có tên bắt đầu bằng chữ C kết thúc bằng chữ E​

SELECT * FROM Customers WHERE Name LIKE 'C%' AND Name LIKE '%e';

-- 4. Hiển thị danh sách 5 khách hàng đầu tiên sau khi sắp xếp theo name tăng dần.​

SELECT TOP 5 * FROM Customers
ORDER BY Name ASC;

-- 5. Hiển thị 10 sản phẩm có giá cao nhất.​

SELECT TOP 10 * FROM Products 
ORDER BY Price DESC;

-- 6. Đếm số sản phẩm có giá lớn hơn 500​

SELECT * FROM Products;
SELECT COUNT(*) FROM Products WHERE Price > 500;

-- 7. Tính trung bình giá các sản phẩm mà tên có phân loại là Electronics​
-- Em không hiểu tại sao nếu dùng lệnh AVG(Price) bình thường thì giá trị đều ra NULL nên Chat GPT gợi ý em ép kiểu lại thì mới ra kq ạ
SELECT AVG(CAST(Price AS DECIMAL(10,2)))
FROM Products
WHERE Category = 'Electronics';

-- 8. Lấy ra đơn hàng mới nhất

SELECT * FROM Orders;
SELECT * FROM Orders WHERE OrderDate = (SELECT MAX(OrderDate) FROM Orders);