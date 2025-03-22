# Grocer Log System 🛒

## **About the Project**
**Grocer Log System** is a comprehensive full-stack MERN (MongoDB, Express, React, Node.js) web application designed to simplify inventory, sales, and customer credit management for grocers. It empowers grocers to maintain an efficient and organized workflow, ensuring seamless operations in handling logs.

---

## **Key Features**
1. **Inventory Management**:
   - Add, update, and delete inventory items.
   - Track stock levels (e.g., "In Stock," "Low Stock," "Out of Stock").
   - Filter items by status for better inventory insights.

2. **Sales Logs**:
   - Log daily sales details, including product name, quantity, and price.
   - Generate automatic calculations for total sales.
   - Date filters for tracking sales trends.

3. **Customer Credit Management**:
   - Maintain records of customer purchases and pending credits.
   - Mark payments as paid with timestamps.
   - Generate detailed tax invoices and send them via email.

4. **User Authentication**:
   - Secure login and signup for grocers.
   - Token-based authentication for secure data handling.

5. **Try Demo**:
   - Users can try a demo version of the system by entering their email.

---

## **Technology Stack**
### **Frontend**:
- **React.js**: For a dynamic and responsive user interface.
- **TailwindCSS**: For beautiful and responsive styling.

### **Backend**:
- **Node.js** with **Express.js**: For server-side logic and API creation.
- **MongoDB**: NoSQL database for efficient and scalable data storage.

### **Additional Tools**:
- **Framer Motion**: For adding smooth animations.
- **FontAwesome**: For attractive icons in the user interface.
- **JWT Authentication**: To ensure secure user sessions.

---

## **Installation and Setup**
Follow these steps to set up and run the project locally:

### **Prerequisites**
- Node.js installed (v14 or later).
- MongoDB installed locally or hosted on a service like MongoDB Atlas.
- Git installed.

### **Steps**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/grocer-log-system.git
   cd grocer-log-system
2. **Install dependencies**:
   ```bash
   npm install
   cd client
   npm install
   cd ..
3. **Set up environment variables**:
   Create an .env file in the root directory and configure the following:
   ```bash
   MONGO_URI=<Your MongoDB Connection String>
   JWTPRIVATEKEY=<Your Secret Key>
   PORT=8000
   CORS_ORIGIN=*
   EMAIL_USER=<your email>
   EMAIL_PASS=<your nodemailer api secret>
4. **Run the application**:
   ```bash
   npm run dev
5. **Open the application in your browser**:
   ```bash
   http://localhost:3000

---

### **Screenshots**
**Dashboard**
![DashboardImage](https://github.com/user-attachments/assets/9b7c8db1-da02-441c-990b-1bc45f08ad22)

**Inventory Log**
![Inventoryimage](https://github.com/user-attachments/assets/75a32336-d548-45c0-a8bd-908b5072978b)
**Sales Log**
![SalesImage](https://github.com/user-attachments/assets/2d81fe98-a9aa-459a-9f8f-fbe6710331a7)
**Customer Credit Log**
![CustomerCreditImage](https://github.com/user-attachments/assets/9ab80f0c-b2b1-49b9-986b-c7bacd572b42)

---

### **Future Enhancements**
1. **Integration with mobile platforms for on-the-go management.**
2. **Advanced analytics for sales and inventory trends.**
3. **Support for multiple user roles (e.g., Admin, Staff).**
4. **Multi-language support.**

---

## 📫 Contact Me

Let's connect and collaborate!  
- **LinkedIn:** [https://www.linkedin.com/in/dinesh-choudhary-4aa2082aa/]
- **Email:** dc9359349132@gmail.com
- **Twitter:** [https://x.com/DineshChou90368]

---
