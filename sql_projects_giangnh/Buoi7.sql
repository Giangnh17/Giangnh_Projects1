-- 1. Thêm 1 khách hàng mới vào bảng customers.​
SELECT * FROM Customers;
INSERT INTO Customers(CustomerID, Name, City, Email)
VALUES	(13, 'Mary', 'Saigon', 'mary@gmail.com'),
		(14, 'Hyuga', 'Hue', 'meme@gmail.com');

-- 2. Thêm 1 sản phẩm mới vào bảng products.​
SELECT * FROM Products;
INSERT INTO Products(ProductID, ProductName, Price, Category)
VALUES	(113, 'Ipad', '500', 'Stationery');

-- 3. Thêm đơn hàng ID = 1021 do khách hàng có ID = 1 đặt ngày 2025-07-28​
SELECT * FROM Orders;
INSERT INTO Orders(OrderID, CustomerID, OrderDate)
VALUES (1021, 1, '2025-07-28'​);

-- 4. Thêm chi tiết đơn hàng có ID = 1021 gồm 2 sản phẩm có ID = 1​
-- Trong DB không có sản phẩm có ID = 1 nên thêm product ID = 1
SELECT * FROM OrderDetail;
INSERT INTO Products(ProductID, ProductName, Price, Category)
VALUES	(1, 'Eke', '5', 'Stationery');
INSERT INTO OrderDetail(OrderDetailID, OrderID, ProductID, Quantity)
VALUES (1021, 1021, 1, 2);

-- 5. Cập nhật giá của sản phẩm "Laptop" thành 1500​
UPDATE Products
SET Price = 1500 WHERE ProductName = 'Laptop';

-- 6. Xóa đơn hàng và chi tiết đơn hàng của người dùng có ID = 1​
ALTER TABLE Orders
ADD isDeleted BIT NOT NULL DEFAULT 0;

ALTER TABLE OrderDetail
ADD isDeleted BIT NOT NULL DEFAULT 0;

UPDATE Orders SET isDeleted = 1 WHERE CustomerID = 1;
UPDATE OrderDetail SET isDeleted = 1 WHERE OrderID IN (SELECT OrderID FROM Orders WHERE isDeleted = 1) ;

-- 7. Hiển thị danh sách đơn hàng, bao gồm:​ Mã đơn hàng​, Ngày đặt hàng​, Tên khách hàng
SELECT OrderID, OrderDate, Name
FROM Orders o
LEFT JOIN Customers c
ON o.CustomerID = c.CustomerID;

-- 8. Hiển thị chi tiết từng đơn hàng, bao gồm:​ Mã đơn hàng​, Tên sản phẩm​, Số lượng đặt​, Đơn giá​
SELECT OrderID, ProductName, Quantity, Price
FROM OrderDetail od
LEFT JOIN Products p
ON od.ProductID = p.ProductID;

-- 9. Tính tổng số lượng sản phẩm được đặt cho từng đơn hàng.​ Hiển thị: Mã đơn hàng, tổng số lượng sản phẩm.​
SELECT OrderID, SUM(Quantity) AS Total
FROM OrderDetail
GROUP BY OrderID;

-- 10.Tính tổng tiền của mỗi đơn hàng.​ Tổng tiền = Số lượng × Giá​. 
-- Hiển thị: Mã đơn hàng, tổng tiền.​
SELECT OrderID, SUM(od.Quantity * p.Price) AS TotalMoney
FROM OrderDetail od
LEFT JOIN Products p
ON od.ProductID = p.ProductID
GROUP BY OrderID;

-- 11. Tìm khách hàng có tổng giá trị đơn hàng cao nhất
SELECT TOP 1 
    c.CustomerID,
    c.Name,
    SUM(od.Quantity * p.Price) AS TotalValue
FROM Customers c
JOIN Orders o 
    ON c.CustomerID = o.CustomerID
JOIN OrderDetail od 
    ON o.OrderID = od.OrderID
JOIN Products p 
    ON od.ProductID = p.ProductID
GROUP BY c.CustomerID, c.Name
ORDER BY TotalValue DESC;
